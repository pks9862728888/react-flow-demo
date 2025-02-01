"use client";
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  addEdge,
  Background,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {nodeTypes} from "@/app/constants/nodeTypes";
import {LineageDataType} from "@/app/types/LineageDataType";
import {EdgeBase} from "@xyflow/system";
import {initialEdges, initialNodes} from "@/app/constants/data";
import {SelectedNodeType} from "@/app/types/SelectedNodeType";
import {ReactFlowNode} from "@/app/types/ReactFlowNode";
import {cloneDeep} from "lodash";
import updateSelectionDataInTableNode from "@/app/functions/tablenode/updateSelectionDataInTableNode";
import buildTableNodeGraph from "@/app/functions/tablenode/buildTableNodeGraph";
import getEdgeHandleKeyPrefix from "@/app/functions/tablenode/getEdgeHandleKeyPrefix";
import buildGraphLineageDataMap from "@/app/functions/tablenode/buildGraphLineageDataMap";

const nodeClassName = (node: any) => node.type;


const DataLineageProviderFlow: React.FC = () => {
  // React hooks to store state
  const lineageData: LineageDataType = {nodes: initialNodes, edges: initialEdges};
  const [nodes, setNodes, onNodesChange] = useNodesState(lineageData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lineageData.edges);

  // Set edges in React flow
  useCallback((params: EdgeBase): void => setEdges((els: Edge[]) => addEdge(params, els)), []);

  // Build graph for nodes (adjacencyList) and lineage data (pre-compute for performance)
  const lineageDataMapRef: Map<string, Set<string>> =
    useMemo<Map<string, Set<string>>>((): Map<string, Set<string>> => {
      const adjList: Map<string, Set<string>> = buildTableNodeGraph(edges);
      return buildGraphLineageDataMap(adjList);
    }, [edges]);

  const onNodeSelect: (selectedNode: SelectedNodeType) => void = (newSelectedNode: SelectedNodeType): void => {
    const selNdDataId: string = newSelectedNode.nodeId;
    const selNdDataRowId: string = newSelectedNode.dataRowId;

    console.log("lineageData: " + JSON.stringify(lineageDataMapRef));
    setNodes((oldNodes: ReactFlowNode[]): ReactFlowNode[] => {
        const selectedFieldKey: string = getEdgeHandleKeyPrefix(selNdDataId, selNdDataRowId);
        const adjacentNodes: Set<string> = lineageDataMapRef.get(selectedFieldKey) ?? new Set<string>();
        return oldNodes.map((oldNode: ReactFlowNode): ReactFlowNode => {
          let newNode: ReactFlowNode = cloneDeep(oldNode);
          updateSelectionDataInTableNode(newNode, adjacentNodes);
          console.log(newNode);
          return newNode;
        });
      }
    );
    console.log("newSelectedNode: " + JSON.stringify(newSelectedNode));
  }

  // Bind onNodeSelect event to lineageData for child components to trigger onNodeSelect action
  useEffect((): void => {
    nodes.forEach((node: ReactFlowNode): void => {
      node.data.triggerNodeSelection = onNodeSelect;
    });
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        style={{backgroundColor: "#F7F9FB"}}
      >
        <Background/>
        <MiniMap zoomable pannable nodeClassName={nodeClassName} bgColor={"aqua"}/>
        <Controls/>
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default DataLineageProviderFlow;

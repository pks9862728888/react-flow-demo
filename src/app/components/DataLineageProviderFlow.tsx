"use client";
import React, {RefObject, useCallback, useEffect, useRef} from 'react';
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
import updateEdgeSelectionConnectedToTableDataRows
  from "@/app/functions/tablenode/updateEdgeSelectionConnectedToTableDataRows";

const nodeClassName = (node: any) => node.type;

function doOnTableNodeRowSelection(
  setNodes: (value: (((prevState: ReactFlowNode[]) => ReactFlowNode[]) | ReactFlowNode[])) => void,
  lineageDataMap: Map<string, Set<string>>,
  setEdges: (value: (((prevState: Edge[]) => Edge[]))) => void) {
  const onNodeSelect: (selectedNode: SelectedNodeType) => void = (newSelectedNode: SelectedNodeType): void => {
    const selNdDataId: string = newSelectedNode.nodeId;
    const selNdDataRowId: string = newSelectedNode.dataRowId;
    const selectedFieldKey: string = getEdgeHandleKeyPrefix(selNdDataId, selNdDataRowId);

    // Update the node lineage data state
    setNodes((oldNodes: ReactFlowNode[]): ReactFlowNode[] => {
        const adjacentNodes: Set<string> = lineageDataMap.get(selectedFieldKey) ?? new Set<string>();
        return oldNodes.map((oldNode: ReactFlowNode): ReactFlowNode => {
          let newNode: ReactFlowNode = cloneDeep(oldNode);
          updateSelectionDataInTableNode(newNode, adjacentNodes, selectedFieldKey);
          return newNode;
        });
      }
    );

    // Update the edge selection behavior
    setEdges((oldEdges: Edge[]): Edge[] => {
      const lineageData: Set<string> = lineageDataMap.get(selectedFieldKey) ?? new Set<string>();
      return oldEdges.map((oldEdge: Edge): Edge => {
        return updateEdgeSelectionConnectedToTableDataRows(oldEdge, lineageData);
      });
    });
  }
  return onNodeSelect;
}

const DataLineageProviderFlow: React.FC = () => {
  // React hooks to store state
  const lineageData: LineageDataType = {nodes: initialNodes, edges: initialEdges};
  const [nodes, setNodes, onNodesChange] = useNodesState(lineageData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lineageData.edges);
  const lineageDataRef: RefObject<Map<string, Set<string>>> = useRef<Map<string, Set<string>>>(
    new Map<string, Set<string>>());

  // Set edges in React flow
  useCallback((params: EdgeBase): void =>
    setEdges((eds: Edge[]): Edge[] => addEdge(params, eds)), []);

  // Build graph for nodes (adjacencyList) and lineage data (pre-compute for performance)
  useEffect((): void => {
    const adjList: Map<string, Set<string>> = buildTableNodeGraph(edges);
    lineageDataRef.current = buildGraphLineageDataMap(adjList);
  }, []);

  // Bind onNodeSelect event to lineageData for child components to trigger onNodeSelect action
  useEffect((): void => {
    const onNodeSelect = doOnTableNodeRowSelection(
      setNodes, lineageDataRef.current, setEdges);
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

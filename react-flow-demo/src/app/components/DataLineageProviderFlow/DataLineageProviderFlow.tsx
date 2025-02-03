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
import {ReactFlowNode} from "@/app/types/ReactFlowNode";
import {cloneDeep} from "lodash";
import buildTableNodeGraph from "@/app/functions/tablenode/buildTableNodeGraph";
import buildLineageDataMap from "@/app/functions/tablenode/buildLineageDataMap";
import onTableNodeRowSelection from "@/app/components/DataLineageProviderFlow/onTableNodeRowSelection";

const nodeClassName = (node: any) => node.type;

const DataLineageProviderFlow = ({lineageData}: { lineageData: LineageDataType }) => {
  // React hooks to store state
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
    lineageDataRef.current = buildLineageDataMap(adjList);
  }, []);

  // Set expand node
  const onExpandNodeToggle = (shouldExpand: boolean): void => {
    setNodes((oldNodes: ReactFlowNode[]): ReactFlowNode[] => {
      return oldNodes.map((oldNode: ReactFlowNode): ReactFlowNode => {
        let newNode: ReactFlowNode = cloneDeep(oldNode);
        newNode.data.expandNode = shouldExpand;
        return newNode;
      });
    });
  }

  // Bind onNodeSelect event to lineageData for child components to trigger onNodeSelect action
  useEffect((): void => {
    const onNodeSelect = onTableNodeRowSelection(
      setNodes, lineageDataRef.current, setEdges);
    nodes.forEach((node: ReactFlowNode): void => {
      node.data.triggerNodeSelection = onNodeSelect;
      node.data.triggerNodeExpansionToggle = onExpandNodeToggle;
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

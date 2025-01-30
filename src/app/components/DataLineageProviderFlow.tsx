"use client";
import React, {type MouseEvent as ReactMouseEvent, useCallback} from 'react';
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {nodeTypes} from "@/app/constants/nodeTypes";
import {DataLineageProviderFlowPropType} from "@/app/types/proptypes/DataLineageProviderFlowPropType";
import {LineageDataType} from "@/app/types/LineageDataType";
import {EdgeBase} from "@xyflow/system";


const nodeClassName = (node: any) => node.type;

const DataLineageProviderFlow: React.FC<DataLineageProviderFlowPropType> = (props) => {
  const lineageData: LineageDataType = props.lineageData;
  const [nodes, setNodes, onNodesChange] = useNodesState(lineageData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lineageData.edges);
  useCallback((params: EdgeBase): void => setEdges((els) => addEdge(params, els)), []);

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

"use client";
import React, {useCallback} from 'react';
import {addEdge, Background, Node, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {EdgeBase} from "@xyflow/system";

const initialNodes: Node[] = [
  {id: '1', type: 'input', data: {label: 'Node 1'}, position: {x: 100, y: 100}},
  {id: '2', data: {label: 'Node 2'}, position: {x: 300, y: 100}}
];

const initialEdges: EdgeBase[] = [
  {id: 'e1-2', source: '1', target: '2'}
];

function ProviderFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  useCallback((params: EdgeBase): void => setEdges((els) => addEdge(params, els)), []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{backgroundColor: "#F7F9FB"}}
      >
        <Background/>
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default ProviderFlow;

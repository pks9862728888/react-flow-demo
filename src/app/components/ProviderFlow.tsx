"use client";
import React, {ReactElement, useCallback} from 'react';
import {addEdge, Background, Node, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {EdgeBase} from "@xyflow/system";
import {nodeTypes} from "@/app/constants/nodeTypes";
import {tableNodeHeaderCols} from "@/app/constants/tableNodeHeaderCols";

const initialNodes: Node[] = [
  {
    id: '1', type: 'tableNode',
    data: {
      datasetName: 'tableName1',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, fieldName: 'fieldAN1', transformations: [{id: 1, ruleId: "PARSING_RULE_001", type: "PARSING"}]},
        {id: 2, fieldName: 'fieldBN2', transformations: []}]
    },
    position: {x: 100, y: 100}
  },
  {
    id: '2', type: 'tableNode',
    data: {
      datasetName: 'tableName2',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, fieldName: 'fieldAN2', transformations: [{id: 1, ruleId: "JSON_RATES_001", type: "JSON"}]},
        {id: 2, fieldName: 'fieldBN2', transformations: []}]
    },
    position: {x: 350, y: 100}
  },
  {
    id: '3', type: 'tableNode',
    data: {
      datasetName: 'tableName3',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, fieldName: 'fieldAN3', transformations: [{id: 1, ruleId: "HarmonizedField001", type: "HRF"}]},
        {id: 2, fieldName: 'fieldBN3', transformations: []}]
    },
    position: {x: 600, y: 100}
  },
  {
    id: '4', type: 'tableNode',
    data: {
      datasetName: 'tableName4',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, fieldName: 'fieldAN4', transformations: [{id: 1, ruleId: "ReportingRule001", type: "RF"}]},
        {id: 2, fieldName: 'fieldBN4', transformations: []}]
    },
    position: {x: 850, y: 100}
  },
  {
    id: '5', type: 'tableNode',
    data: {
      datasetName: 'tableName5',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, fieldName: 'fieldAN5', transformations: []},
        {id: 2, fieldName: 'fieldBN5', transformations: []}]
    },
    position: {x: 1100, y: 100}
  }
];

const initialEdges: EdgeBase[] = [
  {id: 'e1-2', source: '1', target: '2'},
  {id: 'e2-3', source: '2', target: '3'},
  {id: 'e3-4', source: '3', target: '4'},
  {id: 'e4-5', source: '4', target: '5'}
];

function ProviderFlow(): ReactElement {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default ProviderFlow;

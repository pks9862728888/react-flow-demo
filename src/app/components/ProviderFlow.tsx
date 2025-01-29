"use client";
import React, {ReactElement, useCallback} from 'react';
import {
  addEdge,
  Background, Controls,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {EdgeBase} from "@xyflow/system";
import {nodeTypes} from "@/app/constants/nodeTypes";
import {tableNodeHeaderCols} from "@/app/constants/tableNodeHeaderCols";

const initialNodes: Node[] = [
  {
    id: '1', type: 'tableNode',
    data: {
      id: 1,
      datasetName: 'tableName1',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN1', transformations: [{id: 1, ruleId: "PARSING_RULE_001", type: "PARSING"}]},
        {id: 2, colSeq: 1, fieldName: 'fieldBN2', transformations: [{id: 2, ruleId: "PARSING_RULE_002", type: "PARSING"}]}]
    },
    position: {x: 100, y: 100}
  },
  {
    id: '2', type: 'tableNode',
    data: {
      id: 2,
      datasetName: 'tableName2',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN2',
          transformations: [
            {id: 1, ruleId: "JSON_RATES_001", type: "JSON"},
            {id: 2, ruleId: "JSON_RATES_003", type: "JSON"}]},
        {id: 2, colSeq: 1, fieldName: 'fieldBN2', transformations: []}]
    },
    position: {x: 450, y: 100}
  },
  {
    id: '3', type: 'tableNode',
    data: {
      id: 3,
      datasetName: 'tableName3',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN3', transformations: [{id: 1, ruleId: "HarmonizedField001", type: "HRF"}]},
        {id: 2, colSeq: 1, fieldName: 'fieldBN3', transformations: []}]
    },
    position: {x: 800, y: 100}
  },
  {
    id: '4', type: 'tableNode',
    data: {
      id: 4,
      datasetName: 'tableName4',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN4', transformations: [{id: 1, ruleId: "ReportingRule001", type: "RF"}]},
        {id: 2, colSeq: 1, fieldName: 'fieldBN4', transformations: []}]
    },
    position: {x: 1150, y: 100}
  },
  {
    id: '5', type: 'tableNode',
    data: {
      id: 5,
      datasetName: 'tableName5',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN5', transformations: []},
        {id: 2, colSeq: 1, fieldName: 'fieldBN5', transformations: []},
        {id: 3, colSeq: 2, fieldName: 'fieldBN6', transformations: []}
      ]
    },
    position: {x: 1500, y: 100}
  }
];

const initialEdges: EdgeBase[] = [
  // Table level lineage
  {id: 'e1-2', source: '1', target: '2', sourceHandle: '1-source'},
  {id: 'e2-3', source: '2', target: '3', sourceHandle: '2-source'},
  {id: 'e3-4', source: '3', target: '4', sourceHandle: '3-source'},
  {id: 'e4-5', source: '4', target: '5', sourceHandle: '4-source'},

  // Table column level lineage
  // Parsing to json layer
  {id: "e1-2-col1-1", source: "1", target: "2", sourceHandle: "1-1-source", targetHandle: '2-1-target'},
  {id: "e1-2-col2-2", source: "1", target: "2", sourceHandle: "1-2-source", targetHandle: '2-2-target'},
  // Json layer to harmonized fields layer
  {id: "e2-3-col1-1", source: "2", target: "3", sourceHandle: "2-1-source", targetHandle: '3-1-target'},
  {id: "e2-3-col1-2", source: "2", target: "3", sourceHandle: "2-1-source", targetHandle: '3-2-target'},
  // Harmonized field layer to reporting field layer
  {id: "e3-4-col1-1", source: "3", target: "4", sourceHandle: "3-1-source", targetHandle: '4-1-target'},
  // Reporting fields layer to some other layer (dummy used for testing)
  {id: "e4-5-col1-1", source: "4", target: "5", sourceHandle: "4-1-source", targetHandle: '5-1-target'}
];

const nodeClassName = (node: any) => node.type;

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
        <MiniMap zoomable pannable nodeClassName={nodeClassName} bgColor={"aqua"} />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default ProviderFlow;

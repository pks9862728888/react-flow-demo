"use client";
import React, {useState} from "react";
import DataLineageProviderFlow from "@/app/components/DataLineageProviderFlow";
import {Edge, Node} from "@xyflow/react";
import {tableNodeHeaderCols} from "@/app/constants/tableNodeHeaderCols";
import {LineageDataType} from "@/app/types/LineageDataType";
import {SelectedNodeType} from "@/app/types/SelectedNodeType";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'tableNode',
    data: {
      id: 1,
      datasetName: 'RawData',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{
        id: 1,
        colSeq: 0,
        fieldName: 'fieldAN1',
        transformations: [{id: 1, ruleId: "TRNS_RULE_001", type: "ENRICHMENT"}]
      },
        {
          id: 2,
          colSeq: 1,
          fieldName: 'fieldBN2',
          transformations: [{id: 2, ruleId: "TRNS_RULE_002", type: "ENRICHMENT"}]
        }]
    },
    position: {x: 100, y: 100}
  },
  {
    id: '2',
    type: 'tableNode',
    data: {
      id: 2,
      datasetName: 'JsonData',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{
        id: 1, colSeq: 0, fieldName: 'fieldAN2', selected: false,
        transformations: [
          {id: 1, ruleId: "JSON_RATES_001", type: "JSON"},
          {id: 2, ruleId: "JSON_RATES_003", type: "JSON"}]
      },
        {id: 2, colSeq: 1, fieldName: 'fieldBN2', transformations: []}]
    },
    position: {x: 450, y: 100}
  },
  {
    id: '3',
    type: 'tableNode',
    data: {
      id: 3,
      datasetName: 'CDM',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{
        id: 1, colSeq: 0, fieldName: 'fieldAN3', selected: false,
        transformations: [{id: 1, ruleId: "HarmonizedField001", type: "HRF"}]
      },
        {id: 2, colSeq: 1, fieldName: 'fieldBN3', selected: false, transformations: []}]
    },
    position: {x: 800, y: 100}
  },
  {
    id: '4',
    type: 'tableNode',
    data: {
      id: 4,
      datasetName: 'ASIC Data Model',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN4', selected: false, transformations: []},
        {id: 2, colSeq: 1, fieldName: 'fieldBN4', selected: false, transformations: []}]
    },
    position: {x: 1150, y: 100}
  },
  {
    id: '5',
    type: 'tableNode',
    data: {
      id: 5,
      datasetName: 'MAS Data Model',
      headerColumns: tableNodeHeaderCols,
      dataRows: [{id: 1, colSeq: 0, fieldName: 'fieldAN5', selected: false, transformations: []},
        {id: 2, colSeq: 1, fieldName: 'fieldBN5', selected: false, transformations: []},
        {id: 3, colSeq: 2, fieldName: 'fieldBN6', selected: false, transformations: []}
      ]
    },
    position: {x: 1150, y: 270}
  }
];

const initialEdges: Edge[] = [
  // Table level lineage
  {id: 'e1-2', source: '1', target: '2', sourceHandle: '1-source'},
  {id: 'e2-3', source: '2', target: '3', sourceHandle: '2-source'},
  {id: 'e3-4', source: '3', target: '4', sourceHandle: '3-source'},
  {id: 'e3-5', source: '3', target: '5', sourceHandle: '3-source'},

  // Table column level lineage
  // Parsing to json layer
  {id: "e1-2-col1-1", source: "1", target: "2", sourceHandle: "1-1-source", targetHandle: '2-1-target'},
  {id: "e1-2-col2-2", source: "1", target: "2", sourceHandle: "1-2-source", targetHandle: '2-2-target'},
  // Json layer to harmonized fields layer
  {id: "e2-3-col1-1", source: "2", target: "3", sourceHandle: "2-1-source", targetHandle: '3-1-target'},
  {id: "e2-3-col1-2", source: "2", target: "3", sourceHandle: "2-1-source", targetHandle: '3-2-target'},
  // CDM field layer to reporting field layer (ASIC)
  {id: "e3-4-col1-1", source: "3", target: "4", sourceHandle: "3-1-source", targetHandle: '4-1-target'},
  // CDM field layer to reporting field layer (MAS)
  {
    id: "e3-5-col1-1", source: "3", target: "5", sourceHandle: "3-1-source", targetHandle: '5-1-target',
    selected: true, style: {
      strokeWidth: 2,
      stroke: '#FF0072',
    }
  }
];

export default function Home(): React.JSX.Element {
  const [lineageData, setLineageData] = useState<LineageDataType>({nodes: initialNodes, edges: initialEdges});
  const [selectedNode, setSelectedNode] = useState<SelectedNodeType>();

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <DataLineageProviderFlow lineageData={lineageData}/>
    </div>
  );
}

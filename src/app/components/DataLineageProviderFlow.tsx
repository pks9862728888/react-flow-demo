"use client";
import React, {useCallback, useEffect} from 'react';
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
import {isTableNodeReRenderingRequired} from "@/app/functions/tablenode/isTableNodeReRenderingRequired";
import {cloneDeep} from "lodash";
import updateSelectionDataInTableNode from "@/app/functions/tablenode/updateSelectionDataInTableNode";

const nodeClassName = (node: any) => node.type;


const DataLineageProviderFlow: React.FC = () => {
  const lineageData: LineageDataType = {nodes: initialNodes, edges: initialEdges};
  const [nodes, setNodes, onNodesChange] = useNodesState(lineageData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lineageData.edges);
  useCallback((params: EdgeBase): void => setEdges((els: Edge[]) => addEdge(params, els)), []);

  const onNodeSelect: (selectedNode: SelectedNodeType) => void = (newSelectedNode: SelectedNodeType) => {
    const selNdDataId: string = newSelectedNode.nodeId;
    const selNdDataRowId: string = newSelectedNode.dataRowId;

    setNodes((oldNodes: ReactFlowNode[]): ReactFlowNode[] =>
      oldNodes.map((oldNode: ReactFlowNode): ReactFlowNode => {
        let newNode: ReactFlowNode = oldNode;
        if (isTableNodeReRenderingRequired(oldNode, selNdDataId, selNdDataRowId)) {
          newNode = cloneDeep(oldNode);
          updateSelectionDataInTableNode(newNode, selNdDataId, selNdDataRowId);
          console.log(newNode);
        }
        return newNode;
      })
    );
    console.log("newSelectedNode: " + JSON.stringify(newSelectedNode));
  }

  // Bind onNodeSelect event to lineageData for child components to trigger onNodeSelect action
  useEffect(() => {
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

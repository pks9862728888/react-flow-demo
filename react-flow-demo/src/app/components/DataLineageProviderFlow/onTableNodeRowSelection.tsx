import {ReactFlowNode} from "@/app/types/ReactFlowNode";
import {Edge} from "@xyflow/react";
import {SelectedNodeType} from "@/app/types/SelectedNodeType";
import getEdgeHandleKeyPrefix from "@/app/functions/tablenode/getEdgeHandleKeyPrefix";
import {cloneDeep} from "lodash";
import updateSelectionDataInTableNode from "@/app/components/DataLineageProviderFlow/updateSelectionDataInTableNode";
import updateEdgeSelectionConnectedToTableDataRows
  from "@/app/components/DataLineageProviderFlow/updateEdgeSelectionConnectedToTableDataRows";

const onTableNodeRowSelection = (
  setNodes: (value: (((prevState: ReactFlowNode[]) => ReactFlowNode[]) | ReactFlowNode[])) => void,
  lineageDataMap: Map<string, Set<string>>,
  setEdges: (value: (((prevState: Edge[]) => Edge[]))) => void) => {
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

export default onTableNodeRowSelection;

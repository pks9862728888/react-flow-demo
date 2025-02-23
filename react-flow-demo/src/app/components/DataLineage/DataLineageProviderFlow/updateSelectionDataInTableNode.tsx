import {ReactFlowNode} from "@/app/types/ReactFlowNode";
import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";

const updateSelectionDataInTableNode =
  (node: ReactFlowNode, adjacentNodes: Set<string>, selectedFieldKey: string): void => {
    node.data.dataRows.forEach((dataRow: TableNodeDataRow): void => {
      dataRow.selected = adjacentNodes.has(dataRow.key) ||
        selectedFieldKey === dataRow.key; // for data rows not having any connected edges
    });
  }

export default updateSelectionDataInTableNode;

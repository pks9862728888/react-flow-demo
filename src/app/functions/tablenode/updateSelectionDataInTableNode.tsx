import {ReactFlowNode} from "@/app/types/ReactFlowNode";
import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";

const updateSelectionDataInTableNode =
  (node: ReactFlowNode, adjacentNodes: Set<string>): void => {
    node.data.dataRows.forEach((dataRow: TableNodeDataRow): void => {
      dataRow.selected = adjacentNodes.has(dataRow.key);
    });
  }

export default updateSelectionDataInTableNode;

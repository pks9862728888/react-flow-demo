import {ReactFlowNode} from "@/app/types/ReactFlowNode";
import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";

const updateSelectionDataInTableNode = (node: ReactFlowNode, selNdDataId: string, selNdDataRowId: string): void => {
  node.data.dataRows.forEach((dataRow: TableNodeDataRow): void => {
    dataRow.selected = node.data.id === selNdDataId && dataRow.id === selNdDataRowId;
  });
}

export default updateSelectionDataInTableNode;

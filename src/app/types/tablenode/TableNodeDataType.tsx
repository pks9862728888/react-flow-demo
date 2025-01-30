import {TableNodeDataRowType} from "@/app/types/tablenode/TableNodeDataRowType";
import {SelectedNodeType} from "@/app/types/SelectedNodeType";

export type TableNodeDataType = {
  id: string,
  datasetName: string,
  headerColumns: string[],
  dataRows: TableNodeDataRowType[],
  triggerNodeSelection?: (selectedNode: SelectedNodeType) => void
}

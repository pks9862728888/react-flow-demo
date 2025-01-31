import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";
import {SelectedNodeType} from "@/app/types/SelectedNodeType";

export type TableNodeDataType = {
  id: string,
  datasetName: string,
  headerColumns: string[],
  dataRows: TableNodeDataRow[],
  triggerNodeSelection?: (selectedNode: SelectedNodeType) => void
}

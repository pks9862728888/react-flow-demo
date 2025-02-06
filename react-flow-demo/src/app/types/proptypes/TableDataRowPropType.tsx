import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";

export type TableDataRowPropType = {
  dataRow: any,
  triggerNodeSelection: (dataRowId: string) => void,
  calculateHeightFromTopForHandle: (dataRow: TableNodeDataRow) => number,
  dataId: string,
}
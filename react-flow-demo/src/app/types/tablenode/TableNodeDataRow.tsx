import {TableNodeDataRowTransformationType} from "@/app/types/tablenode/TableNodeDataRowTransformationType";

export type TableNodeDataRow = {
  id: string,
  key: string, // dataNodeId - dataRowId
  colSeq: number, // 0 indexed
  name: string,
  selected: boolean,
  transformations: TableNodeDataRowTransformationType[]
}

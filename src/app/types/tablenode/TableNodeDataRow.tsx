import {TableNodeDataRowTransformationType} from "@/app/types/tablenode/TableNodeDataRowTransformationType";

export type TableNodeDataRow = {
  id: string,
  colSeq: number,
  fieldName: string,
  selected: boolean,
  transformations: TableNodeDataRowTransformationType[]
}

import {TableNodeDataRowTransformationType} from "@/app/types/tablenode/TableNodeDataRowTransformationType";

export type TableNodeDataRowType = {
  id: string,
  colSeq: number,
  fieldName: string,
  selected: boolean,
  transformations: TableNodeDataRowTransformationType[]
}

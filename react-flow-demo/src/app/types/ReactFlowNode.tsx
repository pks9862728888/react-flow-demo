import {Node} from "@xyflow/react";
import {TableNodeDataType} from "@/app/types/tablenode/TableNodeDataType";

export interface ReactFlowNode extends Node {
  data: TableNodeDataType
}
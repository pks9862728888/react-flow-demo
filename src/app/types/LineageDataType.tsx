import {Edge} from "@xyflow/react";
import {ReactFlowNode} from "@/app/types/ReactFlowNode";

export type LineageDataType = {
  nodes: ReactFlowNode[],
  edges: Edge[]
}
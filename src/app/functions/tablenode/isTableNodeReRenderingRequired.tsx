import {ReactFlowNode} from "@/app/types/ReactFlowNode";

export function isTableNodeReRenderingRequired(
  node: ReactFlowNode, selNdDataId: string, selNdDataRowId: string) {
  return true;
}
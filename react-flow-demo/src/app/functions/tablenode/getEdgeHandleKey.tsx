import getEdgeHandleKeyPrefix from "@/app/functions/tablenode/getEdgeHandleKeyPrefix";

const getEdgeHandleKey = (dataNodeId: string, dataRowId: string, suffix: string): string => {
  return getEdgeHandleKeyPrefix(dataNodeId, dataRowId) + suffix;
}

export default getEdgeHandleKey;

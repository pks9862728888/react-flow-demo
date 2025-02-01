import {DASH} from "@/app/constants/appStringConstants";

const getEdgeHandleKeyPrefix = (dataNodeId: string, dataRowId: string): string => {
  return dataNodeId + DASH + dataRowId;
}

export default getEdgeHandleKeyPrefix;

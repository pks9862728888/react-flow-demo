import {Edge} from "@xyflow/react";
import lodash from "lodash";
import {DASH_SOURCE, DASH_TARGET} from "@/app/constants/appStringConstants";
import {putIfAbsentInMap} from "@/app/functions/utils/mapUtils";
import {logMapSetObject} from "@/app/functions/utils/logUtils";

// When you click a row you will get dataRowId and dataId (which is equal to nodeId)
// Then while you iterate through all node data row, check if dataId - dataRowId is adjacent
// If yes highlight it, else no

// From edge[] you will know which nodes are connected
// sourceHandle: "1-2-source",
// targetHandle: '2-2-target',
// format is dataId-dataRowId-source/target
// So remove suffix -source / -target
const buildTableNodeGraph = (edges: Edge[]): Map<string, Set<string>> => {
  const adjNodesMap: Map<string, Set<string>> = new Map<string, Set<string>>();
  edges.forEach((edge: Edge): void => {
    if (edge.sourceHandle && edge.targetHandle) {
      const sourceKey: string = extractKeyFromEdgeHandle(edge.sourceHandle);
      const targetKey: string = extractKeyFromEdgeHandle(edge.targetHandle);
      putIfAbsentInMap<string, Set<string>>(adjNodesMap, sourceKey, new Set<string>());
      putIfAbsentInMap<string, Set<string>>(adjNodesMap, targetKey, new Set<string>());
      adjNodesMap.get(sourceKey)?.add(targetKey);
      adjNodesMap.get(targetKey)?.add(sourceKey);
    }
  });
  logMapSetObject(adjNodesMap, "TableNode adjacencyList:");
  return adjNodesMap;
}

const extractKeyFromEdgeHandle = (edgeHandle: string): string => {
  edgeHandle = lodash.trimEnd(edgeHandle, DASH_SOURCE);
  return lodash.trimEnd(edgeHandle, DASH_TARGET);
}

export default buildTableNodeGraph;

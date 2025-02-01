import {logMapSetObject} from "@/app/functions/utils/logUtils";

const buildGraphLineageDataMap =
  (adjList: Map<string, Set<string>>): Map<string, Set<string>> => {
    const lineageDataMap: Map<string, Set<string>> = new Map<string, Set<string>>();
    // for each keys in adjList pre-compute lineage traversal data
    for (const key of adjList.keys()) {
      const lineageData: Set<string> = buildLineageData(adjList, key);
      lineageDataMap.set(key, lineageData);
    }
    logMapSetObject(lineageDataMap, "LineageData map:");
    return lineageDataMap;
  }

const buildLineageData =
  (adjList: Map<string, Set<string>>, key: string): Set<string> => {
    // Create variable to store lineage data
    const lineageData: Set<string> = new Set<string>();
    lineageData.add(key);
    // Create visited array to prevent infinite loop
    const visited = new Set<string>();
    // Modified BFS traversal (to get around O(n) time complexity of queue.shift())
    const queue: string[] = [key];
    while (queue.length > 0) {
      let currKey: string = queue.pop() as string;
      if (!visited.has(currKey)) {
        visited.add(currKey);
        // Find the related adjacent nodes of currentKey,
        // this will be transitively related to key passed to this method so add it to lineageData
        const adjNodeKeys: Set<string> = adjList.get(currKey) ?? new Set<string>();
        adjNodeKeys.forEach((adjNodeKey: string): void => {
          if (!visited.has(adjNodeKey)) {
            queue.push(adjNodeKey);
            lineageData.add(adjNodeKey);
          }
        });
      }
    }
    return lineageData;
  }

export default buildGraphLineageDataMap;

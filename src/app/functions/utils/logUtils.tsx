const logMapSetObject =
  (adjNodesMap: Map<string, Set<string>>, logPrefix: string): void => {
    // Convert the Map to an Object with Arrays instead of Sets
    const adjNodesMapObject = Object.fromEntries(
      Array.from(adjNodesMap.entries())
        .map(([key, value]: [string, Set<string>]): [string, string[]] => [key, Array.from(value)])
    );
    console.log(logPrefix + " " + JSON.stringify(adjNodesMapObject));
  }

export {logMapSetObject};

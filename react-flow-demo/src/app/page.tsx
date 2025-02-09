"use client";
import React, {useEffect, useState} from "react";
import DataLineageProviderFlow from "@/app/components/DataLineageProviderFlow/DataLineageProviderFlow";
import {LineageDataType} from "@/app/types/LineageDataType";
import {ReactFlowNode} from "@/app/types/ReactFlowNode";

export default function Home(): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [lineageData, setLineageData] = useState<LineageDataType>({nodes: [], edges: []});
  // Fetch nodes and edges
  useEffect((): void => {
    const fetchData: () => Promise<void> = async () => {
      try {
        const response: Response = await fetch(`http://localhost:8080/api/v1/lineage-data/latest`);
        let xPos: number = 100;
        let yPos: number = 100;
        let nodeSeq: number = 1;
        if (response && response.ok) {
          const jsonDataResponse: LineageDataType = await response.json();
          const nodesFromResponse: ReactFlowNode[] = jsonDataResponse.nodes.map((node: any) => {
            const data = {
              ...node, "position": {
                "x": nodeSeq === 1 ? xPos : xPos + 350,
                "y": yPos
              }
            };
            nodeSeq++;
            xPos = data.position.x;
            return data;
          });
          setLineageData({
            nodes: nodesFromResponse,
            edges: jsonDataResponse.edges
          });
        }
      } catch (error) {
        console.log("Error loading data: {}", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Bootstrap rendering of app
  return (
    <div style={{width: '100vw', height: '90vh'}}>
      {loading && <div>Loading...</div>}
      {!loading && <DataLineageProviderFlow lineageData={lineageData}/>}
    </div>
  );
}

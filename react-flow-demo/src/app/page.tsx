"use client";
import React from "react";
import DataLineageProviderFlow from "@/app/components/DataLineageProviderFlow/DataLineageProviderFlow";

export default function Home(): React.JSX.Element {
  // Bootstrap rendering of app
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <DataLineageProviderFlow/>
    </div>
  );
}

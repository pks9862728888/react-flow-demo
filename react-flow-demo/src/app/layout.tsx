"use client";
import "./globals.css";
import React from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DataLineage from "@/app/components/DataLineage/DataLineage";
import TradeObservability from "@/app/components/TradeObservability/TradeObservability";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path={"/data-lineage"} Component={DataLineage}/>
        <Route path={"/trade-observability"} Component={TradeObservability}/>
      </Routes>
    </BrowserRouter>
    </body>
    </html>
  );
}

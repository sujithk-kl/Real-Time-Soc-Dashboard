import React from "react";
import LiveLogTable from "./components/LiveLogTable";
import ThreatMap from "./components/ThreatMap";
import LogChart from "./components/LogChart";

function App() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">live log feed</h1>
      <LiveLogTable />
      
      <h1 className="text-xl font-semibold">Threat Map</h1>
      <ThreatMap />

      <h1 className="text-xl font-semibold">Log Volume Over Time</h1>
      <LogChart />
    </div>
  );
}

export default App;
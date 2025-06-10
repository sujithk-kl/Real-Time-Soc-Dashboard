import React from 'react';
import LiveLogTable from '../components/LiveLogTable';

// other imports like ThreatMap, LogVolumeChart...

const Dashboard = () => {
  return (
    <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-2">
      <div className="col-span-1">
        <LiveLogTable />
      </div>

      {/* Keep your other components like ThreatMap, LogVolumeChart */}
      {/* <ThreatMap /> */}
      {/* <LogVolumeChart /> */}
    </div>
  );
};

export default Dashboard;

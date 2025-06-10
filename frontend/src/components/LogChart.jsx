import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import axios from "axios";

const LogChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/logs")
      .then((response) => {
        console.log("Fetched chart data:", response.data);
        setChartData(response.data);
      })
      .catch((error) => {
        console.error("Failed to load chart data:", error);
      });
  }, []);

  return (
    <div className="w-full h-[300px] bg-gray-900 rounded-xl shadow-md p-4">
      <h2 className="text-white text-lg font-bold mb-4">Log Volume Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#00f2ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogChart;

import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";

export default function ReChartsBar(props) {
    const {inputdata }=props;
  return (
    // <ResponsiveContainer width="100%" height={300} minHeight={300} aspect={1.8}  margin ={{ top:80}}>
    <BarChart
      width={410}
      height={300}
      data={inputdata}
      fontFamily="sans-serif"
      margin={{
        top: 50,
        right: 30,
        left: 10,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Blood" fill="#61A1EC" />
      <Bar dataKey="Tumor" fill="#74F2AE" />
    </BarChart>
    // </ResponsiveContainer>
  );
}

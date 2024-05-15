import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend, } from "recharts";

export default function ReChartsBar(props) {
    const {inputdata }=props;
  return (
    <BarChart
      width={410}
      height={250}
      data={inputdata}
      fontFamily="sans-serif"
      margin={{
        top: 25,
        right: 30,
        left: 20,
        bottom: 5,
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
  );
}

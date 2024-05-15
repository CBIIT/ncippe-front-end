import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip } from "recharts";

export default function ReChartsBar(props) {
    const {inputdata }=props;
  return (
    <BarChart
      width={410}
      height={250}
      data={inputdata}
      fontFamily="sans-serif"
      isAnimationActive={false} 
      margin={{
        top: 25,
        right: 60,
        left: 40,
        bottom: 25,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" isAnimationActive={false}  />

    </BarChart>
  );
}

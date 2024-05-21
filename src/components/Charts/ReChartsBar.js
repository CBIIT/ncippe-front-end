import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip, ResponsiveContainer } from "recharts";

export default function ReChartsBar(props) {
    const {inputdata }=props;
  return (
   // <ResponsiveContainer width="100%" height={300} minHeight={300} aspect={1.8} >
    <BarChart
      width={400} 
      height={300} 
      data={inputdata}
      fontFamily="sans-serif"
      isAnimationActive={false} 
      margin={{
        top:55,
        right: 30,
        left: 20,
        bottom: 25,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" isAnimationActive={false}  />

    </BarChart>
    // </ResponsiveContainer>
  );
}

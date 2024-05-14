import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend, LabelList, Label, } from "recharts";
const CustomizedLabel = () =>{
    
      const {x, y, fill, value} = this.props;
         return <text 
                 x={x} 
                 y={y} 
                 dy={-4} 
                 fontSize='16' 
                 fontFamily='sans-serif'
                 fill={fill}
                 textAnchor="middle">{value}</text>
  };

export default function ReChartsBar(props) {
    const {inputdata,  title, assignedcy }=props;
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
      <Bar dataKey="value" isAnimationActive={false}    label />

    </BarChart>
  );
}

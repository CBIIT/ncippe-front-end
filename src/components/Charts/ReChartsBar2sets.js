import "./barChartStyles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Text, ResponsiveContainer } from "recharts";
const renderCustomBarLabel = (props) => {
  const { payload, x, y, width, height, value, fill } = props;
  return <text x={x + width / 2} y={y} 
  fontSize={12} fontFamily="Open Sans" fontWeight={600} 
  fill={fill} textAnchor="middle" dy={-6} wrapperStyle={{ position: 'relative' }} > {value}
  </text>;
};
export default function ReChartsBar2sets(props) {
    const {inputdata }=props;
  return (
    // <ResponsiveContainer width="100%" height={300} minHeight={300} aspect={1.8}  margin ={{ top:80}}>
    <BarChart
      width={410}
      height={300}
      data={inputdata}
      isAnimationActive={false}
      overflow="visible"
      fontFamily="sans-serif"
      margin={{
        top: 50,
        right: 5,
        left: 0,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={0} label={<Text width={60} />}/>
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" isAnimationActive={false}  label={renderCustomBarLabel} />
    </BarChart>
    // </ResponsiveContainer>
  );
}

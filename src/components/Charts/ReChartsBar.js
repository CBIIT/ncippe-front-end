import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";

const renderCustomBarLabel = (props) => {
  const { payload, x, y, width, height, value, fill } = props;
  return <text x={x + width / 2} y={y} 
  fontSize={12} fontFamily="Open Sans" fontWeight={600}
  fill={fill} textAnchor="middle" dy={-6}> {value}
  </text>;
};


export default function ReChartsBar(props) {
  const {inputdata  }=props; 
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
        right: 60,
        left: 0,
        bottom: 25,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip cursor={{fill: '#EEEEEE'}}/>
      <Bar dataKey="value" isAnimationActive={false}  label={renderCustomBarLabel} />
    </BarChart>
    // </ResponsiveContainer>
  );
}

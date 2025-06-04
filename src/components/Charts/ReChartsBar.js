import "./styles.css";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Text, LabelList} from "recharts";

const renderCustomBarLabel = (props) => {
  //console.dir(props);
  const { payload, x, y, width, height, value, fill } = props;
  return <text x={x + width / 2} y={y} 
  fontSize={12} fontFamily="Open Sans" fontWeight={600}
  fill={fill} textAnchor="middle" dy={-6} > {`${value}%`}
  </text>;
};


export default function ReChartsBar(props) {
  const {inputdata  }=props; 
  const total = inputdata.reduce((acc, item) => acc + item.value, 0);
  const dataWithPercent = inputdata.map((item) => ({
    ...item,
    percent: total > 0?  ((item.value / total) * 100).toFixed(1) : 0,
  }));
  return (
    // <ResponsiveContainer width="100%" height={300} minHeight={300} aspect={1.8} >
    // </ResponsiveContainer>
    <BarChart
      width={400} 
      height={300} 
      data={dataWithPercent}
      isAnimationActive={false} 
      margin={{
        top:55,
        right: 30,
        left: 0,
        bottom: 25,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={0} label={<Text width={60} />}/>
      <YAxis />
      <Tooltip cursor={{fill: '#EEEEEE'}}/>
      <Bar dataKey="value" isAnimationActive={false}  >
      <LabelList dataKey ="percent" content={ renderCustomBarLabel } />
      </Bar>
    </BarChart>
  );
}

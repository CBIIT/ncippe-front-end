
import "./styles.css";
import React, { useCallback, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Tooltip,Legend } from "recharts";
const colors = ["#246AD4", "#61A1EC", "#A5D3FE", "#FFCF54", "#F294B0", "#74F2AE", "#987DC4", "#70ad48", "#109618"];

  const renderCustomizedLabel=(props) =>
    {
    // assumption the pie data is sorted from large to small
    // clockwise 
    // small slice would be in the corner north-west
    // include slice index

    const {cx, cy, midAngle, innerRadius, outerRadius, title,
      fill,percent, name, value, color, startAngle, endAngle,index, totoalSlice}=props;
    const RADIAN = Math.PI / 180;
    let cancerTypeB = false;
    if( name.includes("Cancer") || name.includes("Leukemia")){
      cancerTypeB = true;
    }
   // console.log(" name "+ name + " "+ cancerTypeB)
   // console.log("mid-angle for "+ index);
    // console.log(midAngle);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + outerRadius * cos;
    const sy = cy + outerRadius * sin;
    const mx = cx + (outerRadius + 3* index) * cos;
    const my = cy + (outerRadius + 3* index) * sin;
  
    const isLeftSide = !(midAngle < 90 && midAngle > -90); // Change 10 to half of the number of items per side
    const isTopSide = !(midAngle < 0 && midAngle > -210); // Change 10 to half of the number of items per side
    const ySpacing = 20; // Adjust the vertical spacing between lines
    const xSpacing = 10; // Adjust the horizontal spacing between left and right sides
    const topSpacing = cy - outerRadius ;
    const ey = isLeftSide ? 
       (cancerTypeB ? cy - (0 + index-2) * ySpacing :  cy - (0 + index) * ySpacing )
        : +my -  ySpacing*0.5;
   // console.log(" ey :" + ey + " leftside "+ isLeftSide);
   // console.log(" mx :" + mx + " my "+ my + " topside "+ isTopSide);
    const textAnchor = isLeftSide ? "start" : "end";
    const xPosition = cx + (isLeftSide ? -1 : 1) * outerRadius;
    let keyName = name.split(" ");
    const diffAngle = endAngle - startAngle;
    //console.log(" diff angle "+ diffAngle);
   
    return (
   <>{ (Math.abs(diffAngle) > 4 && !(isTopSide && isLeftSide))?
      <g>
      <text className="recharts-pie-label-text"
        x={isLeftSide ? sx -30: sx + 30 }
        y={isTopSide ? sy - 5 : sy + 10}
        fontSize={12}
        fontFamily={"Open Sans"}
        textAnchor={textAnchor}
        fill={"#666666"}
      >
        {`${(percent > 0.01)?(percent * 100).toFixed(0):(percent * 100).toFixed(2)}%`}
      </text>
    </g>
    :
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${xPosition + (isLeftSide ? -1 : 1)* xSpacing},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={xPosition + (isLeftSide ? -1 : 1)* xSpacing} cy={ey} r={2} fill={fill} stroke="none" />
      <text className="recharts-pie-label-text"
        x={textAnchor === "start" ? xPosition + (isLeftSide ? -1 : 1)* xSpacing -10: xPosition + 50 }
        y={ey + 5}
        fontSize={12}
        fontFamily={"Open Sans"}
        textAnchor={"end"}
        fill={"#666666"}
      >
        {`${(percent > 0.01)?(percent * 100).toFixed(0):(percent * 100).toFixed(2)}%`}
      </text>
    </g>
    }</>
    );
  };

export default function ReChartsPie3More(props) {
//    console.log(props);
const {inputdata,  assignedcx, assignedcy, title }=props;
//    const {...inputdata}=props;
//    console.log(inputdata);
//console.log("title "+ title)
  return (
    // <ResponsiveContainer width="100%" height="100%" aspect={500 / 400}>
    <PieChart  width={410} height={250} title={title}>
      <Pie 
        data={inputdata}
        cx={120}
        cy={150}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        label={renderCustomizedLabel}
        labelLine={false}
        title={title}
      
      >
        </Pie>
        <Legend layout="vertical" width={160} height={200} verticalAlign="top" align="right" textAnchor="end"  />
      <Tooltip />
        </PieChart>
      //  </ ResponsiveContainer>
  );
}

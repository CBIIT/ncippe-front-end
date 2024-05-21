import "./styles.css";
import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import data from "../../data";

const renderCustomizedLabel = (props) => {
  // assumption the pie data is sorted from small to large
  // ant-clockwise starting 90 to 450
  // small slice would be in the corner north-west
  // include slice index

  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    percent,
    name,
    value,
    startAngle,
    endAngle,
    index,
    arrayLength,
  } = props;
  const RADIAN = Math.PI / 180;
  const stepsToEnd = Number(arrayLength ?? 10) - index;
  //console.log(" data index " + index  + " middleAngle "+ midAngle );
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 20 - 3 * stepsToEnd) * cos;
  const my = cy + (outerRadius + 20 - 3 * stepsToEnd) * sin;

  const isLeftSide = !(midAngle < 90 && midAngle > -90); // Change 10 to half of the number of items per side
  const isTopSide = !(midAngle < 0 && midAngle > -210); // Change 10 to half of the number of items per side
  const ySpacing = 15; // Adjust the vertical spacing between lines
  const xSpacing = 10; // Adjust the horizontal spacing between left and right sides
  // console.log( " left " + isLeftSide  + "  top " + isTopSide + " value " + value);
  const ey = isLeftSide ? 5 + stepsToEnd * ySpacing : +my - ySpacing * 0.5;
  //console.log( " ey " + ey);
  const textAnchor = isLeftSide ? "start" : "end";
  const xPosition = cx + (isLeftSide ? -1 : 1) * outerRadius;
  //let keyName = name.split(" ");
  const diffAngle = endAngle - startAngle;

  return (
    <>
      {Math.abs(diffAngle) > 4 && !(isTopSide && isLeftSide) ? (
        <g>
          <text
            className="recharts-pie-label-text"
            x={isLeftSide ? sx - 30 : sx + 30}
            y={isTopSide ? sy - 5 : sy + 10}
            fontSize={12}
            fontFamily={"Open Sans"}
            textAnchor={textAnchor}
            fill={"#666666"}
          >
            {`${
              percent > 0.01
                ? (percent * 100).toFixed(0)
                : (percent * 100).toFixed(2)
            }%`}
          </text>
        </g>
      ) : (
        <g>
          <path
            d={`M${sx},${sy}L${mx},${my}L${
              xPosition + (isLeftSide ? -1 : 1) * xSpacing
            },${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle
            cx={xPosition + (isLeftSide ? -1 : 1) * xSpacing}
            cy={ey}
            r={2}
            fill={fill}
            stroke="none"
          />
          <text
            className="recharts-pie-label-text"
            x={
              textAnchor === "start"
                ? xPosition + (isLeftSide ? -1 : 1) * xSpacing - 10
                : xPosition + 50
            }
            y={ey + 5}
            fontSize={12}
            fontFamily={"Open Sans"}
            textAnchor={"end"}
            fill={"#666666"}
          >
            {`${
              percent > 0.01
                ? (percent * 100).toFixed(0)
                : (percent * 100).toFixed(2)
            }%`}
          </text>
        </g>
      )}
    </>
  );
};

export default function ReChartsPie3More(props) {
  const { inputdata } = props;

  const arrayLength = inputdata.length;
  inputdata.map((item) => {
    item.arrayLength = arrayLength;
    return item;
  });

  return (
    // <ResponsiveContainer width="100%" height={300} >
    <PieChart width={410} height={300}>
      <Pie
        isAnimationActive={false}
        data={inputdata}
        cx={120}
        cy={120}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        label={renderCustomizedLabel}
        labelLine={false}
      ></Pie>
      <Legend
        layout="vertical"
        width={160}
        height={200}
        verticalAlign="top"
        align="right"
        textAnchor="end"
      />
      <Tooltip />
    </PieChart>
    //  </ ResponsiveContainer>
  );
}

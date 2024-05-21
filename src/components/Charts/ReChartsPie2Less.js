import "./styles.css";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts";

const renderCustomizedLabel = (props) => {
  // assumption the pie data is sorted from large to small
  // clockwise
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
  // console.log("mid-angle for "+ index);
  // console.log(midAngle);
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 3 * index + 2) * cos;
  const my = cy + (outerRadius + 3 * index + 2) * sin;

  const isLeftSide = !(midAngle < 90 && midAngle > -90); // Change 10 to half of the number of items per side
  const isTopSide = !(midAngle < 0 && midAngle > -210); // Change 10 to half of the number of items per side
  const ySpacing = 15; // Adjust the vertical spacing between lines
  const xSpacing = 10; // Adjust the horizontal spacing between left and right sides

  const ey = isLeftSide ? cy - (index + 2) * ySpacing : +my - ySpacing * 0.5;

  const textAnchor = isLeftSide ? "start" : "end";
  const xPosition = cx + (isLeftSide ? -1 : 1) * outerRadius;
  //let keyName = name.split(" ");
  const diffAngle = endAngle - startAngle;

  return (
    <>
      {(Math.abs(diffAngle) > 15 && !(isTopSide && isLeftSide)) ||
      arrayLength < 3 ? (
        <g>
          <text
            className="recharts-pie-label-text"
            x={isLeftSide ? sx - 30 : sx + 30}
            y={isTopSide ? sy - 5 : sy + 10}
            fontSize={12}
            fontFamily="Open Sans"
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
            fontFamily="Open Sans"
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

export default function ReChartsPie2Less(props) {
  // console.log(sampleData);

  const { inputdata } = props;
  const arrayLength = inputdata.length;
  inputdata.map((item) => {
     item.arrayLength = arrayLength;
     return item;
   });
  return (
    <PieChart width={410} height={300} >
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
        align="right"
        verticalAlign="top"
        textAnchor="end"
      />
      <Tooltip />
    </PieChart>
  );
}

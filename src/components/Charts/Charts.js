import React, {useRef, useEffect} from "react";

import PieChart from "./PieChart";
import TextChart from "./TextChart";
import BarChart from "./BarChart";

const Charts = (props) => {
    if (props === undefined) {
        return;
    }

    // When a barchart bar is clicked
    function onSelectedBarData(data) {
        console.log('onSelectedBarData data: ', data);
    }

    const {
        chartId,
        chartSize,
        isMobile,
        chartSubtitle,
        chartTitle,
        svgId
    } = props;
    const t = props.translator;

// Barchart
    const config4 = {
        width: 800,
        height: 550,
        titleFontSize: 20,
        titleTopMargin: 15, // Can be negative
        titleX: 50,
        legendX: 150,
        legendFontSize: 16,
        legendTextColor: '#1f7a00',
        textOnChartColor: '#000000',
        textOnChartSize: 12,
        margin: {
            top: 45,
            right: 20,
            bottom: 30,
            left: 55,
        },
    };

    if (props.chartType === 0) {
        return (
            <div>
                <TextChart
                    chartSize={chartSize}
                    svgId={svgId}
                    isMobile={isMobile}
                    chartTitle={chartTitle}
                    chartSubtitle={chartSubtitle}
                ></TextChart>
            </div>
        );
    } else if (props.chartType === 1) {
        return (
            <div>
                <PieChart
                    chartSize={chartSize}
                    svgId={svgId}
                    isMobile={isMobile}
                    chartTitle={chartTitle}
                    chartSubtitle={chartSubtitle}
                ></PieChart>
            </div>
        );
    } else if (props.chartType === 2) {
        return (
            <div>

                <BarChart
                    onSelectedBarData={onSelectedBarData}
                    chartSize={chartSize}
                    chartTitle={chartTitle}
                    chartSubtitle={chartSubtitle}
                    svgId={svgId}
                    isMobile={isMobile}
                />
            </div>
        );
    }

}


export default Charts;

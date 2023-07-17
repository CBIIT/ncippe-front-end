import React, {useRef, useEffect} from "react";
import * as d3 from "d3";
import {useTranslation} from "react-i18next";
import getAPI from "../../data";

const BarChart = (props) => {

    // Barchart
    const config = {
        width: 600,
        height: 350,
        titleFontSize: 20,
        titleTopMargin: 36,
        titleX: 250,

        textOnChartColor: '#000000',
        textOnChartSize: 12,
        margin: {
            top: 52,
            right: 20,
            bottom: 30,
            left: 45,
        },
    };

    const {
        onSelectedBarData,
        chartTitle,
        chartSubtitle,
        svgId,
        isMobile
    } = props;


    useEffect(() => {
        drawBarChart00(config);
    });

    const {t} = useTranslation('about');

    // @FIXME dup code
    function translateLabels(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    translateLabels(obj[key]); // recursive
                } else {
                    obj[key] = t(obj[key]);  // Translate here
                }
            }
        }
    }

    function maxValue(array) {
        let m = -1;
        for (const element of array) {
            if (m < +element['value']) {
                m = +element['value'];
            }
        }
        return m;
    }

    function drawBarChart00(config) {

        let data = '{}';
        getAPI.then(api => {
            api.getChartData3().then(resp => {
                if (resp instanceof Error) {
                    console.error('Error getting chart data: ', resp);
                }
                if (svgId === 3) {
                    data = resp['participantDemographicsAge'];

                } else if (svgId === 4) {
                    data = resp['participantDemographicsSex'];
                }

                translateLabels(data);
                let max = maxValue(data);

                let margin = {
                    top: config.margin.top,
                    right: config.margin.right,
                    bottom: config.margin.bottom,
                    left: config.margin.left
                };
                let width = config.width - margin.left - margin.right;
                let height = config.height - margin.top - margin.bottom;
                let barWidth = (width / data.length) - 20;
                let onBarClick = (d, i) => {
                    onSelectedBarData({'id': props.svgId, 'label': i['label'], 'value': i['value'], 'svgId': svgId});
                }

                // Set the color pallet
                const colorScale1 = d3.scaleOrdinal()
                    .domain(data)
                    .range(d3.schemeCategory10);

                // Remove the old svg
                d3.select('#bar-container' + svgId)
                    .select('svg')
                    .remove();

                const svg = d3.select('#bar-container' + svgId)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                // set up the x-axis
                const x = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.0);

                x.domain(data.map(d => d.label));

                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(x))
                ;

                // set up the y-axis
                const y = d3.scaleLinear().rangeRound([height, 0]);
                y.domain([0, max]);

                let yAxis = d3.axisLeft(y);
                yAxis.tickSize(10); // Set the length of the tick marks to 10 pixels

                const yScale = d3.scaleLinear()
                    .domain([0, max])
                    .range([height, 0]);


                const horizontalLines = svg.append("g")
                    .attr("class", "horizontal-lines");

                horizontalLines.selectAll("line")
                    .data(yAxis.scale().ticks())
                    .enter()
                    .append("line")
                    .attr("x1", 0)
                    .attr("y1", (d) => yScale(d))
                    .attr("x2", width)
                    .attr("y2", (d) => yScale(d))
                    .attr("stroke", "lightgrey")
                ;


                svg
                    .append("g")
                    .call(yAxis);

                // create the bars
                svg
                    .append("g")
                    .selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", d => x(d.label))
                    .attr("y", d => y(d.value))
                    // .style('fill', '#4472c4')
                    .style('fill', (_, i) => colorScale1(i))
                    .attr("width", barWidth)
                    .attr("height", d => height - y(d.value))
                    .on('click', function (d, i) {
                        onBarClick(d, i)
                    });


                svg
                    .selectAll()
                    .data(data)
                    .enter()
                    .append('text')
                    .attr("class", "bar")
                    .attr("x", d => x(d.label) + (barWidth * 0.45))
                    .attr("y", d => y(+d.value + 1.0))
                    .style('fill', '#000000')
                    .style("font-size", config.textOnChartSize + "px")
                    .text((d) => {
                        // return d.label;
                        return d.value + '%';
                    });


                // /////////////////////////////////////////////////////
                // /////////////////////////////////////////////////////

                //  title
                svg.append("text")
                    .attr("text-anchor", "middle")
                    .style("font-size", config.titleFontSize + "px")
                    .style('fill', '#123e57')

                    .text(chartTitle)
                    .attr('transform', (d, i) => {
                        return `translate(${config.titleX}, ${0 - config.titleTopMargin})`;
                    });
                // /////////////////////////////////////////////////////
                // /////////////////////////////////////////////////////


                //  subtitle
                svg.append("text")
                    .attr("text-anchor", "middle")
                    .style("font-size", (config.titleFontSize * 0.75) + "px") // @TODO 0.75 is just a test
                    .style('fill', '#123e57')

                    .text(chartSubtitle)
                    .attr('transform', (d, i) => {
                        return `translate(${config.titleX}, ${20 - config.titleTopMargin})`;
                    });
                // /////////////////////////////////////////////////////
                // /////////////////////////////////////////////////////
            })
        })
    }

    return (
        <div>
            <div className={'div-chart'} id={'bar-container' + svgId.toString()}/>
        </div>
    );
}

export default BarChart;

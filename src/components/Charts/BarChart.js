import React, {useRef, useEffect} from "react";
import * as d3 from "d3";
import {useTranslation} from "react-i18next";
import getAPI from "../../data";

const BarChart = (props) => {
    console.log('MHL BarChart props: ', props);

    const {
        onSelectedBarData,
        data,
        config,
        chartTitle,
        chartSubtitle,
        svgId,
        isMobile
    } = props;


    console.log('MHL BarChart chartTitle: ', chartTitle);


    useEffect(() => {
        drawBarChart00(config);
    });


    // @FIXME dup code
    function translateLabels(obj) {
        const {t} = useTranslation('about');
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    translateLabels(obj[key]); // recursive
                } else {
                    obj[key] = t(obj[key]);
                }
            }
        }
    }

    function drawBarChart00(config) {

        let data = '{}';
        getAPI.then(api => {

            console.log('MHL 414a handleClick2');
            api.getChartData3().then(resp => {
                console.log('MHL 414b handleClick3');
                if (resp instanceof Error) {
                    console.error('MHL 415c handleClick3 error: ', resp);
                }
                if (svgId === 3) {
                    data = resp['patientDemographicsByCancerType'];
                } else if (svgId === 4) {
                    data = resp['patientDemographicsRace'];
                }

                translateLabels(data);


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
                    console.log('MHL onBarClick d: ', d);
                    console.log('MHL onBarClick i: ', i);
                    onSelectedBarData({'id': props.svgId, 'label': i['label'], 'value': i['value'], 'svgId': svgId});
                }

                // Set the color pallet
                const colorScale1 = d3.scaleOrdinal()
                    .domain(data)
                    .range(d3.schemeDark2);

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
                    .call(d3.axisBottom(x));

                // set up the y-axis
                const y = d3.scaleLinear().rangeRound([height, 0]);
                // @TESTING
                y.domain([0, d3.max(data, d => d.value)]);
                // y.domain([0, 100]);

//        y.ti .tickSize(10); // Set the length of the tick marks to 10 pixels
                let yAxis = d3.axisLeft(y)
                yAxis.tickSize(10)
                // yAxis.tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

                const yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value)])
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
                    .attr("stroke", "gray")
                // .attr("stroke-dasharray", "2")
                ;


                svg
                    .append("g")

                    .attr('fake', d => {
                        // console.log('MHL y: ', y(d.value))
                        console.log('MHL d: ', y)
                    })

                    .call(yAxis);


                // create the bars
                svg
                    .append("g")
                    .selectAll(".bar")
                    .data(data)
                    .enter()




                    // ////
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", d => x(d.label))
                    .attr("y", d => y(d.value))
                    // .style('fill', '#4472c4')
                    .style('fill', (_, i) => colorScale1(i))
                    .attr("width", barWidth)
                    .attr("height", d => height - y(d.value))
                    .on('click', function (d, i) {
                        console.log('MHL i010xx: ', i);
                        onBarClick(d, i)
                    });


                svg
                    .selectAll()
                    .data(data)
                    .enter()
                    .append('text')
                    .attr("class", "bar")
                    .attr("x", d => x(d.label) + config.textOnChartXOffset)
                    .attr("y", d => y(d.value + .4))
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


    console.log('MHL NOG: ', 'bar-container' + svgId.toString());
    return (
        <div>
            <h2>MHL svgId: {svgId}</h2>
            <div className={'div-chart'} id={'bar-container' + svgId.toString()}/>
        </div>
    );


}


export default BarChart;

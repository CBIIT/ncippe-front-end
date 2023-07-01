import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';
import {useTranslation} from "react-i18next";
import getAPI from "../../data";

const PieChart = (props) => {
    let data = props.data;
    console.log('MHL PieChart data:', data);
    console.log('MHL PieChart props:', props);
    const {t, i18n} = useTranslation('about')
    let svgId = props.svgId;
    let isMobile = props.isMobile

    // const {t} = useTranslation('about');


    // var title,     setter setTitle    default  props.title
    const [testText, setTestText] = useState("MHL Test Title");
    const titleText = props.chartTitle;
    const chartSubtitle = props.chartSubtitle;
    let configArray = [];

    /*
    * @TODO
    *    can/should we use theme.spacing() for some of these margins etc?
    *    https://cbiit.github.io/ncippe-front-end/?path=/docs/architecture-styling--page
    */
    configArray[0] = {
        width: 800,
        height: 300,

        subtitleX: 90,
        titleX: 50,
        titleFontSize: 13,
        titleTopMargin: 86, // Height above center
        titleSizeFactor: 7,  // Override  use 0 for default  @CHECKME is this used?

        outerRadius: 65,
        innerRadius: 0,  // Keep zero or there will be a hole in the middle of the pie

        legendX: -24,  // Legend pixels right of center
        legendY: 146,
        legendFontSize: 11,
        legendTextColor: '#000000',
        legendTextVerticalSpacing: 4,

        textOnChartColor: '#000000',
        textOnChartSize: 11,


        valueDisplayOffset: 1.4, // distance from center
        smallValueDisplayOffset: 2.1,
        sliceMotionDuration: 270,
        outsideThePieMin: 4,
        outsideThePiePercentSignMin: 4,
        margin: {
            top: 40,  // Pie chart top from parent top
            right: 10,
            bottom: 80,  // @CHECKME this is not used - do we need it
            left: 10,
        },
    };

    configArray[1] = {
        width: 950,
        height: 245,
        subtitleX: 90,
        titleX: 40,
        titleFontSize: 16,
        titleTopMargin: 105, // Height above center
        outerRadius: 75,
        innerRadius: 0,  // Keep zero or there will be a hole in the middle of the pie

        legendX: 120,  // Legend pixels right of center
        legendY: 8,
        legendFontSize: 12,
        legendTextColor: '#000000',
        legendTextVerticalSpacing: 8,

        textOnChartColor: '#000000',
        textOnChartSize: 12,
        titleSizeFactor: 7,  // Override  use 0 for default
        valueDisplayOffset: 1.4, // distance from center
        smallValueDisplayOffset: 2.05,
        sliceMotionDuration: 270,
        outsideThePieMin: 4,
        outsideThePiePercentSignMin: 2,
        margin: {
            top: 50,  // Pie chart top from parent top
            right: 10,
            bottom: 110,  // @CHECKME this is not used - do we need it
            left: 10,
        },
    };
    configArray[2] = {
        width: 1100,
        height: 255,
        titleFontSize: 18,
        subtitleX: 130,
        titleX: 0,
        titleTopMargin: 130, // Height above center
        outerRadius: 100,
        innerRadius: 0,  // Keep zero or there will be a hole in the middle of the pie

        legendX: 138,  // Legend pixels right of center
        legendY: 20,
        legendFontSize: 13,
        legendTextColor: '#000000',
        legendTextVerticalSpacing: 9,

        textOnChartColor: '#000000',
        textOnChartSize: 12,
        titleSizeFactor: 7,  // Override  use 0 for default
        valueDisplayOffset: 1.4, // distance from center
        smallValueDisplayOffset: 2.05,
        sliceMotionDuration: 270,
        outsideThePieMin: 3,
        outsideThePiePercentSignMin: 2,
        margin: {
            top: 50,  // Pie chart top from parent top
            right: 10,
            bottom: 110,  // @CHECKME this is not used - do we need it
            left: 10,
        },
    };

    configArray[3] = {
        width: 1100,
        height: 370,
        titleFontSize: 26,
        subtitleX: 90,
        titleX: 150, // How far left of center
        titleTopMargin: 180, // Height above center
        outerRadius: 140,
        innerRadius: 0,
        legendX: 220,
        legendY: 0,
        legendFontSize: 16,
        legendTextColor: '#000000',
        legendTextVerticalSpacing: 14,
        textOnChartColor: '#000000',
        textOnChartSize: 14,
        titleSizeFactor: 7,  // Override  use 0 for default
        valueDisplayOffset: 1.5,
        smallValueDisplayOffset: 2.05,
        sliceMotionDuration: 270,
        outsideThePieMin: 1,
        outsideThePiePercentSignMin: 0,
        margin: {
            top: 60,  // Pie chart top from parent top
            right: 10,
            bottom: 110,  // @CHECKME this is not used - do we need it
            left: 10,
        },
    };

    configArray[4] = {
        width: 1100,
        height: 550,
        titleFontSize: 28,
        subtitleX: 90,
        titleX: 100,
        titleTopMargin: 210, // Can be negative
        outerRadius: 175,
        innerRadius: 0,

        legendX: 250,
        legendY: 0,
        legendFontSize: 18,
        legendTextColor: '#000000',
        legendTextVerticalSpacing: 12,


        textOnChartColor: '#000000',
        textOnChartSize: 16,
        titleSizeFactor: 7,  // Override  use 0 for default
        valueDisplayOffset: 1.6,
        smallValueDisplayOffset: 2.05,
        sliceMotionDuration: 270,
        outsideThePieMin: 1,
        outsideThePiePercentSignMin: 1,
        margin: {
            top: 90,  // Pie chart top from parent top
            right: 10,
            bottom: 110,  // @CHECKME this is not used - do we need it
            left: 10,
        },
    };


    configArray[5] = {
        width: 1100,
        height: 550,
        titleFontSize: 40,
        subtitleX: 90,
        titleX: 100,
        titleTopMargin: 250, // Can be negative
        outerRadius: 200,
        innerRadius: 0,
        legendX: 250,
        legendY: 0,
        legendFontSize: 20,
        legendTextColor: '#000000',
        legendTextVerticalSpacing: 18,
        textOnChartColor: '#000000',
        textOnChartSize: 16,
        titleSizeFactor: 7,  // Override  use 0 for default
        valueDisplayOffset: 1.6,
        smallValueDisplayOffset: 2.05,
        sliceMotionDuration: 270,
        outsideThePieMin: 1,
        outsideThePiePercentSignMin: 1,
        margin: {
            top: 90,  // Pie chart top from parent top
            right: 10,
            bottom: 110,  // @CHECKME this is not used - do we need it
            left: 10,
        },
    };


    console.log('MHL ZOG props.chartSize:  ', props.chartSize);
    let config = configArray[props.chartSize];


    let titleFontSize = config.titleFontSize;
    /**
     * Title font size = outerDiameter / titleSizeFactor
     * @type {number}
     */
    let titleSizeFactorValue = 6; // @FIXME Does not scale well.  Smaller titles are too small
    if (config.titleSizeFactor > 0) {
        titleSizeFactorValue = config.titleSizeFactor;
    }


    const margin = config.margin;
    const width = config.width;  // Width of the svg
    const height = config.height;  // Height of the svg
    const textOnChartSize = config.textOnChartSize;

    /**
     * The position of the numbers on the Pie
     * For small values we can put them outside the pie.
     * If smallValueDisplayOffset === valueDisplayOffset   - No effect, will keep the low numbers ON the Pie
     * We can leave the small values on the Pie, but do not include the trailing %
     *
     * 2.1 seems good to put it just outside the Pie
     * @see valueDisplayOffset
     * @type {number}
     */
    let smallValueDisplayOffset = config.smallValueDisplayOffset;

    /**
     * Larger values move the numbers on the Pie slice farther out from the center
     * @type {number}
     */
    const valueDisplayOffset = config.valueDisplayOffset;

    /**
     * The "Small number" threshold.
     * Small numbers do not get a trailing '%' and can be moved outside the Pie
     * Values <= outsideThePieMin get pushed out
     * @type {number}
     */
    const outsideThePieMin = config.outsideThePieMin;

    /**
     * The color used for Pie border and slice borders
     * @type {string}
     */
    const chartBorderColor = '#fff';

    /**
     * The width of the Pie border and slice borders in pixels
     * @type {number}
     */
    const chartBorderWidth = 1;

    /**
     * X position of the legend on the right
     * Larger numbers move the legend farther to the right of the Pie
     * @type {number}
     */
    const legendX = config.legendX;

    /**
     * Thickness of outline around the colored boxes of the legend
     * @type {number}
     */
    const legendBoxOutlineWidth = 2;

    /**
     * More/less space between lines in the Legend
     * @type {number}
     */
    const legendTextVerticalSpacing = config.leg;


    /**
     * The color of the Legend text, coms from config.legendTextColor
     * @type {string|*}
     */
    let legendTextColor = config.legendTextColor;

    /**
     * How far in pixels a slice "Pushes out" on mouseover
     * @type {number}
     */
    const largeRadiusAddOn = 4;

    /**
     * set the color scale
     * @type {ScaleOrdinal<string, unknown>}
     */
    const colorScaleTEMP = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeTableau10);


    const colors = ["#274479", "#9F470F", "#646264", "#4571c7", "#ed7d32", "#ffbf02", "#5c9ad6", "#70ad48", "#109618"];

// Define the color scale
    let colorScale0 = d3.scaleOrdinal().domain(data).range(colors);


    /**
     * This one uses Interpolaters
     * This one is just for testing so far.
     * Rename to colorScale0 to use
     * @type {ScaleSequential<string, never>}
     */
    /*
        const colorScale1 = d3
            .scaleSequential()
            .interpolator(d3.interpolateViridis)
            .domain([0, data.length]);
    */


    // These will be used if/when we do something useful when a Pie slice is clicked
    let currentPieSliceIndex = -1;
    let currentPieSliceLabel = '';
    let currentPieSliceValue = -1;


    // This runs the component, initialize things, then do this
    useEffect(() => {
        drawChart(config);
    });


    /**
     * This is the function that is called to run this component
     * It is called after initialization
     * @param config
     */
    function drawChart(config) {
        getAPI.then(api => {

            console.log('MHL 414a handleClick2');
            api.getChartData3().then(resp => {
                console.log('MHL 414b handleClick3');
                if (resp instanceof Error) {
                    console.log('MHL 415c handleClick3 error: ', resp);
                }
                if( svgId === 2) {
                    data = resp['patientDemographicsByCancerType'];
                    console.log('MHL resp 415d [\'patientDemographicsByCancerType\']: ', resp['patientDemographicsByCancerType']);
                }
                else if( svgId === 5) {
                    data = resp['patientDemographicsRace'];
                    console.log('MHL resp 415e [\'patientDemographicsRace\']: ', resp['patientDemographicsRace']);
                }
                else if( svgId === 6) {
                    data = resp['patientDemographicsEthnicity'];
                    console.log('MHL resp 415g [\'patientDemographicsEthnicity\']: ', resp['patientDemographicsEthnicity']);
                }
                console.log('MHL resp 415h: ', resp);






        colorScale0 = d3.scaleOrdinal().domain(data).range(colors);
        // Remove the old svg
        d3.select('#pie-container' + svgId)
            .select('svg')
            .remove();

        // Create a new svg
        const svg = d3
            .select('#pie-container' + svgId)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${config.outerRadius + margin.left}, ${config.outerRadius + margin.top})`)
        ;


// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
        // On the click of a slice - We don't make use of this yet
        const onSliceClick = (d, i) => {
            currentPieSliceIndex = i['index'];
            currentPieSliceLabel = data[currentPieSliceIndex]['label'];
            currentPieSliceValue = data[currentPieSliceIndex]['value'];
            let retObj = {'id': props.svgId, 'label': currentPieSliceLabel, 'value': currentPieSliceValue};
            console.log('MHL showDataLabel currentPieSliceLabel: {\'id\': props.svgId, \'label\': currentPieSliceLabel, \'value\': currentPieSliceValue}:  ', retObj);
            setTestText(currentPieSliceLabel + " : " + currentPieSliceValue);
        }
// //////////////////////////////////////////////////////////////////////////////////


        // Creates the Pie
        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d['value']);  // The data - Used to set up the Pie

        const arc = svg
            .selectAll('#pie-container' + svgId) // The ID of our HTML div
            .data(pieGenerator(data)) // Give the Pie generator the data
            .enter(); // Run it


        // Creates Pie slices
        const arcGenerator = d3
            .arc()
            .innerRadius(config.innerRadius)
            .outerRadius(config.outerRadius);


        // Append arcs (Pie slices)
        arc
            .append('path')

            /*
            The d attribute is a string of path commands that define the shape of the path.
            These path commands can be used to draw simple or complex shapes, such as circles, rectangles, lines, curves, and more.
             */
            .attr('d', arcGenerator)


            // Give each arc a unique ID, so I can identify him in the mouseover, mouseclick and mouseout functions.
            .attr('id', (data) => {
                let index = data['index'];
                return 'graph-00-slice-' + svgId.toString() + '-' + index.toString();
            })


            .style('fill', (_, i) => colorScale0( data[i].label ) )

            .attr("fake",  (_, i) => {
                console.log('MHL data.label data: ', data);
                console.log('MHL data.label i: ', i);
                console.log('MHL data.label data[i]: ', data[i]);
                console.log('MHL data.label data[i].label: ', data[i].label);
            })

          //  .attr("fill", function(d) { return colorScale0(data.label); })


            .style('stroke', chartBorderColor)   // Pie border color
            .style('stroke-width', chartBorderWidth)
            .on('click', function (d, i) {
                console.log('MHL i010z: ', i);
                onSliceClick(d, i)
            })


            // Do something in the Legend when mouse is over his slice
            .on('mouseover', function (d, i) {

                // Put a box around this legend entries color box
                d3.select('#graph-00-legend-' + svgId.toString() + '-' + i['index'].toString())
                    .style('stroke', '#000000')
                    .style('stroke-width', legendBoxOutlineWidth)
                ;

                // Bold the text for this legend entry
                d3.select('#graph-00-legend-text-' + svgId.toString() + '-' + i['index'].toString())
                    .style("font-weight", "bold")
                ;


                d3.selectAll('#graph-00-slice-' + svgId.toString() + '-' + i['index'].toString())
                    .transition()
                    .duration(config.sliceMotionDuration)
                    .attr('d',         // Make the large arc, for when the mouse is over an individual slice.
                        d3.arc()
                            .outerRadius(config.outerRadius + largeRadiusAddOn)
                            .innerRadius(config.innerRadius))
                ;

            })



            // UnDo something in the Legend when mouse leaves his slice
            .on('mouseout', function (d, i) {
                    // Remove (make white) the box around this legend entries color box
                    d3.select('#graph-00-legend-' + svgId.toString() + '-' + i['index'].toString())
                        .style('stroke', colorScale0(i['index']));

                    // Bold the text for this legend entry
                    d3.select('#graph-00-legend-text-' + svgId.toString() + '-' + i['index'].toString())
                        .style("font-weight", "normal");


                    d3.selectAll('#graph-00-slice-' + svgId.toString() + '-' + i['index'].toString())
                        .transition()
                        .duration(config.sliceMotionDuration)
                        .attr('d',   // Return the arc to its original size, for when the mouse has left an individual slice.
                            d3.arc()
                                .outerRadius(config.outerRadius)
                                .innerRadius(config.innerRadius))
                    ;
                } // END mouseout
            );


        // Text labels on the pie slices, Number followed by %
        /*
                arc
                    .append('text')
                    .attr('text-anchor', 'middle')
                    .attr('alignment-baseline', 'middle')
                    .text((d) => {
                        if (d.data['value'] > outsideThePieMin || d.data['value'] > config.outsideThePiePercentSignMin) {
                            return d.data.value + '%';
                        } else {
                            return d.data.value;  // Outside the pie for small Arcs
                        }
                    })

                    .style('fill', config['textOnChartColor'])
                    .attr('font-size', textOnChartSize)

                    .attr('transform', (d) => {
                        const [x, y] = arcGenerator.centroid(d);
                        if (d.data['value'] > outsideThePieMin) {
                            return `translate(${x * valueDisplayOffset}, ${y * valueDisplayOffset})`; // Big arcs
                        } else {
                            return `translate(${x * smallValueDisplayOffset}, ${y * smallValueDisplayOffset})`; // Small arcs
                            // return `translate(${x * valueDisplayOffset}, ${y * valueDisplayOffset})`; // @CHECKME This keeps the small numbers IN the pie, but without a trailing %
                        }
                    });
        */


        // Append text labels for legend
        svg
            .selectAll()
            .data(pieGenerator(data))
            .enter()
            .append('text')
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'middle')
            .attr('font-size', config.legendFontSize)
            .text((d, i) => d.data.label + ' (' + d.data.value + '%)')

            // Give each arc a unique ID, so I can identify him in the mouseover and mouseout  functions.
            .attr('id', (data) => {
                let index = data['index'];
                return 'graph-00-legend-text-' + svgId.toString() + '-' + index.toString();
            })

            .style('fill', legendTextColor)
            /*
                        .style("font-size", config.legendFontSize + 'px')
            */
            .attr('transform', (d, i) => {
                return `translate(${legendX}, ${(i * (config.legendFontSize + config.legendTextVerticalSpacing)) - (config.outerRadius) + config.legendY})`;
            });


        // Append squares for legend labels
        svg
            .selectAll()
            .data(pieGenerator(data))
            .enter()
            .append('rect')

            .attr('x', 0)
            .attr('y', 0)
            .attr('width', config.legendFontSize * 0.75)
            .attr('height', config.legendFontSize * 0.75)
            // Outline black when high lighted back to this on mouse out
            .style('stroke', (_, i) => colorScale0(i))
            .style('fill', (_, i) => colorScale0(i))
            // Give each arc a unique ID, so I can identify him in the mouseover and mouseout  functions.
            .attr('id', (data) => {
                let index = data['index'];
                return 'graph-00-legend-' + svgId.toString() + '-' + index.toString();
            })

            .attr('transform', (d, i) => {
                return `translate(${legendX - 24}, ${config.legendY + (i * (config.legendFontSize + config.legendTextVerticalSpacing)) - (config.outerRadius) - ((config.legendFontSize + config.legendTextVerticalSpacing) / 2)})`;
            });


        //  title
        svg.append("text")
            .attr("text-anchor", "start")
            .style("font-size", titleFontSize + "px")
            .attr("fake", () => {
                console.log('MHL config.outerRadius / titleSizeFactorValue : ', (config.outerRadius / titleSizeFactorValue));
            })
            .text(titleText)
            .attr('transform', (d, i) => {
                return `translate(${-config.titleX}, ${-config.titleTopMargin})`;
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
                return `translate(${config.subtitleX}, ${20 - config.titleTopMargin})`;
            });
        // /////////////////////////////////////////////////////
        // /////////////////////////////////////////////////////


        console.log('MHL XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: ', titleText);
        console.log('MHL XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX chartSubtitle: ', chartSubtitle);
        console.log('MHL XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX props: ', props);
            } )  } )
    } // End draw chart

    return <div className={'div-chart'}>
        {/*
        { isMobile && <h2>Yes is Mobile</h2>}
        { !isMobile && <h2>Is not Mobile</h2>}
*/}
        <span>svgId: {svgId}</span>

        <div id={'pie-container' + svgId.toString()}/>
    </div>;
}

export default PieChart;

import React, {useRef, useEffect} from "react";

import PieChart from "./PieChart";
import TextChart from "./TextChart";
import BarChart from "./BarChart";

const Charts = (props) => {
    if (props === undefined) {  // @TESTING
        return;
    }
    console.log('MHL Charts props: ', props);

    const {
        chartId,
        chartSize,
        isMobile,
        chartSubtitle,
        chartTitle,
        svgId
    } = props;

    const t = props.translator;

    function translateLabels(obj) {
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

    // Barchart
    const config5 = {
        width: 600,
        height: 350,
        titleFontSize: 20,
        titleTopMargin: 36,
        titleX: 250,

        legendX: 150,
        legendFontSize: 8,
        legendTextColor: '#1f7a00',


        textOnChartColor: '#000000',
        textOnChartXOffset: 8,
        textOnChartSize: 12,
        margin: {
            top: 52,
            right: 20,
            bottom: 30,
            left: 45,
        },
    };

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

    let data;
    let data0 = {
        "patientDemographicsByCancerType": [
            {label: 'charts.chart_data.PatientDemographics.ColonCancer.label', value: 26},
            {label: 'charts.chart_data.PatientDemographics.LungCancer.label', value: 21},
            {label: 'charts.chart_data.PatientDemographics.ProstateCancer.label', value: 18},
            {label: 'charts.chart_data.PatientDemographics.Melanoma.label', value: 16},
            {label: 'charts.chart_data.PatientDemographics.GastroesophagealCancer.label', value: 9},
            {label: 'charts.chart_data.PatientDemographics.MultipleMyeloma.label', value: 4},
            {label: 'charts.chart_data.PatientDemographics.Leukemia.label', value: 6},
            {label: 'charts.chart_data.PatientDemographics.AcuteMyeloid.label', value: 1}
        ],
        'participantDemographicsAge': [
            {label: "34-43", value: 8},
            {label: "44-53", value: 15},
            {label: "54-63", value: 23},
            {label: "64-73", value: 38},
            {label: "74-83", value: 15},
            {label: "84-93", value: 2}
        ],
        'participantDemographicsSex': [
            {label: "Male", value: 62},
            {label: "Female", value: 38}
        ],
        'patientDemographicsRace': [
            {label: 'charts.chart_data.PatientDemographicsRace.White.label', value: 74},
            {label: 'charts.chart_data.PatientDemographicsRace.BlackOrAfricanAmerican.label', value: 18},
            {label: 'charts.chart_data.PatientDemographicsRace.Asian.label', value: 3},
            {label: 'charts.chart_data.PatientDemographicsRace.Unknown.label', value: 3},
            {label: 'charts.chart_data.PatientDemographicsRace.NotReported.label', value: 1},
            {label: 'charts.chart_data.PatientDemographicsRace.NativeHawaiianOrOtherPacificIslander.label', value: 1},
        ],
        'patientDemographicsEthnicity': [
            {label: 'charts.chart_data.PatientDemographicsEthnicity.NotHispanicOrLatino.label', value: 94},
            {label: 'charts.chart_data.PatientDemographicsEthnicity.HispanicOrLatino.label', value: 4},
            {label: 'charts.chart_data.PatientDemographicsEthnicity.Unknown.label', value: 1},
            {label: 'charts.chart_data.PatientDemographicsEthnicity.NotReported.label', value: 1},
        ]
    };
console.log('MHL data0: ', data0);
    // do the translations
    translateLabels(data0['patientDemographicsEthnicity']);
    translateLabels(data0['patientDemographicsByCancerType']);
    translateLabels(data0['participantDemographicsSex']);
    translateLabels(data0['patientDemographicsRace']);

    // Patient Demographics - By Cancer Type
    if (chartId === 1) {
        data = data0['patientDemographicsByCancerType'];
    }
    // Participant Demographics - Age
    else if (chartId === 2) {
        data = data0['participantDemographicsAge'];
    }
    // Participant Demographics - Sex
    else if (chartId === 3) {
        data = data0['participantDemographicsSex'];
    }
    // Patient Demographics - Race  charts.chart_data.4.0-5
    else if (chartId === 4) {
        data = data0['patientDemographicsRace'];
    }
    // Patient Demographics - Ethnicity  charts.chart_data.5.0-3
    if (chartId === 5) {
        data = data0['patientDemographicsEthnicity'];
    }


    console.log('MHL Charts chartId: ' + chartId);
    console.log('MHL Charts data: ', data);

    if (props.chartType === 0) {
        console.log('MHL TextChart data: ', props);
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
        console.log('MHL zz PieChart data: ', props);
        console.log('MHL zXz PieChart data: ', data);
        return (
            <div>
                <PieChart
                    data={data}
                    chartSize={chartSize}
                    svgId={svgId}
                    isMobile={isMobile}
                    chartTitle={chartTitle}
                    chartSubtitle={chartSubtitle}
                ></PieChart>
            </div>
        );
    } else if (props.chartType === 2) {
        console.log('MHL BarChart data: ', props);
        return (
            <div>

                <BarChart
                    data={data}
                    chartSize={chartSize}
                    config={config5}
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

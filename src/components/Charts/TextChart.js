import React, {useRef, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import '../../index.css'
import {Typography} from "@material-ui/core";
import RenderContent from "../utils/RenderContent";
import getAPI from "../../data";

const TextChart = (props) => {
    const { t, i18n } = useTranslation('about')
    const [chartData, setChartData] = useState([])
    // const [data, setData] = useState([])

    const {
        onSelectedBarData,
        config,
        chartTitle,
        chartSubtitle,
        svgId,
        isMobile
    } = props;


    const node = 'textChart-container' + svgId.toString();
   // let data = '{}';


    // @FIXME

    let data = [
        {label: t('charts.chart_data.ProjectSummary.ParticipantsEnrolled') , value: 26},
        {label: t('charts.chart_data.ProjectSummary.SitesThatHaveEnrolledParticipants'), value: 21},
        {label: t('charts.chart_data.ProjectSummary.CancerTypes'), value: 18},
        {label: t('charts.chart_data.ProjectSummary.BiomarkerTestReturned'), value: 16}
    ];


    // This runs the component, initialize things, then do this
    useEffect(() => {
        drawTextChart(config);
    });


    let isChartUp = false;
    function drawTextChart(config) {


/*
        if( isChartUp ){
            return
        }
        getAPI.then(api => {
            isChartUp = true;

            api.getChartData3().then(resp => {
                if (resp instanceof Error) {
                    console.error('MHL drawTextChart error: ', resp);
                }
               console.log('MHL 615d getChartData3 drawTextChart isChartUp: ', isChartUp);
                if (svgId === 0) {
                    // setData(resp['projectSummary']);
                    setData(data);
                }

                //     translateLabels(data);

            //    console.log('MHL 1 BarChart data: ', data);
            })
        });
*/
    }
    // @FIXME dup code
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


    return (
        <div className={'div-chart'}>
             <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent children={chartTitle} />
              </Typography>

                {data.map(value => (
                    <div key={value.label}>
                       {t(value.label)} = {t(value.value)}
                    </div>

                ))}
        </div>
    );
    /*
        <div className={'pi-div'} id={'pie-container' + svgId.toString()}/>
    */

}


export default TextChart;

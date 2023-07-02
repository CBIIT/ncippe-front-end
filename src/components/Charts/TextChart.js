import React, {useRef, useEffect} from "react";
import {useTranslation} from "react-i18next";
import '../../index.css'
import {Typography} from "@material-ui/core";
import RenderContent from "../utils/RenderContent";
import getAPI from "../../data";

const TextChart = (props) => {
    console.log('MHL TextChart props: ', props );
    const { t, i18n } = useTranslation('about')

    const {
        onSelectedBarData,
        config,
        chartTitle,
        chartSubtitle,
        svgId,
        isMobile
    } = props;

    let data = '{}';

    const node = 'textChart-container' + svgId.toString();
    // @TODO Move this to Chart.js
/*
    let data = [
        {label: t('charts.chart_data.ProjectSummary.ParticipantsEnrolled') , value: 26},
        {label: t('charts.chart_data.ProjectSummary.SitesThatHaveEnrolledParticipants'), value: 21},
        {label: t('charts.chart_data.ProjectSummary.CancerTypes'), value: 18},
        {label: t('charts.chart_data.ProjectSummary.BiomarkerTestReturned'), value: 16}
    ];
*/

    getAPI.then(api => {

        console.log('MHL 614a drawBarChart00');
        api.getChartData3().then(resp => {
            console.log('MHL 614b handleClick3 resp: ', resp);
            if (resp instanceof Error) {
                console.error('MHL 615c getChartData3 error: ', resp);
            }
            console.log('MHL 615d getChartData1 svgId: ', svgId);
            if (svgId === 0) {
                data = resp['projectSummary'];
                console.log('MHL 615e getChartData3 data: ', data);
            }

       //     translateLabels(data);

            console.log('MHL 1 BarChart data: ', data);
        })});
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

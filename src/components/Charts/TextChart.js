import React, {useRef, useEffect} from "react";
import {useTranslation} from "react-i18next";
import '../../index.css'
import {Typography} from "@material-ui/core";
import RenderContent from "../utils/RenderContent";

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


    const node = 'textChart-container' + svgId.toString();
    // @TODO Move this to Chart.js
    let data = [
        {label: t('charts.chart_data.ProjectSummary.ParticipantsEnrolled') , value: 26, key: 0},
        {label: t('charts.chart_data.ProjectSummary.SitesThatHaveEnrolledParticipants'), value: 21, key: 1},
        {label: t('charts.chart_data.ProjectSummary.CancerTypes'), value: 18, key: 2},
        {label: t('charts.chart_data.ProjectSummary.BiomarkerTestReturned'), value: 16, key: 3}
    ];

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

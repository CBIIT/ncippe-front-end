import React, {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Box, Container, Divider, Grid, Typography, useMediaQuery} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import Charts from "../../components/Charts/Charts";
import getAPI from '../../data'

const useStyles = makeStyles(theme => ({
    grid: {
        justifyContent: 'flex-start',
        '& img': {
            display: 'inline-block',
            maxWidth: 600,
            margin: theme.spacing(1, 0, 3)
        }
    },
    gridItemImg: {
        textAlign: 'center',
        '& img': {
            maxWidth: 600,
            [theme.breakpoints.up('md')]: {
                maxWidth: 380
            }
        }
    },
    img_fullWidth: {
        width: '100%',
        maxWidth: 'none !important'
    },
    divider: {
        width: '100%',
        margin: theme.spacing(3, 0),
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(7, 0)
        }
    },
    testAlpha: {
        width: '25%',
        backgroundColor: '#b90d87'
    },
    linkImg: {
        '& a': {
            display: "inline-block",
            border: `2px solid ${theme.palette.grey.light}`,
        },
        '& img': {
            margin: 0,
        },
        '& figcaption': {
            margin: theme.spacing(0, 0, 2, 0),
        }
    }
}), {name: 'AboutPage'})

const AboutPage = () => {
    let TESTING = true;
    const [data1, setData1] = useState([]);
    let [chartData, setChartData] = useState([]);


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

    let chartDataX = data0;
  //  let chartDataX;

    let tempA = '';
window.chData = '';
    let handleClick = () => {
        console.log('MHL 01a handleClick');
        getAPI.then(api => {
            console.log('MHL 01b handleClick');
            api.getChartData().then(resp => {
                console.log('MHL 01d chartData typeof: ', typeof resp);
                chartData = resp;
                window.chData = resp;
                console.log('MHL 01c chartData: ', chartData);
                console.log('MHL 01d resp : ', resp);
                if (resp instanceof Error) {
                    console.log('MHL 02 handleClick error: ', resp);
                }
            })
        })
            .catch(error => {
                console.log('MHL 03 handleClick error: ', error);
                console.error(error);
            })
    }

    // //////////////////////////////////////////////
    async function init() {
        console.log('MHL IN init');
        handleClick();
       // const chartDataX = await waitForValue();
        console.log('MHL 01b chartDataX: ', chartDataX);
    }
    // //////////////////////////////////////////////


    // ///////////////////////////////////////////////////////////
    console.log('MHL aa BEFORE init');
 //  init();
    console.log('MHL bb AFTER init chartDataX: ', chartDataX);

    // ///////////////////////////////////////////////////////////


    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Function that returns a Promise which resolves when the value is no longer undefined
    let tempCount = 0;
    async function waitForValue() {
        console.log('MHL 700 waitForValue chartDataX');
        return new Promise(resolve => {

            // Define an interval to periodically check the value
            const interval = setInterval(() => {
                tempCount++;
                console.log('MHL 701a waitForValue chartDataX: ', chartDataX);

                // Check if the value is defined
                if (chartDataX !== undefined) {
                    console.log('MHL 701b waitForValue chartDataX: ', chartDataX);
                    clearInterval(interval); // Clear the interval
                    console.log('MHL 702 waitForValue chartDataX: ', chartDataX);
                    resolve(chartDataX); // Resolve the Promise with the value
                    console.log('MHL 703 waitForValue chartDataX: ', chartDataX);
                }
                else{
                   // console.log('MHL 701b undefined waitForValue chartDataX[' + tempCount + ']: ', chartDataX);
                }
            }, 2000); // Interval duration in milliseconds
        });
    }


    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    let handleClick2 = () => {
        console.log('MHL 00 handleClick2');
        getAPI.then(api => {
            console.log('MHL 11a handleClick2');
            //api.getChartData().then(resp => {
            //api.getChartData3().then(resp => {
            api.getChartData2().then(resp => {
                console.log('MHL 11b handleClick2');
                if (resp instanceof Error) {
                    console.log('MHL 12 handleClick2 error: ', resp);
                }
                console.log('MHL resp 13: ', resp);
            })

        })
            .catch(error => {
                console.log('MHL 14 handleClick2 error: ', error);
                console.error(error)
            })
    }

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    let handleClick3 = () => {

        let tempResp;

        console.log('MHL 00 handleClick2');
        getAPI.then(api => {

            console.log('MHL 14a handleClick2');
            api.getChartData3().then(resp => {
                console.log('MHL 14b handleClick3');
                if (resp instanceof Error) {
                    console.log('MHL 15 handleClick3 error: ', resp);
                }
                console.log('MHL resp 15a: ', resp);
                console.log('MHL resp 15b [\'patientDemographicsEthnicity\'][\'label\']: ', resp['patientDemographicsEthnicity']['label']);
                tempResp = resp;
                test0(resp);
                
                setChartData(resp);
                console.log('MHL resp resp 15c: ', resp);
                console.log('MHL resp chartData 15d: ', chartData);

                return resp;
            }).catch(er => { console.log('MHL 15e handleClick2 error: ', er);
                console.error(er)})

        })
            .catch(error => {
                console.log('MHL 14 handleClick2 error: ', error);
                console.error(error)
            })

        console.log('MHL 16a handleClick3 tempResp: ', tempResp);
        setTimeout(
            function() {

                console.log('MHL 16b handleClick3 tempResp: ', tempResp);
                console.log('MHL16c  resp chartData 15d: ', chartData);

            }, 5000);
        console.log('MHL 16d handleClick3 tempResp: ', tempResp);
        console.log('MHL 16e resp chartData: ', chartData);

    }


    let test0 = (text) => {
        console.log('MHL text: ', text );
    }
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////


    const classes = useStyles();
    let {t, i18n} = useTranslation('about');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const lang = i18n.languages[0] === 'en' ? "" : "-es"
    useEffect(() => {
        PubSub.publish('ANALYTICS', {
            event: 'pageview',
            prop6: 'About the Biobank',
            prop10: t("metaData.title"),
        })
    }, [t])


    return (
        <Box component="article">
            <Helmet>
                <title>{t("metaData.title")}</title>
                <meta name="title" content={t("metaData.title")}/>
                <meta property="og:title" content={t("metaData.OG_title")}/>
                <meta name="description" content={t("metaData.description")}/>
                <meta property="og:description" content={t("metaData.OG_description")}/>
                <link rel="canonical" href={`${process.env.REACT_APP_PUBLIC_URL}/about`}/>
                <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/about`}/>
            </Helmet>
            <Container className="pageHeader--gradient">
                <Typography variant="h2" component="h1">
                    <RenderContent children={t('pageTitle')}/>
                </Typography>
            </Container>
            <Container className="mainContainer mainContainer--public">
                <Box mt={5} component="section">
                    <Grid container className={classes.grid} spacing={2} alignItems="stretch">
                        <Grid item xs={12} md={6}>
                            <Typography paragraph={true} variant="h2" component="h2">
                                <RenderContent children={t('sections.0.title')}/>
                            </Typography>
                            {isMobile && <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')}/>}
                            <Typography paragraph={true} variant="h3" component="h3">
                                <RenderContent children={t('sections.0.subtitle')}/>
                            </Typography>

                            <div>
                                {TESTING ? (
                                    <section>
                                        <button onClick={handleClick}>Test1 server</button>
                                        <button onClick={handleClick2}>Test2 server</button>
                                        <button onClick={handleClick3}>Test3 server</button>
                                        <hr/>
                                        {isMobile && <h2>isMobile</h2>}
                                        {!isMobile && <h2>NOT isMobile</h2>}

                                        <Grid item xs={12} md={6}>
                                            <Charts
                                                chartData={window.chData}
                                                translator={t}
                                                chartId={0}
                                                chartType={0}
                                                chartSize={1}
                                                svgId={0}
                                                isMobile={isMobile}
                                                chartTitle={t('charts.ProjectSummary.title')}
                                                subtitle={t('charts.ProjectSummary.subtitle')}
                                            ></Charts>
                                        </Grid>


                                        {!isMobile ? (
                                            <Grid item xs={12} md={6}>
                                                <p>Pie chart "Patient Demographics" - Full size</p>

                                                <Charts
                                                    chartData={window.chData}
                                                    translator={t}
                                                    chartId={1}
                                                    chartType={1}
                                                    chartSize={2}
                                                    svgId={2}
                                                    isMobile={isMobile}
                                                    chartTitle={t('charts.PatientDemographics.title')}
                                                    chartSubtitle={t('charts.PatientDemographics.subtitle')}
                                                ></Charts>
                                            </Grid>
                                        ) : (
                                            <Grid item xs={12} md={6}>
                                                <p>Pie chart "Patient Demographics" - Full size</p>

                                                <Charts
                                                    chartData={window.chData}
                                                    translator={t}
                                                    chartId={1}
                                                    chartType={1}
                                                    chartSize={0}
                                                    svgId={2}
                                                    isMobile={isMobile}
                                                    chartTitle={t('charts.PatientDemographics.title')}
                                                    chartSubtitle={t('charts.PatientDemographics.subtitle')}
                                                ></Charts>
                                            </Grid>
                                        )}


                                        {/* Bar chart "Participant Demographic Age" - Full size */}
                                        <Grid item xs={12} md={6}>
                                            <Charts
                                                chartData={window.chData}
                                                translator={t}
                                                chartId={2}
                                                chartType={2}
                                                chartSize={2}

                                                chartTitle={t('charts.ParticipantDemographicsAge.title')}
                                                chartSubtitle={t('charts.ParticipantDemographicsAge.subtitle')}
                                                svgId={3}
                                                isMobile={isMobile}
                                            />
                                        </Grid>

                                        {/* Bar chart "Participant Demographic Sex" - Full size */}
                                        <Grid item xs={12} md={6}>
                                            <Charts
                                                chartData={window.chData}
                                                translator={t}
                                                chartId={3}
                                                chartType={2}
                                                chartSize={2}

                                                chartTitle={t('charts.ParticipantDemographicsSex.title')}
                                                chartSubtitle={t('charts.ParticipantDemographicsSex.subtitle')}
                                                svgId={4}
                                                isMobile={isMobile}
                                            />
                                        </Grid>

                                        {/* Patient Demographics Race */}
                                        <Grid item xs={12} md={6}>
                                            <Charts
                                                chartData={window.chData}
                                                translator={t}
                                                chartId={4}
                                                chartType={1}
                                                chartSize={2}
                                                svgId={5}
                                                isMobile={isMobile}
                                                chartTitle={t('charts.PatientDemographicsRace.title')}
                                                chartSubtitle={t('charts.PatientDemographicsRace.subtitle')}
                                            ></Charts>
                                        </Grid>

                                        {/* Patient Demographics Ethnicity */}
                                        <Grid item xs={12} md={6}>
                                            <Charts
                                                chartData={window.chData}
                                                translator={t}
                                                chartId={5}
                                                chartType={1}
                                                chartSize={2}
                                                svgId={6}
                                                isMobile={isMobile}
                                                chartTitle={t('charts.PatientDemographicsEthnicity.title')}
                                                chartSubtitle={t('charts.PatientDemographicsEthnicity.subtitle')}
                                            ></Charts>
                                        </Grid>
                                    </section>
                                ) : null}
                                {/*End of TESTING*/}
                            </div>

                            <Typography component="div">
                                <RenderContent children={t('sections.0.body')}/>
                            </Typography>


                        </Grid>
                        {!isMobile &&
                        <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
                            <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')}/>
                        </Grid>
                        }

                        <Divider className={classes.divider}/>

                        <Grid item xs={12} md={9}>
                            <Typography paragraph={true} variant="h2" component="h2">
                                <RenderContent children={t('sections.1.title')}/>
                            </Typography>

                            <Typography component="div">
                                <RenderContent children={t('sections.1.intro')}/>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <figure className={classes.linkImg}>
                                <a href={`${process.env.PUBLIC_URL}/assets/documents/How-Biobank-Works${lang}.pdf`}
                                   rel="noopener noreferrer" target="_blank">
                                    {/* <BodyImage src={`how-biobank-works${lang}.jpg`} alt={t('sections.1.alt_text')} /> */}
                                    <img className={classes.img_fullWidth}
                                         src={process.env.PUBLIC_URL + `/assets/images/fullWidth/micro/how-biobank-works${lang}.jpg`}
                                         alt={t('sections.1.alt_text')}
                                         srcSet={`
                      ${process.env.PUBLIC_URL}/assets/images/fullWidth/micro/how-biobank-works${lang}.jpg 380w,
                      ${process.env.PUBLIC_URL}/assets/images/fullWidth/mobile/how-biobank-works${lang}.jpg 600w,
                      ${process.env.PUBLIC_URL}/assets/images/fullWidth/tablet/how-biobank-works${lang}.jpg 960w,
                      ${process.env.PUBLIC_URL}/assets/images/fullWidth/desktop/how-biobank-works${lang}.jpg 1280w,
                      ${process.env.PUBLIC_URL}/assets/images/fullWidth/tabletHD/how-biobank-works${lang}.jpg 1920w,
                      ${process.env.PUBLIC_URL}/assets/images/fullWidth/desktopHD/how-biobank-works${lang}.jpg 2560w,
                    `}
                                    />
                                </a>
                                <figcaption><RenderContent children={t('sections.1.caption')}/></figcaption>
                            </figure>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography component="div">
                                <RenderContent children={t('sections.1.body')}/>
                            </Typography>
                        </Grid>


                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default AboutPage

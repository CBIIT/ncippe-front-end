import React, {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Box, Container, Divider, Grid, Typography, useMediaQuery} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import Charts from "../../components/Charts/Charts";
import ReChartsPie2Less from "../../components/Charts/ReChartsPie2Less";
import ReChartsPie3More from "../../components/Charts/ReChartsPie3More";
import ReChartsBar from "../../components/Charts/ReChartsBar";
import ReChartsBar2Sets from "../../components/Charts/ReChartsBar2sets";
import getAPI from '../../data'
import TabAboutBar from './AboutBar'
const COLORS = ["#246AD4", "#61A1EC", "#A5D3FE", "#FFCF54", "#F294B0", "#74F2AE", "#987DC4", "#F2D7D5", "#109618", "#9FA8DA","#A1887F" ];

// cancer type data
let dataEth = [
  { name: 'Not Hispanic or Latino', value: 183, fill: '#246AD4'},
  { name: 'Hispanic or Latino', value: 12, fill: '#61A1EC'},
  { name: 'Unknown', value: 4, fill: '#A5D3FE' },
  { name: 'Not Reported', value: 3, fill: '#FFCF54' },
 
];

// 
let dataGeo = [
  { name: 'Urban', value: 309 , fill: '#246AD4'},
  { name: 'Rural', value: 90 , fill: '#61A1EC'},

];

let dataCancerType = [
  { name: 'Colon Cancer', value: 44, fill: '#246AD4'},
  { name: 'Lung Cancer', value: 44, fill: '#61A1EC'},
  { name: 'Melanoma', value: 41, fill: '#A5D3FE' },
  { name: 'Multiple Myeloma', value: 50, fill: '#FFCF54' },
  { name: 'Breast Cancer', value: 22, fill: '#F294B0' },
  { name: 'Ovarian Cancer', value: 16, fill: '#74F2AE'},
  { name: 'Prostate Cancer', value: 12, fill: '#F294B0' },
  { name: 'Gastroesophageal Cancer', value: 6, fill: '#74F2AE'},
  { name: 'Acute Myeloid Leukemia', value: 5, fill: '#987DC4'},
];

let dataRace = [
  { name: 'White', value: 305 , fill: '#246AD4'},
  { name: 'Black or African American', value: 62 , fill: '#61A1EC'},
  { name: 'Unknown', value: 13, fill: '#A5D3FE' },
  { name: 'Asian', value: 8 , fill: '#FFCF54'},
  { name: 'American Indian or Alaska Native', value: 3, fill: '#F294B0' },
  { name: 'More Than One Race', value: 1, fill: '#74F2AE' },
  { name: 'Native Hawaiian or other Pacific Islander', value: 1 , fill: '#987DC4'},
];

let barDataAge = [
  { name: '30-39', value: 8, fill: '#246AD4'},
  { name: '40-49', value: 13, fill: '#61A1EC'},
  { name: '50-59', value: 49, fill: '#A5D3FE' },
  { name: '60-69', value: 71, fill: '#FFCF54' },
  { name: '70-79', value: 52, fill: '#F294B0' },
  { name: '80-89', value: 9, fill: '#74F2AE' },
];

let barDataSex = [
  { name: 'Male', value: 121, fill: '#A5D3FE'},
  { name: 'Female', value: 81, fill: '#FFCF54'},
];
let barDataBioSpecimen = [
  { name: 'Number of Participants', Blood: 2300, Tumor: 4000},
  { name: 'Number of Biospecimen', Blood: 1300, Tumor: 3000},

];

const dataCancerTypecolor = dataCancerType.map((data, index) => 
{  
  data.fill= COLORS[index];
  return data;
} );
const dataRacecolor = dataRace.map((data, index) => 
  {  
    data.fill= COLORS[index];
    return data;
  } );

  const dataEthcolor = dataEth.map((data, index) => 
    {  
      data.fill= COLORS[index];
      return data;
    } );
  
    const barDataAgecolor = barDataAge.map((data, index) => 
      {  
        data.fill= COLORS[index];
        return data;
      } );

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
}), {name: 'StudyProgressPage'})

const StudyProgressPage = () => {
    const classes = useStyles();
    let {t, i18n} = useTranslation('studyprogress');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const lang = i18n.languages[0] === 'en' ? "" : "-es"
    useEffect(() => {
        PubSub.publish('ANALYTICS', {
            event: 'pageview',
            prop6: 'Study Progress',
            prop10: t("metaData.title"),
        })
    }, [t])


    return (
      <Box component="article">
        <Helmet>
          <title>{t("metaData.title")}</title>
          <meta name="title" content={t("metaData.title")} />
          <meta property="og:title" content={t("metaData.OG_title")} />
          <meta name="description" content={t("metaData.description")} />
          <meta
            property="og:description"
            content={t("metaData.OG_description")}
          />
          <link
            rel="canonical"
            href={`${process.env.REACT_APP_PUBLIC_URL}/about/studyprogress`}
          />
          <meta
            property="og:url"
            content={`${process.env.REACT_APP_PUBLIC_URL}/about/studyprogress`}
          />
        </Helmet>
        <Container className="pageHeader--gradient">
          <Typography variant="h2" component="h1">
            <RenderContent children={t("pageTitle")} />
          </Typography>
        </Container>
        <TabAboutBar value={3} />
        <Container className="mainContainer mainContainer--public">
          <Box mt={5} component="section">
            <Grid
              container
              className={classes.grid}
              spacing={2}
              alignItems="stretch"
            >
              <Grid item xs={12} md={9}>
                <Typography paragraph={true} variant="h2" component="h2">
                  <RenderContent children={t("sections.0.title")} />
                </Typography>

                <Typography paragraph={true} component="div">
                  <RenderContent children={t("sections.0.body")} />
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider className={classes.divider} />
          <Box mt={2} component="section">
            <Grid
              container
              className={classes.grid}
              spacing={1}
              alignItems="stretch"
            >
              <Grid item xs={12} md={9}>
                <Typography paragraph={true} variant="h3" component="h3">
                  <RenderContent children={t("sections.1.title")} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                      <Charts
                        chartId={0}
                        chartType={0}
                        chartSize={1}
                        svgId={0}
                        isMobile={isMobile}
                        chartTitle={t("charts.ProjectSummary.title")}
                        subtitle={t("charts.ProjectSummary.subtitle")}
                      ></Charts>
                    </Grid>
            </Grid>
            </Box>
            <Divider className={classes.divider} />
            <Box mt={2} component="section">
            <Grid
              container
              className={classes.grid}
              spacing={1}
              alignItems="stretch"
            >
              <Grid item xs={12} md={9}>
                <Typography paragraph={true} variant="h3" component="h3">
                  <RenderContent children={t("sections.2.title")} />
                </Typography>
              </Grid>
              </Grid>
              <Grid
              container
              className={classes.grid}
              spacing={1}
              alignItems="stretch"
            >
         
                <Grid item xs={12} md={4}>
                  <ReChartsPie3More title="Cancer Type"
                    inputdata={dataCancerTypecolor} assignedcx={150} assignedcy={400}
                  >
                  </ReChartsPie3More>
                </Grid>

                <Grid item xs={12} md={4}  mt={2}>
                  <ReChartsPie3More title="Race"
                    inputdata={dataRacecolor} assignedcx={400} assignedcy={400}
                  >
                  </ReChartsPie3More>
                </Grid>

                <Grid item xs={12} md={4}  mt={2}>
                  <ReChartsPie2Less title="Ethnicity"
                    inputdata={dataEthcolor} assignedcx={200} assignedcy={800}
                  >
                  </ReChartsPie2Less>
                </Grid>
                </Grid>
           
            <Grid
              container
              className={classes.grid}
              spacing={1}
              alignItems="stretch"
            >

                <Grid item xs={12} md={4}  mt={2}>
                  <ReChartsPie2Less title="Rural vs. Urban"
                    inputdata={dataGeo} assignedcx={200} assignedcy={800}
                  >
                  </ReChartsPie2Less>
                </Grid>
                <Grid item xs={12} md={4}  mt={100}>
                  <ReChartsBar title="Age"
                    inputdata={barDataAgecolor} 
                  >
                  </ReChartsBar>
                </Grid>

                <Grid item xs={12} md={4}  mt={100} >
                  <ReChartsBar title="Sex"
                    inputdata={barDataSex} 
                  >
                  </ReChartsBar>
                </Grid>
            </Grid>
            <Grid
              container
              className={classes.grid}
              spacing={1}
              alignItems="stretch"
            >
                <Grid item xs={12} md={4}  mt={4}>
                  <ReChartsBar2Sets title="Biospecimens Donated by Participants"
                    inputdata={barDataBioSpecimen} 
                  >
                  </ReChartsBar2Sets>
                </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    );
}

export default StudyProgressPage

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PubSub from "pubsub-js";
import IconCardStudy from '../../components/IconCardStudy/IconCardStudy';

import RenderContent from "../../components/utils/RenderContent";
import ArticleImage from "../../components/utils/ArticleImage";
import Charts from "../../components/Charts/Charts";
import ReChartsPie2Less from "../../components/Charts/ReChartsPie2Less";
import ReChartsPie3More from "../../components/Charts/ReChartsPie3More";
import ReChartsBar from "../../components/Charts/ReChartsBar";
import ReChartsBar2Sets from "../../components/Charts/ReChartsBar2sets";
import getAPI from "../../data";
import TabAboutBar from "./AboutBar";
import { color } from "d3";
const COLORS = [
  "#246AD4",
  "#61A1EC",
  "#A5D3FE",
  "#FFCF54",
  "#F294B0",
  "#74F2AE",
  "#987DC4",
  "#F2D7D5",
  "#109618",
  "#9FA8DA",
  "#A1887F",
];

// cancer type data
const dataEth = [
  { name: "Not Hispanic or Latino", value: 183, fill: "#246AD4" },
  { name: "Hispanic or Latino", value: 12, fill: "#61A1EC" },
  { name: "Unknown", value: 4, fill: "#A5D3FE" },
  { name: "Not Reported", value: 3, fill: "#FFCF54" },
];

//
const dataGeo = [
  { name: "Urban", value: 309, fill: "#246AD4" },
  { name: "Rural", value: 90, fill: "#61A1EC" },
];

const dataCancerType = [
  { name: "Lung Cancer", value: 99,  fill: "#61A1EC" },
  { name: "Multiple Myeloma", value: 92, fill: "#FFCF54" },
  { name: "Melanoma", value: 57,  fill: "#A5D3FE" },
  { name: "Colon Cancer", value: 55, fill: "#246AD4" },
  { name: "Prostate Cancer", value: 32, fill: "#F294B0" },
  { name: "Invasive Breast Carcinoma", value: 27,  fill: "#F294B0" },
  { name: "Ovarian Cancer", value: 16, fill: "#74F2AE" },
  { name: "Gastroesophageal Cancer", value: 9, fill: "#74F2AE" },
  { name: "Acute Myeloid Leukemia", value: 9,  fill: "#987DC4" },
  { name: "Esophageal Carcinoma", value: 3,  fill: "#987DC4" },
];

const dataRace = [
  { name: "White", value: 305, fill: "#246AD4" },
  { name: "Black or African American", value: 62, fill: "#61A1EC" },
  { name: "Unknown", value: 13, fill: "#A5D3FE" },
  { name: "Asian", value: 8, fill: "#FFCF54" },
  { name: "American Indian or Alaska Native", value: 3, fill: "#F294B0" },
  { name: "More Than One Race", value: 1, fill: "#74F2AE" },
  {
    name: "Native Hawaiian or other Pacific Islander",
    value: 1,
    fill: "#987DC4",
  },
];

const barDataAge = [
  { name: "30-39", value: 8, fill: "#246AD4" },
  { name: "40-49", value: 13, fill: "#61A1EC" },
  { name: "50-59", value: 49, fill: "#A5D3FE" },
  { name: "60-69", value: 71, fill: "#FFCF54" },
  { name: "70-79", value: 52, fill: "#F294B0" },
  { name: "80-89", value: 9, fill: "#74F2AE" },
];

const barDataSex = [
  { name: "Male", value: 121, fill: "#A5D3FE" },
  { name: "Female", value: 81, fill: "#FFCF54" },
];
const barDataBioSpecimen = [
  { name: "Number of Participants", Blood: 2300, Tumor: 4000 },
  { name: "Number of Biospecimen", Blood: 1300, Tumor: 3000 },
];

const dataCancerTypecolor = dataCancerType.map((data, index) => {
  data.fill = COLORS[index];
  return data;
});
const dataRacecolor = dataRace.map((data, index) => {
  data.fill = COLORS[index];
  return data;
});

const dataEthcolor = dataEth.map((data, index) => {
  data.fill = COLORS[index];
  return data;
});

const barDataAgecolor = barDataAge.map((data, index) => {
  data.fill = COLORS[index];
  return data;
});

const useStyles = makeStyles(
  (theme) => ({
    grid: {
      justifyContent: "flex-start",
      marginTop: theme.spacing(3),
      "& img": {
        display: "inline-block",
        maxWidth: 600,
        margin: theme.spacing(1, 0, 3),
      },
    },

    gridItemImg: {
      textAlign: "center",
      "& img": {
        maxWidth: 600,
        [theme.breakpoints.up("md")]: {
          maxWidth: 380,
        },
      },
    },
    gridItem: {
      width: '25.0%',
    },
    img_fullWidth: {
      width: "100%",
      maxWidth: "none !important",
    },
    divider: {
      width: "100%",
      margin: theme.spacing(3, 0),
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(7, 0),
      },
    },
    typography: {
      h6: {
        fontFamily: 'Montserrat, Open-Sans, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '30px',
        paragraphHeight: '20px',
        letterSpacing: '.46px',
      },
      color:'#183787',
      
    },
    testAlpha: {
      width: "25%",
      backgroundColor: "#b90d87",
    },
    linkImg: {
      "& a": {
        display: "inline-block",
        border: `2px solid ${theme.palette.grey.light}`,
      },
      "& img": {
        margin: 0,
      },
      "& figcaption": {
        margin: theme.spacing(0, 0, 2, 0),
      },
    },
  }),
  { name: "StudyProgressPage" }
);

const StudyProgressPage = () => {
  const classes = useStyles();
  let { t, i18n } = useTranslation("studyprogress");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const lang = i18n.languages[0] === "en" ? "" : "-es";
  useEffect(() => {
    PubSub.publish("ANALYTICS", {
      event: "pageview",
      prop6: "Study Progress",
      prop10: t("metaData.title"),
    });
  }, [t]);

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
          {/* Section for Project Summary  */}
          {/* Grid for section title   */}
          <Grid
            container
            className={classes.grid}
            spacing={1}
            direction="row"
            justifyContent="center" alignItems="stretch" component="section"
          >
            <Grid item xs={12} md={9}>
              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent children={t("sections.1.title")} />
              </Typography>
            </Grid>
            
          </Grid>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center" alignItems="center" component="section"
          >
          <Grid item xs={12} sm={6} lg={3} sx={{ width:270, height:80}}>
          <IconCardStudy
           count={399}
            title={t('cards.0.title')}
            desc={t('cards.0.title')}
            altText={t('cards.0.title')}
            icon="study-participant-icon.svg"
          />
        </Grid>
        <Grid sx={{ width:270, height:80}} item xs={12} sm={6} lg={3}>
          <IconCardStudy
            count={47}
            // title={t('cards.1.title')}
            desc={t('cards.1.title')}
            altText={t('cards.1.title')}
            icon="study-specimen-icon.svg"
          />
        </Grid>
        <Grid sx={{ width:270, height:80}} item xs={12} sm={6} lg={3}>
          <IconCardStudy
            icon="study-cancersample-icon.svg"
            count={10}
            // title={t('cards.2.title')}
            desc={t('cards.2.title')}
            altText={t('cards.2.title')}
          />
        </Grid>
        <Grid  item xs={12} sm={6} lg={3}>
          <IconCardStudy
            icon="study-biomarker-icon.svg"
            count={67}
            // title={t('cards.3.title')}
            desc={t('cards.3.title')}
            altText={t('cards.3.title')}
          />
        </Grid>

          </Grid>
        </Box>
        <Divider className={classes.divider} />
        <Box mt={2} component="section">
          {/* Section for Charts  */}
          {/* Grid for section title  */}
          <Grid
            container
            className={classes.grid}
            spacing={1}
            alignItems="stretch"
          >
            <Grid item xs={12} md={9}>
              <Typography className={classes.typography} paragraph={true} variant="h3" component="h3">
                <RenderContent children={t("sections.2.title")} />
              </Typography>
            </Grid>
          </Grid>{" "}
          {/* end title for Charts  */}

          {/* Grid for Charts - 1st row */}
          <Grid
            container
            //className={classes.grid}
            spacing={1}
            // alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Grid
                container
                spacing={1}
                direction="column"
                // alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="center">
                  <Typography className={classes.typography} variant="h6" component="h6">
                    <RenderContent children={t("charts.PatientDemographicsCancerType.subtitle")} />
                  </Typography>
                </Grid>
                <Grid item>
                  <ReChartsPie3More
                    title="Cancer Type"
                    inputdata={dataCancerTypecolor}
                    assignedcx={150}
                    assignedcy={400}
                  ></ReChartsPie3More>
                </Grid>
              </Grid>
            </Grid>{" "}
            {/* end grid for 1st chart - 1st row */}
            <Grid item xs={12} sm={6} md={4}>
              <Grid
                container
                direction="column"
                spacing={1}
                // alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="center">
                  <Typography className={classes.typography} variant="h6" component="h6">
                    <RenderContent children={t("charts.PatientDemographicsRace.subtitle")} />
                  </Typography>
                </Grid>
                <Grid container item>
                  <ReChartsPie3More
                    title="Race"
                    inputdata={dataRacecolor}
                    assignedcx={400}
                    assignedcy={400}
                  ></ReChartsPie3More>
                </Grid>
              </Grid>
            </Grid>{" "}
            {/* end grid 2nd chart - 1st row */}
            <Grid item xs={12} sm={6} md={4}>
              <Grid
                container
                direction="column"
                spacing={1}
                // alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="center" >
                  <Typography className={classes.typography}  variant="h6"   >
                    <RenderContent children={t("charts.PatientDemographicsEthnicity.subtitle")} />
                  </Typography>
                </Grid>
                <Grid item>
                  <ReChartsPie2Less
                    title="Ethnicity"
                    inputdata={dataEthcolor}
                    assignedcx={200}
                    assignedcy={800}
                  ></ReChartsPie2Less>
                </Grid>
              </Grid>
            </Grid>{" "}
            {/* end Grid for 3rd chart - 1st row */}
          </Grid>{" "}
          {/* end Grid for Charts - 1st row */}

          {/* Grid for Charts - 2nd row */}
          <Grid
            container
            className={classes.grid}
            spacing={1}
            // alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Grid
                container
                direction="column"
                spacing={1}
                alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="center" margintop="200px">
                  <Typography className={classes.typography} variant="h6" component="h6">
                    <RenderContent children={t("charts.PatientDemographicsRuralUrban.subtitle")} />
                  </Typography>
                </Grid>

                <Grid container item >
                  <ReChartsPie2Less
                    title="Rural vs. Urban"
                    inputdata={dataGeo}
                  ></ReChartsPie2Less>
                </Grid>
              </Grid>
            </Grid>{" "}
            {/* end Grid for 1st Chart -2nd row */}
            <Grid container item xs={12} sm={6} md={4} alignItems="flex-end">
              <Grid
                container
                direction="column"
                spacing={1}
                alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="center">
                  <Typography className={classes.typography} variant="h6" component="h6">
                    <RenderContent children={t("charts.ParticipantDemographicsAge.subtitle")} />
                  </Typography>
                </Grid>
                <Grid container item margintop={6}   >
                  <ReChartsBar
                    title="Age"
                    inputdata={barDataAgecolor}
                  ></ReChartsBar>
                </Grid>
              </Grid>
            </Grid>{" "}
            {/*end grid for 2nd Chart - 2nd row */}
            <Grid container item xs={12} sm={6} md={4}  alignItems="flex-end" >
              <Grid
                container
                direction="column"
                spacing={1}
                alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="flex-end">
                  <Typography className={classes.typography}  variant="h6" component="h6" >
                    <RenderContent children={t("charts.ParticipantDemographicsSex.subtitle")} />
                  </Typography>
                </Grid>
                <Grid container item margintop={6}>
                  <ReChartsBar title="Sex" inputdata={barDataSex}></ReChartsBar>
                </Grid>
              </Grid>
            </Grid>
            {/* end Grid for 3rd Charts -2nd row */}
          </Grid> {/* end Charts -2nd row */}

          {/* Section for Charts 3rd row */}
          <Grid
            container
            className={classes.grid}
            spacing={1}
           // disableEqualOverflow 
          >
            <Grid item xs={12} sm={6} md={4}   sx ={{ my: 5 }} alignItems="flex-end" >
              <Grid
                container
                direction="column"
                spacing={1}      
               // alignItems="stretch"
              >
                <Grid container item>
                  <Typography className={classes.typography}  variant="h6" component="h6">
                    <RenderContent children={t("charts.ParticipantDemographicsBioSpecimen.subtitle")} />
                  </Typography>
                </Grid>
                <Grid container item>
                  <ReChartsBar2Sets
                    title="Biospecimens Donated by Participants"
                    inputdata={barDataBioSpecimen}
                  ></ReChartsBar2Sets>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* end grid for Charts -3rd row  */}
        </Box>
        {/* end Section for Charts  */}
      </Container>
    </Box>
  );
};

export default StudyProgressPage;

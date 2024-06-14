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
import ReChartsPie2Less from "../../components/Charts/ReChartsPie2Less";
import ReChartsPie3More from "../../components/Charts/ReChartsPie3More";
import ReChartsBar from "../../components/Charts/ReChartsBar";
import getAPI from "../../data";
import TabAboutBar from "./AboutBar";

const COLORS = [
  "#246AD4",
  "#61A1EC",
  "#A5D3FE",
  "#FFCF54",
  "#F294B0",
  "#74F2AE",
  "#987DC4",
];

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

  const [dblastUpdatedDate, setDBLastUpdatedDate] = useState(Date.parse('2024-06-24'));

  const [projectSummary, setProjectSummary] = useState([]);
  const [dataCancerType, setDataCancerType] = useState([]);
  const [dataRace, setDataRace] = useState([]);
  const [dataEth, setDataEth] = useState([]);
  const [dataRuralUrban, setDataRuralUrban] = useState([]);
  const [barDataSex, setBarDataSex] = useState([]);
  const [barDataAge, setBarDataAge] = useState([]);
  const [barDataBioSpecimenParticipants, setBarDataBioSpecimenParticipants] = useState([]);
 
  useEffect(() => {
    PubSub.publish("ANALYTICS", {
      event: "pageview",
      prop6: "Study Progress",
      prop10: t("metaData.title"),
    });
   
  }, [t]);

  useEffect(() => {
    getAPI.then(api => {
      api.getChartData().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        console.dir(resp);
        setProjectSummary(resp["projectSummary"][0]);
        setDBLastUpdatedDate(resp["projectSummary"][0].lastRevisedDate);
        setDataCancerType(resp["cancerType"]);
        setDataEth(resp["patientEthnicity"]);
        setDataRace(resp["patientRace"]);
        setBarDataAge(resp["patientAge"]);
        setDataRuralUrban(resp["ruralUrban"].map((data, index) => {
          console.log(" rual " + data.label)
          data.fill = (data.label).includes(".Urban")? "#246AD4": "#61A1EC"; 
          return data;
        }));
       
        setBarDataSex(resp["patientSex"].map((data, index) => {
          data.fill = (data.label).includes("Female")?"#FFCF54": "#A5D3FE" ; 
          return data;
        }));
        setBarDataBioSpecimenParticipants(resp["bioSpecimenParticipants"]);
      })
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  const dataCancerTypecolor = dataCancerType.map((data, index) => {
    data.fill = COLORS[index%COLORS.length];
    data.name = t(data.label)?? data.name;
    return data;
  });
  const dataRacecolor = dataRace.map((data, index) => {
    data.fill = COLORS[index%COLORS.length];
    data.name = t(data.label)?? data.name;
    return data;
  });
  
  const dataEthcolor = dataEth.map((data, index) => {
    data.fill = COLORS[index%COLORS.length];
    data.name = t(data.label);
    return data;
  });
  
  const barDataAgecolor = barDataAge.map((data, index) => {
    data.fill = COLORS[index%COLORS.length];
    data.name = data.label;
    return data;
  });
  
  const dataRuralUrbancolor = dataRuralUrban.map((data, index) => {
     data.name = t(data.label);
    return data;
  });
  
  const barDataSexcolor = barDataSex.map( (data, index) => {
    data.name = t(data.label);
    return data;
  });


   const barDataBioSpecimenParticipantsColor = barDataBioSpecimenParticipants.map((data, index) => {
    data.fill = COLORS[index];
    data.name = t(data.label);
    return data;
  });

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
                <RenderContent children={t("sections.0.body", {lastUpdateDate : dblastUpdatedDate})} />
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
           count={projectSummary.participantsCount}
            title={t('cards.ParticipantsCount.title')}
            desc={t('cards.ParticipantsCount.title')}
            altText={t('cards.ParticipantsCount.title')}
            icon="study-participant-icon.svg"
          />
        </Grid>
        <Grid sx={{ width:270, height:80}} item xs={12} sm={6} lg={3}>
          <IconCardStudy
            count={projectSummary.sitesCount}
            title={t('cards.SitesCount.title')}
            desc={t('cards.SitesCount.title')}
            altText={t('cards.SitesCount.title')}
            icon="study-specimen-icon.svg"
          />
        </Grid>
        <Grid sx={{ width:270, height:80}} item xs={12} sm={6} lg={3}>
          <IconCardStudy
            icon="study-cancersample-icon.svg"
            count={projectSummary.cancerTypesCount}
            title={t('cards.CancerTypesCount.title')}
            desc={t('cards.CancerTypesCount.title')}
            altText={t('cards.CancerTypesCount.title')}
          />
        </Grid>
        <Grid  item xs={12} sm={6} lg={3}>
          <IconCardStudy
            icon="study-biomarker-icon.svg"
            count={projectSummary.bioMarkerReturnedCount}
            title={t('cards.BioMarkerReturnedCount.title')}
            desc={t('cards.BioMarkerReturnedCount.title')}
            altText={t('cards.BioMarkerReturnedCount.title')}
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
                    inputdata={dataRuralUrbancolor}
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
                  <ReChartsBar title="Sex" inputdata={barDataSexcolor}></ReChartsBar>
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
            <Grid item xs={12} sm={6} md={4}   sx ={{ my: 5 }} >
              <Grid
                container
                direction="column"
                spacing={1}      
               // alignItems="stretch"
              >
                <Grid container item justifyContent="center" alignItems="flex-end">
                  <Typography className={classes.typography}  variant="h6" component="h6">
                    <RenderContent children={t("charts.ParticipantDemographicsBioSpecimen.subtitle")} />
                  </Typography>
                </Grid>
                <Grid container item margintop={6}>
                  <ReChartsBar
                    title="Biospecimens"
                    inputdata={barDataBioSpecimenParticipantsColor}
                  ></ReChartsBar>
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

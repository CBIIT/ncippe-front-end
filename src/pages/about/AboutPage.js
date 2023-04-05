import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Box, Container, Divider, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import Charts from "../../components/Charts/Charts";

const useStyles = makeStyles( theme => ({
  grid: {
    justifyContent: 'flex-start',
    '& img': {
      display: 'inline-block',
      maxWidth: 600,
      margin: theme.spacing(1,0,3)
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
    margin: theme.spacing(3,0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(7,0)
    }
  },
 testAlpha:{
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
      margin: theme.spacing(0,0,2,0),
    }
  }
}),{name: 'AboutPage'})

const AboutPage = () => {
  let TESTING = true;
  let handleClick = () =>{
        console.log('MHL handleClick');
    }
  const classes = useStyles();
  const { t, i18n } = useTranslation('about');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lang = i18n.languages[0] === 'en' ? "" : "-es"
  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'About the Biobank',
      prop10: t("metaData.title"),
    })
  },[t])


  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/about`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/about`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent children={t('pageTitle')} />
        </Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={5} component="section">
          <Grid container className={classes.grid} spacing={2} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.0.title')} />
              </Typography>
              { isMobile && <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')} />}
              <Typography paragraph={true} variant="h3" component="h3">
                <RenderContent children={t('sections.0.subtitle')} />
              </Typography>

                <div>
                    {TESTING ? (
                        <section>
                            <button onClick={handleClick}>Test server</button>
                            <hr/>
                            { isMobile && <h2>isMobile</h2>}
                            { ! isMobile && <h2>NOT isMobile</h2>}

                                <Grid item xs={12} md={6}>
                                    <Charts
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
                                                chartId={1}
                                                chartType={1}
                                                chartSize={2}
                                                svgId={2}
                                                isMobile={isMobile}
                                                chartTitle={t('charts.PatientDemographics.title') }
                                                chartSubtitle={t('charts.PatientDemographics.subtitle')}
                                            ></Charts>
                                        </Grid>
                                 ) : (
                                      <Grid item xs={12} md={6}>
                                            <p>Pie chart "Patient Demographics" - Full size</p>

                                            <Charts
                                                chartId={1}
                                                chartType={1}
                                                chartSize={0}
                                                svgId={2}
                                                isMobile={isMobile}
                                                chartTitle={t('charts.PatientDemographics.title') }
                                                chartSubtitle={t('charts.PatientDemographics.subtitle')}
                                            ></Charts>
                                        </Grid>
                                     ) }


                            {/* Bar chart "Participant Demographic Age" - Full size */}
                            <Grid item xs={12} md={6}>
                                <Charts
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
                <RenderContent children={t('sections.0.body')} />
              </Typography>



            </Grid>
            { !isMobile &&
            <Grid className={classes.gridItemImg} item xs={12} md={6} component="aside">
              <ArticleImage src="father-son.jpg" alt={t('sections.0.alt_text')} />
            </Grid>
            }

            <Divider className={classes.divider} />

            <Grid item xs={12} md={9}>
              <Typography paragraph={true} variant="h2" component="h2">
                <RenderContent children={t('sections.1.title')} />
              </Typography>

              <Typography component="div">
                <RenderContent children={t('sections.1.intro')} />
              </Typography>
              </Grid>

              <Grid item xs={12}>
              <figure className={classes.linkImg}>
                <a href={`${process.env.PUBLIC_URL}/assets/documents/How-Biobank-Works${lang}.pdf`} rel="noopener noreferrer" target="_blank">
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
                <figcaption><RenderContent children={t('sections.1.caption')} /></figcaption>
              </figure>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography component="div">
                <RenderContent children={t('sections.1.body')} />
              </Typography>
            </Grid>


          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage

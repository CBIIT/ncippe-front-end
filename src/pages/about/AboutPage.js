import React, {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Box, Container, Divider, Grid, Typography, useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material/styles';

import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import ArticleImage from '../../components/utils/ArticleImage'
import TabAboutBar from './AboutBar';
import { gridItemImgSx } from '../../theme/homePageStyles';

const AboutPage = () => {
    let {t, i18n} = useTranslation('about');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
            <TabAboutBar value={0} />
            <Container className="mainContainer mainContainer--public">
                <Box mt={5} component="section">
                    <Grid container sx={{  justifyContent: 'flex-start',
                    '& img': {
                        display: 'inline-block',
                        maxWidth: 600,
                        margin: theme.spacing(1, 0, 3),
                    }, }} spacing={2} alignItems="stretch">
                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <Typography paragraph={true} variant="h2" component="h2">
                                <RenderContent children={t('sections.0.title')}/>
                            </Typography>
                            {isMobile && <ArticleImage src="triple-pictures.jpg" alt={t('sections.0.alt_text')}/>}
                            <Typography paragraph={true} variant="h3" component="h3">
                                <RenderContent children={t('sections.0.subtitle')}/>
                            </Typography>

                            <Typography component="div">
                                <RenderContent children={t('sections.0.body')}/>
                            </Typography>


                        </Grid>
                        {!isMobile &&
                        <Grid
                            sx={ gridItemImgSx}
                            component="aside"
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <ArticleImage src="triple-pictures.jpg" alt={t('sections.0.alt_text')}/>
                        </Grid>
                        }

                        <Divider sx={{ width: '100%', margin: theme.spacing(3, 0),
                            [theme.breakpoints.up('md')]: {
                            margin: theme.spacing(7, 0),},  }} />

                        <Grid
                            size={{
                                xs: 12,
                                md: 9
                            }}>
                            <Typography paragraph={true} variant="h2" component="h2">
                                <RenderContent children={t('sections.1.title')}/>
                            </Typography>

                            <Typography component="div">
                                <RenderContent children={t('sections.1.intro')}/>
                            </Typography>
                        </Grid>

                        <Grid size={12}>
                            <Box component="figure" sx={{ '& a': {
                                    display: 'inline-block',
                                    border: `2px solid ${theme.palette.grey.light}`,
                                },
                                '& img': {
                                    margin: 0, width: '100%',
                                    maxWidth: 'none !important',
                                },
                                '& figcaption': {
                                    margin: theme.spacing(0, 0, 2, 0),
                                },}}>
                                <a href={`${process.env.PUBLIC_URL}/assets/documents/How-Biobank-Works${lang}.pdf`}
                                   rel="noopener noreferrer" target="_blank">
                                    {/* <BodyImage src={`how-biobank-works${lang}.jpg`} alt={t('sections.1.alt_text')} /> */}
                                    <Box component="img" sx={{ width: '100%',  maxWidth: 'none !important', }}
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
                            </Box>
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 9
                            }}>
                            <Typography component="div">
                                <RenderContent children={t('sections.1.body')}/>
                            </Typography>
                        </Grid>


                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default AboutPage

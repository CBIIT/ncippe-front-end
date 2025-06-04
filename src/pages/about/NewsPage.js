import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Box, Container, Divider, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';

import PubSub from 'pubsub-js'

import getAPI from '../../data'

import RenderContent from '../../components/utils/RenderContent'
import NewsEventsTable from '../../components/NewsEvents/NewsEventsTable'
import TabAboutBar from './AboutBar'

const NewsPage = () => {
  const { t, i18n } = useTranslation('news')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const lang = i18n.languages[0] === 'en' ? "" : "-es"
  const [newsData, setNewsData] = useState([])
  const [eventsData, setEventsData] = useState([])

  useEffect(() => {
    PubSub.publish('ANALYTICS', {
      event:'pageview',
      prop6: 'News and Events',
      prop10: t("metaData.title"),
    })
  },[t])

  useEffect(() => {
    getAPI.then(api => {
      api.getNewsEvents().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        setNewsData(resp.filter(items => items.contentType === "news").sort((a, b) => (b.publishedDate - a.publishedDate)))
        setEventsData(resp.filter(items => items.contentType === "event").sort((a, b) => (b.publishedDate - a.publishedDate)))
      })
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  return (
    <Box component="article">
      <Helmet>
        <title>{t("metaData.title")}</title>
        <meta name="title" content={t("metaData.title")} />
        <meta property="og:title" content={t("metaData.OG_title")} />
        <meta name="description" content={t("metaData.description")} />
        <meta property="og:description" content={t("metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/news`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/news`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">
          <RenderContent children={t('pageTitle')} />
        </Typography>
      </Container>
      <TabAboutBar value={2} />
      <Container className="mainContainer mainContainer--public">
        <Box mt={5} component="section">
          <Typography paragraph={true} variant="h2" component="h2">
            <RenderContent children={t('eventsTitle')} />
            <NewsEventsTable data={eventsData} />
          </Typography>
        </Box>
        <Box mt={5} component="section">
          <Typography paragraph={true} variant="h2" component="h2">
            <RenderContent children={t('newsTitle')} />
            <NewsEventsTable data={newsData} />
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default NewsPage
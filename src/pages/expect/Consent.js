import React from 'react'
import { Box, Card, CardMedia, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import RenderContent from '../../components/utils/RenderContent'

import TabPanel from '../../components/Tabs/TabPanel'

const useStyles = makeStyles( theme => ({
  container: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74%'
    },
    [theme.breakpoints.up('md')]: {
      width: '64%'
    }
  },
  videoPlaceholder: {
    width: 470,
    height: 264,
    backgroundColor: "#d8d8d8",
    padding: theme.spacing(3)
  },
  iconLink: {
    display: 'block',
    margin: theme.spacing(1,0),
  },
  mediaWrapper: {
    position: 'relative',
    paddingBottom: '56.25%' /* 16:9 */,
    height: 0,

    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
}))

const Consent = (props) => {
  const {index, isMobile} = props
  const classes = useStyles()
  const { t, i18n } = useTranslation('consent')

  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
    <Box className={classes.container}>
      <Typography variant={isMobile ? "body1" : "body2"} component="div">
        <RenderContent source={t('intro_text')} />
      </Typography>
      <Box mb={5}>
        <Typography variant="h3" component="h3">{t('sample_title')}</Typography>
        <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="button" rel="noopener noreferrer" target="_blank">
          <RenderContent source={t('form_link_adult')} />
        </Link>
        <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="button" rel="noopener noreferrer" target="_blank">
          <RenderContent source={t('form_link_parental')} />
        </Link>
        <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="button" rel="noopener noreferrer" target="_blank">
          <RenderContent source={t('form_link_minors')} />
        </Link>
      </Box>
      <Card>
        <div className={classes.mediaWrapper}>
          <CardMedia
            component='iframe'
            className={classes.media}
            src='https://www.youtube.com/embed/OyCFbZYgL3U'
            title={t('video_title')}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </Card>
    </Box>
  </TabPanel>
  )
}

export default Consent
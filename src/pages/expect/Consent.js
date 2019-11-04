import React from 'react'
import { Box, Card, CardMedia, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'

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
    display: 'inline-flex',
    alignItems: 'center',
    margin: theme.spacing(3,0,4),
    '& svg': {
      marginLeft: 4
    }
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

  return (
    <TabPanel
      index={index} 
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
    <Box className={classes.container}>
      <Typography variant={isMobile ? "body1" : "body2"}>After you and your doctor discuss the Biobank and you decide you'd like to take part, you’ll be given a consent form to review and sign. Participation in the Biobank is voluntary and deciding not to participate won’t affect your care. You can also leave the program at any time.</Typography>
      <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="h4" rel="noopener noreferrer" target="_blank">Review a sample adult consent form <OpenInNewIcon /></Link>
      <Card>
        <div className={classes.mediaWrapper}>
          <CardMedia
            component='iframe'
            className={classes.media}
            src='https://www.youtube.com/embed/OyCFbZYgL3U'
            title='A Dialogue on Cancer Disparities, Prevention, and Research: Facebook Live'
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
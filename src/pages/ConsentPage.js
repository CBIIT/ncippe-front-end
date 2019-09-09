import React from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import NoItems from '../components/NoItems/NoItems'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContainer: {
    backgroundColor: theme.palette.primary.lightGrey,
    backgroundImage: `url(/${process.env.PUBLIC_URL}assets/images/soft-diamond-background-short.svg)`,
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: '110px',
    padding: theme.spacing(5),
    flexGrow: 1,
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
  aside: {
    marginTop: theme.spacing(3),
    backgroundColor: '#E5E8EB',
    padding: theme.spacing(3),
    minHeight: '455px',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(4),
      marginTop: 0
    }
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Breadcrumbs pageName="Consent Page" />
      <Container className={classes.mainContainer}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6}>
            <div className={classes.titleWithIcon}>
              <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/reports.svg`} alt='patient icon' aria-hidden="true"></img>
              <Typography variant="h2" component="h2">Consent forms</Typography>
            </div>
            <Typography>When you signed up for the Biobank program, you signed at least one consent form. Please download and save this form in your records.</Typography>
            {/* TODO: conditionally show consent form or no items */}
            <NoItems message="Your consent forms are not available at this time." />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.aside}></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
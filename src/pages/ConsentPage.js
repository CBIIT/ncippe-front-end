import React, { useContext, useState } from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { LoginContext } from '../components/login/SharedLogin/Login.context'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import TestResultsItem from '../components/TestResults/TestResultsItem'
import NoItems from '../components/NoItems/NoItems'

const useStyles = makeStyles(theme => ({
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

export default (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {otherDocuments: files} = loginContext
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Consent Page" />
      <Container className="mainContainer">
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6}>
            <div className={classes.titleWithIcon}>
              <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/reports.svg`} alt='patient icon' aria-hidden="true"></img>
              <Typography variant="h2" component="h2">Consent forms</Typography>
            </div>
            <Box mb={3}>
              <Typography>When you signed up for the Biobank program, you signed at least one consent form. Please download and save this form in your records.</Typography>
            </Box>
            {files ? 
              files.map((file,i) => <TestResultsItem key={i} report={file} noBadge />)
              : 
              <NoItems message="Your consent forms are not available at this time." />
            }
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.aside}></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
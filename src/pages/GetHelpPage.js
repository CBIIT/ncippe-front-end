import React from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

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

export default () => {
  const classes = useStyles()
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Get Help" />
      <Container className="mainContainer">
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6}>
            <div className={classes.titleWithIcon}>
              <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/get-help.svg`} alt='patient icon' aria-hidden="true"></img>
              <Typography variant="h2" component="h2">Get help</Typography>
            </div>
            <Typography>Get help placeholder page</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.aside}></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
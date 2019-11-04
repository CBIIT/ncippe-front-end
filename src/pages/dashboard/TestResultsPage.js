import React from 'react'
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import TestResults from '../../components/TestResults/TestResults'

const useStyles = makeStyles(theme => ({
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

export default ({userName}) => {
  const classes = useStyles()
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Reports" />
      <Container className="mainContainer">
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6}>
            <TestResults userName={userName} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.aside}></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
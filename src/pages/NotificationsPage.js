import React from 'react'
import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

const useStyles = makeStyles(theme => ({
  header: {
    margin: `${theme.spacing(3)}px 0`
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <Box my={0} mx={0}>
      <Breadcrumbs pageName="Notifications" />
      <Container>
        <Typography variant="h2" className={classes.header}>
          Notifications
        </Typography>
        Notifications Page placeholder
      </Container>
    </Box>
  )
}
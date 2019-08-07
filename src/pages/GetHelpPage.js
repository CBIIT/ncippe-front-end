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
      <Breadcrumbs pageName="Get Help" />
      <Container>
        <Typography variant="h2" className={classes.header}>
          Get Help
        </Typography>
        Get Help Page Placeholder
      </Container>
    </Box>
  )
}
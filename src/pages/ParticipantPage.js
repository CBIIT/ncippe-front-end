import React from 'react'
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ParticipantView from '../components/ParticipantView/ParticipantView'

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
}))

export default ({userName}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Breadcrumbs pageName="Reports" />
      <Container className={classes.mainContainer}>
        <ParticipantView userName={userName} />
      </Container>
    </Box>
  )
}
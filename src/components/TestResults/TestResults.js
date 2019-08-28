import React, { useContext, useEffect, useState } from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../../data/api'
import { LoginContext } from '../login/SharedLogin/Login.context'
import TestResultsItem from './TestResultsItem'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(3, 0)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}))

const TestResults = () => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [reports, setReports] = useState(false)

  useEffect(() => {
    const {reports} = loginContext
    if(reports && reports.length > 0) {
      setReports(reports)
    }
  }, [])

  return (
    <>
      <Typography variant="h2" className={classes.header}>
        Biomarker Tests
      </Typography>
      {reports ? (
        <>
          <Typography gutterBottom>The NCI lab generates a biomarker report after we collect your biosample. Your reports are available below. Your provider has access to your reports as well.</Typography>
          <Divider className={classes.divider} />
          <Grid container className={classes.controlsGrid} spacing={3} alignItems="stretch">
            {reports && reports.map((report,i) => <TestResultsItem key={i} report={report} />)}
          </Grid>
        </>
      ) : (
        <>
          <Divider className={classes.divider} />
          <Typography>After we collect your first biosample, an NCI lab will [do something with it] and you will be able to access the results here. We will also send your report to your healthcare provider.</Typography>
        </>
      )}
    </>
  )
}

export default TestResults
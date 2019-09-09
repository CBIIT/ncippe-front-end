import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginContext } from '../login/SharedLogin/Login.context'
import TestResultsItem from './TestResultsItem'
import NoItems from '../NoItems/NoItems'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
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
      <div className={classes.titleWithIcon}>
        <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/biomarker-tests.svg`} alt='patient icon' aria-hidden="true"></img>
        <Typography variant="h2" component="h2">Biomarker tests</Typography>
      </div>
      {reports ? (
        <>
          <Box mb={3}>
            <Typography gutterBottom>The NCI lab generates a biomarker report after we collect your biosample. Your reports are available below. Your provider has access to your reports as well.</Typography>
          </Box>
          {reports && reports.map((report,i) => <TestResultsItem key={i} report={report} />)}
        </>
      ) : (
        <>
          <Typography>After we collect your first biosample, an NCI lab will [do something with it] and you will be able to access the results here. We will also send your report to your healthcare provider.</Typography>
          <NoItems message="You have no reports at this time." />
        </>
      )}
    </>
  )
}

export default TestResults
import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginContext } from '../login/Login.context'
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
  const [loginContext] = useContext(LoginContext)
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
        <Typography variant="h2" component="h2">Biomarker reports</Typography>
      </div>
        <Box mb={3}>
          <Typography gutterBottom>Please download and save your biomarker report in your records. A copy has also been sent to your provider.</Typography>
        </Box>
        { reports ? 
          reports.map((report,i) => <TestResultsItem key={i} report={report} />)
          :
          <NoItems message="You have no reports<br/> at this time." />
        }
    </>
  )
}

export default TestResults
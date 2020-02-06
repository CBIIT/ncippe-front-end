import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('a_common')

  useEffect(() => {
    const {reports} = loginContext
    if(reports && reports.length > 0) {
      setReports(reports)
    }
  }, [])

  return (
    <>
      <div className={classes.titleWithIcon}>
        <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/biomarker-tests.svg`} alt={t('a_common:icons.biomarker_test')} aria-hidden="true"></img>
        <Typography variant="h2" component="h2">{t('components.biomarkerView.pageTitle')}</Typography>
      </div>
        <Box mb={3}>
          <Typography gutterBottom>{t('components.biomarkerView.description')}</Typography>
        </Box>
        { reports && reports.length > 0 ? 
          reports.map((report,i) => <TestResultsItem key={i} report={report} />)
          :
          <NoItems message={t('components.biomarkerView.no_results.participant')} />
        }
    </>
  )
}

export default TestResults
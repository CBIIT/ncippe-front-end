import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoginContext } from '../login/Login.context'
import TestResultsItem from './TestResultsItem'
import NoItems from '../NoItems/NoItems'

const TestResults = () => {
  const [loginContext] = useContext(LoginContext)
  const [testReports, setTestReports] = useState(false)
  const { t } = useTranslation('a_common')
  const {reports} = loginContext

  useEffect(() => {
    if(reports && reports.length > 0) {
      setTestReports(reports)
    }
  }, [reports])

  return (
    testReports && testReports.length > 0 ? 
      testReports.map((testReport,i) => <TestResultsItem key={i} report={testReport} />)
      :
      <NoItems message={t('components.biomarkerView.no_results.participant')} />
  )
}

export default TestResults
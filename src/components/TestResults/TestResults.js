import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoginContext } from '../login/Login.context'
import TestResultsItem from './TestResultsItem'
import NoItems from '../NoItems/NoItems'

const TestResults = () => {
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
    reports && reports.length > 0 ? 
      reports.map((report,i) => <TestResultsItem key={i} report={report} />)
      :
      <NoItems message={t('components.biomarkerView.no_results.participant')} />
  )
}

export default TestResults
import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import NoItems from '../NoItems'

const ReportList = ({ reports }) => {
  const { t } = useTranslation('a_common')

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2 }}>{t('components.reportList.prev_uploaded')}</Typography>
      {reports && reports.length > 0 ? 
        reports.map((report,i) =>
          <Card key={i} sx={{ mb: 2 }} elevation={25}>
            <CardContent>
              <Typography className="breakAll" variant="h3" component="h3">{report.fileName}</Typography>
              <Typography>{t('components.testResultItem.uploaded')} {moment(report.dateUploaded).format("MMM DD, YYYY")}</Typography>
            </CardContent>
          </Card>
        )
        :
        <NoItems message={t('components.biomarkerView.no_results.participant')} />
      }
    </>
  )
}

export default ReportList
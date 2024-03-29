import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import NoItems from '../NoItems'

const useStyles = makeStyles( theme => ({
  title: {
    marginBottom: theme.spacing(2)
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}),{name: 'ReportList'})

const ReportList = (props) => {
  const classes = useStyles()
  const { reports } = props
  const { t } = useTranslation('a_common')

  // console.log("reports", reports)

  return (
    <>
      <Typography variant="h3" className={classes.title}>{t('components.reportList.prev_uploaded')}</Typography>
      {reports && reports.length > 0 ? 
        reports.map((report,i) =>
          <Card key={i} className={classes.card} elevation={25}>
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
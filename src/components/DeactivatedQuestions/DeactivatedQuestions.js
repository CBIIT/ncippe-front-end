import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles( theme => ({
  deactivationQuestions: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4, 3),
  },
  questions: {
    borderBottom: '2px solid #ccc',
    padding: theme.spacing(3, 0),
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  question: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const DeactivatedQuestions = (props) => {
  const {user} = props
  const classes = useStyles()
  const { t } = useTranslation('a_common')

  return (
    <Paper className={classes.deactivationQuestions} elevation={1} id="deactivationQuestions">
      <Typography className={classes.cardTitle} variant="h3" component="h3">{user.firstName} {user.lastName} {t('components.deactivated_questions.left')} {moment(user.dateDeactivated).format("MMM DD, YYYY")}</Typography>
      {user.questionAnswers.map((q,i) => <div className={classes.questions} key={i}>
        <Typography className={classes.question}>{q.question}</Typography>
        <Typography>{q.answer ? q.answer : t('components.deactivated_questions.no_response')}</Typography>
      </div>)}
    </Paper>
  )
}

export default DeactivatedQuestions
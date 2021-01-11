import React from 'react'
import PropTypes from 'prop-types'
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
}),{name: 'DeactivatedQuestions'})

/**
 * This component will render on the Account Setting page if the user has deactivated their account
 */
const DeactivatedQuestions = (props) => {
  const {user} = props
  const classes = useStyles()
  const { t } = useTranslation('a_common')

  return (
    <Paper className={classes.deactivationQuestions} elevation={25} id="deactivationQuestions">
      <Typography className={classes.cardTitle} variant="h3" component="h3">{user.firstName} {user.lastName} {t('components.deactivated_questions.left')} {moment(user.dateDeactivated).format("MMM DD, YYYY")}</Typography>
      {user.questionAnswers.map((q,i) => <div className={classes.questions} key={i}>
        <Typography className={classes.question}>{q.question}</Typography>
        <Typography>{q.answer ? q.answer : t('components.deactivated_questions.no_response')}</Typography>
      </div>)}
    </Paper>
  )
}

DeactivatedQuestions.displayName = "DeactivatedQuestions"
DeactivatedQuestions.propTypes = {
  /**
   * data object (from Login context) containing the questions this user answered before deactivating their account
   */
  user: PropTypes.shape({
    /**
     * user's first name
     */
    firstName: PropTypes.string.isRequired,
    /**
     * user's last name
     */
    lastName: PropTypes.string.isRequired,
    /**
     * date the user deactivated their account as a raw timestamp
     */
    dateDeactivated: PropTypes.number.isRequired,
    /**
     * array of questions that the user should have answered before deactivating their account
     */
    questionAnswers: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The question number, used for sorting
         */
        questionOrder: PropTypes.number,
        /**
         * The question
         */
        question: PropTypes.string,
        /**
         * the answer provided by the user or the admin who deactivated the account
         */
        answer: PropTypes.string
      })
    ).isRequired

  })
}

export default DeactivatedQuestions
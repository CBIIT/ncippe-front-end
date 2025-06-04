import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

/**
 * This component will render on the Account Setting page if the user has deactivated their account
 */
const DeactivatedQuestions = ({user}) => {
  const { t } = useTranslation('a_common')
  
  return (
    <Paper sx={{ mt:3, p: 4, px:3 }} elevation={25} id="deactivationQuestions">
      <Typography sx={{ fontWeight: theme => theme.typography.fontWeightBold }} variant="h3" component="h3">{user.firstName} {user.lastName} {t('components.deactivated_questions.left')} {moment(user.dateDeactivated).format("MMM DD, YYYY")}</Typography>
      {user.questionAnswers.map((q,i) => 
      <Box sx={{
            borderBottom: i !== user.questionAnswers.length - 1 ? '2px solid #ccc' : 'none',
            py: 3,
          }} key={i}>
        <Typography sx={{ fontWeight: theme => theme.typography.fontWeightBold }} >{q.question}</Typography>
        <Typography>{q.answer ? q.answer : t('components.deactivated_questions.no_response')}</Typography>
      </Box>)}
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
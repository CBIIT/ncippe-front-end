import React, { useState } from 'react'
import { Router, navigate } from '@reach/router'
import { Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ChangeParticipation from './ChangeParticipation'
import LeaveOptions from './LeaveOptions'
import LeaveQuestions from './LeaveQuestions'
import CloseAccount from './CloseAccount'


const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(5)
  },
  maxWidth: {
    maxWidth: 600
  }
}))

const Participation = (props) => {
  const classes = useStyles()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  const handleNextStep = (data) => {
    if(data === 'leave') {
      navigate(`${window.location.pathname}/leaveOptions`)
    }
    if(data === 'close') {
      navigate(`${window.location.pathname}/closeAccount`)
    }
  }

  const handleCancel = () => {
    // using state to hijack the back button so it goes back to the dashboard
    // and not back into the 'change participation' workflow
    // navigate('../', {state: {
    //   forceNavigation: '/account'
    // }})
    const isParticipant = window.location.pathname.includes("/profile")
    navigate(isParticipant ? '/account/profile' : window.location.pathname.match(/^.*\/participant\/.{8}/)[0], {
      state: {
        forceNavigation: '/account'
      }
    })
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <div className={classes.maxWidth}>
        <Router>
          <ChangeParticipation isMobile={isMobile} path="/" nextStep={handleNextStep} cancel={handleCancel} />
          <LeaveOptions isMobile={isMobile} path="leaveOptions" cancel={handleCancel} />
          <LeaveQuestions isMobile={isMobile} path="leaveQuestions" cancel={handleCancel} />
          <CloseAccount isMobile={isMobile} path="closeAccount" cancel={handleCancel} />
        </Router>
      </div>
    </Paper>
  )
}

export default Participation
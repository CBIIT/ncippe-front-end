import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Box, Paper} from '@mui/material'
// import ChangeParticipation from './ChangeParticipation'
// import LeaveOptions from './LeaveOptions'
// import LeaveQuestions from './LeaveQuestions'
// import CloseAccount from './CloseAccount'

const Participation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600) // TODO: add resize, orientation change event listener
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    const resizeEvt = () => {
      setIsMobile(window.innerWidth < 600)
    }
    window.addEventListener('resize', resizeEvt, {passive: true})
    //clean up
    return () => window.removeEventListener('resize', resizeEvt, {passive: true})
  },[isMobile])

  const handleNextStep = (data) => {
    if(data === 'leave') {
      navigate('leaveOptions')
    }
    if(data === 'close') {
      navigate('closeAccount')
    }
  }

  const handleCancel = () => {
    // using state to hijack the back button so it goes back to the dashboard
    // and not back into the 'change participation' workflow
    // navigate('../', {state: {
    //   forceNavigation: '/account'
    // }})
    const isParticipant = location.pathname.includes("/profile")
    navigate(isParticipant ? '/account/profile' : location.pathname.match(/^.*\/participant\/.{8}/)[0], {
      state: {
        forceNavigation: '/account'
      }
    })
  }

  return (
    <Paper sx={{ p:{xs:2, sm:5 },  }} elevation={25}>
      <Box sx={{ maxWidth: { xs: '100%', sm: 600 }, mx: 'auto' }} >
        {/* All child routes are rendered here */}
        <Outlet context={{ nextStep: handleNextStep, cancel: handleCancel, isMobile  }} />
      </Box>
    </Paper>
  )
}

export default Participation
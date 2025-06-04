// src/AppWrapper.js
import React, { useEffect, useState, Suspense , lazy} from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Loading from './components/Loading'
import { Box } from '@mui/material'
import './RouteTransitions.css'
import App from './App'


const AppWrapper = () => {
  const [fontsReady, setFontsReady] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Wait for all fonts to finish loading before showing content
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  if (!fontsReady) {
    return (
      <Box sx={{ background: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading />
      </Box>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <TransitionGroup component={null}>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <App />
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  )
}

export default AppWrapper

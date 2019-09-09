import React from 'react'
import { Location, Router, Redirect } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import DashboardMochaPage from '../pages/DashboardMochaPage'
import NotificationsPage from '../pages/NotificationsPage'
import TestResultsPage from '../pages/TestResultsPage'
import ParticipantPage from '../pages/ParticipantPage'
import ConsentPage from '../pages/ConsentPage'
import ProfilePage from '../pages/ProfilePage'
import GetHelpPage from '../pages/GetHelpPage'

import { LoginConsumer } from '../components/login/SharedLogin/Login.context'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <LoginConsumer>
      {([state]) => {
        return state.auth ? <Component {...rest} /> : <Redirect from="" to="/" noThrow />
      }}
    </LoginConsumer>
  )
}

export default () => (
  <Location>
    {({ location }) => (
      <>
      <TransitionGroup>
        <CSSTransition 
          key={location.key}
          timeout={location.pathname.match(/\/dashboard\//) ? 350 : 550}
          classNames={location.pathname.match(/\/dashboard\//) ? 'zoom' : 'fade'}
        >
          <Router location={location} primary={false}>
            <HomePage path='/' />
            <PrivateRoute path='/dashboard' component={DashboardPage} />
            <PrivateRoute path='/dashboard-mocha' component={DashboardMochaPage} />
            <PrivateRoute path='/dashboard/notifications' component={NotificationsPage} />
            <PrivateRoute path='/dashboard/consent' component={ConsentPage} />
            <PrivateRoute path='/dashboard/tests' component={TestResultsPage} />
            <PrivateRoute path='/dashboard/participant/:userName' component={ParticipantPage} />
            <PrivateRoute path='/dashboard/profile' component={ProfilePage} />
            <PrivateRoute path='/dashboard/help' component={GetHelpPage} />
            <NotFoundPage default />
          </Router>
        </CSSTransition>
      </TransitionGroup>
      </>
    )}
  </Location>
)

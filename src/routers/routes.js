import React from 'react'
import { Location, Router, Redirect } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// import NotFound from '../pages/NotFoundPage'
import Home from '../pages/HomePage'
import WhatToExpect from '../pages/WhatToExpectPage'
import Privacy from '../pages/PrivacyPage'
import Dashboard from '../pages/DashboardPage'
import SignInCallback from '../pages/SignInCallback'
import Errors from '../pages/ErrorPage' // 'Error' is reserved keyword
import DashboardMocha from '../pages/DashboardMochaPage'
import MockUsersPage from '../pages/MockUsersPage'
import NotificationsPage from '../pages/NotificationsPage'
import TestResultsPage from '../pages/TestResultsPage'
import ParticipantPage from '../pages/ParticipantPage'
import ConsentPage from '../pages/ConsentPage'
import ProfilePage from '../pages/ProfilePage'
import ParticipationPage from '../pages/ParticipationPage'
import GetHelpPage from '../pages/GetHelpPage'

import Activate from '../pages/ActivatePage'
import pageWrapper from '../pages/pageWrapper'
import { LoginConsumer } from '../components/login/Login.context'

const HomePage = pageWrapper(Home)
const DashboardPage = pageWrapper(Dashboard)
const DashboardMochaPage = pageWrapper(DashboardMocha)
const WhatToExpectPage = pageWrapper(WhatToExpect)
const PrivacyPage = pageWrapper(Privacy)
const ActivatePage = pageWrapper(Activate)
const SignInCallbackPage = pageWrapper(SignInCallback)
const ErrorPage = pageWrapper(Errors)

// const NotFoundPage = pageWrapper(NotFound)


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
      <TransitionGroup className="transitionGroup" component={null}>
        <CSSTransition 
          key={location.key}
          timeout={location.pathname.match(/\/dashboard\//) ? 350 : 550}
          classNames={location.pathname.match(/\/dashboard\//) ? 'zoom' : 'fade'}
          className="transitionGroup"
        >
          <Router location={location} primary={false}>
            <HomePage path='/' />
            <ActivatePage path='/activate' />
            <SignInCallbackPage path='/signin' />
            <ErrorPage path='/error' />
            <PrivacyPage path='/privacy' />
            <PrivateRoute path='/dashboard' component={DashboardPage} />
            <MockUsersPage path='/mock-users' />
            <PrivateRoute path='/dashboard-mocha' component={DashboardMochaPage} />
            <PrivateRoute path='/dashboard/notifications' component={NotificationsPage} />
            <PrivateRoute path='/dashboard/consent' component={ConsentPage} />
            <PrivateRoute path='/dashboard/tests' component={TestResultsPage} />
            <PrivateRoute path='/dashboard/participant/:patientId' component={ParticipantPage} />
            <PrivateRoute path='/dashboard/participant/:patientId/participation/*' component={ParticipationPage} />
            <PrivateRoute path='/dashboard/profile' component={ProfilePage} />
            <PrivateRoute path='/dashboard/profile/participation/*' component={ParticipationPage} />
            <PrivateRoute path='/dashboard/help' component={GetHelpPage} />
            {/* <NotFoundPage default /> */}
          </Router>
        </CSSTransition>
      </TransitionGroup>
      <Router className="transitionGroup">
        <WhatToExpectPage path='/expect/*' />
      </Router>
      </>
    )}
  </Location>
)

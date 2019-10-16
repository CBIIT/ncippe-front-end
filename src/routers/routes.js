import React from 'react'
import { Location, Router, Redirect } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// import NotFound from '../pages/NotFoundPage'
import Home from '../pages/HomePage'
import About from '../pages/about/AboutPage'
import Eligibility from '../pages/about/EligibilityPage'
import Research from '../pages/about/ResearchPage'
import WhatToExpect from '../pages/expect/WhatToExpectPage'
import Privacy from '../pages/participation/PrivacyPage'
import Dashboard from '../pages/dashboard/DashboardPage'
import SignInCallback from '../pages/dashboard/SignInCallback'
import Errors from '../pages/ErrorPage' // 'Error' is reserved keyword
import DashboardMocha from '../pages/dashboard/DashboardMochaPage'
import MockUsersPage from '../pages/MockUsersPage'
import NotificationsPage from '../pages/dashboard/NotificationsPage'
import TestResultsPage from '../pages/dashboard/TestResultsPage'
import ParticipantPage from '../pages/dashboard/ParticipantPage'
import ConsentPage from '../pages/dashboard/ConsentPage'
import ProfilePage from '../pages/dashboard/ProfilePage'
import ParticipationPage from '../pages/dashboard/ParticipationPage'
import GetHelpPage from '../pages/dashboard/GetHelpPage'
import Activate from '../pages/participation/ActivatePage'

import pageWrapper from '../pages/pageWrapper'
import { LoginConsumer } from '../components/login/Login.context'

const HomePage = pageWrapper(Home)
const AboutPage = pageWrapper(About)
const EligibilityPage = pageWrapper(Eligibility)
const ResearchPage = pageWrapper(Research)
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
            <AboutPage path='/about' />
            <EligibilityPage path='/eligibility' />
            <ResearchPage path='/research' />
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

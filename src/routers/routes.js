import React from 'react'
import { Location, Router, Redirect } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/HomePage'
import WhatToExpect from '../pages/WhatToExpectPage'
import Dashboard from '../pages/DashboardPage'
import DashboardMocha from '../pages/DashboardMochaPage'
import MockUsersPage from '../pages/MockUsersPage'
import NotificationsPage from '../pages/NotificationsPage'
import TestResultsPage from '../pages/TestResultsPage'
import ParticipantPage from '../pages/ParticipantPage'
import ConsentPage from '../pages/ConsentPage'
import ProfilePage from '../pages/ProfilePage'
import GetHelpPage from '../pages/GetHelpPage'
import pageWrapper from '../pages/pageWrapper'
import { LoginConsumer } from '../components/login/SharedLogin/Login.context'

const HomePage = pageWrapper(Home)
const DashboardPage = pageWrapper(Dashboard)
const DashboardMochaPage = pageWrapper(DashboardMocha)
const WhatToExpectPage = pageWrapper(WhatToExpect)


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
      <TransitionGroup className="transitionGroup" component={null}>
        <CSSTransition 
          key={location.key}
          timeout={location.pathname.match(/\/dashboard\//) ? 350 : 550}
          classNames={location.pathname.match(/\/dashboard\//) ? 'zoom' : 'fade'}
          className="transitionGroup"
        >
          <Router location={location} primary={false}>
            <HomePage path='/' />
            <WhatToExpectPage path='/expect' />
            <PrivateRoute path='/dashboard' component={DashboardPage} />
            <MockUsersPage path='/dashboard/mock-users' />
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
    )}
  </Location>
)

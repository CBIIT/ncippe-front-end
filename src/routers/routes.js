import React, { lazy } from 'react'
import { Location, Router, Redirect, navigate } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import pageWrapper from '../pages/pageWrapper'

// imports for public pages
import NotFound           from '../pages/NotFoundPage'
import Home               from '../pages/HomePage'
import Errors             from '../pages/ErrorPage' // 'Error' is reserved keyword
import About              from '../pages/about/AboutPage'
import Eligibility        from '../pages/about/EligibilityPage'
import Research           from '../pages/about/ResearchPage'
import AboutConsent       from '../pages/expect/Consent'
import Donate             from '../pages/expect/Donate'
import BiomarkerTest      from '../pages/expect/BiomarkerTest'
import Privacy            from '../pages/participation/PrivacyPage'
import Activate           from '../pages/participation/ActivatePage'

// imports for dashboard pages
import MockUsersPage      from '../pages/MockUsersPage'
import Dashboard          from '../pages/dashboard/DashboardPage'
import SignInCallback     from '../pages/dashboard/SignInCallback'
import DashboardMocha     from '../pages/dashboard/DashboardMochaPage'
import NotificationsPage  from '../pages/dashboard/NotificationsPage'
import TestResultsPage    from '../pages/dashboard/TestResultsPage'
import ParticipantPage    from '../pages/dashboard/ParticipantPage'
import ConsentPage        from '../pages/dashboard/ConsentPage'
import ProfilePage        from '../pages/dashboard/ProfilePage'
import ParticipationPage  from '../pages/dashboard/ParticipationPage'
import GetHelpPage        from '../pages/dashboard/GetHelpPage'
import { LoginConsumer } from '../components/login/Login.context'

const SearchResults = lazy(() => import('../pages/SearchResultsPage'))

const HomePage = pageWrapper(Home)
const AboutPage = pageWrapper(About)
const EligibilityPage = pageWrapper(Eligibility)
const ResearchPage = pageWrapper(Research)
const DashboardPage = pageWrapper(Dashboard)
const DashboardMochaPage = pageWrapper(DashboardMocha)
const AboutConsentPage = pageWrapper(AboutConsent)
const DonatePage = pageWrapper(Donate)
const TestingPage = pageWrapper(BiomarkerTest)
const ActivatePage = pageWrapper(Activate)
const PrivacyPage = pageWrapper(Privacy)
const SearchResultsPage = pageWrapper(SearchResults)
const SignInCallbackPage = pageWrapper(SignInCallback)
const ErrorPage = pageWrapper(Errors)

const NotFoundPage = pageWrapper(NotFound)

// catch relative links in the app that could not be made using @reach/router Link components
document.addEventListener('click', function(event) {
  if(event.target.dataset && event.target.dataset.route && event.target.pathname) {
    event.preventDefault()
    navigate(event.target.pathname)
  }
})

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
            <AboutPage path='/about' />
            <EligibilityPage path='/about/eligibility' />
            <ResearchPage path='/about/research' />
            <AboutConsentPage path='/expect/consent' /> 
            <DonatePage path='/expect/donate' /> 
            <TestingPage path='/expect/testing' /> 
            <ActivatePage path='/participation/activate' />
            <PrivacyPage path='/participation/privacy' />
            <SearchResultsPage path='/search' />
            <ErrorPage path='/error' />

            <SignInCallbackPage path='/signin' />
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
            <NotFoundPage default />
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
)

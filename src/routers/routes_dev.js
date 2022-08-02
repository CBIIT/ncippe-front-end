import React, { lazy } from 'react'
import { Location, Router, Redirect, navigate } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import pageWrapper from '../pages/pageWrapper/pageWrapper_dev'

// imports for public pages
import NotFound           from '../pages/NotFoundPage'
import Home               from '../pages/HomePage'
import Errors             from '../pages/ErrorPage' // 'Error' is reserved keyword
import About              from '../pages/about/AboutPage'
import Eligibility        from '../pages/about/EligibilityPage'
import News               from '../pages/about/NewsPage'
import AboutConsent       from '../pages/expect/Consent'
import Donate             from '../pages/expect/Donate'
import BiomarkerTest      from '../pages/expect/BiomarkerTest'
import Privacy            from '../pages/participation/PrivacyPage'
import Activate           from '../pages/participation/ActivatePage'
import Research           from '../pages/research/ResearchPage'
import Article            from '../pages/research/ArticlePage'
import Policy             from '../pages/PolicyPage'

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
import ResourcesPage      from '../pages/dashboard/ResourcesPage'
import SendMessagePage    from '../pages/dashboard/SendMessagePage'
import MessageHistoryPage from '../pages/dashboard/MessageHistoryPage'

import { LoginConsumer }  from '../components/login/Login.context'
import { useTranslation } from 'react-i18next'

// imports for time
import moment from 'moment'
import 'moment/locale/es'

const SearchResults = lazy(() => import('../pages/SearchResultsPage'))

const HomePage = pageWrapper(Home)
const AboutPage = pageWrapper(About)
const EligibilityPage = pageWrapper(Eligibility)
const NewsPage = pageWrapper(News)
const ResearchPage = pageWrapper(Research)
const ArticlePage = pageWrapper(Article)
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
const PolicyPage = pageWrapper(Policy)

const NotFoundPage = pageWrapper(NotFound)

// catch relative links in the app that could not be made using @reach/router Link components
document.addEventListener('click', function(event) {
  if(event.target.dataset && event.target.dataset.route && event.target.pathname) {
    event.preventDefault()
    navigate(event.target.pathname)
  }
})

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { i18n } = useTranslation()
  return (
    <LoginConsumer>
      {([state]) => {
        if(state.auth) {
          // set default language in case it's not specified
          const lang = state.lang || "en"
          // set date format based on language
          moment.locale(lang)
          if(lang !== i18n.language) {
            // Helmet doesn't like that changing languages here. Should probably be a function callback from App.js
            i18n.changeLanguage(lang)
            moment.locale(lang)
          }
          return <Component {...rest} />
        } else {
          return <Redirect from="" to="/" noThrow />
        }
      }}
    </LoginConsumer>
  )
}

const Routes = () => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transitionGroup" component={null}>
        <CSSTransition 
          key={location.key}
          timeout={location.pathname.match(/\/account\//) ? 350 : 550}
          classNames={location.pathname.match(/\/account\//) ? 'zoom' : 'fade'}
          className="transitionGroup"
        >
          <Router location={location} primary={false}>
            <HomePage path='/' />
            <AboutPage path='/about' />
            <EligibilityPage path='/about/eligibility' />
            <NewsPage path='/about/news' />
            {/* <ResearchPage path='/about/research' /> */}
            <ResearchPage path='/research' />
            <ArticlePage path='/research/:article' />
            <AboutConsentPage path='/expect/consent' /> 
            <DonatePage path='/expect/donate' /> 
            <TestingPage path='/expect/testing' /> 
            <ActivatePage path='/participation/activate' />
            <PrivacyPage path='/participation/privacy' />
            <PolicyPage path='/website-privacy-security' />
            
            <SearchResultsPage path='/search' />
            <ErrorPage path='/error' />

            <MockUsersPage path='/mock-users' />
            <SignInCallbackPage path='/signin' />
            <Redirect from="/signout" to="/" noThrow />
            
            <PrivateRoute path='/account' component={DashboardPage} />
            <PrivateRoute path='/account-mocha' component={DashboardMochaPage} />
            <PrivateRoute path='/account/notifications' component={NotificationsPage} />
            <PrivateRoute path='/account/consent' component={ConsentPage} />
            <PrivateRoute path='/account/tests' component={TestResultsPage} />
            <PrivateRoute path='/account/participant/:patientId' component={ParticipantPage} />
            <PrivateRoute path='/account/participant/:patientId/participation/*' component={ParticipationPage} />
            <PrivateRoute path='/account/participant/:patientId/profile' component={ProfilePage} />
            <PrivateRoute path='/account/profile' component={ProfilePage} />
            <PrivateRoute path='/account/profile/participation/*' component={ParticipationPage} />
            <PrivateRoute path='/account/help' component={GetHelpPage} />
            <PrivateRoute path='/account/resources' component={ResourcesPage} />
            <PrivateRoute path='/account/sendMessage' component={SendMessagePage} />
            <PrivateRoute path='/account/messageHistory' component={MessageHistoryPage} />
            <NotFoundPage default />
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
)

export default Routes
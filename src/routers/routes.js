import React, { lazy, useContext } from 'react'
import { Location, Router, Redirect, navigate } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import pageWrapper from '../pages/pageWrapper'
import getAPI from '../data'
import { formatPhoneNumber } from '../utils/utils'

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
// import SignInCallback     from '../pages/dashboard/SignInCallback'
import DashboardMocha     from '../pages/dashboard/DashboardMochaPage'
import NotificationsPage  from '../pages/dashboard/NotificationsPage'
import TestResultsPage    from '../pages/dashboard/TestResultsPage'
import ParticipantPage    from '../pages/dashboard/ParticipantPage'
import ConsentPage        from '../pages/dashboard/ConsentPage'
import ProfilePage        from '../pages/dashboard/ProfilePage'
import ParticipationPage  from '../pages/dashboard/ParticipationPage'
import GetHelpPage        from '../pages/dashboard/GetHelpPage'
import { LoginContext, LoginConsumer }  from '../components/login/Login.context'
import { useTranslation } from 'react-i18next'

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
// const SignInCallbackPage = pageWrapper(SignInCallback)
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
  const { t, i18n } = useTranslation()
  const [loginContext, dispatch] = useContext(LoginContext)

  const getUserData = async () => {

    const params = rest.location.state.uuid ? {uuid:rest.location.state.uuid} : null
  
    const data = await getAPI.then(api => api.fetchUser(params).then(data => {
  
      if(data instanceof Error){
        throw new Error(t('components.signin.error.not_auth'))
      } else {
        const hasUnviewedReports = (reports, uuid) => {
          //TODO: only for Participants
          if(reports){
            return reports.some(report => {
              if (!report.viewedBy) {
                return true
              } else {
                return !report.viewedBy.includes(uuid)
              }
            })          
          } else {
            return null
          }
        }
        
        const userData = {
          ...data,
          phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
          newNotificationCount: data.notifications ? data.notifications.reduce((total, notification) => total + (notification.viewedByUser ? 0 : 1), 0) : 0,
          newReport: hasUnviewedReports(data.reports, data.uuid)
        }
  
        // sort patient list alphabetically by last name
        if(userData.patients && userData.patients.length > 1){
          const sortedPatients = userData.patients
            // sort alphabetically
            .sort((a, b) => a.lastName.localeCompare(b.lastName))
            // bring new accounts to the top
            .sort((a,b) => {
              if(a.portalAccountStatus === "ACCT_NEW" && b.portalAccountStatus !== "ACCT_NEW") {
                return -1
              }
              if(b.portalAccountStatus === "ACCT_NEW" && a.portalAccountStatus !== "ACCT_NEW") {
                return 1
              }
              return 0
            })
          userData.patients = sortedPatients
        }
  
        return userData
  
      }
    }))
    return data
  }

  return (
    <LoginConsumer>
      {([state]) => {
        if(state.auth) {
          // set default language in case it's not specified
          const lang = state.lang || "en"
          if(lang !== i18n.language) {
            i18n.changeLanguage(lang)
          }
          return <Component {...rest} />
        }
        else {
          console.log("rest",rest)
          // if(!state.uuid){
            getUserData().then(userData => {
              console.log("userData",userData)
              if(userData) {
                dispatch({
                  type: 'update',
                  userData: {
                    auth: true,
                    ...userData
                  }
                })
                return <Component {...rest} />
              }
            }).catch(error => {
              navigate('/error')
            })
          // } else {
          //   return <Redirect from="" to="/" noThrow />
          // }
        }
        // console.log("userData",userData)


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
          timeout={location.pathname.match(/\/account\//) ? 350 : 550}
          classNames={location.pathname.match(/\/account\//) ? 'zoom' : 'fade'}
          className="transitionGroup"
        >
          <Router location={location} primary={false}>
            <Redirect from="/signout" to="/" noThrow />
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

            {/* <SignInCallbackPage path='/signin' /> */}
            <PrivateRoute path='/account' component={DashboardPage} />
            <MockUsersPage path='/mock-users' />
            <PrivateRoute path='/account-mocha' component={DashboardMochaPage} />
            <PrivateRoute path='/account/notifications' component={NotificationsPage} />
            <PrivateRoute path='/account/consent' component={ConsentPage} />
            <PrivateRoute path='/account/tests' component={TestResultsPage} />
            <PrivateRoute path='/account/participant/:patientId' component={ParticipantPage} />
            <PrivateRoute path='/account/participant/:patientId/participation/*' component={ParticipationPage} />
            <PrivateRoute path='/account/profile' component={ProfilePage} />
            <PrivateRoute path='/account/profile/participation/*' component={ParticipationPage} />
            <PrivateRoute path='/account/help' component={GetHelpPage} />
            <NotFoundPage default />
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
)

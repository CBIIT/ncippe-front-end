import React, { lazy, useContext } from 'react'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import pageWrapper from '../pages/pageWrapper'
import RequireAuth from './RequireAuth'
import { formatPhoneNumber } from '../utils/utils'

// imports for public pages
import NotFound           from '../pages/NotFoundPage'
import Home               from '../pages/HomePage'
import Errors             from '../pages/ErrorPage' // 'Error' is reserved keyword
import About              from '../pages/about/AboutPage'
import Eligibility        from '../pages/about/EligibilityPage'
import StudyProgress      from '../pages/about/StudyProgressPage'
import AboutConsent       from '../pages/expect/Consent'
import Donate             from '../pages/expect/Donate'
import BiomarkerTest      from '../pages/expect/BiomarkerTest'
import Privacy            from '../pages/participation/PrivacyPage'
import Activate           from '../pages/participation/ActivatePage'
import Research           from '../pages/research/ResearchPage'
// import Article            from '../pages/research/ArticlePage'
import Policy             from '../pages/PolicyPage'

// imports for dashboard pages
// import MockUsersPage      from '../pages/MockUsersPage'
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
import ResourcesPage      from '../pages/dashboard/ResourcesPage'
import SendMessagePage    from '../pages/dashboard/SendMessagePage'
import MessageHistoryPage from '../pages/dashboard/MessageHistoryPage'

// imports for time
import moment from 'moment'
import 'moment/locale/es'

const SearchResults = lazy(() => import('../pages/SearchResultsPage'))

const HomePage = pageWrapper(Home)
const AboutPage = pageWrapper(About)
const EligibilityPage = pageWrapper(Eligibility)
const StudyProgressPage = pageWrapper(StudyProgress)
const ResearchPage = pageWrapper(Research)
// const ArticlePage = pageWrapper(Article)
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
const PolicyPage = pageWrapper(Policy)

const NotFoundPage = pageWrapper(NotFound)
const researchRoutes = () => {
// eslint-disable-next-line react-hooks/rules-of-hooks
const location = useLocation();
return (
    <TransitionGroup className="transitionGroup" component={null}>
      <CSSTransition 
        key={location.key}
        timeout={location.pathname.match(/\/account\//) ? 350 : 550}
        classNames={location.pathname.match(/\/account\//) ? 'zoom' : 'fade'}>
       <div className="transitionGroup">
    
        <Routes location={location} primary={false}>
          {/* <Redirect from="/signout" to="/" noThrow /> */}
            <Route path='/' element= {<HomePage />} />
            <Route path='/about' element= { <AboutPage />} />
            <Route path='/about/eligibility' element= { <EligibilityPage />} />
            <Route path='/about/studyprogres' element= { <StudyProgressPage />} />
            <Route path='/research'  element= { <ResearchPage />} />
            <Route path='/expect/consent' element={ <AboutConsentPage />} /> 
            <Route path='/expect/donate' element={<DonatePage />} /> 
            <Route path='/expect/testing' element={<TestingPage />} /> 
            <Route path='/participation/activate'element={<ActivatePage />} />
            <Route path='/participation/privacy' element= {<PrivacyPage />} />
            <Route path='/website-privacy-security' element= {<PolicyPage />} />
            <Route path='/search' element= {<SearchResultsPage  />} />
            <Route path='/error'  element= {<ErrorPage />} />

          {/* Private routes */}
          <Route path="/account" element={< RequireAuth> <DashboardPage /> </RequireAuth> } />
        <Route path="/account-mocha" element={< RequireAuth> <DashboardMochaPage /> </RequireAuth> } />
        <Route path="/account/notifications" element={< RequireAuth> <NotificationsPage /> </RequireAuth> } />
        <Route path="/account/consent" element={< RequireAuth> <ConsentPage /> </RequireAuth> } />
        <Route path="/account/tests" element={< RequireAuth> <TestResultsPage /> </RequireAuth> } />
        <Route path="/account/participant/:patientId" element={< RequireAuth> <ParticipantPage /> </RequireAuth> } />
        <Route path="/account/participant/:patientId/participation/*" element={< RequireAuth> <ParticipationPage /> </RequireAuth> } />
        <Route path="/account/profile" element={< RequireAuth> <ProfilePage /> </RequireAuth> } />
        <Route path="/account/profile/participation/*" element={< RequireAuth> <ParticipationPage /> </RequireAuth> } />
        <Route path="/account/help" element={< RequireAuth> <GetHelpPage /> </RequireAuth> } />
        <Route path="/account/resources" element={< RequireAuth> <ResourcesPage /> </RequireAuth> } />
        <Route path="/account/sendMessage" element={< RequireAuth> <SendMessagePage /> </RequireAuth> } />
        <Route path="/account/messageHistory" element={< RequireAuth> <MessageHistoryPage /> </RequireAuth> } />

        <Route path="/signout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default researchRoutes;
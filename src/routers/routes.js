import React, { lazy, } from 'react'
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import pageWrapper from '../pages/pageWrapper'
import RequireAuth from './RequireAuth'
import LoginConsent from '../components/login/LoginConsent';


// imports for public pages
import NotFound           from '../pages/NotFoundPage'
import Home               from '../pages/HomePage'
import Errors             from '../pages/ErrorPage' // 'Error' is reserved keyword
import About              from '../pages/about/AboutPage'
import Eligibility        from '../pages/about/EligibilityPage'
import News               from '../pages/about/NewsPage'
import StudyProgress      from '../pages/about/StudyProgressPage'
import AboutConsent       from '../pages/expect/Consent'
import Donate             from '../pages/expect/Donate'
import BiomarkerTest      from '../pages/expect/BiomarkerTest'
import Privacy            from '../pages/participation/PrivacyPage'
import Activate           from '../pages/participation/ActivatePage'
import Research           from '../pages/research/ResearchPage'
//import Article            from '../pages/research/ArticlePage'
import Policy             from '../pages/PolicyPage'

// imports for dashboard pages
// import Dashboard          from '../pages/dashboard/DashboardPage'
// import DashboardMocha     from '../pages/dashboard/DashboardMochaPage'
// import NotificationsPage  from '../pages/dashboard/NotificationsPage'
// import TestResultsPage    from '../pages/dashboard/TestResultsPage'
// import ParticipantPage    from '../pages/dashboard/ParticipantPage'
// import ConsentPage        from '../pages/dashboard/ConsentPage'
// import ProfilePage        from '../pages/dashboard/ProfilePage'
// import ParticipationPage  from '../pages/dashboard/ParticipationPage'
// import GetHelpPage        from '../pages/dashboard/GetHelpPage'
// import ResourcesPage      from '../pages/dashboard/ResourcesPage'
// import SendMessagePage    from '../pages/dashboard/SendMessagePage'
// import MessageHistoryPage from '../pages/dashboard/MessageHistoryPage'

// Nested Participation Steps
import ChangeParticipation from '../components/Participation/ChangeParticipation'
import LeaveOptions from '../components/Participation/LeaveOptions'
import LeaveQuestions from '../components/Participation/LeaveQuestions'
import CloseAccount from '../components/Participation/CloseAccount'


// imports for time
import moment from 'moment'
import 'moment/locale/es'
moment.locale('en')

const SearchResults = lazy(() => import('../pages/SearchResultsPage'))

const Article = lazy(() => import('../pages/research/ArticlePage'));
const Dashboard = lazy(() => import('../pages/dashboard/DashboardPage'));
const DashboardMocha = lazy(() => import('../pages/dashboard/DashboardMochaPage'));
const NotificationsPage = lazy(() => import('../pages/dashboard/NotificationsPage'));
const TestResultsPage = lazy(() => import('../pages/dashboard/TestResultsPage'));
const ParticipantPage = lazy(() => import('../pages/dashboard/ParticipantPage'));
const ConsentPage = lazy(() => import('../pages/dashboard/ConsentPage'));
const ProfilePage = lazy(() => import('../pages/dashboard/ProfilePage'));
const ParticipationPage = lazy(() => import('../pages/dashboard/ParticipationPage'));
const GetHelpPage = lazy(() => import('../pages/dashboard/GetHelpPage'));
const ResourcesPage = lazy(() => import('../pages/dashboard/ResourcesPage'));
const SendMessagePage = lazy(() => import('../pages/dashboard/SendMessagePage'));
const MessageHistoryPage = lazy(() => import('../pages/dashboard/MessageHistoryPage'));


const HomePage = pageWrapper(Home)
const AboutPage = pageWrapper(About)
const EligibilityPage = pageWrapper(Eligibility)
const NewsPage = pageWrapper(News)
const StudyProgressPage = pageWrapper(StudyProgress)
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
const ErrorPage = pageWrapper(Errors)
const PolicyPage = pageWrapper(Policy)
const NotFoundPage = pageWrapper(NotFound)
const AppRoutes = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  return (
    <TransitionGroup className="transitionGroup" component={null}>
      <CSSTransition 
        key={location.key}
        timeout={location.pathname.match(/\/account\//) ? 350 : 550}
        classNames={location.pathname.match(/\/account\//) ? 'zoom' : 'fade'}
      >
        <div className="transitionGroup" >
          <Routes location={location} primary={false}>
          {/* <Redirect from="/signout" to="/" noThrow /> */}
            <Route path='/' element= {<HomePage />} />
            <Route path='/about' element= { <AboutPage />} />
            <Route path='/about/eligibility' element= { <EligibilityPage />} />
            <Route path='/about/news' element= {<NewsPage />} />
            <Route path='/about/studyprogress' element= { <StudyProgressPage />} />
            { /* <ResearchPage path='/about/research' /> */}
            <Route path='/login-consent' element= { <LoginConsent />} />
            <Route path='/research'  element= { <ResearchPage />} />
            <Route path='/research/:article'  element= { <ArticlePage />} />
            <Route path='/expect/consent' element={ <AboutConsentPage />} /> 
            <Route path='/expect/donate' element={<DonatePage />} /> 
            <Route path='/expect/testing' element={<TestingPage />} /> 
            <Route path='/participation/activate'element={<ActivatePage />} />
            <Route path='/participation/privacy' element= {<PrivacyPage />} />
            <Route path='/website-privacy-security' element= {<PolicyPage />} />
            <Route path='/search' element= {<SearchResultsPage  />} />
            <Route path='/error'  element= {<ErrorPage />} />

          {/* Private routes */}
            <Route path="/account" element={<RequireAuth> <Outlet /> </RequireAuth> } >
              <Route index element={ <DashboardMocha />  }  />
              <Route path="notifications" element={ <NotificationsPage />  } />
              <Route path="consent" element={ <ConsentPage />  } />
              <Route path="tests" element={ <TestResultsPage />  } />
              <Route path="participant/:patientId" element={ <ParticipantPage />  } />
              <Route path="participant/:patientId/participation/*" element={ <ParticipationPage />  } />
              <Route path="participant/:patientId/profile" element={ <ProfilePage />  } />
              <Route path="profile" element={ <ProfilePage />  } />
              <Route path="profile/participation/*" element={ <ParticipationPage />  } />
              <Route path="help" element={ <GetHelpPage />  } />
              <Route path="resources" element={ <ResourcesPage />  } />
              <Route path="sendMessage" element={ <SendMessagePage />  } />
              <Route path="messageHistory" element={ <MessageHistoryPage />  } />
        </Route>

        <Route path="/signout" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
  }

export default AppRoutes
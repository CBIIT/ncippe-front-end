import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import ProfilePage from '../pages/ProfilePage'

import { LoginContext } from '../components/login/SharedLogin/Login.context'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const login = useContext(LoginContext)
  return <Route {...rest} component={props => (login.auth ? <Component {...props} /> : <Redirect to='/' />)} />
}

export default () => (
  <Switch>
    <Route path='/' component={HomePage} exact={true} />
    {/* <Route path='/article/:id' component={ArticlePage} exact={true} /> */}
    <PrivateRoute path='/dashboard' component={DashboardPage} exact={true} />
    <PrivateRoute path='/dashboard/profile' component={ProfilePage} exact={true} />
    <Route component={NotFoundPage} />
  </Switch>
)

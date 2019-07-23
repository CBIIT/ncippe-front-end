import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import NotFoundPage from '../pages/NotFoundPage'
import MockRoles from '../pages/MockRoles'
import DashboardPage from '../pages/Dashboard'

import LoginContext from '../context/login'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const login = useContext(LoginContext)
  return <Route {...rest} component={props => (login.auth ? <Component {...props} /> : <Redirect to='/' />)} />
}

export default () => (
  <Switch>
    <Route path='/' component={MockRoles} exact={true} />
    {/* <Route path='/article/:id' component={ArticlePage} exact={true} /> */}
    <PrivateRoute path='/dashboard' component={DashboardPage} exact={true} />
    <Route component={NotFoundPage} />
  </Switch>
)

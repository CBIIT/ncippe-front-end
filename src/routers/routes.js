import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import NotFoundPage from '../components/NotFoundPage'
import ArticlePage from '../pages/Article'
import DashboardPage from '../pages/Dashboard'

import LoginContext from '../context/login'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const login = useContext(LoginContext)
  return <Route {...rest} component={props => (login.auth ? <Component {...props} /> : <Redirect to='/' />)} />
}

export default () => (
  <Switch>
    <Route path='/' component={Homepage} exact={true} />
    <Route path='/article/:id' component={ArticlePage} exact={true} />
    <PrivateRoute path='/dashboard' component={DashboardPage} exact={true} />
    <Route component={NotFoundPage} />
  </Switch>
)

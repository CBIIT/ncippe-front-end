import React from 'react'

import App from './Layout/AppWrapper'
import Header from '../components/region/Header/Header'


// global variable for determining if a user has logged in or not. Will be toggled by SignInCallback
window.$role = 'Public'

export default {
  title: 'Layout/Header',
  component: Header,
};

const Template = (args) => 
  <App>
    <Header />
  </App>

export const LoggedIn = Template.bind({});

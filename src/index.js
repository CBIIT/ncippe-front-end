import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import logo from './utils/ascii-logo'
// import * as serviceWorker from './serviceWorker';

// import i18n (needs to be bundled ;)) 
import './i18n'


ReactDOM.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>, document.getElementById('root'))

// put a logo in the console for fun
logo()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

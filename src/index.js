import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import Loading from './components/Loading/Loading'
import logo from './utils/ascii-logo'
// import * as serviceWorker from './serviceWorker'

// import i18n (needs to be bundled ;)) 
import './i18n'

const App = lazy(() => import('./App')) // code splitting out the main app

ReactDOM.render(
  <Suspense fallback={<div style={{display:'flex', justifyContent:'center', width:'100vw', height:'50vh'}}><Loading /></div>}>
    <App />
  </Suspense>, document.getElementById('root'))

// put a logo in the console for fun
logo()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

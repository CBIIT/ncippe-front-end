import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Loading from './components/Loading'
import logo from './utils/ascii-logo'
// import * as serviceWorker from './serviceWorker'

// importing i18n here to be bundled with the app code
import './i18n'

/*  This dynamic import allows the app to pick between the dev environment and prod as specified in `.env-cmdrc`
    The App_dev component allows for mocking users and user data, bypassing the two factor authentication used on PROD
    The App_dev component uses the `routes_dev` file, which uses the `pageWrapper_dev` file, to mock authentication and supply a mock users button
    The `REACT_APP_API_PATH` config variable in `.env-cmdrc` also controls which api methods are used in the `/data` folder.
    The local api works with JSON Server to mock data and log data traffic. The data for JSON Server is stored in `/data/mockData.json`.
    The prod api works with the prod environment where the methods for communicating with the server may be different.
    The local api methods and arguments must match the prod api method names and aruments.
*/
// code splitting out the main app
const App = lazy(() => import(`./App${process.env.REACT_APP_API_PATH === 'local' ? '_dev' : ''}`)) 

ReactDOM.render(
  <Suspense fallback={<div style={{display:'flex', justifyContent:'center', width:'100vw', height:'50vh'}}><Loading /></div>}>
    <App />
  </Suspense>, document.getElementById('root'))

// put a logo in the console for fun
logo()

/* Service Worker was not playing well with NIC's SiteMinder login and callback methods. Too aggressive on the caching. 
    Unfortunatly, a PWA cannot be supported at this time */
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

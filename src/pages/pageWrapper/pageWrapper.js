import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../components/region/Header/Header'
import Footer from '../../components/region/Footer/Footer'

const useStyles = makeStyles(theme => ({
  main: {
    flex: '1 0 auto',
    margin: '0',
  }
}),{name: 'PageWrapper'})

const pageWrapper = (Component) => ({children, ...props}) => {
  const classes = useStyles()
  return (
    <div className="siteWrapper"> {/* returning a fragment here does not work in ie11 */}
      <Header />
      <div id="main" className={classes.main} role="main">
        <Component {...props} />
      </div>
      <Footer />
    </div>
  )
}

export default pageWrapper
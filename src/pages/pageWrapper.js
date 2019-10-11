import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/region/Header/Header';
import Footer from '../components/region/Footer/Footer';

const useStyles = makeStyles(theme => ({
  main: {
    flex: '1 0 auto',
    margin: '0',
  }
}))

const pageWrapper = (Component) => ({children, ...props}) => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <div id="main" className={classes.main}>
        <Component {...props} />
      </div>
      <Footer />
    </>
  )
}

export default pageWrapper
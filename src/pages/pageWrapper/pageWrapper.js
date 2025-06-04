import React from 'react'
import Header from '../../components/region/Header/Header'
import Footer from '../../components/region/Footer/Footer'

const pageWrapper = (Component) => ({children, ...props}) => {
  return (
    <div className="siteWrapper">
      <Header />
      <div id="main" sx={{ flex: '1 0 auto',
         margin: '0', }} role="main">
        <Component {...props} />
      </div>
      <Footer />
    </div>
  )
}

export default pageWrapper

import React from 'react'

const MainContainer = ({ children }) => {
  return (
    <div className='page'>
      <div className='content'>
        { children }
      </div>
    </div>
  )
}

export default MainContainer
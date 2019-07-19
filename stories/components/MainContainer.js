import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

const MainContainer = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        { children }
      </div>
    </div>
  )
}

export default MainContainer
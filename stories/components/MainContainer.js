import React from 'react'
import PropTypes from 'prop-types'
import styles from 'wix-storybook-utils/dist/src/Sections/styles.scss'

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
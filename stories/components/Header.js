import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Cell } from 'wix-storybook-utils/dist/src/ui/Layout';
import styles from 'wix-storybook-utils/dist/src/Sections/views/header/styles.scss'

const Header = ({ storyName, subTitle }) => (
  <div className={styles.root}>
      <Layout className={styles.titleLayout}>
        <Cell span={6} className={styles.title}>
          {storyName}
        </Cell>
      </Layout>
      { subTitle && (
        <div className={styles.componentWrapper}>
          <div className={styles.component}>{subTitle}</div>
        </div>
      )}
    </div>
);

Header.propTypes = {
  storyName: PropTypes.string.isRequired,
  displayName: PropTypes.string
}

export default Header
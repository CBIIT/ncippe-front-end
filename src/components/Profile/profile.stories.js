import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import Tabs from 'wix-storybook-utils/TabbedView';
import Typography from '@material-ui/core/Typography'

import MainContainer from '../../../stories/components/MainContainer'
import Header from '../../../stories/components/Header'

import CodeExample from 'wix-storybook-utils/CodeExample'


import Profile from './Profile'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ProfileRaw from '!!raw-loader!./Profile'

// eslint-disable-next-line import/no-webpack-loader-syntax
import metadata from 'raw-loader!metadata-loader!./Profile.js'

storiesOf('Components', module)
  .add('Profile', () => (
    <MainContainer>
      <Header storyName="Profile" />

      <Tabs tabs={['Usage', 'API']}>
        <Typography component="div">
          <h1>Profile</h1>
          <p>Features an profile card where users can update their account information</p>

          <h2>Default input</h2>
          <div className='codeExample'>
            <CodeExample code={ProfileRaw}>
              <Profile />
            </CodeExample>
          </div>

        </Typography>

        <AutoDocs metadata={metadata} />

      </Tabs>
    </MainContainer>
  ))
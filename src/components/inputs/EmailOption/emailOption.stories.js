import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs'
import AutoExample from 'wix-storybook-utils/AutoExample'
import Tabs from 'wix-storybook-utils/TabbedView'
import Typography from '@material-ui/core/Typography'

import MainContainer from '../../../../stories/components/MainContainer'
import Header from '../../../../stories/components/Header'

import CodeExample from 'wix-storybook-utils/CodeExample'


import EmailOption from './EmailOption'
// eslint-disable-next-line import/no-webpack-loader-syntax
import metadata from 'raw-loader!metadata-loader!./EmailOption.js'

storiesOf('Components/Input', module)
  .add('Email Option', () => (
    <MainContainer>
      <Header storyName="Email Option" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
      <Typography component="div">
          <h1>Email Option</h1>
          <p>Opt-in or opt-out of email notifications</p>

          <h2>Default</h2>
          <div className='codeExample'>
            <CodeExample code={`<EmailOption />`}>
              <EmailOption />
            </CodeExample>
          </div>

          <h2>Input in edit mode</h2>
          <div className='codeExample'>
            <CodeExample code={`<EmailOption editMode />`}>
              <EmailOption editMode />
            </CodeExample>
          </div>

          <h2>Input with value set to false</h2>
          <div className='codeExample'>
            <CodeExample code={`<EmailOption value={false} />`}>
              <EmailOption value={false} />
            </CodeExample>
          </div>

        </Typography>

        <AutoDocs metadata={metadata} />

        <AutoExample component={EmailOption} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
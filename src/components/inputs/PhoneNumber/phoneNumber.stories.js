import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs'
import AutoExample from 'wix-storybook-utils/AutoExample'
import Tabs from 'wix-storybook-utils/TabbedView'
import Typography from '@material-ui/core/Typography'


import MainContainer from '../../../../stories/components/MainContainer'
import Header from '../../../../stories/components/Header'

import CodeExample from 'wix-storybook-utils/CodeExample'


import PhoneNumber from './PhoneNumber'
// eslint-disable-next-line import/no-webpack-loader-syntax
import metadata from 'raw-loader!metadata-loader!./PhoneNumber.js'

storiesOf('Components/Input', module)
  .add('Phone Number', () => (
    <MainContainer>
      <Header storyName="Phone Number" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <Typography component="div">
          <h1>Phone Number</h1>
          <p>Features an input field with an input mask to handle formatting for phone numbers</p>

          <h2>Default input</h2>
          <div className='codeExample'>
            <CodeExample code={`<PhoneNumber editMode />`}>
              <PhoneNumber editMode />
            </CodeExample>
          </div>

          <h2>Input with data (read only)</h2>
          <div className='codeExample'>
            <CodeExample code={`<PhoneNumber value="(703)-474-2083" />`}>
              <PhoneNumber value="(703)-474-2083" />
            </CodeExample>
          </div>

          <h2>Input with data (edit mode)</h2>
          <div className='codeExample'>
            <CodeExample code={`<PhoneNumber value="(703)-474-2083" editMode />`}>
              <PhoneNumber value="(703)-474-2083" editMode />
            </CodeExample>
          </div>

        </Typography>

        <AutoDocs metadata={metadata} />

        <AutoExample component={PhoneNumber} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
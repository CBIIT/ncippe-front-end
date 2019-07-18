import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Radio from './MuiRadio'
import RadioMdx, { frontMatter } from './radio-buttons.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiRadio.js'

storiesOf('Material UI', module)
  .add('Radio', () => (
    <MainContainer>
        <Header storyName="Radio" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <RadioMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Radio} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
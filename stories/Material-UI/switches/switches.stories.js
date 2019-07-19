import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Switch from './MuiSwitch'
import SwitchMdx, { frontMatter } from './switches.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiSwitch.js'

storiesOf('Material UI/Inputs', module)
  .add('Switch', () => (
    <MainContainer>
        <Header storyName="Switch" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <SwitchMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Switch} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
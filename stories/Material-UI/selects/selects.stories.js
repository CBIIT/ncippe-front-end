import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Select from './MuiSelect'
import SelectMdx, { frontMatter } from './selects.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiSelect.js'

storiesOf('Material UI/Inputs', module)
  .add('Select', () => (
    <MainContainer>
        <Header storyName="Select" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <SelectMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Select} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
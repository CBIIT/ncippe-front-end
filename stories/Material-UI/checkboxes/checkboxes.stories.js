import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Checkbox from './MuiCheckbox'
import CheckboxMdx, { frontMatter } from './checkboxes.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiCheckbox.js'

storiesOf('Material UI', module)
  .add('Checkbox', () => (
    <MainContainer>
        <Header storyName="Checkbox" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <CheckboxMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Checkbox} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
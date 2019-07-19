import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import TextField from './MuiTextField'
import TextFieldMdx, { frontMatter } from './text-fields.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiTextField.js'

storiesOf('Material UI/Inputs', module)
  .add('TextField', () => (
    <MainContainer>
        <Header storyName="TextField" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <TextFieldMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={TextField} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
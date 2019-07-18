import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Paper from './MuiPaper'
import PaperMdx, { frontMatter } from './paper.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiPaper.js'

storiesOf('Material UI', module)
  .add('Paper', () => (
    <MainContainer>
        <Header storyName="Paper" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <PaperMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Paper} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
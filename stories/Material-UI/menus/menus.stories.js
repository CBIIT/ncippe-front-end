import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Menu from './MuiMenu'
import MenuMdx, { frontMatter } from './menus.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiMenu.js'

storiesOf('Material UI/Navigation', module)
  .add('Menu', () => (
    <MainContainer>
        <Header storyName="Menu" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <div className="markdown-body">
          <MenuMdx />
        </div>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Menu} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
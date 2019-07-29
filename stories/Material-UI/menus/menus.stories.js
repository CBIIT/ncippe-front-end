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
import Typography from '@material-ui/core/Typography'

storiesOf('Material UI/Navigation', module)
  .add('Menu', () => (
    <MainContainer>
      <Header storyName="Menu" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <Typography component="div">
          <MenuMdx />
        </Typography>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Menu} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Card from './MuiCard'
import CardMdx, { frontMatter } from './cards.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiCard.js'
import Typography from '@material-ui/core/Typography'

storiesOf('Material UI/Surfaces', module)
  .add('Card', () => (
    <MainContainer>
        <Header storyName="Card" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <Typography component="div">
          <CardMdx />
        </Typography>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Card} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
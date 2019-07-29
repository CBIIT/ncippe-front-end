import React from 'react'

import { storiesOf } from '@storybook/react'
import AutoDocs from 'wix-storybook-utils/AutoDocs';
import AutoExample from 'wix-storybook-utils/AutoExample';
import Tabs from 'wix-storybook-utils/TabbedView';

import MainContainer from '../../components/MainContainer'
import Header from '../../components/Header'

import Button from './MuiButton'
import ButtonMdx, { frontMatter } from './buttons.mdx';
import metadata from 'raw-loader!metadata-loader!./MuiButton.js'
import Typography from '@material-ui/core/Typography'

storiesOf('Material UI/Inputs', module)
  .add('Buttons', () => (
    <MainContainer>
        <Header storyName="Buttons" subTitle={frontMatter.components} />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <Typography component="div">
          <ButtonMdx />
        </Typography>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Button} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
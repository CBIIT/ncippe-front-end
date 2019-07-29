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
import Typography from '@material-ui/core/Typography'

storiesOf('Material UI/Inputs', module)
  .add('Checkbox', () => (
    <MainContainer>
      <Header storyName="Checkbox" />

      <Tabs tabs={['Usage', 'API', 'Playground']}>
        <Typography component="div">
          <CheckboxMdx />
        </Typography>

        <AutoDocs metadata={metadata} />

        <AutoExample component={Checkbox} parsedSource={metadata} />
      </Tabs>
    </MainContainer>
  ))
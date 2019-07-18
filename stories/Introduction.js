import React from 'react';

import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown'
import MainContainer from './components/MainContainer'
import Header from './components/Header'

storiesOf('Welcome', module).add('to Storybook', () => (
  <MainContainer>
    <Header storyName="Welcome" />
    <Markdown source={`
## PPE Portal component library and front-end designs
Storybook is a tool we are using to develop, organize, and test front-end components and design. With this platform, we can:
- Develop the front-end in isolation, without connecting it to the database
- Test components individually, as well as within layouts
- Track usage scenarios and maintain consistency between UI components

As we develop the portal, storybook will be our living style guide and component library, so check back frequently to see how the system is progressing.
`} />
  </MainContainer>
  )
);

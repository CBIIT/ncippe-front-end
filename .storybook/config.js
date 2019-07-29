import { configure, addParameters } from '@storybook/react';

function loadStories() {
  require('!!style-loader!css-loader!sass-loader!./stories.scss');
  require('../stories');
}

addParameters({ 
  options: {
    showAddonPanel: false,
    showDownPanel: false,
    name: 'NCI PPE',
    url: 'https://cancer.gov',
    sidebarAnimations: true
  }
});

configure(loadStories, module);
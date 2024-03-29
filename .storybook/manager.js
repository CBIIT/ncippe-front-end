import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'NCI Moonshot Biobank',
  brandUrl: 'https://moonshotbiobank.cancer.gov/'
});

addons.setConfig({
  panelPosition: 'bottom',
  theme
})
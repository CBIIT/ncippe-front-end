module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        reactOptions: {
          fastRefresh: true,
        }
      }
    },
    "@storybook/preset-create-react-app"
  ]
}
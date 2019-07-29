const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = ({ config }) => {

  const filteredCssRuled = config.module.rules.filter(rule => {
    return !rule.test || rule.test && !rule.test.toString().match(/(sa|sc)ss/)
  })

  const storybookConfig = {
    ...config,
    target: 'web',

    node: {
      ...config.node,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      __dirname: true,
    },

    plugins: [
      ...config.plugins,
      // new BundleAnalyzerPlugin()
    ],

    resolveLoader: {
      ...config.resolveLoader,
      alias: {
        ...(config.resolveLoader && config.resolveLoader.alias),
        'metadata-loader': path.resolve(__dirname,'./metadata-loader.js'),
        'frontmatter-loader': path.resolve(__dirname,'./fm-loader.js')
      }
    },

    module: {
      ...config.module,
      rules: [
        ...filteredCssRuled,
        {
          test: /\.(scss|sass)$/,
          exclude: /\.st\.css$/,
          rules: [
            {
              "loader": "yoshi-style-dependencies/style-loader",
              "options": {
                "singleton": true
              }
            },
            {
              "oneOf": [{
                  "test": /\.global\.[A-z]*$/,
                  "loader": "yoshi-style-dependencies/css-loader",
                  "options": {
                    "camelCase": true,
                    "sourceMap": false,
                    "localIdentName": "[name]__[local]__[hash:base64:5]",
                    "hashPrefix": "ppe",
                    "modules": false,
                    "importLoaders": 4
                  },
                  "sideEffects": true
              }, {
                  "loader": "yoshi-style-dependencies/css-loader",
                  "options": {
                    "camelCase": true,
                    "sourceMap": false,
                    "localIdentName": "[name]__[local]__[hash:base64:5]",
                    "hashPrefix": "ppe",
                    "modules": true,
                    "importLoaders": 4
                  }
              }]
            },
            {
              "loader": "yoshi-style-dependencies/postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": [
                  require('autoprefixer')({
                    overrideBrowserslist: [
                      '> 0.5%',
                      'last 2 versions',
                      'Firefox ESR',
                      'not dead',
                      'ie >= 11',
                    ].join(','),
                    flexbox: 'no-2009',
                  }),
                ].filter(Boolean),
                "sourceMap": true
              }
            },
            {
              "loader": "yoshi-style-dependencies/resolve-url-loader"
            },
            {
              "test": /\.(scss|sass)$/,
              "loader": "yoshi-style-dependencies/sass-loader",
              "options": {
                  "sourceMap": true,
                  "implementation": require('yoshi-style-dependencies/node-sass'),
                  "includePaths": ["node_modules", "node_modules/compass-mixins/lib"]
              }
            }
          ]
        },
        {
          test: /\.story\.[j|t]sx?$/,
          loader: 'wix-storybook-utils/loader',
          options: {
            storyConfig: {
              moduleName: 'NCI PPE',
              repoBaseURL:
              'https://github.com/wix/wix-ui/tree/master/packages/wix-storybook-utils/src/components/',
            },
          },
        },
        {
          test: /.mdx$/,
          use: [
            'babel-loader',
            '@mdx-js/loader',
            'frontmatter-loader'
          ]
        }
      ]
    }
  }
  
  return storybookConfig;
};

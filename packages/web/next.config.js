// eslint-disable-next-line @typescript-eslint/no-var-requires
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack: function(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: 'preact/compat',
      react$: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom$': 'preact/compat',
    }

    return config
  },
  experimental: {
    modern: true,
  },
})

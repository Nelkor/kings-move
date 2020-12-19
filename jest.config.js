const { resolve } = require('path')

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '@engine/(.*)': resolve(__dirname, 'src/modules/engine/$1'),
  },
}

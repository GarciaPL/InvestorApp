const esModules = ['@mui/x-charts', '@mui/material'].join('|')

module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
}

const colors = require('./colors');
const fonts = require('./fonts');
const mediaQuery = require('./media-query');

module.exports = {
  customProperties: {
    variables: {
      ...colors,
      ...fonts,
    },
  },
  customMedia: {
    extensions: {
      ...mediaQuery,
    },
  },
};

const gatherAll = require('react-autodocs-utils/src/gather-all');

module.exports = function(source, map) {
  const callback = this.async();

  gatherAll(this.resourcePath)
    .then(parsed => callback(null, parsed, map))
    .catch(console.log);
};
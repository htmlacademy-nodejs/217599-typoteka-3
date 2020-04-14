'use strict';

const packageJSONFile = require(`../../../package`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJSONFile.version;

    console.log(version);
  }
};

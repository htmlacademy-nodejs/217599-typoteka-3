'use strict';

const chalk = require(`chalk`);

const packageJSONFile = require(`../../../package`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJSONFile.version;

    console.info(chalk.blue(version));
  }
};

'use strict';

const dateFormat = require(`dateformat`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const FILE_NAME = `mocks.json`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_DESCRIPTIONS_PATH = `./data/descriptions.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const DEFAULT_COUNT = 1;
const MAX_MONTH_RANGE = 3;
const MAX_COUNT = Object.freeze({
  BLOG: 1000,
  CATEGORY: 9,
  ANNOUNCE: 5
});

const calculateRandomDate = (dateRange) => {
  const now = new Date();
  const randomMonth = now.setMonth(now.getMonth() - dateRange);

  return dateFormat(randomMonth, `yyyy-mm-dd HH:MM:ss`);
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);

    if (!content.trim().length) {
      throw new Error(`Файл пуст`);
    }

    return content.trim().split(`\n`);
  } catch (err) {
    throw err;
  }
};

const runParallel = async (...cb) => Promise.all([...cb]);

const generateBlogs = (count, titles, descriptions, categories) => (
  Array(count).fill({}).map(() => ({
    title: shuffle(titles)[getRandomInt(0, MAX_COUNT.CATEGORY)],
    createdDate: calculateRandomDate(getRandomInt(0, MAX_MONTH_RANGE)),
    announce: shuffle(descriptions).slice(1, MAX_COUNT.ANNOUNCE).join(` `),
    fullText: shuffle(descriptions).slice(1, descriptions.length).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, MAX_COUNT.CATEGORY))
  }))
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const userCount = parseInt(count, 10) || DEFAULT_COUNT;

    if (userCount > MAX_COUNT.BLOG) {
      console.log(chalk.red(`Не больше ${MAX_COUNT.BLOG} публикаций`));
      process.exit(ExitCode.error);
    }

    try {
      const content = await runParallel(
          readContent(FILE_TITLES_PATH),
          readContent(FILE_DESCRIPTIONS_PATH),
          readContent(FILE_CATEGORIES_PATH)
      ).then(([titles, descriptions, categories]) => JSON
        .stringify(generateBlogs(userCount, titles, descriptions, categories), null, ` `));

      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));

      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Mock file generation failed`));
      console.error(chalk.red(err));

      process.exit(ExitCode.error);
    }
  }
};

'use strict';

const dateFormat = require(`dateformat`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, runParallel, parseTXTFile} = require(`../../utils`);
const {ExitCode, ID_SIZE, FILE_PATH, MOCKS_FILE_NAME} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_MONTH_RANGE = 3;
const MAX_COUNT = Object.freeze({
  BLOG: 1000,
  CATEGORY: 9,
  ANNOUNCE: 5,
  COMMENTS: 9
});

const calculateRandomDate = (dateRange) => {
  const now = new Date();
  const randomMonth = now.setMonth(now.getMonth() - dateRange);

  return dateFormat(randomMonth, `yyyy-mm-dd HH:MM:ss`);
};

const generateBlogs = (count, titles, descriptions, categories, usersComments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(ID_SIZE),
    title: shuffle(titles)[getRandomInt(0, MAX_COUNT.CATEGORY)],
    createdDate: calculateRandomDate(getRandomInt(0, MAX_MONTH_RANGE)),
    announce: shuffle(descriptions).slice(1, MAX_COUNT.ANNOUNCE).join(` `),
    fullText: shuffle(descriptions).slice(1, descriptions.length).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, MAX_COUNT.CATEGORY)),
    comments: shuffle(usersComments).map(() => ({
      id: nanoid(ID_SIZE),
      text: shuffle(usersComments).slice(1, 3).join(` `)
    })).slice(0, getRandomInt(0, MAX_COUNT.COMMENTS))
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
          parseTXTFile(FILE_PATH.TITLES),
          parseTXTFile(FILE_PATH.DESCRIPTIONS),
          parseTXTFile(FILE_PATH.CATEGORIES),
          parseTXTFile(FILE_PATH.COMMENTS)
      ).then(([titles, descriptions, categories, comments]) => JSON
        .stringify(generateBlogs(userCount, titles, descriptions, categories, comments), null, ` `));

      await fs.writeFile(MOCKS_FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));

      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Mock file generation failed`));
      console.error(chalk.red(err));

      process.exit(ExitCode.error);
    }
  }
};

'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, runParallel, parseTXTFile} = require(`../../utils`);
const {ExitCode, ID_SIZE, FILE_PATH, MOCKS_FILE_NAME, COUNT} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_MONTH_RANGE = 3;

const calculateRandomDate = (dateRange) => {
  const now = new Date();

  return now.setMonth(now.getMonth() - dateRange);
};

const generateArticles = (count, titles, descriptions, categories, usersComments) => (
  Array(count).fill({}).map(() => {
    const title = shuffle(titles)[getRandomInt(COUNT.TITLE.MIN - 1, COUNT.TITLE.MAX - 1)];

    return {
      id: nanoid(ID_SIZE),
      title,
      createdDate: calculateRandomDate(getRandomInt(0, MAX_MONTH_RANGE)),
      announce: shuffle(descriptions).slice(COUNT.ANNOUNCE.MIN, COUNT.ANNOUNCE.MAX).join(` `),
      fullText: shuffle(descriptions).slice(1, descriptions.length).join(` `),
      category: shuffle(categories).slice(0, getRandomInt(COUNT.CATEGORY.MIN, COUNT.CATEGORY.MAX)),
      comments: shuffle(usersComments).map(() => ({
        id: nanoid(ID_SIZE),
        avatar: `test-avatar.jpg`,
        user: `Test User`,
        text: shuffle(usersComments).slice(1, 3).join(` `),
        title,
        createdDate: calculateRandomDate(getRandomInt(0, MAX_MONTH_RANGE))
      })).slice(0, getRandomInt(COUNT.COMMENT.MIN, COUNT.COMMENT.MAX))
    };
  })
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const userCount = parseInt(count, 10) || DEFAULT_COUNT;

    if (userCount > COUNT.ARTICLE.MAX) {
      console.log(chalk.red(`Не больше ${COUNT.ARTICLE.MAX} публикаций`));
      process.exit(ExitCode.error);
    }

    try {
      const content = await runParallel(
          parseTXTFile(FILE_PATH.TITLES),
          parseTXTFile(FILE_PATH.DESCRIPTIONS),
          parseTXTFile(FILE_PATH.CATEGORIES),
          parseTXTFile(FILE_PATH.COMMENTS)
      ).then(([titles, descriptions, categories, comments]) => JSON
        .stringify(generateArticles(userCount, titles, descriptions, categories, comments), null, ` `));

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

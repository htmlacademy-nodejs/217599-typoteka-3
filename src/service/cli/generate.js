'use strict';

const dateFormat = require(`dateformat`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_MONTH_RANGE = 3;
const FILE_NAME = `mocks.json`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_DESCRIPTIONS_PATH = `./data/descriptions.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const MaxCount = {
  blog: 1000,
  category: 9,
  announce: 5
};

const calculateRandomDate = (dateRange) => {
  const now = new Date();
  const randomMonth = now.setMonth(now.getMonth() - dateRange);

  return dateFormat(randomMonth, `yyyy-mm-dd HH:MM:ss`);
};

const readContent = async (filePath) => {
  try {
    return (await fs.readFile(filePath, `utf8`)).trim().split(`\n`);
  } catch (err) {
    console.log(chalk.red(err));

    return [];
  }
};

const getContent = async (...cb) => await Promise.all([...cb]);

const generateBlogs = (count, titles, descriptions, categories) => (
  Array(count).fill({}).map(() => ({
    title: shuffle(titles)[getRandomInt(0, MaxCount.category)],
    createdDate: calculateRandomDate(getRandomInt(0, MAX_MONTH_RANGE)),
    announce: shuffle(descriptions).slice(1, MaxCount.announce).join(` `),
    fullText: shuffle(descriptions).slice(1, descriptions.length).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, MaxCount.category))
  }))
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const userCount = parseInt(count, 10) || DEFAULT_COUNT;

    if (userCount > MaxCount.blog) {
      console.log(chalk.red(`Не больше ${MaxCount.blog} публикаций`));
      process.exit(ExitCode.error);
    }

    const content = await getContent(
      readContent(FILE_TITLES_PATH),
      readContent(FILE_DESCRIPTIONS_PATH),
      readContent(FILE_CATEGORIES_PATH)
    ).then((contents) => JSON
      .stringify(generateBlogs(userCount, contents[0], contents[1], contents[2]), null, ` `));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.log(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};

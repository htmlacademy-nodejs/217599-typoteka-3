'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
  shuffle,
  runParallel,
  parseTXTFile,
  calculateRandomDate,
} = require(`../../utils`);
const {
  ExitCode,
  FilePaths,
  MocksOptions,
} = require(`../../constants`);

const DEFAULT_COUNT = 1;

const generateArticles = (
  count,
  titles,
  descriptions,
  categories,
  usersComments,
) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MocksOptions.Range.IdSize.Max),
      title: shuffle(titles)[
        getRandomInt(
          MocksOptions.Range.Title.Min - 1,
          MocksOptions.Range.Title.Max - 1,
        )
      ],
      createdDate: calculateRandomDate(
        getRandomInt(0, MocksOptions.Range.Month.Max),
      ),
      announce: shuffle(descriptions)
        .slice(
          MocksOptions.Range.Announce.Min,
          MocksOptions.Range.Announce.Max,
        )
        .join(` `),
      fullText: shuffle(descriptions)
        .slice(1, descriptions.length)
        .join(` `),
      categories: shuffle(categories).slice(
        0,
        getRandomInt(
          MocksOptions.Range.Category.Min,
          MocksOptions.Range.Category.Max,
        ),
      ),
      comments: shuffle(usersComments)
        .map(() => ({
          id: nanoid(MocksOptions.Range.IdSize.Max),
          text: shuffle(usersComments).slice(1, 3).join(` `),
        }))
        .slice(
          0,
          getRandomInt(
            MocksOptions.Range.Comment.Min,
            MocksOptions.Range.Comment.Max,
          ),
        ),
    }));

module.exports = {
  name: `--generate`,
  async run(count) {
    const userCount = parseInt(count, 10) || DEFAULT_COUNT;

    if (userCount > MocksOptions.Range.Article.Max) {
      console.log(
        chalk.red(
          `Не больше ${MocksOptions.Range.Article.Max} публикаций`,
        ),
      );
      process.exit(ExitCode.Error);
    }

    try {
      const content = await runParallel(
        parseTXTFile(FilePaths.Titles),
        parseTXTFile(FilePaths.Descriptions),
        parseTXTFile(FilePaths.Categories),
        parseTXTFile(FilePaths.Comments),
      ).then(([titles, descriptions, categories, comments]) =>
        JSON.stringify(
          generateArticles(
            userCount,
            titles,
            descriptions,
            categories,
            comments,
          ),
          null,
          ` `,
        ),
      );

      await fs.writeFile(MocksOptions.FileName, content);
      console.log(chalk.green(`Operation success. File created.`));

      process.exit(ExitCode.Success);
    } catch (err) {
      console.error(chalk.red(`Mock file generation failed`));
      console.error(chalk.red(err));

      process.exit(ExitCode.Error);
    }
  },
};

'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {
  HTTP_CODE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  mockData,
  MOCKS_FILE_NAME,
  FILE_PATH
} = require(`../../constants`);
const {VALID_REQUEST_TEMPLATE} = require(`../validators/constants`);
const {articleRoutes, categoryRoutes, searchRoutes} = require(`../routes/index`);
const {parseJSONFile, parseTXTFile, runParallel} = require(`../../utils`);

const app = express();
const DEFAULT_PORT = 3000;

app.set(`json spaces`, 2);

app.use(express.json());

app.use(`/api/articles`, articleRoutes);
app.use(`/api/categories`, categoryRoutes);
app.use(`/api/search`, searchRoutes);
app.use((req, res) => {
  res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
});
app.use((err, req, res, _next) => {
  res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MESSAGE);
  console.error(err);
});

module.exports = {
  name: `--server`,
  async run(customPort) {
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    // TODO [@Shirokuiu]: Временное решение
    await runParallel(
        parseJSONFile(MOCKS_FILE_NAME),
        parseTXTFile(FILE_PATH.CATEGORIES)
    ).then(([articles, categories]) => {
      mockData.articles = articles;
      mockData.categories = categories;
      VALID_REQUEST_TEMPLATE.ARTICLE.POST.category = categories;
      VALID_REQUEST_TEMPLATE.ARTICLE.PUT.category = categories;
    });

    app.listen(port, () => {
      console.log(chalk.green(`Сервер успешно запущен на ${port} порту: http://localhost:${port}`));
    }).on(`error`, (err) => {
      console.error(chalk.red(`Ошибка при создании сервера`));
      console.error(err);
    });
  }
};

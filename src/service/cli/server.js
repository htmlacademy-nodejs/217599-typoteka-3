'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {
  HTTP_CODE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  mockData,
  MOCKS_FILE_NAME
} = require(`../../constants`);
const {articleRoutes, categoryRoutes, searchRoutes} = require(`../routes/index`);
const {parseJSONFile} = require(`../../utils`);

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

// TODO [@Shirokuiu]: Временное решение
const createSessionMockData = async (fileName) => {
  try {
    mockData.articles = await parseJSONFile(fileName);
  } catch (err) {
    mockData.articles = [];
  }
};

module.exports = {
  name: `--server`,
  async run(customPort) {
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    // TODO [@Shirokuiu]: Временное решение
    await createSessionMockData(MOCKS_FILE_NAME);

    app.listen(port, () => {
      console.log(chalk.green(`Сервер успешно запущен на ${port} порту: http://localhost:${port}`));
    }).on(`error`, (err) => {
      console.error(chalk.red(`Ошибка при создании сервера`));
      console.error(err);
    });
  }
};

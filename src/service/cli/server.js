'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {HTTP_CODE, NOT_FOUND_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE} = require(`../../constants`);

const app = express();
const postsRoutes = require(`../routes/posts-routes`);
const DEFAULT_PORT = 3000;

app.set(`json spaces`, 2);

app.use(express.json());

app.use(`/posts`, postsRoutes);
app.use((req, res) => {
  res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
});
app.use((err, req, res, next) => {
  res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MESSAGE);
  console.error(err);
  next();
});

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.log(chalk.green(`Сервер успешно запущен на ${port} порту: http://localhost:${port}`));
    }).on(`error`, (err) => {
      console.error(chalk.red(`Ошибка при создании сервера`));
      console.error(err);
    });
  }
};

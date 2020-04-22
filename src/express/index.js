'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const app = express();
const indexRoutes = require(`./routes/index-routes`);
const registerRoutes = require(`./routes/register-routes`);
const loginRoutes = require(`./routes/login-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const searchRoutes = require(`./routes/search-routes`);
const categoriesRoutes = require(`./routes/categories-routes`);

const DEFAULT_PORT = 8080;

app.use(`/`, indexRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/search`, searchRoutes);
app.use(`/categories`, categoriesRoutes);

app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    console.error(chalk.red(`При создании сервера возникла ошибка`));
    console.error(err);

    return;
  }

  console.log(chalk.green(`Сервер успешно создан на порту ${DEFAULT_PORT} http://localhost:${DEFAULT_PORT}`));
});

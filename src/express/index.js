'use strict';

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);
const {
  mainRoutes,
  registerRoutes,
  loginRoutes,
  myRoutes,
  searchRoutes,
  categoriesRoutes,
  articlesRoutes,
} = require(`./routes`);

const {DefaultPorts, HTTPCodes} = require(`../constants`);

const app = express();
const PUBLIC_DIR = 'public';
const UPLOAD_DIR = 'upload';

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.use(`/`, mainRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/search`, searchRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/articles`, articlesRoutes);
app.use((req, res) => {
  res.status(HTTPCodes.NotFound).render('error/400');
});
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(HTTPCodes.InternalServerError).render('error/500');
});

app.listen(DefaultPorts.Client, (err) => {
  if (err) {
    console.error(chalk.red(`При создании сервера возникла ошибка`));
    console.error(err);

    return;
  }

  console.log(
    chalk.green(
      `Сервер успешно создан на порту ${DefaultPorts.Client} http://localhost:${DefaultPorts.Client}`,
    ),
  );
});

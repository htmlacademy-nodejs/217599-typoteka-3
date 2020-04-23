'use strict';

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);

const app = express();
const mainRoutes = require(`./routes/main-routes`);
const adminRoutes = require(`./routes/admin-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/`, adminRoutes);
app.use((req, res) => {
  res.status(404).render(`errors/404`);
});
app.use((err, req, res, next) => {
  res.status(500).render(`errors/500`);
  next();
});

app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    console.error(chalk.red(`При создании сервера возникла ошибка`));
    console.error(err);

    return;
  }

  console.log(chalk.green(`Сервер успешно создан на порту ${DEFAULT_PORT} http://localhost:${DEFAULT_PORT}`));
});

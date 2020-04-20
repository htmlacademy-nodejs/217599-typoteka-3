'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {HTTP_CODE} = require(`../../constants`);

const FILE_NAME = `mocks.json`;
const DEFAULT_PORT = 3000;
const CONTENT_TYPE = Object.freeze({
  HTML: {
    'Content-Type': `text/html; charset=UTF-8`
  }
});

const sendResponse = (res, statusCode, message, contentType = CONTENT_TYPE.HTML) => {
  const template = `<!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, contentType);
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessage = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME, `utf8`);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);

        sendResponse(res, HTTP_CODE.OK, `<ul>${message}</ul>`);
      } catch (err) {
        console.error(chalk.red(`Возникла ошибка при чтении файла ${FILE_NAME}`));
        console.error(err);
        sendResponse(res, HTTP_CODE.NOT_FOUND, notFoundMessage);
      }
      break;
    default:
      sendResponse(res, HTTP_CODE.NOT_FOUND, notFoundMessage);
  }
};

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect).listen(port).on(`listening`, (err) => {
      if (err) {
        console.error(chalk.red(`Ошибка при создании сервера`));
        console.error(err);
      }

      console.log(chalk.green(`Сервер успешно запущен на ${port} порту: http://localhost:${port}`));
    });
  }
};

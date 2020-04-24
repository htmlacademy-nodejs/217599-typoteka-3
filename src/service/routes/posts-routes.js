'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;

const {FILE_NAME, HTTP_CODE} = require(`../../constants`);

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf8`);
    const mocks = JSON.parse(fileContent);

    res.json(mocks);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.OK).json([]);
  }
});

module.exports = postsRouter;

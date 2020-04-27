'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;

const {MOCKS_FILE_NAME, HTTP_CODE} = require(`../../constants`);
const {parseJSONFile} = require(`../../utils`);

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {
    const posts = await parseJSONFile(MOCKS_FILE_NAME);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.OK).json([]);
  }
});

module.exports = postsRouter;

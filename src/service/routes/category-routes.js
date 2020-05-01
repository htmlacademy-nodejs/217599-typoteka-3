'use strict';

const {Router} = require(`express`);

const {parseTXTFile} = require(`../../utils`);
const {FILE_PATH, HTTP_CODE} = require(`../../constants`);

const categoryRouter = new Router();

categoryRouter.get(`/`, async (req, res) => {
  try {
    const categories = await parseTXTFile(FILE_PATH.CATEGORIES);

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(HTTP_CODE.OK).json([]);
  }
});

module.exports = categoryRouter;

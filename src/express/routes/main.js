'use strict';

const {Router} = require(`express`);
const {format} = require('date-fns');
const {Articles} = require('../api');
const {errorSwitcher} = require('../lib');
const {HTTPCodes} = require(`../../constants`);
const {cutText} = require('../../utils');

const mainRouter = new Router();
const articlesAPI = new Articles();

mainRouter.get(`/`, async (req, res) => {
  try {
    const articles = await articlesAPI.loadArticles();

    res
      .status(HTTPCodes.Ok)
      .render('main', {articles, format, cutText});
  } catch (err) {
    errorSwitcher(err, res);
  }
});

module.exports = mainRouter;

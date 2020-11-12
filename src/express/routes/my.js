'use strict';

const {Router} = require('express');
const {format} = require('date-fns');
const {errorSwitcher} = require('../lib');
const {Articles} = require('../api');
const {HTTPCodes} = require('../../constants');

const myRouter = new Router();
const articlesAPI = new Articles();

myRouter.get(`/`, async (req, res) => {
  try {
    const articles = await articlesAPI.loadArticles();

    res.status(HTTPCodes.Ok).render('my', {articles, format});
  } catch (err) {
    errorSwitcher(err, res);
  }
});

myRouter.get('/comments', async (req, res) => {
  try {
    const articles = await articlesAPI.loadArticles();

    res
      .status(HTTPCodes.Ok)
      .render('comments', {articles: articles.slice(0, 3)});
  } catch (err) {
    errorSwitcher(err, res);
  }
});

module.exports = myRouter;

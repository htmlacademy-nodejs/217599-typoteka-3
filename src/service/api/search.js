'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');
const {searchValidator} = require('../middlewares');

const searchRouter = new Router();

module.exports = (app, articleService) => {
  app.use('/search', searchRouter);

  searchRouter.get('/', searchValidator, (req, res) => {
    const {searchStr} = res.locals;

    const articles = articleService.findArticlesByTitle(searchStr);

    res.status(HTTPCodes.Ok).json(articles);
  });
};

'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');

const categoriesRouter = new Router();

categoriesRouter.get('/', (req, res) => {
  res.status(HTTPCodes.Ok).render('articles-by-category');
});

module.exports = categoriesRouter;

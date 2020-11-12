'use strict';

const {Router} = require('express');
const {HTTPCodes, HTTPMessages} = require('../../constants');

const categoriesRouter = new Router();

module.exports = (app, categoryService) => {
  app.use('/categories', categoriesRouter);

  categoriesRouter.get('/', (req, res) => {
    const categories = categoryService.getCategories();

    if (!categories.length) {
      return res
        .status(HTTPCodes.NotFound)
        .send(HTTPMessages[HTTPCodes.NotFound]);
    }

    return res.status(HTTPCodes.Ok).json(categories);
  });
};

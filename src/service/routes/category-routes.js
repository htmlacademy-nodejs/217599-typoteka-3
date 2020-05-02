'use strict';

const {Router} = require(`express`);

const {HTTP_CODE, mockData} = require(`../../constants`);

const categoryRouter = new Router();

categoryRouter.get(`/`, (req, res, next) => {
  try {
    const categories = mockData.categories;

    if (!categories.length) {
      res.status(HTTP_CODE.OK).json([]);

      return;
    }

    res.status(HTTP_CODE.OK).json(categories);
  } catch (err) {
    next(err);
  }
});

module.exports = categoryRouter;

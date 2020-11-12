'use strict';

const {Router} = require('express');
const {getMockData} = require('../lib');
const {ArticleService, CategoryService} = require('../data-service');
const articlesRoutes = require('./articles');
const categoriesRoutes = require('./categories');
const searchRoutes = require('./search');

const apiRouter = new Router();

(async () => {
  const articlesData = await getMockData();

  articlesRoutes(apiRouter, new ArticleService(articlesData));
  categoriesRoutes(apiRouter, new CategoryService(articlesData));
  searchRoutes(apiRouter, new ArticleService(articlesData));
})();

module.exports = apiRouter;

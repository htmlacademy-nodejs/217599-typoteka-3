'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  res.render(`main`);
});
mainRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});
mainRouter.get(`/sign-up`, (req, res) => {
  res.render(`sign-up`);
});
mainRouter.get(`/search`, (req, res) => {
  res.render(`search`);
});
mainRouter.get(`/post`, (req, res) => {
  res.render(`post`);
});
mainRouter.get(`/articles-by-category`, (req, res) => {
  res.render(`articles-by-category`);
});

module.exports = mainRouter;

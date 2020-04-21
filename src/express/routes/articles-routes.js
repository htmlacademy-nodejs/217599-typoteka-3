'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => {
  const articleId = +req.params.id;

  res.send(`/articles/${articleId}`);
});
articlesRouter.get(`/category/:id`, (req, res) => {
  const categoryId = +req.params.id;

  res.send(`/articles/category/${categoryId}`);
});
articlesRouter.get(`/add`, (req, res) => {
  res.send(`/articles/add`);
});
articlesRouter.get(`/edit/:id`, (req, res) => {
  const editId = +req.params.id;

  res.send(`/articles/edit/${editId}`);
});

module.exports = articlesRouter;

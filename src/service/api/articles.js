'use strict';

const {Router} = require('express');
const {HTTPCodes, APIRequests} = require('../../constants');
const {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator,
} = require('../middlewares');

const articlesRouter = new Router();

module.exports = (app, articleService) => {
  app.use('/articles', articlesRouter);

  articlesRouter.get('/', (req, res) => {
    const articles = articleService.getArticles();

    res.status(HTTPCodes.Ok).json(articles);
  });

  articlesRouter.get(
    '/:articleId',
    articleExist(articleService),
    (req, res) => {
      const {article} = res.locals;

      res.status(HTTPCodes.Ok).json(article);
    },
  );

  articlesRouter.get(
    '/:articleId/comments',
    articleExist(articleService),
    (req, res) => {
      const {article} = res.locals;
      const comments = articleService.getComments(article.id);

      res.status(HTTPCodes.Ok).json(comments);
    },
  );

  articlesRouter.post(
    '/',
    articleValidator(APIRequests.Post),
    (req, res) => {
      const {bodyPost} = res.locals;
      const createdId = articleService.createArticle(bodyPost);

      res.status(HTTPCodes.Created).json(createdId);
    },
  );

  articlesRouter.post(
    '/:articleId/comments',
    [articleExist(articleService), commentValidator],
    (req, res) => {
      const {newCommentBody, article} = res.locals;

      const commentId = articleService.createComment(
        newCommentBody,
        article.id,
      );

      res.status(HTTPCodes.Created).json(commentId);
    },
  );

  articlesRouter.put(
    '/:articleId',
    [articleExist(articleService), articleValidator(APIRequests.Put)],
    (req, res) => {
      const {editedArticleBody, oldArticle} = res.locals;

      articleService.editArticle(oldArticle, editedArticleBody);

      res.status(HTTPCodes.Created).send();
    },
  );

  articlesRouter.delete(
    '/:articleId',
    articleExist(articleService),
    (req, res) => {
      const {article} = res.locals;

      articleService.removeArticle(article.id);

      res.status(HTTPCodes.NoContent).send();
    },
  );

  articlesRouter.delete(
    '/:articleId/comments/:commentId',
    [articleExist(articleService), commentExist(articleService)],
    (req, res) => {
      const {article, comment} = res.locals;

      articleService.removeComment(article.id, comment.id);

      res.status(HTTPCodes.NoContent).send();
    },
  );
};

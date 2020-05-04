'use strict';

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);

const {HTTP_CODE, mockData, ID_SIZE, NOT_FOUND_MESSAGE} = require(`../../constants`);
const {
  validateBySchema,
  validate,
  articleSchemaPost,
  articleSchemaPut,
  commentSchemaPost
} = require(`../validators/index`);
const {VALID_REQUEST_TEMPLATE} = require(`../validators/constants`);

const articleRouter = new Router();

articleRouter.get(`/`, (req, res, next) => {
  try {
    res.json(mockData.articles);
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/:articleId`, (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const article = mockData.articles.find(({id}) => articleId === id);

    if (!article) {
      res.status(HTTP_CODE.NOT_FOUND).json({});
      return;
    }

    res.json(article);
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/:articleId/comments`, (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const article = mockData.articles.find(({id}) => articleId === id);

    if (!article) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    res.status(HTTP_CODE.OK).json(article.comments);
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/`,
    validateBySchema(articleSchemaPost),
    (req, res, next) => validate(req, res, next, {
      tmp: VALID_REQUEST_TEMPLATE.ARTICLE.POST
    }),
    (req, res, next) => {
      try {
        const hasDate = Object.keys(req.body).includes(`createdDate`);
        let newArticle = {
          ...req.body,
          comments: [],
          id: nanoid(ID_SIZE)
        };

        if (!hasDate) {
          newArticle = {
            ...newArticle,
            createdDate: Date.now()
          };
        }

        mockData.articles.push(newArticle);

        res.status(HTTP_CODE.CREATED).json({id: newArticle.id});
      } catch (err) {
        next(err);
      }
    });

articleRouter.post(`/:articleId/comments`,
    validateBySchema(commentSchemaPost),
    (req, res, next) => validate(req, res, next, {
      tmp: VALID_REQUEST_TEMPLATE.COMMENT.POST
    }),
    (req, res, next) => {
      try {
        const articleId = req.params.articleId;
        const article = mockData.articles.find(({id}) => articleId === id);

        if (!article) {
          res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

          return;
        }

        const newComment = {
          ...req.body,
          title: article.title,
          createdDate: Date.now(),
          id: nanoid(ID_SIZE)
        };

        article.comments.push(newComment);

        res.status(HTTP_CODE.CREATED).json({
          id: newComment.id,
          createdDate: newComment.createdDate
        });
      } catch (err) {
        next(err);
      }
    });

articleRouter.put(`/:articleId`,
    validateBySchema(articleSchemaPut),
    (req, res, next) => validate(req, res, next, {
      tmp: VALID_REQUEST_TEMPLATE.ARTICLE.PUT
    }),
    (req, res, next) => {
      try {
        const articleId = req.params.articleId;
        let articleIndex = mockData.articles.findIndex(({id}) => articleId === id);

        if (articleIndex === -1) {
          res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

          return;
        }

        mockData.articles[articleIndex] = {
          ...mockData.articles[articleIndex],
          ...req.body
        };

        res.status(HTTP_CODE.OK).json({id: mockData.articles[articleIndex].id});
      } catch (err) {
        next(err);
      }
    });

articleRouter.delete(`/:articleId`, (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const article = mockData.articles.find(({id}) => articleId === id);

    if (!article) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    mockData.articles = mockData.articles.filter(({id}) => articleId !== id);

    res.status(HTTP_CODE.OK).send({id: articleId});
  } catch (err) {
    next(err);
  }
});

articleRouter.delete(`/:articleId/comments/:commentId`, (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const articleIndex = mockData.articles.findIndex(({id}) => articleId === id);

    if (articleIndex === -1) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    const commentId = req.params.commentId;
    const comment = mockData.articles[articleIndex].comments.find(({id}) => commentId === id);

    if (!comment) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    mockData.articles[articleIndex]
      .comments = mockData.articles[articleIndex].comments.filter(({id}) => commentId !== id);

    res.status(HTTP_CODE.OK).json({id: comment.id});
  } catch (err) {
    next(err);
  }
});

module.exports = articleRouter;

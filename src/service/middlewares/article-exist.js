'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const articleExist = (service) => (req, res, next) => {
  const {articleId} = req.params;

  const article = service.getArticle(articleId);

  if (!article) {
    return res
      .status(HTTPCodes.NotFound)
      .send(HTTPMessages[HTTPCodes.NotFound]);
  }

  res.locals.article = article;

  return next();
};

module.exports = articleExist;

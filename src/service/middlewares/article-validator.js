'use strict';

const {compareArrayToAnotherArray} = require('../../utils');
const {
  HTTPCodes,
  HTTPMessages,
  APIRequests,
} = require('../../constants');

const tmpPost = [
  'title',
  'announce',
  'fullText',
  'createdDate',
  'categories',
];

const tmpPut = [
  'title',
  'announce',
  'fullText',
  'createdDate',
  'categories',
];

const articleValidator = (requests) => (req, res, next) => {
  const {body} = req;

  switch (requests) {
    case APIRequests.Post:
      const tmpBodyPost = Object.keys(body);
      const isBodyPostValid = tmpPost.every((key) =>
        tmpBodyPost.includes(key),
      );

      if (!isBodyPostValid) {
        return res
          .status(HTTPCodes.InvalidRequest)
          .send(HTTPMessages[HTTPCodes.InvalidRequest]);
      }

      res.locals.bodyPost = body;

      break;
    case APIRequests.Put:
      const {article} = res.locals;
      const editedArticleBody = body;

      const isBodyPutInvalid = Boolean(
        compareArrayToAnotherArray(Object.keys(body), tmpPut).length,
      );

      if (isBodyPutInvalid) {
        return res
          .status(HTTPCodes.InvalidRequest)
          .send(HTTPMessages[HTTPCodes.InvalidRequest]);
      }

      res.locals = {
        editedArticleBody,
        oldArticle: article,
      };

      break;
  }

  return next();
};

module.exports = articleValidator;

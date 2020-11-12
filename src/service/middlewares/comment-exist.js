'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const commentExist = (service) => (req, res, next) => {
  const {commentId} = req.params;
  const {article} = res.locals;

  const comment = service.getComment(article.id, commentId);

  if (!comment) {
    return res
      .status(HTTPCodes.NotFound)
      .send(HTTPMessages[HTTPCodes.NotFound]);
  }

  res.locals.comment = comment;

  return next();
};

module.exports = commentExist;

'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const searchValidator = (req, res, next) => {
  const {title} = req.query;

  if (!title) {
    return res
      .status(HTTPCodes.InvalidRequest)
      .send(HTTPMessages[HTTPCodes.InvalidRequest]);
  }

  res.locals.searchStr = title;

  return next();
};

module.exports = searchValidator;

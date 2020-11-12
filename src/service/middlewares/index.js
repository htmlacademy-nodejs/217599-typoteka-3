'use strict';

const articleExist = require('./article-exist');
const articleValidator = require('./article-validator');
const commentExist = require('./comment-exist');
const commentValidator = require('./comment-validator');
const searchValidator = require('./search-validator');

module.exports = {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator,
  searchValidator,
};

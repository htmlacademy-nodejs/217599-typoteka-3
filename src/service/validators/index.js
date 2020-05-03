'use strict';

const validateBySchema = require(`./validate-by-schema`);
const validate = require(`./validate`);
const articleSchemaPost = require(`./schema/article/article-schema-post`);
const articleSchemaPut = require(`./schema/article/article-schema-put`);
const commentSchemaPost = require(`./schema/comment/comment-schema-post`);
const searchSchemaQuery = require(`./schema/search/search-schema-query`);

module.exports = {
  validateBySchema,
  validate,
  articleSchemaPost,
  articleSchemaPut,
  commentSchemaPost,
  searchSchemaQuery
};

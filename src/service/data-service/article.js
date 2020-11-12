'use strict';

const {nanoid} = require('nanoid');
const {MocksOptions} = require('../../constants');

class Article {
  constructor(data) {
    this._articles = data;
  }

  getArticles() {
    return this._articles;
  }

  getArticle(articleId) {
    return this._articles.find(({id}) => articleId === id);
  }

  getComments(articleId) {
    const articleIndex = this._getArticleIndex(articleId);

    return this._articles[articleIndex].comments;
  }

  getComment(articleId, commentId) {
    const articleIndex = this._getArticleIndex(articleId);

    return this._articles[articleIndex].comments.find(
      ({id}) => commentId === id,
    );
  }

  findArticlesByTitle(searchStr) {
    return this._articles.filter(({title}) =>
      title.toLowerCase().includes(searchStr.toLowerCase()),
    );
  }

  createArticle(body) {
    const id = nanoid(MocksOptions.Range.IdSize.Max);
    const newArticle = {
      ...body,
      id,
      comments: [],
    };

    this._articles.push(newArticle);

    return id;
  }

  createComment(body, articleId) {
    const id = nanoid(MocksOptions.Range.IdSize.Max);
    const articleIndex = this._getArticleIndex(articleId);
    const newComment = {
      ...body,
      id,
    };

    this._articles[articleIndex].comments.push(newComment);

    return id;
  }

  editArticle(oldArticle, body) {
    const articleIndex = this._getArticleIndex(oldArticle.id);

    this._articles[articleIndex] = {
      ...oldArticle,
      ...body,
    };
  }

  removeArticle(articleId) {
    this._articles = this._articles.filter(
      ({id}) => articleId !== id,
    );
  }

  removeComment(articleId, commentId) {
    const articleIndex = this._getArticleIndex(articleId);

    this._articles[articleIndex].comments = this._articles[
      articleIndex
    ].comments.filter(({id}) => commentId !== id);
  }

  _getArticleIndex(articleId) {
    return this._articles.findIndex(({id}) => articleId === id);
  }
}

module.exports = Article;

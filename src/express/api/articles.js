'use strict';

const api = require('./api-config');

class Articles {
  async loadArticles() {
    const {data: articles} = await api.get('articles');

    return articles;
  }

  async loadArticle(id) {
    const {data: article} = await api.get(`articles/${id}`);

    return article;
  }

  async createArticle(body) {
    return await api.post('articles', body);
  }
}

module.exports = Articles;

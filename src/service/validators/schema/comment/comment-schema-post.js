'use strict';

const articleSchemaPost = {
  avatar: {
    exists: {
      errorMessage: `Поле обязательно`
    },
    isEmpty: {
      errorMessage: `Поле не может быть пустым`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    escape: true
  },
  user: {
    exists: {
      errorMessage: `Поле обязательно`
    },
    isEmpty: {
      errorMessage: `Поле не может быть пустым`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    escape: true
  },
  text: {
    exists: {
      errorMessage: `Поле обязательно`
    },
    isEmpty: {
      errorMessage: `Укажите текст комментария`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    escape: true
  }
};

module.exports = articleSchemaPost;

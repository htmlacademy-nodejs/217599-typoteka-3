'use strict';

const VALID_REQUEST_TEMPLATE = {
  ARTICLE: {
    POST: {
      picture: ``,
      title: ``,
      createdDate: 0,
      category: [],
      announce: ``,
      fullText: ``
    },
    PUT: {
      picture: ``,
      title: ``,
      createdDate: 0,
      category: [],
      announce: ``,
      fullText: ``
    }
  },
  COMMENT: {
    POST: {
      avatar: ``,
      user: ``,
      text: ``
    }
  },
  SEARCH: {
    QUERY: {
      query: ``
    }
  }
};

const ERROR_TEMPLATE = {
  errors: []
};

const REQUEST_PARAM = {
  BODY: `body`,
  QUERY: `query`
};

module.exports = {
  VALID_REQUEST_TEMPLATE,
  ERROR_TEMPLATE,
  REQUEST_PARAM
};

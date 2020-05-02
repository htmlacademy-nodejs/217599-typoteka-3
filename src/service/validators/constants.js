'use strict';

const VALID_REQUEST_TEMPLATE = {
  ARTICLE: {
    POST: {
      picture: `STRING`,
      title: `STRING`,
      createdDate: `TIMESTAMP`,
      category: [],
      announce: `STRING`,
      fullText: `STRING`
    },
    PUT: {
      picture: `STRING`,
      title: `STRING`,
      createdDate: `TIMESTAMP`,
      category: [],
      announce: `STRING`,
      fullText: `STRING`
    }
  },
  COMMENT: {
    POST: {
      avatar: `STRING`,
      user: `STRING`,
      text: `STRING`
    }
  },
  SEARCH: {
    QUERY: {
      GET: {
        query: `STRING`
      }
    }
  }
};

const REQUEST_PARAM = {
  BODY: `body`,
  QUERY: `query`
};

module.exports = {
  VALID_REQUEST_TEMPLATE,
  REQUEST_PARAM
};

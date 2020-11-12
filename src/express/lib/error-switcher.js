'use strict';

const {HTTPCodes} = require('../../constants');

const errorSwitcher = (err, res) => {
  switch (err.response.status) {
    case HTTPCodes.NotFound:
      res.status(HTTPCodes.NotFound).render('error/400');
      break;
    default:
      res.status(err.response.status).render('error/500');
  }
};

module.exports = errorSwitcher;

'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');

const searchRouter = new Router();

searchRouter.get('/', (req, res) => {
  res.status(HTTPCodes.Ok).render('search');
});

module.exports = searchRouter;

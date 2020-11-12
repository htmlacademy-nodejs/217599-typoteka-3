'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');

const registerRouter = new Router();

registerRouter.get('/', (req, res) => {
  res.status(HTTPCodes.Ok).render('login');
});

module.exports = registerRouter;

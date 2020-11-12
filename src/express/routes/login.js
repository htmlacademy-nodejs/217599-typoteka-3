'use strict';

const {Router} = require(`express`);
const {HTTPCodes} = require('../../constants');

const loginRouter = new Router();

loginRouter.get('/', (req, res) => {
  res.status(HTTPCodes.Ok).render('sign-up');
});

module.exports = loginRouter;

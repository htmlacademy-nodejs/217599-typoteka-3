'use strict';

const mainRoutes = require(`./main`);
const registerRoutes = require(`./register`);
const loginRoutes = require(`./login`);
const myRoutes = require(`./my`);
const searchRoutes = require(`./search`);
const categoriesRoutes = require(`./categories`);
const articlesRoutes = require(`./articles`);

module.exports = {
  mainRoutes,
  registerRoutes,
  loginRoutes,
  myRoutes,
  searchRoutes,
  categoriesRoutes,
  articlesRoutes,
};

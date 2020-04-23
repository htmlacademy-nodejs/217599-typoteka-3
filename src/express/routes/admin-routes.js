'use strict';

const {Router} = require(`express`);

const adminRoutes = new Router();

adminRoutes.get(`/comments`, (req, res) => {
  res.render(`admin/comments`);
});
adminRoutes.get(`/my`, (req, res) => {
  res.render(`admin/my`);
});
adminRoutes.get(`/new-post`, (req, res) => {
  res.render(`admin/new-post`);
});
adminRoutes.get(`/all-categories`, (req, res) => {
  res.render(`admin/all-categories`);
});

module.exports = adminRoutes;

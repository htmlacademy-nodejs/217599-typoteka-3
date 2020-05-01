'use strict';

const {Router} = require(`express`);

const searchRouter = new Router();

const {validateBySchema, validate, searchSchemaQuery} = require(`../validators/index`);
const {VALID_REQUEST_TEMPLATE, REQUEST_PARAM} = require(`../validators/constants`);
const {HTTP_CODE, mockData} = require(`../../constants`);

searchRouter.get(`/`,
    validateBySchema(searchSchemaQuery),
    (req, res, next) => validate(req, res, next, {
      req: REQUEST_PARAM.QUERY,
      tmp: VALID_REQUEST_TEMPLATE.SEARCH.QUERY.GET
    }),
    (req, res, next) => {
      try {
        const reqQueryStr = req.query.query;

        if (!reqQueryStr.trim().length) {
          res.status(HTTP_CODE.OK).json([]);

          return;
        }

        const filteredArticles = mockData.articles.slice()
          .filter(({title}) => title.toLowerCase().includes(reqQueryStr.toLowerCase()));

        res.status(HTTP_CODE.OK).json(filteredArticles);
      } catch (err) {
        next(err);
      }
    });

module.exports = searchRouter;

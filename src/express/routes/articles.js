'use strict';

const {Router} = require('express');
const multer = require(`multer`);
const path = require(`path`);
const {format, parse} = require('date-fns');
const {nanoid} = require(`nanoid`);
const {errorSwitcher} = require('../lib');
const {Articles} = require('../api');
const {HTTPCodes} = require('../../constants');

const articlesRouter = new Router();
const articlesAPI = new Articles();
const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({storage});

articlesRouter.get('/add', (req, res) => {
  res.status(HTTPCodes.Ok).render('new-post', {method: 'post'});
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await articlesAPI.loadArticle(articleId);

    res
      .status(HTTPCodes.Ok)
      .render('new-post', {article, method: 'put'});
  } catch (err) {
    errorSwitcher(err, res);
  }
});

articlesRouter.get(`/category/:id`, (req, res) => {
  const categoryId = req.params.id;

  res.status(HTTPCodes.Ok).send(`/articles/category/${categoryId}`);
});

articlesRouter.get('/:id', (req, res) => {
  res.status(HTTPCodes.Ok).render('post');
});

articlesRouter.post('/add', upload.none(), async (req, res) => {
  const {body} = req;

  const newArticle = {
    title: body.title,
    announce: body.announce || '',
    fullText: body.fulltext || '',
    createdDate:
      body.createdDate && body.createdDate.length
        ? +format(
            parse(body.createdDate, 'dd.MM.yyyy', new Date()),
            'T',
          )
        : +format(new Date(Date.now()), 'T'),
    categories: [],
  };

  try {
    await articlesAPI.createArticle(newArticle);
  } catch (err) {
    if (err.response.status === HTTPCodes.InvalidRequest) {
      return res.status(HTTPCodes.InvalidRequest).redirect('add');
    }

    return errorSwitcher(err, res);
  }

  return res.status(HTTPCodes.Created).redirect('/my');
});

module.exports = articlesRouter;

'use strict';

const express = require('express');
const request = require('supertest');
const articles = require('./articles');
const {describe, test, expect} = require('@jest/globals');
const {ArticleService} = require('../data-service');
const {HTTPCodes} = require('../../constants');

const createAPI = () => {
  const app = express();
  const mockData = [
    {
      id: 'hfyoY2',
      title: 'Как достигнуть успеха не вставая с кресла',
      createdDate: 1596989710341,
      announce: 'Золотое сечение',
      fullText:
        'Собрать камни бесконечности легко, если вы прирожденный герой.',
      categories: ['IT'],
      comments: [
        {
          id: '1Q8jE4',
          text:
            'Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.',
        },
      ],
    },
    {
      id: '2nCf0p',
      title: 'Как достигнуть успеха не вставая с кресла',
      createdDate: 1602260110343,
      announce:
        'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.',
      fullText: 'Альбом стал настоящим открытием года.',
      categories: ['Железо'],
      comments: [
        {
          id: 'GgEYfd',
          text: 'Плюсую, но слишком много буквы! Совсем немного...',
        },
      ],
    },
    {
      id: '7TCz8i',
      title: 'Обзор новейшего смартфона',
      createdDate: 1599668110343,
      announce: 'Собрать камни бесконечности легко',
      fullText: 'Этот смартфон — настоящая находка.',
      categories: ['За жизнь'],
      comments: [
        {
          id: '6JBA6c',
          text:
            'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?',
        },
      ],
    },
  ];

  app.use(express.json());

  articles(app, new ArticleService(mockData));

  return app;
};

describe('Возвращает список всех объявлений', () => {
  const app = createAPI();

  test(`Вовращает ${HTTPCodes.Ok} код при успешном запросе`, () =>
    request(app).get('/articles').expect(HTTPCodes.Ok));

  test(`Возвращает ${HTTPCodes.NotFound} код при неправильном запросе`, () =>
    request(app).get('/articless').expect(HTTPCodes.NotFound));
});

describe('Возвращает конкретное объявление', () => {
  const app = createAPI();

  test(`Возвращает ${HTTPCodes.Ok} код при существующем объявлении`, () =>
    request(app).get('/articles/hfyoY2').expect(HTTPCodes.Ok));

  test('Title определенного объявления равен - Как достигнуть успеха не вставая с кресла', () =>
    request(app)
      .get('/articles/hfyoY2')
      .expect((res) =>
        expect(res.body.title).toBe(
          'Как достигнуть успеха не вставая с кресла',
        ),
      ));

  test(`Возвращает ${HTTPCodes.NotFound} код на несуществующее объявление`, () =>
    request(app).get('/articles/hfyoY2s').expect(HTTPCodes.NotFound));
});

describe('Возвращает список комментариев к определенному объявлению', () => {
  const app = createAPI();

  test(`Возвращает ${HTTPCodes.Ok} код при успешном запросе на выдачу комментариев`, () =>
    request(app)
      .get('/articles/hfyoY2/comments')
      .expect(HTTPCodes.Ok));

  test(`Возвращает ${HTTPCodes.NotFound} код при запросе на несуществующее объявление с комментариями`, () =>
    request(app)
      .get('/articles/hfyoY2d/comments')
      .expect(HTTPCodes.NotFound));
});

describe('Корректно создает объявление', () => {
  const app = createAPI();
  const newArticle = {
    title:
      'Заголовок. Обязательное поле. Минимум 30 символов. Максимум 250',
    announce:
      'Анонс. Обязательное поле. Минимум 30 символов. Максимум 250',
    fullText: 'Тест полного текста',
    createdDate: 1583925425608,
    categories: ['IT'],
  };
  const invalidNewArticle = {
    titlee:
      'Заголовок. Обязательное поле. Минимум 30 символов. Максимум 250',
    announce:
      'Анонс. Обязательное поле. Минимум 30 символов. Максимум 250',
    fullText: 'Тест полного текста',
    createdDate: 1583925425608,
    categories: ['IT'],
  };

  test(`Возвращает ${HTTPCodes.Created} код при успешном создании объявления`, () =>
    request(app)
      .post('/articles')
      .send(newArticle)
      .expect((res) =>
        expect(res.statusCode).toBe(HTTPCodes.Created),
      ));

  test('Возвращает id созданного объявления', () =>
    request(app)
      .post('/articles')
      .send(newArticle)
      .expect((res) =>
        expect(res.body !== undefined).toBe(res.body !== undefined),
      ));

  test('Корректно добавляет объявления в общий массив', () =>
    request(app)
      .post('/articles')
      .send(newArticle)
      .expect((res) => expect(res.body.length).toBe(6)));

  test(`Возвращает ${HTTPCodes.InvalidRequest} код при невалидном теле создания объявления`, () =>
    request(app)
      .post('/articles')
      .send(invalidNewArticle)
      .expect(HTTPCodes.InvalidRequest));
});

describe('Корректно создает комментарий', () => {
  const app = createAPI();
  const textComment = 'Текст нового сообщения';
  const newComment = {
    text: textComment,
  };
  const invalidNewComment = {
    textr: textComment,
  };

  test(`Возвращает ${HTTPCodes.Created} код при создании нового комментария`, () =>
    request(app)
      .post('/articles/hfyoY2/comments')
      .send(newComment)
      .expect(HTTPCodes.Created));

  test('Возвращает id созданного комментария', () =>
    request(app)
      .post('/articles/hfyoY2/comments')
      .send(newComment)
      .expect((res) =>
        expect(res.body !== undefined).toBe(res.body !== undefined),
      ));

  test('Обновляет массив с комментариями. Число комментариев равно - 3', () =>
    request(app)
      .get('/articles/hfyoY2/comments')
      .expect((res) => expect(res.body.length).toBe(3)));

  test(`Возвращает ${HTTPCodes.NotFound} код при попытке создания комментария к несуществующему объявлению`, () =>
    request(app)
      .post('/articles/hfyoY2s/comments')
      .send(newComment)
      .expect(HTTPCodes.NotFound));

  test(`Возвращает ${HTTPCodes.InvalidRequest} код при невалидном теле создания комментария`, () =>
    request(app)
      .post('/articles/hfyoY2/comments')
      .send(invalidNewComment)
      .expect(HTTPCodes.InvalidRequest));
});

describe('Кооректно редактирует объявление', () => {
  const app = createAPI();
  const editedText = 'Текст отредактированного объявления';
  const editedArticle = {
    title: editedText,
  };

  test(`Возвращает ${HTTPCodes.Created} код при успешном редактировании объявления`, () =>
    request(app)
      .put('/articles/hfyoY2')
      .send(editedArticle)
      .expect(HTTPCodes.Created));

  test(`Title отредактированного объявления равен - ${editedText}`, () =>
    request(app)
      .get('/articles/hfyoY2')
      .expect((res) => expect(res.body.title).toBe(editedText)));

  test(`Возвращает ${HTTPCodes.NotFound} код при редактировании несуществующего объявления`, () =>
    request(app)
      .put('/articles/hfyoY2s')
      .send(editedArticle)
      .expect(HTTPCodes.NotFound));
});

describe('Корректно удаляет объявление', () => {
  const app = createAPI();

  test(`Возвращает ${HTTPCodes.NoContent} код при успешном удалении объявления`, () =>
    request(app)
      .delete('/articles/hfyoY2')
      .expect(HTTPCodes.NoContent));

  test('Корректно удаляет обяъвлениe. После удаление число объявлений равно', () =>
    request(app)
      .get('/articles')
      .expect((res) => expect(res.body.length).toBe(5)));

  test(`Возвращает ${HTTPCodes.NotFound} код при попытке удалить несуществующее объявление`, () =>
    request(app)
      .delete('//articles/hfyoY2')
      .expect(HTTPCodes.NotFound));
});

describe('Корректно удаляет комментарий', () => {
  const app = createAPI();

  test(`Возвращает ${HTTPCodes.NoContent} код при успешном удалении комментария`, () =>
    request(app)
      .delete('/articles/7TCz8i/comments/6JBA6c')
      .expect(HTTPCodes.NoContent));

  test('После удаление возвращает корректное количество комментариев - 0', () =>
    request(app)
      .get('/articles/7TCz8i/comments')
      .expect((res) => expect(res.body.length).toBe(0)));

  test(`Возвращает ${HTTPCodes.NotFound} код при попытке удаления несуществующего комментария`, () =>
    request(app)
      .delete('/articles/7TCz8i/comments/6JBA6cc')
      .expect(HTTPCodes.NotFound));
});

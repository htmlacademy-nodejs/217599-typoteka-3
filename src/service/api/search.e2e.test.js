'use strict';

const express = require('express');
const request = require('supertest');
const search = require('./search');
const {describe, test, expect} = require('@jest/globals');
const {ArticleService} = require('../data-service');
const {HTTPCodes} = require('../../constants');

const app = express();
const mockData = [
  {
    id: 'hfyoY2',
    title: 'Как достигнуть успеха не вставая с кресла',
    createdDate: 1596989710341,
    announce: 'Золотое сечение',
    fullText:
      'Собрать камни бесконечности легко, если вы прирожденный герой.',
    categories: ['IT', 'Железо', 'За жизнь'],
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
    categories: [
      'Железо',
      'Программирование',
      'За жизнь',
      'Без рамки',
      'Кино',
      'Разное',
      'Деревья',
    ],
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
    categories: [
      'За жизнь',
      'Кино',
      'Деревья',
      'Железо',
      'Программирование',
      'IT',
    ],
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

search(app, new ArticleService(mockData));

describe('Возвращает результат на основе query параметра title', () => {
  test(`Возвращает ${HTTPCodes.Ok} код при валидном запросе`, () =>
    request(app)
      .get('/search')
      .query({title: 'Обзор новейшего смартфона'})
      .expect(HTTPCodes.Ok));

  test('Возвращает объявление с title - Обзор новейшего смартфона', () =>
    request(app)
      .get('/search')
      .query({title: 'Обзор новейшего смартфона'})
      .expect((res) =>
        expect(res.body[0].title).toBe('Обзор новейшего смартфона'),
      ));

  test(`Возвращает ${HTTPCodes.InvalidRequest} код, если переданы невалидные параметры поиска`, () =>
    request(app)
      .get('/search')
      .query({titlee: 'Обзор новейшего смартфона'})
      .expect(HTTPCodes.InvalidRequest));
});

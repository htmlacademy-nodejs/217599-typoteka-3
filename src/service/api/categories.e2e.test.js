'use strict';

const express = require('express');
const request = require('supertest');
const categories = require('./categories');
const {describe, test, expect} = require('@jest/globals');
const {CategoryService} = require('../data-service');
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

categories(app, new CategoryService(mockData));

describe('Возвращает результат на основе запроса', () => {
  test(`Возвращает ${HTTPCodes.Ok} код на валидный запрос`, () =>
    request(app).get('/categories').expect(HTTPCodes.Ok));

  test('Возвращает колличество в массиве - 3', () =>
    request(app)
      .get('/categories')
      .expect((res) => expect(res.body.length).toBe(3)));

  test('Возвращает массив категорий - IT, Железо, За жизнь', () =>
    request(app)
      .get('/categories')
      .expect((res) =>
        expect(res.body).toEqual(
          expect.arrayContaining(['IT', 'Железо', 'За жизнь']),
        ),
      ));
});

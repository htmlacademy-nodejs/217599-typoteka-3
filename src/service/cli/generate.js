'use strict';

const dateFormat = require(`dateformat`);
const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MaxCount = {
  blog: 1000,
  category: 9,
  announce: 5
};
const MAX_MONTH_RANGE = 3;
const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];
const DESCRIPTIONS = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];
const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const calculateRandomDate = (dateRange) => {
  const now = new Date();
  const randomMonth = now.setMonth(now.getMonth() - dateRange);

  return dateFormat(randomMonth, `yyyy-mm-dd HH:MM:ss`);
};

const generateBlogs = (count) => (
  Array(count).fill({}).map(() => ({
    title: shuffle(TITLES)[getRandomInt(0, MaxCount.category)],
    createdDate: calculateRandomDate(getRandomInt(0, MAX_MONTH_RANGE)),
    announce: shuffle(DESCRIPTIONS).slice(1, MaxCount.announce).join(` `),
    fullText: shuffle(DESCRIPTIONS).slice(1, DESCRIPTIONS.length).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, MaxCount.category))
  }))
);

module.exports = {
  name: `--generate`,
  run(count) {
    const userCount = parseInt(count, 10) || DEFAULT_COUNT;

    if (userCount > MaxCount.blog) {
      console.log(`Не больше ${MaxCount.blog} публикаций`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateBlogs(userCount), null, ` `);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.log(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.log(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  }
};

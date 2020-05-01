'use strict';

const isTimestamp = require(`validate.io-timestamp`);
const {parseTXTFile, compareArrayToAnotherArray, checkDuplicateInArray} = require(`../../../../utils`);
const {FILE_PATH, COUNT} = require(`../../../../constants`);

const articleSchemaPost = {
  title: {
    exists: {
      errorMessage: `Поле обязательно`
    },
    isLength: {
      errorMessage: `Текст заголовка. Минимум ${COUNT.TITLE.LENGTH.MIN} символов, максимум ${COUNT.TITLE.LENGTH.MAX}`,
      options: {
        min: COUNT.TITLE.LENGTH.MIN,
        max: COUNT.TITLE.LENGTH.MAX
      }
    },
    escape: true
  },
  picture: {
    isEmpty: {
      errorMessage: `Укажите картинку`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    escape: true,
    optional: true
  },
  createdDate: {
    custom: {
      options: (date) => {
        const isDateInvalid = !isTimestamp(date);

        if (isDateInvalid) {
          throw new Error(`Дата должна быть в формате timestamp`);
        }

        return true;
      }
    },
    optional: true
  },
  category: {
    exists: {
      errorMessage: `Поле обязательно`
    },
    isArray: {
      errorMessage: `Категория должна быть массивом, от ${COUNT.CATEGORY.MIN} до ${COUNT.CATEGORY.MAX} эллементов`,
      options: {
        min: COUNT.CATEGORY.MIN,
        max: COUNT.CATEGORY.MAX
      }
    },
    custom: {
      options: async (postCategories) => {
        if (!postCategories) {
          return;
        }

        const categories = await parseTXTFile(FILE_PATH.CATEGORIES);
        const isDuplicate = checkDuplicateInArray(postCategories);
        const hasInvalidCategories = compareArrayToAnotherArray(postCategories, categories);

        if (isDuplicate) {
          throw new Error(`В категории должны быть уникальные значения`);
        }

        if (hasInvalidCategories) {
          throw new Error(`Категория не соответствует валидным значениям`);
        }

        return true; // eslint-disable-line consistent-return
      }
    }
  },
  announce: {
    exists: {
      errorMessage: `Поле обязательно`
    },
    isLength: {
      errorMessage:
        `Текст заголовка. Минимум ${COUNT.ANNOUNCE.LENGTH.MIN} символов, максимум ${COUNT.ANNOUNCE.LENGTH.MAX}`,
      options: {
        min: COUNT.ANNOUNCE.LENGTH.MIN,
        max: COUNT.ANNOUNCE.LENGTH.MAX
      }
    },
    escape: true
  },
  fullText: {
    isEmpty: {
      errorMessage: `Поле не может быть пустым`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    isLength: {
      errorMessage:
        `Полный текст публикации не более ${COUNT.FULL_TEXT.LENGTH.MAX}`,
      options: {
        max: COUNT.FULL_TEXT.LENGTH.MAX
      }
    },
    optional: true,
    escape: true
  }
};

module.exports = articleSchemaPost;

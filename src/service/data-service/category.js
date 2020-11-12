'use strict';

const {uniquerArr} = require('../../utils');

class Category {
  constructor(data) {
    this._articles = data;
  }

  getCategories() {
    return uniquerArr(
      [...this._articles].reduce(
        (acc, value) => [...acc, ...value.categories],
        [],
      ),
    );
  }
}

module.exports = Category;

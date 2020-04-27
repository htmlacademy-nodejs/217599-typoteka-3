'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MOCKS_FILE_NAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;
const INTERNAL_SERVER_ERROR_MESSAGE = `INTERNAL_SERVER_ERROR`;
const ID_SIZE = 6;
const ExitCode = {
  success: 0,
  error: 1
};
const HTTP_CODE = {
  OK: 200,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
const FILE_PATH = {
  TITLES: `./data/titles.txt`,
  DESCRIPTIONS: `./data/descriptions.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ID_SIZE,
  ExitCode,
  HTTP_CODE,
  MOCKS_FILE_NAME,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  FILE_PATH
};

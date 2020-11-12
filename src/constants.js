'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  Success: 0,
  Error: 1,
};

const APIRequests = {
  Post: 'post',
  Put: 'put',
};

const Env = {
  Development: 'development',
  Production: 'production',
};

const MocksRange = Object.freeze({
  Article: {
    Min: 1,
    Max: 1000,
  },
  Category: {
    Min: 1,
    Max: 9,
  },
  Announce: {
    Min: 1,
    Max: 5,
  },
  Comment: {
    Min: 0,
    Max: 9,
  },
  Title: {
    Min: 1,
    Max: 12,
  },
  Month: {
    Max: 3,
  },
  IdSize: {
    Max: 6,
  },
});

const MocksOptions = {
  FileName: `mocks.json`,
  Range: MocksRange,
};

const DefaultPorts = {
  API: 3000,
  Client: 8080,
};

const FilePaths = {
  Titles: `./data/titles.txt`,
  Descriptions: `./data/descriptions.txt`,
  Categories: `./data/categories.txt`,
  Comments: `./data/comments.txt`,
};

const HTTPCodes = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  NotFound: 404,
  InternalServerError: 500,
  Forbidden: 403,
  Unauthorized: 401,
  InvalidRequest: 400,
};

const HTTPMessages = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Invalid Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  HTTPCodes,
  DefaultPorts,
  FilePaths,
  MocksOptions,
  HTTPMessages,
  APIRequests,
  Env,
};

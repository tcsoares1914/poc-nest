## GRAPHQL API

GraphQL API using NestJS and MongoDB.

- Content:
    - [Stack](#stack)
    - [Installation](#installation)
    - [Running](#running)
    - [Tests](#tests)

## Stack <a name="stack"></a>

- Stack:
  - [GraphQL](https://graphql.org/)
  - [Node.js](https://nodejs.org/)
  - [NestJS](https://nestjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Jest](https://jestjs.io/)

## Installation <a name="installation"></a>

Clone GIT repository.

```bash
# Using SSL method.
$ git clone git@github.com:tcsoares1914/poc-nest-graphql.git
```

Access workdir of application:

```bash
$ cd poc-nest-graphql/
```

Make a copy of .env.example for .env. 

```bash
# Copy file.
$ cp .env.example .env
```

## Running <a name="running"></a>

Make sure you have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

Install Node.js dependencies with [npm](https://www.npmjs.com/):

```bash
$ npm install
```

For create and run containers.

```bash
# Up and start all application containers.
$ docker compose up -d
```

Check if API is healthy, make a GET request for /:

```bash
GET: http://localhost:3000/
```

If API is OK:

```bash
{
  "healthy" : true,
  "name" : "API",
  "version" : "0.0.1"
}
```

## Test <a name="tests"></a>

For run unit tests:

```bash
# Running unit tests.
$ npm run test
```


For generate code coverage for unit tests:

```bash
# Running unit tests and generate code coverage.
$ npm run test:cov
```
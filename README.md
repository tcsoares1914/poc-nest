## POC NEST

REST API using Node.js, NestJS, MongoDB and Mongoose.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- Content:
    - [Stack](#stack)
    - [Installation](#installation)
    - [Running](#running)
    - [Tests](#tests)

<!-- /TOC -->

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
## Stack <a name="stack"></a>
- Application stack:
  - [Node.js](https://nodejs.org/)
  - [NestJS](https://nestjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Jest](https://jestjs.io/)

<!-- /TOC -->

## Installation <a name="installation"></a>

Clone GIT repository.

```bash
# Using SSL method.
$ git clone git@github.com:tcsoares1914/poc-nest.git
```

Access work directory:

```bash
$ cd poc-nest/
```

Make a copy of .env.example file.

```bash
$ cp .env.example .env
```

## Running <a name="running"></a>

Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) for create and run containers.

Install dependencies with [npm](https://www.npmjs.com/):

```bash
$ npm install
```

For create an run containers.

```bash
# Up and start all application containers.
$ docker compose up -d
```

For test, make a GET request into /:

```bash
GET: http://localhost:3000/
```

If everything is OK:

```bash
{"healthy":true,"name":"API","version":"0.0.1"}
```

## Test <a name="tests"></a>

For run unit tests:

```bash
# Running unit tests.
$ npm run test
```

For create unit tests coverage:

```bash
# Create code coverage for unit tests.
$ npm run test:cov
```
## REST API

REST API using NestJS and MongoDB.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- Conteúdo:
    - [Stack](#stack)
    - [Installation](#installation)
    - [Running](#running)
    - [Tests](#tests)

<!-- /TOC -->

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
## Stack <a name="stack"></a>
- Stack utilizada na aplicação:
  - [Node.js](https://nodejs.org/)
  - [NestJS](https://nestjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Jest](https://jestjs.io/)

<!-- /TOC -->

## Installation <a name="installation"></a>

Clone o repositório GIT.

```bash
# Using SSL method.
$ git clone git@github.com:tcsoares1914/test-taking-api.git
```

Acesse o diretório do repositório clonado:

```bash
$ cd test-taking-api/
```

Faça uma cópia do arquivo .env.example ou renomeie para .env.

```bash
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

Check if everything it works, make a GET request for /:

```bash
GET: http://localhost:3000/health/
```

If API is healthy:

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


For generate unit tests code coverage:

```bash
# Running unit tests and generate code coverage.
$ npm run test:cov
```
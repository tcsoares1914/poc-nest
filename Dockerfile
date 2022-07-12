FROM node:16

RUN yarn global add @nestjs/cli

COPY package.json .

RUN yarn

COPY . /code

WORKDIR /code

CMD yarn start:dev
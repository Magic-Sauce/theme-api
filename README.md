# Theme Api

## Description

This API enables you to do CRUD operations for themes

## Installation

Use NodeJs 12

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## NeDB

The API uses [NeDB](https://github.com/louischatriot/nedb) which is an in memory datastore whose query lang is a subset of MongoDB.

It is a NoSQL DB in nature and it writes to `theme.data.db`.

If NeDB is working well you should see `"Theme Database Loaded"` logged to the console.

If you do not see this there may be an issue with the API accessing your file system. Please contact steven@withnorby.com if you get stuck.

## API Base Endpoint

http://localhost:3000

## Accessing the Swagger

Navigate to http://localhost:3000/swagger

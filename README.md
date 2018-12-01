Node Todo API
======
NodeJS API for managing todo's
https://fierce-mesa-63842.herokuapp.com/

## Concepts Demonstrated
- Building and deploying a Node server using ExpressJS
- Managing CRUD with MongoDB and MongooseORM
- Handling authentication using the JWT standard
- Testing JavaScript applications using Mocha, Jest, and Supertest

## Installation
```bash
cd /path/to/project
npm install
```

## Set up 
It is required to create a **config.json** file with your environment values in the `/server/config` folder
```json
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://host:mongoport/testdatabase",
    "JWT_SECRET": "test JWT salt"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://host:mongoport/database",
    "JWT_SECRET": "development JWT salt"
  }
}
```

## Running application 
```
node server/server.js
```

## Running tests 
```
npm test
```

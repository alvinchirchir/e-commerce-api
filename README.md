<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

</p>

## Description


<p>A simple inventory api that has CRUD operations.</p>
<p>
Criteria to be used by Shopify</p>


<p>
Filtering based on fields/inventory count/tags/other metadata
</p>

## Requirements 

Javascript 
Node js 
Postgres database https://www.postgresql.org/

</p>
Postgres needs to be installed on computer/server.
</p>
<p>

After installing postgres initialize a database with an appropriate name i.e shopify-challenge-2022 and password i.e password
</p>
<p>

postgres://postgres:{password}@localhost:5432/{database name}
</p>
<p>

For example i.e postgres://postgres:password@localhost:5432/shopify-challenge-2022
</p>
<p>
This is the environment variable that will be used to link to the database. It is called DATABASE_URL in the .env . Change as required in the .env.
</p>
<p>

Once database has been initialized follow the instructions below to install the API after pulling from github.:
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

Swagger is being used for documentation and testing api end points.

Open browser and go the link below.

(http://localhost:3000/api/)

Use the api endpoints to test api.

## Stay in touch

- Author - [Alvin Chirchir]
- Twitter - (https://twitter.com/chirchir_alvin)



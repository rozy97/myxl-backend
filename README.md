<h1 align="center">Rent Book App - Simple App RESTfull API</h1>



Rent App is a simple rent application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name simple-rest, and Import file [rent.sql](note.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3030/notes)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT=3030
HOST=localhost
USER=root // default
PASS= // default
DATABASE=simple-rest
NODE_ENV=development node server.js
```

## End Point
**1. GET**
* `/book`
* `/book/?search=i&sortby=title ASC&limit=10&page=1&availability=1`
* `/book/:id` (Get book by id)
* `/genre

**2. POST**
* `/book`
    * ``` { "title": "Pablo Escobar", "description": "Fly in the sky", "image": "sky.jpg", "date_released": "2019-10-08", "genre_id": "2", "availability": "1" } ```

* `/genre`
    * ``` { "genre_name": "Category6" } ```
    
* `/rent`
   * ``` { "book_id": "10", "user_id": "1" } ```

**3. PATCH**
* `/book/:id` (Update book by id)
   * ``` { "title": "Party", "note": "Herman's Party at 18.00", "category": 2 } ```
* `/genre/:id` (Update genre by id)
   * ``` { "categoryName": "Category8" } ```
* `/return/:id` (Update book availability)
   * ``` { "categoryName": "Category8" } ```

**4. DELETE**
* `/book/:id` (Delete book by id)
* `/genre/:id` (Delete genre by id)

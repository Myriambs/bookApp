const express = require('express');
const bookRoute = express.Router();

const{addBook,lectureBook,updatedBook,removeBook,uniqueBook} = require('../controllers/bookControllers')


//http://localhost:5000/books
bookRoute.post('/', addBook);
//http://localhost:5000/books
bookRoute.get('/',lectureBook );
//http://localhost:5000/books

  bookRoute.put('/:id',updatedBook)

//http://localhost:5000/books

bookRoute.delete('/:id',removeBook)
//http://localhost:5000/books

bookRoute.get('/:id',uniqueBook)

module.exports = bookRoute;

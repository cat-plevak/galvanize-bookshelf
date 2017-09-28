'use strict';

const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps');

// YOUR CODE HERE
router.get('/books', function(req, res, next) {
  knex('books')
    .orderBy('title', 'ASC')
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .then((books) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(books));
    })
    .catch((err) => next(err));
});

router.get('/books/:id', function(req, res, next) {
  const id = req.params.id;
  knex('books')
    .orderBy('title', 'ASC')
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .where('id', id)
    .then((book) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(book[0]));
    })
    .catch((err) => next(err));
});

router.post('/books', function(req, res, next) {
  knex('books')
    .insert({id: req.body.id, title: req.body.title, author: req.body.author, genre: req.body.genre, description: req.body.description, cover_url: req.body.coverUrl}, '*')
    .then((book) => {
      const newBook = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      };
      res.send(newBook);
    })
    .catch((err) => next(err));
});

router.patch('/books/:id', function(req, res, next) {
  const id = req.params.id;
  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if(!book) {
        return next();
      }
      return knex('books')
        .update({title: req.body.title, author: req.body.author, genre: req.body.genre, description: req.body.description, cover_url: req.body.coverUrl}, '*')
        .where('id', id);
    })
    .then((books) => {
      const patchedBook = {
        id: books[0].id,
        title: books[0].title,
        author: books[0].author,
        genre: books[0].genre,
        description: books[0].description,
        coverUrl: books[0].cover_url
      };
      res.send(patchedBook);
    })
    .catch((err) => next(err));
});


router.delete('/books/:id', function(req, res, next) {
  let book;
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if(!row) {
        return next();
      }
      book = row;
      return knex('books')
        .del()
        .where('id', req.params.id)
    })
    .then(() => {
      delete book.id;
      const deletedBook = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        coverUrl: book.cover_url
      };
      res.send(deletedBook);
    })
    .catch((err) => next(err));
});

// router.delete('/books/:id', function(req, res, next) {
//   const id = req.params.id;
//   knex('books')
//     .where('id', id)
//     .first()
//     .then((row) => {
//       if(!row) {
//         return next();
//       }
//       let book = row;
//       return knex('books')
//         .del()
//         .where('id', id)
//     })
//     .then(() => {
//       delete book.id;
//       const deletedBook = {
//         title: book.title,
//         author: book.author,
//         genre: book.genre,
//         description: book.description,
//         coverUrl: book.cover_url
//       }
//       res.send(deletedBook)
//     })
//     .catch((err) => next(err));
// })

module.exports = router;

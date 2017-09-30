'use strict';

const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt');

// YOUR CODE HERE
router.post('/users', function(req, res, next) {
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      return knex('users')
        .insert ({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          hashed_password: hashedPassword
        }, '*')
    })
    .then((user) => {
      const response = {
        id: user[0].id,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        email: user[0].email
      }
      res.send(response);
      console.log(response)
    })
    .catch((err) => next(err));
})

module.exports = router;

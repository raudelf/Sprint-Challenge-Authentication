const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model.js');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then(creds => {
      res.status(201).json({creds});
    })
    .catch(err => {
      res.status(500).json({ message: 'There was a problem with the db', err});
    });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;

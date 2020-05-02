const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secrets.js');
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
  const {username, password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
  
        res.status(200).json({ message: `Welcome ${username}`, token});
      } else {
        res.status(401).json({message: 'Invalid creds'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There was a problem with the db'});
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload,  secret.jwtSecret, options)
};

module.exports = router;

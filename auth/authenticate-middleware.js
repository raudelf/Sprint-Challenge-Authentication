const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          throw new Error(err)
        } else {
          req.decodedToken = decodedToken;
          next();
        };
      })
    } else {
      throw new Error('Bad Auth');
    };
  } catch (err) {
    res.status(401).json(err.message);
  };
};

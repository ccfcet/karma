const jwt = require('jsonwebtoken');

// TODO: CHANGE ALGORITHM TO ES256
const options = {
  algorithm: 'HS256',
  expiresIn: '2d',
};

module.exports = {
  createAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
  },
};

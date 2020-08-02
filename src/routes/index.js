const express = require('express');

const router = express.Router();

const Address = require('../models/Address');

router.get('/', (req, res) => {
  res.status(200).send('It is what it is.');
});

router.get('/secret-page', (req, res) => {
  res.status(200).send('You found the secret page. Whaaaa?');
});

router.get('/test-route', async (req, res) => {
  res.status(200).send(await Address.query());
});

module.exports = router;

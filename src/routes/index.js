const express = require('express');

const router = express.Router();

const connection = require('../db/db');

router.get('/', (req, res) => {
  res.status(200).send('It is what it is.');
});

router.get('/secret-page', (req, res) => {
  res.status(200).send('You found the secret page. Whaaaa?');
});

router.get('/test-route', async (req, res) => {
  res
    .status(200)
    .send(
      await connection('people')
        .select(['people.id AS people_id', 'address.*', 'people_address.*'])
        .join('people_address', 'people.id', 'people_address.people_id')
        .join('address', 'address.id', 'people_address.address_id')
    );
});

module.exports = router;

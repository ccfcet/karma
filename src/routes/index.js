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
      await connection.raw(
        'SELECT * FROM entity A, entity B, entity_parent_child EPC WHERE A.id=EPC.parent_id AND B.id=EPC.child_id'
      )
    );
});

module.exports = router;

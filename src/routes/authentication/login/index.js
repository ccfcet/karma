const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
  });
});

router.use('/karma', require('./karma'));

module.exports = router;

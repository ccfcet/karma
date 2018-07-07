const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
  });
});

router.use('/karma', require('./karma'));
// router.use('/facebook', require('./facebook'));

module.exports = router;

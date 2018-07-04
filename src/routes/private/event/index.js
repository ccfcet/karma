const express = require('express');

const router = express.Router();

router.use('/', require('./event'));

module.exports = router;

const express = require('express');

const router = express.Router();

router.use('/', require('./menu'));

module.exports = router;

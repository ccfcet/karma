const express = require('express');

const router = express.Router();

router.use('/', require('./entity'));
router.use('/entity_type', require('./entity_type'));
router.use('/information', require('./obtain_information'));

module.exports = router;

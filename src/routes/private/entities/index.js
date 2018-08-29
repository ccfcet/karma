const express = require('express');

const router = express.Router();

router.use('/entities', require('./entities'));
router.use('/entity_type', require('./entity_type'));
router.use('/information', require('./obtain_information'));

module.exports = router;

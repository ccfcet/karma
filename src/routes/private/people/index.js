const express = require('express');

const router = express.Router();
console.log('index');

router.use('/people', require('./people'));
router.use('/people_information', require('./people_information'));
router.use('/people_information_slugs', require('./people_information_slugs'));

module.exports = router;

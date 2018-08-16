const express = require('express');

const router = express.Router();

/*router.get('/', (req, res) => {
  res.send({ status: 200 });
});*/
console.log('index')

router.use('/', require('./people'));
// router.use('/people_information', require('./people_information'));
// router.use('/people_information_slugs', require('./people_information_slugs'));

module.exports = router;

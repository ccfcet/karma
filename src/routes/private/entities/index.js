const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ status: 200 });
    console.log("entered entity index")
  });
  

router.use('/entities', require('./entities'));
router.use('/entity_type', require('./entity_type'));
router.use('/information', require('./obtain_information'));

module.exports = router;

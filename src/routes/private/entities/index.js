const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ status: 200 });
});
  

router.use('/entities', require('./entities'));
router.use('/entity_types', require('./entity_types'));
router.use('/entity_parent_child_association', require('./entity_parent_child_association'));
router.use('/entity_information_slugs', require('./entity_information_slugs'));
router.use('/information', require('./obtain_information'));

module.exports = router;

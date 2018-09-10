const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.use('/entities', require('./entities'));
router.use('/entity_types', require('./entity_types'));
router.use('/entity_information', require('./entity_information'));
router.use('/entity_parent_child_association',
  require('./entity_parent_child_association'));
router.use('/entity_information_slugs', require('./entity_information_slugs'));
router.use('/information', require('./obtain_information'));
router.use('/entity_position_association',
  require('./entity_position_association'));
router.use('/entity_people_enrolment', require('./entity_people_enrolment'));
router.use('/entity_people_position_enrolment',
  require('./entity_people_position_enrolment'));

module.exports = router;

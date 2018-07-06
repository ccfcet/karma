const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ status: 200 });
});
router.use('/other', require('./other'));
router.use('/media_people_association', require('./media_people_association'));
router.use('/media_entity_association', require('./media_entity_association'));
router.use('/media_roles', require('./media_roles'));
router.use('/media', require('./media'));

module.exports = router;

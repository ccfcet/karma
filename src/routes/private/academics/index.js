const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.use('/courses_offered', require('./courses_offered'));
router.use('/classes', require('./classes'));
router.use('/classes_time_tables', require('./classes_time_tables'));
router.use('/stream_types', require('./stream_types'));
router.use('/streams_offered', require('./streams_offered'));
router.use('/time_slots', require('./time_slots'));

module.exports = router;

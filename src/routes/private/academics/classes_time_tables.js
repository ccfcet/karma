const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.post('/', (req, res) => {
  const info = {};

  info.class_id = req.body.classId;
  info.day = req.body.day;
  info.time_slot_id = req.body.timeSlotId;
  info.course_id = req.body.courseId;

  methods.Academics.classesTimeTablesMethods.addClassesTimeTables(info)
    .then((model) => {
      res.send(model);
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err,
      });
    });
});

router.put('/:timeTableId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.timeTableId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'classId') && Object
    .prototype.hasOwnProperty.call(req.body, 'day') && Object.prototype
    .hasOwnProperty.call(req.body, 'timeSlotId') && Object.prototype
    .hasOwnProperty.call(req.body, 'courseId')) {
    data.class_id = req.body.classId;
    data.day = req.body.day;
    data.time_slot_id = req.body.timeSlotId;
    data.course_id = req.body.courseId;
  }

  methods.Academics.classesTimeTablesMethods.updateClassesTimeTables(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};
  info.id = req.body.timeTableId;

  methods.Academics.classesTimeTablesMethods.deleteClassesTimeTables(info)
    .then((model) => {
      res.status(200).json({
        status: 'Time table deleted',
        state: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Not able to delete.The row may not exist.',
        state: err,
      });
    });
});

module.exports = router;

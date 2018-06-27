const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.post('/', (req, res) => {
  const info = {};

  info.stream_id = req.body.streamId;
  info.division = req.body.division;
  info.current_class_slug = req.body.currentClass;
  info.start_date = req.body.startDate;
  info.end_date = req.body.endDate;
  console.log(info);
  methods.Academics.classesMethods.addClasses(info)
    .then((model) => {
      res.send({
        status: 200,
        model,
      });
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err,
      });
    });
});

router.put('/:classId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.classId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'streamId') && Object
    .prototype.hasOwnProperty.call(req.body, 'division') && Object.prototype
    .hasOwnProperty.call(req.body, 'currentClass') && Object.prototype
    .hasOwnProperty.call(req.body, 'startDate') && Object.prototype
    .hasOwnProperty.call(req.body, 'endDate')) {
    data.stream_id = req.body.streamId;
    data.division = req.body.division;
    data.current_class_slug = req.body.currentClass;
    data.start_date = req.body.startDate;
    data.end_date = req.body.endDate;
  }

  methods.Academics.classesMethods.updateClasses(info, data)
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

  info.stream_id = req.body.streamId;
  info.division = req.body.division;
  info.current_class_slug = req.body.currentClass;

  methods.Academics.classesMethods.deleteClasses(info)
    .then((model) => {
      res.status(200).json({
        status: 'Class deleted',
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

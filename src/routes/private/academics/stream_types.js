const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/**
 * @api {get} /private Private Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePrivate
 * @apiGroup EntryGates
 *
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 */

router.get('/', (req, res) => {
  methods.Academics.streamTypesMethods.getAllStreamTypes()
    .then((classes) => {
      res.json({
        status: 'success',
        classes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});


router.post('/', (req, res) => {
  const info = {};
  info.stream_type_long = req.body.streamType;
  info.stream_type_short = req.body.streamTypeShort;
  info.start_date = req.body.startDate;
  info.end_date = req.body.endDate;
  methods.Academics.streamTypesMethods.addStreamType(info)
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

router.put('/:streamId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.streamId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'streamType') && Object
    .prototype.hasOwnProperty.call(req.body, 'streamTypeShort') && Object
    .prototype.hasOwnProperty.call(req.body, 'startDate') && Object.prototype
    .hasOwnProperty.call(req.body, 'endDate')) {
    data.stream_type_long = req.body.streamType;
    data.stream_type_short = req.body.streamTypeShort;
    data.start_date = req.body.startDate;
    data.end_date = req.body.endDate;
  }

  methods.Academics.streamTypesMethods.updateStreamTypes(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated stream type',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row may not exist',
        state: err,
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};

  info.id = req.body.streamId;

  methods.Academics.streamTypesMethods.deleteStreamTypes(info)
    .then((model) => {
      res.status(200).json({
        status: 'stream Type deleted',
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

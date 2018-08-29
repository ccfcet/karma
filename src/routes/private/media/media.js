const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  methods.Media.mediaMethods.getAllMedia()
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

  info.media_title = req.body.mediaTitle;
  info.media_file_name = req.body.mediaFileName;
  info.media_location = req.body.mediaLocation;


  methods.Media.mediaMethods
    .addMedia(info)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});

router.put('/:id', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.id; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'mediaTitle') && Object
    .prototype.hasOwnProperty.call(req.body, 'mediaFileName') && Object
    .prototype.hasOwnProperty.call(req.body, 'mediaLocation')) {
    data.media_title = req.body.mediaTitle;
    data.media_file_name = req.body.mediaFileName;
    data.media_location = req.body.mediaLocation;
  }

  methods.Media.mediaMethods.updateMedia(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated media',
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
  info.id = req.body.id;

  methods.Media.mediaMethods.deleteMedia(info)
    .then((model) => {
      res.status(200).json({
        status: 'media deleted',
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

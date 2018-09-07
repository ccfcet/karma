const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/*
    Doc. for get
*/

router.get('/', (req, res) => {
  methods.People.peopleInfoMethods.getAllPeopleInfo()
    .then((classes) => {
      console.log('people');
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

/*
    Doc. for post
*/

router.post('/', (req, res, next) => {
  const info = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
    && Object.prototype.hasOwnProperty.call(req.body, 'slugId')
    && Object.prototype.hasOwnProperty.call(req.body, 'data')) {
    info.people_id = req.body.peopleId;
    info.slug_id = req.body.slugId;
    info.data = req.body.data;

    console.log(info);
    methods.People.peopleInfoMethods.addPeopleInfo(info)
      .then((model) => {
        res.status(200).json({
          message: 'success',
          people: model,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          error: err.message,
        });
      });
  } else {
    console.log('request could not be accepted');
    next();
  }
});

/*
    Doc. for put
*/

router.put('/:peopleInfoId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.peopleInfoId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
     && Object.prototype.hasOwnProperty.call(req.body, 'slugId')
     && Object.prototype.hasOwnProperty.call(req.body, 'data')) {
    data.people_id = req.body.peopleId;
    data.slug_id = req.body.slugId;
    data.data = req.body.data;
  }

  methods.People.peopleInfoMethods.updatePeopleInfo(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated people_information',
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row may not exist',
        state: err.message,
      });
    });
});

/*
    Doc for delete
*/

router.delete('/', (req, res) => {
  const info = {};
  console.log(info);
  info.id = req.body.peopleInfoId;
  methods.People.peopleInfoMethods.deletePeopleInfo(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted peopleInfo',
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

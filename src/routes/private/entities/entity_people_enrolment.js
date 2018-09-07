const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/*
    Doc for get
*/

router.get('/', (req, res) => {
  methods.Entities.entityPeopleEnrolMethods.getAllEntityPeopleEnrol()
    .then((entities) => {
      res.status(200).json({
        status: 'success',
        entities,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error',
        Error: err.message,
      });
    });
});

/*
    Doc for post
*/

router.post('/', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'entityId')
     && Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
     && Object.prototype.hasOwnProperty.call(req.body, 'dateTime')
     && Object.prototype.hasOwnProperty.call(req.body, 'Activity')) {
    const New = {};
    New.entity_id = req.body.entityId;
    New.people_id = req.body.peopleId;
    New.date_time = req.body.dateTime;
    New.activity = req.body.Activity;
    methods.Entities.entityPeopleEnrolMethods.addEntityPeopleEnrol(New)
      .then((entity) => {
        res.status(200).json({
          status: 'success',
          entity,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error',
          Error: err.message,
        });
      });
  } else {
    console.log('The request doesnot qualify the POST / route');
    next();
  }
});

/*
    Doc for put
*/

router.put('/:entityPId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityPId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'entityId')
   && Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
   && Object.prototype.hasOwnProperty.call(req.body, 'dateTime')
   && Object.prototype.hasOwnProperty.call(req.body, 'Activity')) {
    data.entity_id = req.body.entityId;
    data.people_id = req.body.peopleId;
    data.date_time = req.body.dateTime;
    data.activity = req.body.Activity;
  }

  methods.Entities.entityPeopleEnrolMethods.updateEntityPeopleEnrol(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated EntityPeopleEnrolment',
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});

/*
    Doc for delete
*/

router.delete('/', (req, res) => {
  const info = {};
  info.id = req.body.data.entityPId;
  info.entity_id = req.body.data.entityId;
  info.people_id = req.body.data.peopleId;
  info.date_time = req.body.data.dateTime;
  info.activity = req.body.data.Activity;
  console.log(info);
  methods.Entities.entityPeopleEnrolMethods.deleteEntityPeopleEnrol(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted EntityPeopleEnrolment',
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

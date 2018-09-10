const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/*
    Doc for get
*/

router.get('/', (req, res) => {
  methods.Entities.entityPeoplePosEnrolMethods.getAllEntityPeoplePosEnrol()
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
  if (Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
     && Object.prototype.hasOwnProperty.call(req.body, 'EntPosAssociationId')
     && Object.prototype.hasOwnProperty.call(req.body, 'Activity')) {
    const New = {};
    New.people_id = req.body.peopleId;
    New.entity_position_association_id = req.body.EntPosAssociationId;
    New.activity = req.body.Activity;
    methods.Entities.entityPeoplePosEnrolMethods.addEntityPeoplePosEnrol(New)
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

router.put('/:entityPPId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityPPId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'peopleId')
  && Object.prototype.hasOwnProperty.call(req.body, 'EntPosAssociationId')
  && Object.prototype.hasOwnProperty.call(req.body, 'Activity')) {
    data.people_id = req.body.peopleId;
    data.entity_position_association_id = req.body.EntPosAssociationId;
    data.activity = req.body.Activity;
  }

  methods.Entities.entityPeoplePosEnrolMethods
    .updateEntityPeoplePosEnrol(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated EntityPeoplePositionEnrolment',
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
  info.id = req.body.data.entityPPId;
  info.people_id = req.body.data.peopleId;
  info.entity_position_association_id = req.body.data.EntPosAssociationId;
  info.activity = req.body.data.Activity;
  console.log(info);
  methods.Entities.entityPeoplePosEnrolMethods.deleteEntityPeoplePosEnrol(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted EntityPeoplePositionEnrolment',
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

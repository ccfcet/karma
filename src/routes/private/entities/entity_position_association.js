const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/*
    Doc for get
*/

router.get('/', (req, res) => {
  methods.Entities.entityPositionMethods.getAllEntityPosition()
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
     && Object.prototype.hasOwnProperty.call(req.body, 'Status')
     && Object.prototype.hasOwnProperty.call(req.body, 'positionName')
     && Object.prototype.hasOwnProperty.call(req.body, 'positionSlug')
     && Object.prototype.hasOwnProperty.call(req.body, 'positionDescription')) {
    const New = {};
    New.entity_id = req.body.entityId;
    New.status = req.body.Status;
    New.position_name = req.body.positionName;
    New.position_slug = req.body.positionSlug;
    New.position_description = req.body.positionDescription;
    methods.Entities.entityPositionMethods.addEntityPosition(New)
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

router.put('/:entityPosId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityPosId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'entityId')
  && Object.prototype.hasOwnProperty.call(req.body, 'Status')
  && Object.prototype.hasOwnProperty.call(req.body, 'positionName')
  && Object.prototype.hasOwnProperty.call(req.body, 'positionSlug')
  && Object.prototype.hasOwnProperty.call(req.body, 'positionDescription')) {
    data.entity_id = req.body.entityId;
    data.status = req.body.Status;
    data.position_name = req.body.positionName;
    data.position_slug = req.body.positionSlug;
    data.position_description = req.body.positionDescription;
  }

  methods.Entities.entityPositionMethods.updateEntityPosition(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated EntityPositionAssociation',
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
  info.id = req.body.data.entityPosId;
  info.entity_id = req.body.data.entityId;
  info.status = req.body.data.Status;
  info.position_name = req.body.data.positionName;
  info.position_slug = req.body.data.positionSlug;
  info.position_description = req.body.data.positionDescription;
  console.log(info);
  methods.Entities.entityPositionMethods.deleteEntityPosition(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted EntityPositionAssociation',
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

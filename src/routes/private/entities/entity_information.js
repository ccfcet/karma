const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/*
    Doc for get
*/

router.get('/', (req, res) => {
  methods.Entities.entityInfoMethods.getAllEntityInfo()
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
     && Object.prototype.hasOwnProperty.call(req.body, 'slugId')
     && Object.prototype.hasOwnProperty.call(req.body, 'Data')) {
    const New = {};
    New.entity_id = req.body.entityId;
    New.slug_id = req.body.slugId;
    New.data = req.body.Data;
    methods.Entities.entityInfoMethods.addEntityInfo(New)
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

router.put('/:entityInfoId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityInfoId; // Key values for finding the selected row

  if (Object.prototype.hasOwnProperty.call(req.body, 'entityId')
   && Object.prototype.hasOwnProperty.call(req.body, 'slugId')
   && Object.prototype.hasOwnProperty.call(req.body, 'Data')) {
    data.entity_id = req.body.entityId;
    data.slug_id = req.body.slugId;
    data.data = req.body.Data;
  }

  methods.Entities.entityInfoMethods.updateEntityInfo(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated EntityInformation',
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
  info.id = req.body.data.entityInfoId;
  info.entity_id = req.body.data.entityId;
  info.slug_id = req.body.data.slugId;
  info.data = req.body.data.Data;
  console.log(info);
  methods.Entities.entityInfoMethods.deleteEntityInfo(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted EntityInformation',
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

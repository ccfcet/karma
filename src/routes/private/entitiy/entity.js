const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  res.json({ status: 'functional' });
});
router.post('/', (req, res) => {
  const info = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'entityType') && Object
    .prototype.hasOwnProperty.call(req.body, 'entityTypeSlug')) {
    info.entity_type = req.body.entityType;
    console.log(req.body.entityType);
    info.entity_type_slug = req.body.entityTypeSlug;
    methods.Entities.obtainInformation.entityMethod.addEntity(info)
      .then((model) => {
        console.log(model);
        res.json(model);
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          error: err,
        });
      });
  }
});

router.put('/:entityType/:entityTypeSlug', (req, res) => {
  const data = {};
  const info = {};
  info.entity_type = req.params.entityType;
  info.entity_type_slug = req.params.entityTypeSlug;
  if (Object.prototype.hasOwnProperty.call(req.body, 'entityType') && Object
    .prototype.hasOwnProperty.call(req.body, 'entityTypeSlug')) {
    data.entity_type = req.body.entityType;
    data.entity_type_slug = req.body.entityTypeSlug;
  }
  methods.Entities.obtainInformation.entityMethod.updateEntityTypes(info, data)
    .then((model) => {
      console.log(model);
      res.json({
        status: 'updated',
        data: model,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: 'not updated',
        error: err,

      });
    });
});
router.delete('/', (req, res) => {
  const info = {};
  info.entity_type = req.body.entityType;
  methods.Entities.obtainInformation.entityMethod.deleteEntityTypes(info)
    .then((model) => {
      console.log(model);
      res.json({
        status: 'deleted',
        data: model,
      })
        .catch((err) => {
          res.status(500).json({
            status: 'the row does not exist',
            error: err,
          });
        });
    });
});
module.exports = router;

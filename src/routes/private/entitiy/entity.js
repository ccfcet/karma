const express = require('express');

const router = express.Router();

const methods = require('data/methods');

router.get('/', (req, res) => {
  res.json({ status: 'functional' });
});

router.post('/', (req, res) => {
  const newEntity = {};
  newEntity.entity_name = req.body.entityName;
  newEntity.entity_slug = req.body.entitySlug;
  newEntity.entity_type_id = req.body.entityTypeId;
  methods.Entities.entityMethods.addEntity(newEntity)
    .then((entity) => {
      res.status(200).json({
        message: 'Success',
        entity,
      });
    });
});

module.exports = router;

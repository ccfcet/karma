const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/*
    Doc for get
*/

router.get('/', (req, res) => {
  methods.Entities.entityInfoSlugsMethods.getAllEntityInfoSlugs()
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
  if (Object.prototype.hasOwnProperty.call(req.body, 'slugName')) {
    const New = {};
    New.slug_name = req.body.slugName;
    methods.Entities.entityInfoSlugsMethods.addEntityInfoSlugs(New)
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

router.put('/:entityInfoSlugsId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityInfoSlugsId; // Key values for f
  // inding the selected row

  if (Object.prototype.hasOwnProperty.call(req.body, 'slugName')) {
    data.slug_name = req.body.slugName;
  }

  methods.Entities.entityInfoSlugsMethods.updateEntityInfoSlugs(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated entityInfoSlugs',
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
  info.id = req.body.data.entityInfoSlugsId;
  info.slug_name = req.body.data.slugName;
  console.log(info);
  methods.Entities.entityInfoSlugsMethods.deleteEntityInfoSlugs(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted entityInfoSlugs',
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

const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/*
    Doc. for get
*/

router.get('/', (req, res) => {
  methods.People.peopleInfoSlugsMethods.getAllPeopleInfoSlugs()
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
  if (Object.prototype.hasOwnProperty.call(req.body, 'slugName')) {
    info.slug_name = req.body.slugName;

    console.log(info);
    methods.People.peopleInfoSlugsMethods.addPeopleInfoSlugs(info)
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

router.put('/:peopleInfoSlugId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.peopleInfoSlugId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'slugName')) {
    data.slug_name = req.body.slugName;
  }

  methods.People.peopleInfoSlugsMethods.updatePeopleInfoSlugs(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated peopleInfoSlugs',
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
  info.id = req.body.peopleInfoSlugId;
  methods.People.peopleInfoSlugsMethods.deletePeopleInfoSlugs(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted peopleInfoSlugs',
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

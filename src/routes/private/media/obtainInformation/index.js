const express = require('express');

const router = express.Router();
// const methods = require('data/methods');
const media = require('data/methods/media');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.get('/entity/:entityId/:mediaRolesSlug', (req, res) => {
  const info = {};
  info.entity_id = req.params.entityId;
  info.slugName = req.params.mediaRolesSlug;
  media.obtainInformation
    .obtainMediaInformationFromEntity(info.entity_id, info.slugName)
    .then((result) => {
      console.log(result);
      if (!_.isEmpty(result)) {
        res.json(result);
      } else {
        res.status(501).json({
          success: 'false',
          code: 'information-empty',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: 'false',
        code: 'information-error',
      });
    });
});
router.get('/:peopleId/:mediaRolesSlug', (req, res) => {
  const info = {};
  info.people_id = req.params.peopleId;
  info.slugName = req.params.mediaRolesSlug;
  media.obtainInformation
    .obtainMediaInformationFromPeople(info.people_id, info.slugName)
    .then((result) => {
      console.log(result);
      if (!_.isEmpty(result)) {
        res.json(result);
      } else {
        res.status(501).json({
          success: 'false',
          code: 'information-empty',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: 'false',
        code: 'information-error',
      });
    });
});


module.exports = router;

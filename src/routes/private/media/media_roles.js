const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  methods.Media.mediaRolesMethods.getAllMediaRoles()
    .then((model) => {
      res.status(200).json({
        status: 'success',
        classes: model,
      });
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});

router.post('/', (req, res) => {
  const info = {};

  info.role_name = req.body.roleName;
  info.role_slug = req.body.roleSlug;
  info.role_description = req.body.roleDescription;


  methods.Media.mediaRolesMethods
    .addMediaRoles(info)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});

router.put('/:id', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.id; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'roleName') && Object
    .prototype.hasOwnProperty.call(req.body, 'roleSlug') && Object.prototype
    .hasOwnProperty.call(req.body, 'roleDescription')) {
    data.role_name = req.body.roleName;
    data.role_slug = req.body.roleSlug;
    data.role_description = req.body.roleDescription;
  }

  methods.Media.mediaRolesMethods.updateMediaRoles(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'Updated Media Roles',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});


router.delete('/', (req, res) => {
  const info = {};
  info.id = req.body.id;

  methods.Media.mediaRolesMethods.deleteMediaRoles(info)
    .then((model) => {
      res.status(200).json({
        status: 'Media Roles deleted',
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

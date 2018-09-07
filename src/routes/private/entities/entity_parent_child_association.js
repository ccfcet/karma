const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/*
    Doc for get
*/

router.get('/', (req, res) => {
  methods.Entities.entityParentChildMethods.getAllEntityParentChild()
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
  if (Object.prototype.hasOwnProperty.call(req.body, 'parentId')
     && Object.prototype.hasOwnProperty.call(req.body, 'childId')) {
    const New = {};
    New.parent_id = req.body.parentId;
    New.child_id = req.body.childId;
    methods.Entities.entityParentChildMethods.addEntityParentChild(New)
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

router.put('/:entityParentChildId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityParentChildId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'parentId')
   && Object.prototype.hasOwnProperty.call(req.body, 'childId')) {
    data.people_id = req.body.peopleId;
    data.child_id = req.body.childId;
  }

  methods.Entities.entityParentChildMethods.updateEntityParentChild(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated Entity_ParentChild_Association',
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
  info.id = req.body.data.entityParentChildId;
  info.parent_id = req.body.data.parentId;
  info.child_id = req.body.data.childId;
  console.log(info);
  methods.Entities.entityParentChildMethods.deleteEntityParentChild(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted Entity_ParentChild_Association',
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

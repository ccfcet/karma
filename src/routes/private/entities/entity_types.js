const express = require('express');

const router = express.Router();

const methods = require('data/methods');

router.get('/', (req, res) => {
  methods.Entities.entityTypeMethods.getAllEntityTypes()
    .then((entityType) => {
      res.status(200).json({
        message: 'success',
        entityType,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error',
        Error: err.message,
      });
    });
});

/**
 * @api {post} /private/entity/entity_type AddEntityType
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddEntityType
 * @apiGroup EntityType
 *
 * @apiParam {String} entityType Entity type
 * @apiParam {Stirng} entityTypeSlug Entity type slug
 *
 * @apiSuccess {id} id Entity ID
 * @apiSuccess {String} entity_type Entity type
 * @apiSuccess {String} entity_type_slug Entity type slug
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "id": 3,
    "entity_type": "Club",
    "entity_type_slug": "club",
    "updatedAt": "2018-07-03T05:34:52.258Z",
    "createdAt": "2018-07-03T05:34:52.258Z"
}
 */

router.post('/', (req, res) => {
  const info = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'entityType')
   && Object.prototype.hasOwnProperty.call(req.body, 'entityTypeSlug')) {
    info.entity_type = req.body.entityType;
    // console.log(req.body.entityType);
    info.entity_type_slug = req.body.entityTypeSlug;
    methods.Entities.entityTypeMethods.addEntityType(info)
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


/**
 * @api {put} /private/entity/entity_type/:entityType/:entityTypeSlug
 * UpdateEntityType
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateEntityType
 * @apiGroup EntityType
 *
 * @apiParam {String} entityType Current entity type
 * @apiParam {Stirng} entityTypeSlug Current entity type slug
 *
 * @apiParam {String} entityType Updated entity type
 * @apiParam {Stirng} entityTypeSlug Updated entity type slug
 *
 * @apiSuccess {String} success success
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "success": "success"
}
 */

router.put('/:entityTypeId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.entityTypeId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'entityType')
   && Object.prototype.hasOwnProperty.call(req.body, 'entityTypeSlug')) {
    data.entity_type = req.body.entityType;
    data.entity_type_slug = req.body.entityTypeSlug;
  }

  methods.Entities.entityTypeMethods.updateEntityTypes(info, data)
    .then(() => {
      res.status(200).json({
        status: 'updated entitytypes',
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});

/**
 * @api {delete} /private/entity/entity_type/ DeleteEntityType
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteEntityType
 * @apiGroup EntityType
 *
 * @apiParam {String} entityType Entity type
 *
 * @apiSuccess {String} status deleted
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "status": "Success",
    "message": "deleted"
}
 */

router.delete('/', (req, res) => {
  const info = {};
  info.id = req.body.data.entityTypeId;
  info.entity_type = req.body.data.entityType;
  info.entity_type_slug = req.body.data.entityTypeSlug;

  methods.Entities.entityTypeMethods.deleteEntityTypes(info)
    .then((message) => {
      res.json({
        status: 'deleted entitytypes',
        message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Error',
        message: err.message,
      });
    });
});

module.exports = router;

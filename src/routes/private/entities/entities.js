const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/**
 * @api {get} /private/entity GetAllEntities
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetAllEntities
 * @apiGroup Entity
 *
 * @apiSuccess {String} message message
 * @apiSuccess {Number} id Entity ID
 * @apiSuccess {String} entity_name Entity name
 * @apiSuccess {String} entity_slug Entity slug name
 * @apiSuccess {Integer} entity_type_id Entity type id
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Success",
    "entities": [
        {
            "id": 2,
            "entity_name": "Department of Computer Science and Engineering",
            "entity_slug": "cse",
            "entity_type_id": 6,
            "createdAt": "2018-07-03T07:08:01.000Z",
            "updatedAt": "2018-07-03T08:22:37.000Z"
        },
        {
            "id": 3,
            "entity_name": "Department of Civil Engnieering ",
            "entity_slug": "dce",
            "entity_type_id": 6,
            "createdAt": "2018-07-03T08:43:42.000Z",
            "updatedAt": "2018-07-03T08:58:08.000Z"
        }
    ]
}
 */

router.get('/', (req, res) => {
  methods.Entities.entityMethods.getAllEntities()
    .then((entities) => {
      res.status(200).json({
        message: 'success',
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

/**
 * @api {get} /private/entity/:id FindEntityById
 * @apiVersion 1.0.0-alpha-1
 * @apiName FindEntityById
 * @apiGroup Entity
 *
 * @apiParam {id} id Entity ID
 *
 * @apiSuccess {String} message message
 * @apiSuccess {id} id Entity ID
 * @apiSuccess {String} entity_name Entity name
 * @apiSuccess {String} entity_slug Entity slug name
 * @apiSuccess {Integer} entity_type_id Entity type id
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Success",
    "entity": {
        "id": 2,
        "entity_name": "Department of Computer Science and Engineering",
        "entity_slug": "cse",
        "entity_type_id": 6,
        "createdAt": "2018-07-03T07:08:01.000Z",
        "updatedAt": "2018-07-03T08:22:37.000Z"
    }
}
 */

/**
 * @api {post} /private/entity/ AddEntity
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddEntity
 * @apiGroup Entity
 *
 * @apiParam {String} entityName Entity name
 * @apiParam {Stirng} entitySlug Entity slug name
 * @apiParam {Integer} entityTypeId Entity type id
 *
 * @apiSuccess {String} message message
 * @apiSuccess {id} id Entity ID
 * @apiSuccess {String} entity_name Entity name
 * @apiSuccess {String} entity_slug Entity slug name
 * @apiSuccess {Integer} entity_type_id Entity type id
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Success",
    "entity": {
        "id": 2,
        "entity_name": "Department of Computer Science and Engineering",
        "entity_slug": "dcse",
        "entity_type_id": "6",
        "updatedAt": "2018-07-03T07:08:01.055Z",
        "createdAt": "2018-07-03T07:08:01.055Z"
    }
}
 */

router.post('/', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'entityName')
   && Object.prototype.hasOwnProperty.call(req.body, 'entitySlug')
   && Object.prototype.hasOwnProperty.call(req.body, 'entityTypeId')) {
    const newEntity = {};
    newEntity.entity_name = req.body.entityName;
    // newEntity.id = req.body.entityId;
    newEntity.entity_slug = req.body.entitySlug;
    newEntity.entity_type_id = req.body.entityTypeId;
    methods.Entities.entityMethods.addEntity(newEntity)
      .then((entity) => {
        res.status(200).json({
          message: 'success',
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

/**
 * @api {put} /private/entity/:id UpdateEntity
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateEntity
 * @apiGroup Entity
 *
 * @apiParam {Integer} id ID of the emtity to be updated
 * @apiParam {String} entityName Entity name
 * @apiParam {Stirng} entitySlug Entity slug name
 * @apiParam {Integer} entityTypeId Entity type id
 *
 * @apiSuccess {String} message message
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "updated"
}
 */

router.put('/:entityId', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'entityId')
   && Object.prototype.hasOwnProperty.call(req.body, 'entityName')
   && Object.prototype.hasOwnProperty.call(req.body, 'entitySlug')
   && Object.prototype.hasOwnProperty.call(req.body, 'entityTypeId')) {
    const newEntity = {};

    newEntity.id = req.params.entityId;
    newEntity.entity_name = req.body.entityName;
    newEntity.entity_slug = req.body.entitySlug;
    newEntity.entity_type_id = req.body.entityTypeId;

    methods.Entities.entityMethods.updateEntity(newEntity)
      .then(() => {
        res.status(200).json({
          status: 'updated entities',
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error',
          Error: err.message,
        });
      });
  } else {
    console.log('The request doesnot qualify the PUT / route');
    next();
  }
});

/**
 * @api {delete} /private/entity/:id DeleteEntity
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteEntity
 * @apiGroup Entity
 *
 * @apiParam {Integer} id ID of the emtity to be updated
 *
 * @apiSuccess {String} message message
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "1 row(s) deleted"
}
 */

router.delete('/', (req, res) => {
  const info = {};
  info.id = req.body.data.entityId;
  info.entity_type_id = req.body.data.entityTypeId;
  console.log(info);
  methods.Entities.entityMethods.deleteEntity(info)
    .then((model) => {
      res.status(200).json({
        status: 'deleted entities',
        state: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Deletion unsuccessful. The selected row may not exist.',
        state: err,
      });
    });
});

module.exports = router;

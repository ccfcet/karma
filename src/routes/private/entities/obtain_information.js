const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/**
 * @api {get} /private/entity/:entity_type GetEntitiesByType
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetEntitiesByType
 * @apiGroup Entity
 *
 * @apiSuccess {String} message Message
 * @apiSuccess {object} entities Array containing entities
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "entities": [
        {
            "id": 1,
            "entity_name": "College of Engineering Trivandrum",
            "entity_slug": "cet",
            "entity_type_id": 1,
            "created_at": "2018-08-03T13:45:18.000Z",
            "updated_at": "2018-08-03T13:45:18.000Z"
        }
    ]
}
 */

router.get('/:entity_type', (req, res) => {
  const data = {};
  if (Object.prototype.hasOwnProperty.call(req.params, 'entity_type')) {
    data.entityType = req.params.entity_type;
    methods.Entities.obtainInformation.getEntitiesByType(data.entityType)
      .then((entities) => {
        res.status(200).json({
          message: 'success',
          entities,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  }
});

module.exports = router;

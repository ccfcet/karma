const express = require('express');

const router = express.Router();
const methods = require('data/methods');
// const media = require('data/methods/media');

// const _ = require('lodash');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

/**
 * @api {get} /private/media/other/entity/:entityId/:mediaRoleSlug
 * GetMediaAssociatedWithEntityUsingMediaRoleSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetMediaAssociatedWithEntityUsingMediaRoleSlug
 * @apiGroup Media
 *
 * @apiParam {Integer} entityId Entity ID
 * @apiParam {Stirng} mediaRoleSlug Media role slug
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} media Object containing the values returned from the
 * media_role_entity_association table for the given entity id
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "media": [
        {
            "id": 1,
            "media_id": 5,
            "role_id": 1,
            "entity_id": 4,
            "createdAt": "2018-07-05T09:42:20.000Z",
            "updatedAt": "2018-07-05T09:42:20.000Z"
        },
        {
            "id": 2,
            "media_id": 6,
            "role_id": 1,
            "entity_id": 4,
            "createdAt": "2018-07-05T11:55:10.000Z",
            "updatedAt": "2018-07-05T11:55:10.000Z"
        }
    ]
}
 */

router.get('/entity/:entityId/:mediaRoleSlug', (req, res) => {
  const data = {};
  data.entity_id = req.params.entityId;
  data.media_role_slug = req.params.mediaRoleSlug;
  methods.Media.other.getMediaForEntityUsingMediaRoleSlug(data)
    .then((media) => {
      res.status(200).json({
        message: 'success',
        media,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
});


/**
 * @api {post} /private/media/other/entity AddMediaForEntityUsingMediaRoleSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddMediaForEntityUsingMediaRoleSlug
 * @apiGroup Media
 *
 * @apiParam {Integer} entityId Entity ID
 * @apiParam {Stirng} mediaRoleSlug Media role slug
 * @apiParam {String} mediaTitle Media title
 * @apiParam {String} mediaFileName Media file name
 * @apiParam {String} mediaLocation Media location
 *
 * @apiSuccess {String} message message
 * HTTP/1.1 200 OK
{
    "message": "success"
}
 */

router.post('/entity/', (req, res) => {
  const data = {};
  data.entity_id = req.body.entityId;
  data.role_slug = req.body.mediaRoleSlug;
  data.media_title = req.body.mediaTitle;
  data.media_file_name = req.body.mediaFileName;
  data.media_location = req.body.mediaLocation;

  methods.Media.other.addMediaForEntityUsingMediaRoleSlug(data)
    .then(() => {
      res.status(200).json({
        message: 'success',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {put} /private/media/other/entity UpdateMediaForEntityUsingMediaRoleSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateMediaForEntityUsingMediaRoleSlug
 * @apiGroup Media
 *
 * @apiParam {Integer} entityId Entity ID
 * @apiParam {Stirng} mediaRoleSlug Media role slug
 * @apiParam {String} mediaTitle Media title
 * @apiParam {String} mediaFileName Media file name
 * @apiParam {String} mediaLocation Media location
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} media Object containing the values inserted into
 * media_role_entity_association table
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "media": {
        "id": 2,
        "media_id": 6,
        "role_id": 1,
        "entity_id": "4",
        "updatedAt": "2018-07-05T11:55:10.052Z",
        "createdAt": "2018-07-05T11:55:10.052Z"
    }
}
 */


router.put('/entity/', (req, res) => {
  const data = {};
  data.entity_id = req.body.entityId;
  data.role_slug = req.body.mediaRoleSlug;
  data.media_title = req.body.mediaTitle;
  data.media_file_name = req.body.mediaFileName;
  data.media_location = req.body.mediaLocation;

  methods.Media.other.updateMediaForEntityUsingMediaRoleSlug(data)
    .then((media) => {
      res.status(200).json({
        message: 'success',
        media,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {get} /private/media/other/entity/people/:peopleId/:mediaRoleSlug
 * GetMediaForPeopleUsingMediaRoleSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetMediaForPeopleUsingMediaRoleSlug
 * @apiGroup Media
 *
 * @apiParam {Integer} peopleId People ID
 * @apiParam {Stirng} mediaRoleSlug Media role slug
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} media Object containing the values inserted into
 * media_role_entity_association table
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "media": {
        "id": 2,
        "media_id": 6,
        "role_id": 1,
        "entity_id": "4",
        "updatedAt": "2018-07-05T11:55:10.052Z",
        "createdAt": "2018-07-05T11:55:10.052Z"
    }
}
 */


router.get('/people/:peopleId/:mediaRoleSlug', (req, res) => {
  const info = {};
  info.people_id = req.params.peopleId;
  info.role_slug = req.params.mediaRoleSlug;
  methods.Media.other
    .getMediaForPeopleUsingMediaRoleSlug(info)
    .then((media) => {
      res.status(200).json({
        message: 'success',
        media,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {post} /private/media/other/entity/people
 * InsertMediaForPeopleUsingMediaRoleSlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName InsertMediaForPeopleUsingMediaRoleSlug
 * @apiGroup Media
 *
 * @apiParam {Integer} peopleId People ID
 * @apiParam {Stirng} mediaRoleSlug Media role slug
 * @apiParam {String} mediaTitle Media title
 * @apiParam {String} mediaFileName Media file name
 * @apiParam {String} mediaLocation Media location
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} media Object containing the values inserted into
 * media_role_entity_association table
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "media": {
        "id": 2,
        "media_id": 23,
        "role_id": 2,
        "people_id": "1",
        "updatedAt": "2018-07-06T05:10:14.675Z",
        "createdAt": "2018-07-06T05:10:14.675Z"
    }
}
 */


router.post('/people', (req, res) => {
  const data = {};
  data.people_id = req.body.peopleId;
  data.role_slug = req.body.mediaRoleSlug;
  data.media_file_name = req.body.mediaFileName;
  data.media_title = req.body.mediaTitle;
  data.media_location = req.body.mediaLocation;

  methods.Media.other
    .insertMediaForPeopleUsingMediaRoleSlug(data)
    .then((media) => {
      res.status(200).json({
        message: 'success',
        media,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
});


module.exports = router;

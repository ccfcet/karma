const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/**
 * @api {get} /private/news GetAllNews
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetAllNews
 * @apiGroup News
 *
 * @apiSuccess {String} message message
 * @apiSuccess {Array} news Array containing all the rows of news table
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "success": "true",
    "news": [
        {
            "id": 1,
            "news_id": 1,
            "entity_id": 1,
            "created_at": "2018-08-04T14:51:35.000Z",
            "updated_at": "2018-08-04T14:51:35.000Z"
        }
    ]
}
 */

router.get('/', (req, res) => {
  methods.News.obtainInformation.getAllNews()
    .then((news) => {
      res.status(200).json({
        success: 'true',
        news,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: 'false',
        error: err.message,
      });
    });
});

/**
 * @api {get} /private/news InsertNewsUsingEntityId
 * @apiVersion 1.0.0-alpha-1
 * @apiName InsertNewsUsingEntityId
 * @apiGroup News
 *
 * @apiParam {Integer} entityId The ID of the enitity for which news is
 * to be inserted
 * @apiParam {String} newsTitle The title of the news
 * @apiParam {String} newsText The body of the news
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} entity_news Entity News object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "entity_news": {
        "id": 1,
        "entity_id": "1",
        "news_id": 1,
        "updated_at": "2018-08-04T14:51:35.795Z",
        "created_at": "2018-08-04T14:51:35.795Z"
    }
}
 */

router.post('/', (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'entityId')
    && Object.prototype.hasOwnProperty.call(req.body, 'newsTitle')
    && Object.prototype.hasOwnProperty.call(req.body, 'newsText')) {
    const data = {};
    data.entityId = req.body.entityId;
    data.newsTitle = req.body.newsTitle;
    data.newsText = req.body.newsText;
    methods.News.other.insertNewsUsingEntityId(data)
      .then((entityNews) => {
        res.status(200).json({
          message: 'success',
          entity_news: entityNews,
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


/**
 * @api {get} /private/news/:entitySlug InsertNewsUsingEntitySlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName InsertNewsUsingEntitySlug
 * @apiGroup News
 *
 * @apiParam {String} entitySlug The slug of the enitity for which news is
 * to be inserted
 * @apiParam {String} newsTitle The title of the news
 * @apiParam {String} newsText The body of the news
 * @apiSuccess {String} message message
 * @apiSuccess {json} entity_news Entity News object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "entity_news": {
        "id": 3,
        "entity_id": 2,
        "news_id": 3,
        "updated_at": "2018-08-04T15:56:15.145Z",
        "created_at": "2018-08-04T15:56:15.145Z"
    }
}
 */

router.post('/:entitySlug', (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'entitySlug')
    && Object.prototype.hasOwnProperty.call(req.body, 'newsTitle')
    && Object.prototype.hasOwnProperty.call(req.body, 'newsText')) {
    const data = {};
    data.entitySlug = req.params.entitySlug;
    data.newsTitle = req.body.newsTitle;
    data.newsText = req.body.newsText;
    methods.News.other.insertNewsUsingEntitySlug(data)
      .then((entityNews) => {
        res.status(200).json({
          message: 'success',
          entity_news: entityNews,
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

/**
 * @api {get} /private/news/:entitySlug GetNewsUsingEntitySlug
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetNewsUsingEntitySlug
 * @apiGroup News
 *
 * @apiParam {String} entitySlug The slug of the enitity for which news has
 * to be retrieved
 * @apiSuccess {String} message message
 * @apiSuccess {json} entity_news Entity News object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "entity_news": [
        {
            "id": 1,
            "title": "Diamond Jubilee",
            "text": "College of Engineering Trivandrum celebrated its
            diamond jubilee",
            "created_at": "2018-08-04T14:51:35.000Z",
            "updated_at": "2018-08-04T14:51:35.000Z"
        },
        {
            "id": 2,
            "title": "Dhwani 2019",
            "text": "Dhwani 2019 will be conducted on February 18 - 19",
            "created_at": "2018-08-04T15:55:38.000Z",
            "updated_at": "2018-08-04T15:55:38.000Z"
        }
    ]
}
 */

router.get('/:entitySlug', (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.params, 'entitySlug')) {
    const data = {};
    data.entitySlug = req.params.entitySlug;
    methods.News.other.getNewsUsingEntitySlug(data)
      .then((entityNews) => {
        res.status(200).json({
          message: 'success',
          entity_news: entityNews,
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

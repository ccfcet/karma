const express = require('express');

const router = express.Router();

const methods = require('data/methods');

// router.get('/:entity_id', (req, res) => {
//   // models.news.news.findAll({
//   //   include: models.news.news_data,
//   // }).then((result) => {
//   //   res.json({
//   //     success: 'true',
//   //     result,
//   //   });
//   // }).catch((err) => {
//   //   debug(err);
//   //   res.status(500).json({
//   //     success: 'false',
//   //   });
//   // });
// });

/**
 * @api {get} /private/news InsertNewsForEntity
 * @apiVersion 1.0.0-alpha-1
 * @apiName InsertNewsForEntity
 * @apiGroup News
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
    methods.News.insertNewsUsingEntityId(data)
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

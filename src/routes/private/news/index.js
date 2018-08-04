const express = require('express');
const debug = require('debug')('karma:api:private:menu');

const { models } = require('data');

const router = express.Router();

router.get('/:entity_id', (req, res) => {
  models.news.news.findAll({
    include: models.news.news_data,
  }).then((result) => {
    res.json({
      success: 'true',
      result,
    });
  }).catch((err) => {
    debug(err);
    res.status(500).json({
      success: 'false',
    });
  });
});

module.exports = router;

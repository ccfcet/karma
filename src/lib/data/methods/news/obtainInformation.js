const Promise = require('bluebird');
const _ = require('lodash');

const models = require('../../models');

const newsMethods = {};

newsMethods.getAllNews = () => new Promise((
  resolve,
  reject,
) => {
  models.news.news.findAll()
    .then((news) => {
      if (_.isEmpty(news)) {
        reject(new Error('No news were returned.'));
      } else {
        resolve(news);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = newsMethods;

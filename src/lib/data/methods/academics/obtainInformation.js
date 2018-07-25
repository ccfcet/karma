const Promise = require('bluebird');

const models = require('../../models');

const returnObject = {};
returnObject.classesMethods = require('./classes');

returnObject.obtainInformation = function (streamId, className, division) {
  return new Promise(((resolve, reject) => {
    models.academics.classes_time_tables.findOne({
      include:
        [
          {
            model: models.Academics.classes,
            where: {
              stream_id: streamId,
              current_class_slug: className,
              division,
            },
            // attributes: []
          },
        ],
      // attributes: ['data'],
      rejectOnEmpty: true,
    }).then((result) => {
      resolve(result.data);
    }).catch((err) => {
      // handle error;
      console.log(err);
      reject(err);
    });
  }));
};
module.exports = returnObject;

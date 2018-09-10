const Promise = require('bluebird');

const models = require('../../models');

const streamsOfferedMethods = {};

streamsOfferedMethods.addStreamsOffered = info => new Promise((
  resolve, reject,
) => {
  models.academics.streams_offered.create(info)
    .then((newStreamOffered) => {
      resolve(newStreamOffered);
    })
    .catch((err) => {
      reject(err);
    });
});

streamsOfferedMethods.getAllStreamsOffered = () => new Promise((
  resolve,
  reject,
) => {
  models.academics.streams_offered.findAll()
    .then((streamsOffered) => {
      resolve(streamsOffered);
    })
    .catch((err) => {
      reject(err);
    });
});

streamsOfferedMethods
  .getAllStreamsOfferedOfStreamType = streamType => new Promise((
    resolve,
    reject,
  ) => {
    models.academics.streams_offered.findAll({
      include: [{
        model: models.academics.stream_types,
        where: { stream_type_short: streamType },
      }],
    })
      .then((streamsOffered) => {
        resolve(streamsOffered);
      })
      .catch((err) => {
        reject(err);
      });
  });

streamsOfferedMethods.updateStreamsOffered = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.academics.streams_offered.update(data, {
    where: {
      id: info.id,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(new Error());
        // throw ('err')
      }
    }).catch((error) => {
      reject(error);
    });
});

streamsOfferedMethods.deleteAllStreamsOffered = () => new Promise((
  resolve,
  reject,
) => {
  models.academics.streams_offered.destroy({
    where: {},
  })
    .then(() => {
      resolve();
      console.log('deleted');
    })
    .catch((err) => {
      reject(err);
    });
});
streamsOfferedMethods.deleteStreamsOffered = info => new Promise((
  resolve,
  reject,
) => {
  models.academics.streams_offered.destroy({
    where: {
      id: info.id,

    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error tg');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});

module.exports = streamsOfferedMethods;

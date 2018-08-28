const Promise = require('bluebird');

const models = require('../../models');

const classesMethods = {};

classesMethods.addClasses = (info) => {
  console.log('inside adding Classes');

  return new Promise((resolve, reject) => {
    models.academics.classes.create(info).then((model) => {
      resolve(model);
    })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

classesMethods.getAllClasses = () => new Promise((resolve, reject) => {
  models.academics.classes.findAll()
    .then((classes) => {
      resolve(classes);
    })
    .catch((err) => {
      reject(err);
    });
});

classesMethods.findBySlug = (streamId, slugName) => {
  console.log('finding by slugname');

  return new Promise((resolve, reject) => {
    models.academics.classes.findAll({
      where:
        {
          stream_id: streamId,
          current_class_slug: slugName,
        },
    }).then((classes) => {
      if (classes) {
        resolve(classes);
      } else {
        reject(new Error('Wrong information'));
      }
    })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
classesMethods.findById = (id) => {
  console.log('finding by id');
  return new Promise((resolve, reject) => {
    models.academics.classes.findAll({
      where:
      { id },

    }).then((classes) => {
      if (classes) {
        resolve(classes);
      } else {
        reject(new Error('Not a valid class id'));
      }
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

classesMethods.updateClasses = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.academics.classes.update(data, {
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

classesMethods.deleteAllClasses = () => new Promise((
  resolve,
  reject,
) => {
  models.academics.classes.destroy({
    where: {},
  })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

classesMethods.deleteClasses = info => new Promise((resolve, reject) => {
  models.academics.classes.destroy({
    where: {
      stream_id: info.stream_id,
      division: info.division,
      current_class_slug: info.current_class_slug,
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

module.exports = classesMethods;

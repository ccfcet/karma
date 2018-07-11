const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let db = {};

// initialize for walker
const walk = require('walk');

const Promise = require('bluebird');

const _ = require('lodash');
const config = require('../config/config.json')
  .sequelize[env];

// function to create an object following the breadTrail
const addBreadTrail = function (object, breadTrail, value) {
  return new Promise((resolve, reject) => {
    try {
      let breadTrailObject = {};
      let breadTrailValue = value;

      while (breadTrail.length !== 0) {
        const breadCrumb = breadTrail.pop();
        breadTrailObject[breadCrumb] = breadTrailValue;
        breadTrailValue = breadTrailObject;
        breadTrailObject = {};
      }
      breadTrailObject = breadTrailValue;

      // merging with object
      _.merge(object, breadTrailObject);
      resolve(object);
    } catch (err) {
      reject(err);
    }
  });
};

// function to process a directory
function processDirectory(dirname, sequelize, modelsObject) {
  return new Promise((resolve, reject) => {
    // uses the npm package walk to recursively traverse the directory and to
    // import models

    // walkerOptions
    const walkerOptions = {
      followLinks: false,
    };

    // initialize walker
    const walker = walk.walk(dirname, walkerOptions);

    // listen for file event on walker
    walker.on('file', (root, fileStats, next) => {
      // filtering of files
      // 1) - hidden files
      // 2) - samefile(index.js)
      // 3) - all files with extension other than .js
      if ((fileStats.name.indexOf('.') !== 0)
      && (fileStats.name !== basename)
      && (fileStats.name.slice(-3) === '.js')) {
        // case of allowed file
        // import model using sequelize['import']
        const model = sequelize.import(path.join(root, fileStats.name));

        const relativeSubtractPath = path.relative(__dirname, root);

        const breadTrail = relativeSubtractPath.split('/');

        // if (breadTrail.length === 1) {
        //   if (breadTrail[0] === '') {
        //     breadTrail.pop()
        //   }
        // }

        process.nextTick(() => {
          breadTrail.push(model.name);
          addBreadTrail(modelsObject, breadTrail, model).then((object) => {
            // eslint-disable-next-line no-param-reassign
            modelsObject = object;
            next();
          }).catch((err) => {
            console.log(`Error in addBreadTrail${err}`);
          });
        });
      } else {
        // case of rejected file
        next();
      }
    });

    walker.on('errors', () => {
      // next();
      reject(new Error('Error in walker.'));
    });

    walker.on('end', () => {
      // all elements in the directory processed
      resolve(modelsObject);
    });
  });
}

function associate(modelsObject, object) {
  return new Promise((resolve, reject) => {
    try {
      if (object instanceof Function) {
        if (object.associate) {
          object.associate(modelsObject);
        }
        process.nextTick(() => {
          resolve();
        });
      } else {
        _.forEach(object, (key) => {
          associate(modelsObject, key).then(() => {
            resolve();
          });
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

function finish(sequelize, modelsObject) {
  return new Promise((resolve, reject) => {
    // should try catch be here?
    try {
      const newModelsObject = modelsObject;
      newModelsObject.sequelize = sequelize;
      newModelsObject.Sequelize = Sequelize;

      resolve(newModelsObject);
    } catch (err) {
      reject(err);
    }
  });
}

// function to initialize loading of models
const init = function (modelsObject) {
  return new Promise((resolve, reject) => {
    // initialize Sequelize()
    let sequelize;
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
      );
    }

    processDirectory(__dirname, sequelize, modelsObject)
      .then((newModelsObject) => {
      // if (!_.isEmpty(_.omit(newModelsObject, ['callback']))) {
        if (!_.isEmpty(newModelsObject)) {
          associate(newModelsObject, newModelsObject).then(() => {
            finish(sequelize, newModelsObject).then((finalObject) => {
              resolve(finalObject);
            });
          });
        } else {
          console.log('Hello there! No models found to load using sequelize. '
        + 'Just informing. :)');
        }
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

// initialize loading of models
init(db).then((finalObject) => {
  db = finalObject;
  if (typeof db.callback === 'function') {
    db.callback();
  }
}).catch((err, next) => {
  next(err);
});

db.callback = null;

module.exports = db;

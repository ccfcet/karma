'use strict'

var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, '/../../config/config.json'))[env]
var db = {}

// initialize for walker
var walk = require('walk')

var Promise = require('bluebird')

var _ = require('lodash')

// function to create an object following the breadTrail
var addBreadTrail = function (object, breadTrail, value) {
  return new Promise(function (resolve, reject) {
    var breadTrailObject = {}

    while (breadTrail.length !== 0) {
      let breadCrumb = breadTrail.pop()
      breadTrailObject[breadCrumb] = value
      value = breadTrailObject
      breadTrailObject = {}
    }
    breadTrailObject = value

    // merging with object
    _.merge(object, breadTrailObject)
    resolve(object)
  })
}

// function to process a directory
function processDirectory (dirname, sequelize, modelsObject) {
  return new Promise(function (resolve, reject) {
    // uses the npm package walk to recursively traverse the directory and to
    // import models

    // walkerOptions
    var walkerOptions = {
      followLinks: false
    }

    // initialize walker
    var walker = walk.walk(dirname, walkerOptions)

    // listen for file event on walker
    walker.on('file', function (root, fileStats, next) {
      // filtering of files
      // 1) - hidden files
      // 2) - samefile(index.js)
      // 3) - all files with extension other than .js
      if ((fileStats.name.indexOf('.') !== 0) &&
      (fileStats.name !== basename) && (fileStats.name.slice(-3) === '.js')) {
        // case of allowed file

        // import model using sequelize['import']
        // console.log({dirname: dirname, root: root, name: fileStats.name})
        // console.log({pathJoin: path.join(root, fileStats.name)})
        var model = sequelize['import'](path.join(root, fileStats.name))

        // console.log(model)

        var relativeSubtractPath = path.relative(__dirname, root)
        // console.log(relativeSubtractPath)

        var breadTrail = relativeSubtractPath.split('/')

        // if (breadTrail.length === 1) {
        //   if (breadTrail[0] === '') {
        //     breadTrail.pop()
        //   }
        // }

        process.nextTick(function () {
          breadTrail.push(model.name)

          console.log(breadTrail)
          addBreadTrail(modelsObject, breadTrail, model).then(function (object) {
            modelsObject = object
            next()
          }).catch(function (err) {
            console.log('Error in addBreadTrail' + err)
          })
        })
      } else {
        // case of rejected file
        next()
      }
    })

    walker.on('errors', function (root, nodeStatsArray, next) {
      next()
    })

    walker.on('end', function () {
      // all elements in the directory processed
      resolve(modelsObject)
    })
  })
}

function associate (modelsObject, object) {
  return new Promise(function (resolve, reject) {
    if (object instanceof Function) {
      if (object.associate) {
        object.associate(modelsObject)
      }
      process.nextTick(function () {
        resolve()
      })
    } else {
      console.log('gets here first')
      _.forEach(object, function (key) {
        associate(modelsObject, key).then(function () {
          console.log('gets here too')
          resolve()
        })
      })
    }
  })
}

function finish (sequelize, modelsObject) {
  return new Promise(function (resolve, reject) {
    modelsObject.sequelize = sequelize
    modelsObject.Sequelize = Sequelize

    resolve(modelsObject)
  })
}

// function to initialize loading of models
var init = function (modelsObject) {
  return new Promise(function (resolve, reject) {
  // initialize Sequelize()
    var sequelize
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config)
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config)
    }

    processDirectory(__dirname, sequelize, modelsObject).then(function (modelsObject) {
      console.log({modelsObject: modelsObject})
      if (!_.isEmpty(modelsObject)) {
        associate(modelsObject, modelsObject).then(function () {
          finish(sequelize, modelsObject).then(function (finalObject) {
            console.log('gets here anyway')
            resolve(finalObject)
          })
        })
      } else {
        console.log('Hello there! No models found to load using sequelize. Just informing. :)')
      }
    }).catch(function (err) {
      console.log(err)
    })
  })
}

// initialize loading of models
console.log('initializing models')
console.log({dbInital: db})
init(db).then(function (finalObject) {
  console.log('gets here')
  db = finalObject
  console.log({dbFinal: db})
  // db.sequelize.sync()
  if (typeof db.callback === 'function') {
    db.callback()
  }
})

db.callback = null
module.exports = db

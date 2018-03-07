'use strict'

var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, '/../config/config.json'))[env]
var db = {}

var sequelize

// initialize for walker
var walk = require('walk')
var walker
var walkerOptions

walkerOptions = {
  followLinks: false
}

var Promise = require('bluebird')

var promisesArray = []

var _ = require('lodash')

var addBreadTrail = function (object, breadTrail, value) {
  return new Promise(function (resolve, reject) {
    // create an object following the breadTrail
    var breadTrailObject = {}
    while (breadTrail.length !== 0) {
      var breadCrumb = breadTrail.pop()
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
function processDirectory (dirname) {
  return new Promise(function (resolve, reject) {
    walker = walk.walk(dirname, walkerOptions)

    walker.on('file', function (root, fileStats, next) {
      if ((fileStats.name.indexOf('.') !== 0) && (fileStats.name !== basename) && (fileStats.name.slice(-3) === '.js')) {
        var model = sequelize['import'](path.join(root, fileStats.name))
        var relativeSubtractPath = path.relative(__dirname, root)

        var breadTrail = relativeSubtractPath.split('/')
        if (breadTrail.length === 1) {
          if (breadTrail[0] === '') {
            breadTrail.pop()
          }
        }

        setImmediate(function () {
          breadTrail.push(model.name)

          addBreadTrail(db, breadTrail, model).then(function (object) {
            db = object
            next()
          }).catch(function (err) {
            console.log('Error in addBreadTrail' + err)
          })
        })
      } else {
        next()
      }
    })

    walker.on('errors', function (root, nodeStatsArray, next) {
      next()
    })

    walker.on('end', function () {
      // all elements in the current directory processed
      resolve()
    })
  })
}

function associate (object) {
  return new Promise(function (resolve, reject) {
    if (object instanceof Function) {
      if (object.associate) {
        object.associate(db)
      }
      setImmediate(function () {
        resolve()
      })
    } else {
      _.forEach(object, function (key) {
        associate(key).then(function () {
          resolve()
        })
      })
    }
  })
}

function dbComplete () {
  return new Promise(function (resolve, reject) {
    db.sequelize = sequelize
    db.Sequelize = Sequelize

    module.exports = db

    resolve()
  })
}

var init = function () {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
  }

  processDirectory(__dirname).then(function () {
    if (!_.isEmpty(db)) {
      promisesArray.push(associate(db))

      Promise.all(promisesArray).then(function () {
        dbComplete().then(function () {
          if (config.use_env_variable) {
            db.sequelize.sync()
          } else {
            db.sequelize.sync()
          }
        })
      })
    } else {
      console.log('Hello! No models found to load using sequelize. Just informing. :)')
    }
  }).catch(function (err) {
    console.log(err)
  })
}

init()

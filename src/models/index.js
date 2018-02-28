'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var env = process.env.NODE_ENV || 'development'
var config = require(__dirname + '/../config/config.json')[env]
var db = {}

var sequelize

// initialize for walker
var walk = require('walk')
var walker

var Promise = require('bluebird')

var promisesArray = []

function processDirectory (dirname) {
  return new Promise(function (resolve, reject) {
    // resolve() when success
    // reject(err) on error
    walker = walk.walk(dirname)

    walker.on('directory', function (root, directoryStats, next) {
      fs.readFile(directoryStats.name, function () {
        processDirectory(dirname + '/' + directoryStats.name).then(function () {
          next()
        }).catch(function (err) {
          console.log(err)
          reject(err)
        })
      })
    })

    walker.on('file', function (root, fileStats, next) {
      // filter files
      if ((fileStats.name.indexOf('.') !== 0) && (fileStats.name !== basename) && (fileStats.name.slice(-3) === '.js')) {
        var model = sequelize['import'](path.join(dirname, fileStats.name))
        db[model.name] = model
        next()
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

function associate (modelName) {
  return new Promise(function (resolve, reject) {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }

    resolve()
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

function init () {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
  }

  processDirectory(__dirname).then(function () {
    Object.keys(db).forEach(function (modelName) {
      promisesArray.push(associate(modelName))
    })

    Promise.all(promisesArray).then(function () {
      dbComplete().then(function () {
        if (config.use_env_variable) {
          db.sequelize.sync()
        } else {
          db.sequelize.sync()
        }
      })
    })
  }).catch(function (err) {
    console.log(err)
  })
}

init()

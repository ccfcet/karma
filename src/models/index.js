"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require('../config')()
var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password);

// initialize for walker
var walk = require('walk');
var fs = require('fs');
var walker;

var Promise = require("bluebird");

var db = {};

function processDirectory(dirname)
{
  return new Promise(function(resolve, reject){
    // resolve() when success
    // reject(err) on error
    walker = walk.walk(dirname);

    walker.on("directory", function (root, directoryStats, next) {
      fs.readFile(directoryStats.name, function () {
        processDirectory(dirname+'/'+directoryStats.name).then(function(){
          next();
        }).catch(function(err){
          console.log(err);
          reject(err);
        });
      });
    });

    walker.on("file", function(root, fileStats, next) {
      // filter files
      if ((fileStats.name.indexOf(".") !== 0) && (fileStats.name !== "index.js"))
      {
        fs.readFile(fileStats.name, function () {
          var model = sequelize.import(path.join(dirname, fileStats.name));
          db[model.name] = model;
          next();
        });
      }
      else
      {
        next();
      }
    });

    walker.on("errors", function (root, nodeStatsArray, next){
      next();
    });

    walker.on("end", function (){
      // all elements in the current directory processed
      resolve();
    });
  });
}

module.exports = new Promise(function(resolve, reject){
  // returns a Promise rather than the db object
  processDirectory(__dirname).then(function(){

    Object.keys(db).forEach(function(modelName) {
      if ("associate" in db[modelName]) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    resolve(db);
  }).catch(function(err){
    console.log(err);
    reject(err);
  });
});

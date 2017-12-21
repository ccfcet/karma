var express = require('express');
var router = express.Router();
var models = require('../../../models');
var debug = require('debug')('admin');
var _ = require('underscore');
var superAdminStatus = 10;

router.get('/', function(req, res, next)
{
  res.send({ 'status': 200 });
});

router.get('/:entity/:menuType', function(req, res)
{
  // returnObject
  var returnObject;

  function checkIfChild(elementID)
  {
    models.menuParentChild.findAll({
      // include: [{ model: models.entities, attributes: [], where: { ename: req.params.entity }}],
      // where: { childID: elementID },
      // attributes: ['id', 'parentID', 'childID']
    }).then(function(result) {
      // console.log(result);
      // if(result.length==0)
      // {
      //   // console.log("");
      // }
      // else
      // {
      //   return result.length;
      // }
    }).catch(function (err) {
      // handle error;
      console.log(err);
      res.json({ "success": "false" });
    });
  }

  function resultElementRoutine(element, entity, menuType)
  {
    var checkIfChildFlag = checkIfChild(element.id);

    res.json(checkIfChildFlag);
  }

  // obtain results from menuData matching entity and menuType
  models.menuData.findAll({
    include: [{ model: models.entities, attributes: [], where: { ename: req.params.entity }}],
    where: { menuType: req.params.menuType },
    attributes: ['id', 'itemName', 'itemUrl', 'position']
  }).then(function(result)
  {

    _.each(result, function(element, index, list)
    {
      resultElementRoutine(element, entity, menuType);
      // console.log(element);
      res.json(element);
    });

    // res.json(result);
    // return result;
  }).catch(function (err)
  {
    // handle error;
    res.json({ "success": "false" });
  });

  // return returnObject
  // res.json(returnObject);
});

module.exports = router;

const express = require('express');

const router = express.Router();
const _ = require('lodash');

const methods = require('data/methods');

/**
 * @api {get} /public/menu Public Menu Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePublicMenu
 * @apiGroup EntryGates
 *
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 */

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

/**
 * @api {get} /public/menu/:entity/:menuType Menu
 * @apiVersion 1.0.0-alpha-1
 * @apiName Menu
 * @apiGroup Public
 *
 * @apiSuccess {String} title Title of the menu
 * @apiSuccess {json} data json data of the menu
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'title': null,
 *       'data': [
 *         {
 *           'item_name': 'About',
 *           'item_url': 'about',
 *           'children': [
 *             {
 *               'item_name': 'Leadership and Administration',
 *               'item_url': 'administration'
 *             },
 *             {
 *               'item_name': 'Visitor Information',
 *               'item_url': 'visitor_information'
 *             }
 *           ]
 *         },
 *         {
 *           'item_name': 'Admissions',
 *           'item_url': 'admissions',
 *           'children': [
 *             {
 *               'item_name': 'Undergraduate Admissions',
 *               'item_url': 'undergraduate_admissions'
 *             },
 *             {
 *               'item_name': 'Graduate Admissions',
 *               'item_url': 'graduate_admissions'
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *
 * @apiError (501 - Menu Empty) {String} success false
 * @apiError (501 - Menu Empty) {String} code menu-empty
 *
 * @apiErrorExample {json} Error-Response 501 - Menu Empty:
 *     HTTP/1.1 501 Not Implemented
 *     {
 *       'success': 'false',
 *       'code': 'menu-empty'
 *     }
 *
 * @apiError (500 - Error Processing Menu) {String} success false
 * @apiError (500 - Error Processing Menu) {String} code menu-error
 *
 * @apiErrorExample {json} Error-Response 500 - Error Processing Menu:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       'success': 'false',
 *       'code': 'menu-error'
 *     }
 */

router.get('/:entity/:menuType', (req, res) => {
  console.log('inside menu/index.js');

  // entity variable
  const entityVar = req.params.entity;

  // menuType variable
  const menuTypeVar = req.params.menuType;

  methods.Menu.obtainMenu(entityVar, menuTypeVar).then((result) => {
    if (!_.isEmpty(result.data)) {
      res.json({
        title: result.title,
        data: result.data,
      });
    } else {
      res.status(501).json({
        success: 'false',
        code: 'menu-empty',
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      success: 'false',
      code: 'menu-error',
    });
  });
});

module.exports = router;

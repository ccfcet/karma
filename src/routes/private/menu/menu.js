const express = require('express');
const _ = require('lodash');

const router = express.Router();

const methods = require('../../../lib/data/methods');

router.post('/', (req, res, next) => {
    if ((Object.prototype.hasOwnProperty.call(req.body, 'entitySlug'))
        && (Object, prototype.hasOwnProperty.call(req.body, 'menuType'))) {
            
    }
})
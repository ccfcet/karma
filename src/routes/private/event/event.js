const express = require('express');

const router = express.Router();

const methods = require('data/methods');

router.get('/', (req, res) => {
  methods.Events.eventMethods.getAllEvents()
    .then((events) => {
      res.status(200).json({
        message: 'Success',
        events,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error',
        Error: err.message,
      });
    });
});

module.exports = router;

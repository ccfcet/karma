const express = require('express');

const router = express.Router();

const methods = require('data/methods');


/**
 * @api {get} /private/event GetAllEvents
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetAllEvents
 * @apiGroup Events
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} events Object containing all events
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Success",
    "events": []
}
 */

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

/**
 * @api {get} /private/event FindEventById
 * @apiVersion 1.0.0-alpha-1
 * @apiName FindEventById
 * @apiGroup Events
 *
 * @apiParam {Integer} id ID of the event
 * @apiSuccess {String} message message
 * @apiSuccess {json} events Object containing event
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Success",
    "events": []
}
 */

router.get('/:id', (req, res) => {
  const { id } = req.params;
  methods.Events.eventMethods.findEventById(id)
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

/**
 * @api {get} /private/event CreateNewEvent
 * @apiVersion 1.0.0-alpha-1
 * @apiName CreateNewEvent
 * @apiGroup Events
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} events Object containing event
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Success",
    "events": [
        {
            "id": 1,
            "event_name": "ic4",
            "createdAt": "2018-07-04T10:14:55.000Z",
            "updatedAt": "2018-07-04T10:14:55.000Z"
        }
    ]
}
 */

router.post('/', (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'eventName')) {
    // const { newEvent } = req.body;
    const newEvent = {};
    newEvent.event_name = req.body.eventName;
    methods.Events.eventMethods.createNewEvent(newEvent)
      .then((event) => {
        res.status(200).json({
          message: 'success',
          event,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'error',
          err,
        });
      });
  }
});
module.exports = router;

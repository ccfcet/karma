// const express = require('express');
// const { celebrate, Joi } = require('celebrate');

// const router = express.Router();

// const Authenticate = require(
//   'authentication/set_authentication/index',
// );

// router.get('/', (req, res) => {
//   res.json({
//     status: 200,
//   });
// });

// router.post('/', (req, res) => {
//   console.log(req.body);
//   if (req.headers['content-type'] === 'application/json') {
//     if (Object.prototype.hasOwnProperty.call(req.body, 'password')) {
//       Authenticate.setAuthentication(req.body.email, req.body.password, req.body.firstname, req.body.middlename, req.body.lastname, req.body.gender, req.body.nationality).then((hashPassword) => {
//         res.status(200).json({
//           status: 200,
//         });
//       }).catch((err) => {
//         console.error(err);
//         res.status(500).json({
//           status: 500,
//         });
//       });
//     } else {
//       res.status(400).json({
//         status: 400,
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: 400,
//     });
//   }
// });

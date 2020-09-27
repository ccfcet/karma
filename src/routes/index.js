// const express = require('express');

// const router = express.Router();

// const connection = require('../db/db');

// router.get('/', (req, res) => {
//   res.status(200).send('It is what it is.');
// });

// router.get('/secret-page', (req, res) => {
//   res.status(200).send('You found the secret page. Whaaaa?');
// });

// router.get('/test-route', async (req, res) => {
//   res
//     .status(200)
//     .send(
//       await connection('people')
//         .select(['role_people_entity.id as b_id', 'people.*'])
//         .join('role_people_entity', 'people.id', 'role_people_entity.people_id')
//         .where('role_people_entity.entity_id')
//     );
// });

// module.exports = router;

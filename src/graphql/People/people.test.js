const app = require('../../app');
const connection = require('../../db/db');

beforeAll(async () => {
  await connection.migrate.latest();
});

afterAll(async () => {
  await app.close();
  await connection.migrate.rollback();
  await connection.destroy();
});

describe('people data', () => {
  const query = `
    query {
      people {
        first_name
      }
    }
  `;

  test('initial people list is empty', async () => {
    await app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { query: query },
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        let data = res.json();
        console.log(data);
        expect(data).not.toHaveProperty('errors');
        expect(data).toHaveProperty('data.people');
        let peopleData = data.data.people;
        expect(peopleData).not.toBe(null);
        expect(peopleData.length).toBe(0);
      });
  });
});

const axios = require('axios');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../../../../bin/www');
const methods = require('../../../../../lib/data/methods');

process.nextTick(() => {
  app.callback = run;
});

chai.use(chaiHttp);
const { expect } = chai;

let newPeople = {};

before(() => {
  methods.people.deleteAllPeople();

  const data = {
    firstName: 'John',
    middleName: 'M',
    lastName: 'Doe',
    gender: 'M',
    dateOfBirth: '1987-01-01',
    nationality: 'Indian',
  };

  axios({
    method: 'post',
    url: 'http://localhost:3000/private/people',
    data,
  })
    .then((res) => {
      // console.log(res.data);
      newPeople = res.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and
        // an instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
});

describe('People - GetPeople - GET', () => {
  it('GET /private/people/', (done) => {
    chai.request(app)
      .get('/private/people')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: "success",
          people: newPeople
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

after(() => {
// console.log(inserted)
});

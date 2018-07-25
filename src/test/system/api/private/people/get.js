// const axios = require('axios');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);
const app = require('../../../../../bin/www');
const methods = require('../../../../../lib/data/methods');


process.nextTick(() => {
  app.callback = run;
});

chai.use(chaiHttp);
const { expect } = chai;

const newPeople = [];
const tempPeople = [];
before((done) => {
  methods.people.deleteAllPeople()
    .then(() => {
      const data = {
        first_name: 'John',
        middle_name: 'M',
        last_name: 'Doe',
        gender: 'M',
        date_of_birth: '1987-01-01',
        nationality: 'Indian',
      };

      methods.people.addPeople(data)
        .then((model) => {
          console.log(model.dataValues.created_at);
          newPeople.push(model.dataValues);

          newPeople.map((datum) => {
            delete datum.created_at;
            delete datum.updated_at;
            tempPeople.push(datum);
          });
          done();
        })
        .catch(err => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

describe('People - GetPeople - GET', () => {
  it('GET /private/people/', (done) => {
    chai.request(app)
      .get('/private/people')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        expect(res.body.people)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempPeople);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

after(() => {
});

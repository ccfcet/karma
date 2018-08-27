const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);
const app = require('../../../../../../bin/www');
const methods = require('../../../../../../lib/data/methods');


process.nextTick(() => {
  app.callback = run;
});

chai.use(chaiHttp);
const { expect } = chai;


describe('Post People - POST', () => {
  beforeEach((done) => {
    methods.People.peopleMethods.deleteAllPeople().then(() => {
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
  it('POST /private/people/people/', (done) => {
    const classes = {
      firstName: 'Johnny',
      middleName: 'M',
      lastName: 'Doe',
      gender: 'M',
      dateOfBirth: '1987-01-01',
      nationality: 'Indian',
    };
    console.log(classes);
    chai.request(app)
      .post('/private/people/people/')
      .send(classes)
      .end((err, result) => {
        console.log(err);
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
      });
  });
  afterEach((done) => {
    methods.People.peopleMethods.deleteAllPeople().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
});

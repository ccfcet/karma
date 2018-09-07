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


describe('Post time slots - POST', () => {
  beforeEach((done) => {
    methods.Academics.timeSlotsMethods.deleteAllTimeSlots().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
  it('POST /public/academics/time_slots/', (done) => {
    const datetime = '2000-01-01 02:00:00 UTC';
    const classes = {
      startTimestamp: datetime.substr(11, 8),
      endTimestamp: datetime.substr(11, 8),
    };
    chai.request(app)
      .post('/public/academics/time_slots/')
      .send(classes)
      .end((err, result) => {
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
      });
  });
  afterEach((done) => {
    methods.Academics.timeSlotsMethods.deleteAllTimeSlots()
      .then(() => {
        console.log('deleted time slots');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

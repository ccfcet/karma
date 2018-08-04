
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


describe('/PUT/:timeslotid ', () => {
  it('it should UPDATE timeslots given the slotid', (done) => {
    methods.Academics.timeSlotsMethods.getAllTimeSlots()
      .then((res) => {
        let timeSlotId = {};
        timeSlotId = res[0].dataValues.id;
        let datetime = {};
        datetime = '2000-01-01 01:00:00 UTC';
        const classes = {
          startTimestamp: datetime.substr(11, 8),
          endTimestamp: datetime.substr(11, 8),
        };


        chai.request(app)
          .put(`/private/academics/time_slots/${timeSlotId}`)
          .send(classes)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated stream type');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

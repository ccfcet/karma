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


describe('/DELETE time_slots with id ', () => {
  it('it should DELETE timeslots given the slotid', (done) => {
    methods.Academics.timeSlotsMethods.getAllTimeSlots()
      .then((res) => {
        let timeSlotId = {};
        timeSlotId = res[0].dataValues.id;

        chai.request(app)
          .delete('/private/academics/time_slots/')
          .send({ timeSlotId })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('time Slot deleted');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

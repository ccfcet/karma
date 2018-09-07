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

const newVar = [];
const tempVar = [];


describe('/DELETE time_slots with id ', () => {
  beforeEach((done) => {
    console.log('entered');
    const classes = {
      start_timestamp: '2018-08-05 09:25:14',
      end_timestamp: '2018-07-29 10:55:45',
    };

    methods.Academics.timeSlotsMethods.addTimeSlots(classes)
      .then((model) => {
        newVar.push(model.dataValues);
        const ret = newVar.map((datum) => {
          const dat = datum;
          delete dat.created_at;
          delete dat.updated_at;
          return dat;
        });
        tempVar.push(ret[0]);
        done();
      })
      .catch(err => console.log(err));
  });
  it('it should DELETE time_slots given the timeSlotId', (done) => {
    methods.Academics.timeSlotsMethods.getAllTimeSlots()
      .then(() => {
        let timeSlotId = {};
        timeSlotId = tempVar[0].id;

        chai.request(app)
          .delete('/public/academics/time_slots/')
          .send({ timeSlotId })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('TimeSlots deleted');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
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

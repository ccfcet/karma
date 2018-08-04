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


const newPeople = [];
const tempPeople = [];


describe('TimeSlots - GetTimeSlots - GET', () => {
  beforeEach((done) => {
    methods.Academics.timeSlotsMethods.deleteAllTimeSlots()
      .then(() => {
        const datetime = '2000-01-01 01:00:00 UTC';
        const classes = {
          start_timestamp: datetime.substr(11, 8),
          end_timestamp: datetime.substr(11, 8),
        };

        methods.Academics.timeSlotsMethods.addTimeSlots(classes)
          .then((model) => {
            newPeople.push(model.dataValues);

            const ret = newPeople.map((datum) => {
              const dat = datum;
              delete dat.created_at;
              delete dat.updated_at;
              return dat;
            });
            console.log(ret);
            tempPeople.push(ret[0]);
            done();
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  });


  it('GET /private/Academics/time_slots/', (done) => {
    chai.request(app)
      .get('/private/Academics/time_slots/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        let re = [];
        re = res.body.classes;
        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempPeople);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

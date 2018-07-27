
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

describe('/PUT/:timeslotid ', () => {
  it('it should UPDATE timeslots given the slotid', (done) => {
    methods.Academics.timeSlotsMethods.getAllTimeSlots()
    .then((res) =>{
      const timeSlotId = res[0].dataValues.id;
      const classes = {
        streamType: '5',
        streamTypeShort: '10',
        startDate: '2018-07-25',
        endDate: '2018-07-29',
      };
  
      chai.request(app)
        .put(`/private/academics/stream_types/${streamid}`)
        .send(classes)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.eql('updated stream type');
  
          done();
        });
    })
    .catch((err)=>{
      console.log(err)
    })
  });
});

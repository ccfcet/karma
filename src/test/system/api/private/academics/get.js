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


describe('StreamTypes - GetStreamTypes - GET', () => {
  beforeEach((done) => {
    methods.Academics.streamTypesMethods.deleteAllStreamTypes()
      .then(() => {
        console.log('entered')
        const classes = {
          stream_type_long: '5',
          stream_type_short: '5',
          start_date: '2018-07-25',
          end_date: '2018-07-29',
        };
  
        methods.Academics.streamTypesMethods.addStreamType(classes)
          .then((model) => {
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
  

  it('GET /private/Academics/stream_types/', (done) => {
    chai.request(app)
      .get('/private/Academics/stream_types/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        var re = [];
        re= res.body.classes
        re[0].start_date = new Date(re[0].start_date)
        re[0].end_date = new Date(re[0].end_date)

        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempPeople);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe('Post stream types - POST', () => {
  beforeEach((done) => {
        methods.Academics.streamTypesMethods.deleteAllStreamTypes().then(() =>{
            console.log("done")
            done();
        })
        .catch((err) =>{
            console.log(err)
        })
  })
  it('POST /private/academics/stream_types/', (done) => {
    const classes = {
      streamType: '5',
      streamTypeShort: '5',
      startDate: '2018-07-25',
      endDate: '2018-07-29',
    };
    chai.request(app)
      .post('/private/academics/stream_types/')
      .send(classes)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        
        done();
      });
  });
});

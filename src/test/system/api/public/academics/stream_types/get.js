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


describe('StreamTypes - GetStreamTypes - GET', () => {
  beforeEach((done) => {
    console.log('entered');
    const classes = {
      stream_type_long: '5',
      stream_type_short: '5',
      start_date: '2018-07-25',
      end_date: '2018-07-29',
    };

    methods.Academics.streamTypesMethods.addStreamType(classes)
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


  it('GET /public/Academics/stream_types/', (done) => {
    chai.request(app)
      .get('/public/Academics/stream_types/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        let re = [];
        re = res.body.classes;
        re[0].start_date = new Date(re[0].start_date);
        re[0].end_date = new Date(re[0].end_date);

        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempVar);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterEach((done) => {
    methods.Academics.streamTypesMethods.deleteAllStreamTypes()
      .then(() => {
        console.log('deleted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

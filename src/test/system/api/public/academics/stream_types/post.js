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


describe('Post stream types - POST', () => {
  beforeEach((done) => {
    methods.Academics.streamTypesMethods.deleteAllStreamTypes().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
  it('POST /public/academics/stream_types/', (done) => {
    const classes = {
      streamType: '5',
      streamTypeShort: '5',
      startDate: '2018-07-25',
      endDate: '2018-07-29',
    };
    chai.request(app)
      .post('/public/academics/stream_types/')
      .send(classes)
      .end((err, result) => {
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
      });
  });
  afterEach((done) => {
    methods.Academics.streamTypesMethods.deleteAllStreamTypes().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
});

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

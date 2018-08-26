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


describe('Post media - POST', () => {
  beforeEach((done) => {
    methods.Media.mediaMethods.deleteAllMedia().then(() => {
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
  it('POST /private/media/media/', (done) => {
    const classes = {
      mediaTitle: 'Hello World',
      mediaFileName: 'Hey there',
      mediaLocation: 'Kottayam',
    };
    chai.request(app)
      .post('/private/media/media/')
      .send(classes)
      .end((err, result) => {
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');
        done();
      });
  });
});

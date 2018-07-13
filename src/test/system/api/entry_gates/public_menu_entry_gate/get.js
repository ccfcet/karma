const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../../../../bin/www');

process.nextTick(() => {
  app.callback = run;
});

chai.use(chaiHttp);
const { expect } = chai;

describe('EntryGates - Public Menu Entry Gate - GET', () => {
  it('GET /public/menu', (done) => {
    chai.request(app)
      .get('/public/menu')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 200,
        });
        done();
      }).catch((err) => {
        done(err);
      });
  });
});

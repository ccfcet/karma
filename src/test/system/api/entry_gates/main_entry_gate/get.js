const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../../../../bin/www');

process.nextTick(() => {
  app.callback = run;
});

chai.use(chaiHttp);
const { expect } = chai;

describe('EntryGates - Main Entry Gate - GET', () => {
  it('200', (done) => {
    chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        console.log(res.body);
        expect(res.body).to.deep.equal({
          name: 'Karma API',
          version: '1.0.0-alpha-1',
        });
        done();
      }).catch((err) => {
        done(err);
      });
  });
});

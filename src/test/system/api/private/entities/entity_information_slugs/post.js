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

describe('Post EntityInfoSlugs - POST', () => {
  beforeEach((done) => {
    methods.Entities.entityInfoSlugsMethods.deleteAllEntityInfoSlugs()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('POST /private/entities/entity_information_slugs/', (done) => {
    const New = {
      slugName: 'AnotherNewSlug',
    };
    chai.request(app)
      .post('/private/entities/entity_information_slugs/')
      .send(New)
      .end((err, result) => {
        console.log(err);
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
      });
  });
  afterEach((done) => {
    methods.Entities.entityInfoSlugsMethods.deleteAllEntityInfoSlugs()
      .then(() => {
        console.log('deleted entityInfoSlugs');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

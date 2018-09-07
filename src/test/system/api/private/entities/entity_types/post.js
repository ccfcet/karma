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

describe('Post - EntityTypes - POST', () => {
  it('POST /private/entities/entity_types/', (done) => {
    const entitytype = {
      entityType: 'people',
      entityTypeSlug: 'about',
    };
    chai.request(app)
      .post('/private/entities/entity_types/')
      .send(entitytype)
      .end((err, result) => {
        console.log(err);
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');
        done();
      });
  });

  afterEach((done) => {
    methods.Entities.entityTypeMethods.deleteAllEntityTypes()
      .then(() => {
        console.log('deleted entitytypes');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

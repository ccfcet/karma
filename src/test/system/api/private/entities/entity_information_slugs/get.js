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

describe('EntityInfoSlugs - GetEntityInfoSlugs - GET', () => {
  beforeEach((done) => {
    const newEis = {
      slug_name: 'NewSlug',
    };

    methods.Entities.entityInfoSlugsMethods.addEntityInfoSlugs(newEis)
      .then((NewEIS) => {
        newVar.push(NewEIS.dataValues);

        const ret = newVar.map((values) => {
          const val = values;
          delete val.created_at;
          delete val.updated_at;
          return val;
        });
        console.log(ret);
        tempVar.push(ret[0]);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });


  it('GET /private/entities/entity_information_slugs/', (done) => {
    chai.request(app)
      .get('/private/entities/entity_information_slugs/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        let re = [];
        re = res.body.entities;
        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempVar);

        done();
      })
      .catch((err) => {
        done(err);
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

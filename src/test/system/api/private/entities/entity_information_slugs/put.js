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

describe('/PUT/:entityInfoSlugsId', () => {
  beforeEach((done) => {
    const newEis = {
      slug_name: 'NewSlug',
    };

    methods.Entities.entityInfoSlugsMethods.addEntityInfoSlugs(newEis)
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
      .catch((err) => {
        console.log(err);
      });
  });

  it('it should UPDATE entityInfoSlugs given the entityInfoSlugsId', (done) => {
    methods.Entities.entityInfoSlugsMethods.getAllEntityInfoSlugs()
      .then((res) => {
        let entityInfoSlugsId = {};
        entityInfoSlugsId = res[0].dataValues.id;

        const New = {
          slugName: 'AnotherNewSlug',
        };

        chai.request(app)
        // eslint-disable-next-line max-len
          .put(`/private/entities/entity_information_slugs/${entityInfoSlugsId}`)
          .send(New)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated entityInfoSlugs');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
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

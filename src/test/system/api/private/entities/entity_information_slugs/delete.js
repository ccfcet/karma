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

describe('/DELETE EntityInfoSlugs with entityInfoSlugsId ', () => {
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
        console.log(ret);
        tempVar.push(ret[0]);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('it should DELETE EntityInfoSlugs given the entityInfoSlugsId', (done) => {
    methods.Entities.entityInfoSlugsMethods.getAllEntityInfoSlugs()
      .then((res) => {
        const data = {};
        data.entityInfoSlugsId = res[0].dataValues.id;
        data.slugName = res[0].dataValues.slug_name;

        chai.request(app)
          .delete('/private/entities/entity_information_slugs/')
          .send({ data })
          .end((err, result) => {
            console.log(err);
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('deleted entityInfoSlugs');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

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

const newEntityType = [];
const tempVar = [];

describe('/PUT/:entityTypeId ', () => {
  beforeEach((done) => {
    const entitytype = {
      entity_type: 'people',
      entity_type_slug: 'about',
    };
    methods.Entities.entityTypeMethods.addEntityType(entitytype)
      .then((EntityType) => {
        newEntityType.push(EntityType.dataValues);

        const ret = newEntityType.map((values) => {
          const val = values;
          delete val.created_at;
          delete val.updated_at;
          return val;
        });
        tempVar.push(ret[0]);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('it should UPDATE entitytypes given the entityTypeId', (done) => {
    methods.Entities.entityTypeMethods.getAllEntityTypes()
      .then((res) => {
        let entityTypeId = {};
        entityTypeId = res[0].dataValues.id;
        const entitytype = {
          entityType: 'newPeople',
          entityTypeSlug: 'newAbout',
        };

        chai.request(app)
          .put(`/private/entities/entity_types/${entityTypeId}`)
          .send(entitytype)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated entitytypes');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
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

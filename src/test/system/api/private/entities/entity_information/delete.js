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

const newEntity = [];
const newEntityType = [];
const newEI = [];
const newEIS = [];
const tempVar = [];

describe('/DELETE EntityInfo', () => {
  beforeEach((done) => {
    const entitytype = {
      entity_type: 'people',
      entity_type_slug: 'about',
    };
    methods.Entities.entityTypeMethods.addEntityType(entitytype)
      .then((EntityType) => {
        console.log('added entity types');
        newEntityType.push(EntityType.dataValues);

        const entity = {
          entity_name: 'cse',
          entity_slug: 'aboutentity',
          entity_type_id: newEntityType[0].id,
        };
        methods.Entities.entityMethods.addEntity(entity)
          .then((Entity) => {
            console.log('added entity');
            newEntity.push(Entity.dataValues);

            const newEis = {
              slug_name: 'NewSlug',
            };
            methods.Entities.entityInfoSlugsMethods.addEntityInfoSlugs(newEis)
              .then((NewEIS) => {
                newEIS.push(NewEIS.dataValues);

                const entityinfo = {
                  entity_id: newEntity[0].id,
                  slug_id: newEIS[0].id,
                  data: '{ "page": "/" }',
                };
                methods.Entities.entityInfoMethods.addEntityInfo(entityinfo)
                  .then((EntityInfo) => {
                    console.log('added entityInformation');
                    newEI.push(EntityInfo.dataValues);

                    const ret = newEI.map((values) => {
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
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('it should DELETE EntityInfo given the entityInfoId', (done) => {
    methods.Entities.entityInfoMethods.getAllEntityInfo()
      .then((res) => {
        const data = {};
        data.entityInfoId = res[0].dataValues.id;
        data.entityId = res[0].dataValues.entity_id;
        data.slugId = res[0].dataValues.slug_id;
        data.Data = res[0].dataValues.data;

        chai.request(app)
          .delete('/private/entities/entity_information/')
          .send({ data })
          .end((err, result) => {
            console.log(err);
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('deleted EntityInformation');
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
        methods.Entities.entityMethods.deleteAllEntity()
          .then(() => {
            console.log('deleted entities');
            methods.Entities.entityInfoSlugsMethods.deleteAllEntityInfoSlugs()
              .then(() => {
                console.log('deleted entity_info_slugs');
                methods.Entities.entityInfoMethods.deleteAllEntityInfo()
                  .then(() => {
                    console.log('deleted entity_info');
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

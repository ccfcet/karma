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
const newEntity1 = [];
const newEntityType1 = [];

describe('Post - EntityParentChild_Association - POST', () => {
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

            const entitytype1 = {
              entity_type: 'people1',
              entity_type_slug: 'about1',
            };
            methods.Entities.entityTypeMethods.addEntityType(entitytype1)
              .then((EntityType1) => {
                console.log('added entity types');
                newEntityType1.push(EntityType1.dataValues);

                const entity1 = {
                  entity_name: 'cse1',
                  entity_slug: 'aboutentity1',
                  entity_type_id: newEntityType1[0].id,
                };
                methods.Entities.entityMethods.addEntity(entity1)
                  .then((Entity1) => {
                    console.log('added entity');
                    newEntity1.push(Entity1.dataValues);

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

  it('POST /private/entities/entity_parent_child_association/', (done) => {
    const epc = {
      parentId: newEntity[0].id,
      childId: newEntity1[0].id,
    };
    chai.request(app)
      .post('/private/entities/entity_parent_child_association/')
      .send(epc)
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
        methods.Entities.entityMethods.deleteAllEntity()
          .then(() => {
            console.log('deleted entities');
            methods.Entities.entityParentChildMethods
              .deleteAllEntityParentChild()
              .then(() => {
                console.log('deleted entity_parentchild_association');
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
  });
});

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
const newEPA = [];
const tempVar = [];

// eslint-disable-next-line max-len
describe('Entity_Position_Association - Get_Entity_Position_Association GET', () => {
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

            const epa = {
              entity_id: newEntity[0].id,
              status: 'x',
              position_name: 'PosName',
              position_slug: 'PosSlug',
              position_description: 'PosDescription',
            };
            methods.Entities.entityPositionMethods.addEntityPosition(epa)
              .then((EPA) => {
                console.log('added entity_position_association');
                newEPA.push(EPA.dataValues);

                const ret = newEPA.map((values) => {
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
  });

  it('GET /private/entities/entity_position_association/', (done) => {
    chai.request(app)
      .get('/private/entities/entity_position_association/')
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
    methods.Entities.entityTypeMethods.deleteAllEntityTypes()
      .then(() => {
        console.log('deleted entitytypes');
        methods.Entities.entityMethods.deleteAllEntity()
          .then(() => {
            console.log('deleted entities');
            methods.Entities.entityPositionMethods.deleteAllEntityPosition()
              .then(() => {
                console.log('deleted entity_position_association');
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

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

describe('/PUT/:entityPosId', () => {
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

  it('it should UPDATE entityPosInfo given the entityPosId', (done) => {
    methods.Entities.entityPositionMethods.getAllEntityPosition()
      .then((res) => {
        let entityPosId = {};
        entityPosId = res[0].dataValues.id;

        const New = {
          entityId: newEntity[0].id,
          Status: 'y',
          positionName: 'NewPosName',
          positionSlug: 'NewPosSlug',
          positionDescription: 'NewPosDescription',
        };

        chai.request(app)
          .put(`/private/entities/entity_position_association/${entityPosId}`)
          .send(New)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to
              .eql('updated EntityPositionAssociation');

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

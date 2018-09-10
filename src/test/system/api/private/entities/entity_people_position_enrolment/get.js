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
const newPeople = [];
const newEPPE = [];

// eslint-disable-next-line max-len
describe('EntityPeoplePositionEnrolment - Get_EntityPeoplePositionEnrolment GET', () => {
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

                const people = {
                  first_name: 'John',
                  middle_name: 'M',
                  last_name: 'Doe',
                  gender: 'M',
                  date_of_birth: '1987-01-01',
                  nationality: 'Indian',
                };
                methods.People.peopleMethods.addPeople(people)
                  .then((PEOPLE) => {
                    newPeople.push(PEOPLE.dataValues);

                    const eppe = {
                      people_id: newPeople[0].id,
                      entity_position_association_id: newEPA[0].id,
                      activity: 'X',
                    };
                    methods.Entities.entityPeoplePosEnrolMethods
                      .addEntityPeoplePosEnrol(eppe)
                      .then((neweppe) => {
                        newEPPE.push(neweppe.dataValues);

                        const ret = newEPPE.map((values) => {
                          const val = values;
                          delete val.created_at;
                          delete val.updated_at;
                          return val;
                        });
                        tempVar.push(ret[0]);
                        done();
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
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('GET /private/entities/entity_people_position_enrolment/', (done) => {
    chai.request(app)
      .get('/private/entities/entity_people_position_enrolment/')
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
                methods.People.peopleMethods.deleteAllPeople()
                  .then(() => {
                    console.log('deleted people');
                    methods.Entities.entityPeoplePosEnrolMethods
                      .deleteAllEntityPeoplePosEnrol().then(() => {
                        console.log('deleted EntityPeoplePositionEnrolment');
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
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

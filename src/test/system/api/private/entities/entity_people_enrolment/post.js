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
const newPeople = [];

describe('Post - EntityPeopleEnrolment - POST', () => {
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

  it('POST /private/entities/entity_people_enrolment/', (done) => {
    const epe = {
      entityId: newEntity[0].id,
      peopleId: newPeople[0].id,
      dateTime: '1999-09-08 11:11:11',
      Activity: 'X',
    };
    chai.request(app)
      .post('/private/entities/entity_people_enrolment/')
      .send(epe)
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
            methods.People.peopleMethods.deleteAllPeople()
              .then(() => {
                console.log('deleted people');
                methods.Entities.entityPeopleEnrolMethods
                  .deleteAllEntityPeopleEnrol()
                  .then(() => {
                    console.log('deleted EntityPeopleEnrolment');
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

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

describe('Post courses offered - POST', () => {
  beforeEach((done) => {
    methods.Entities.entityTypeMethods.deleteAllEntityTypes()
      .then(() => {
        console.log('deleted entitytypes');

        methods.Entities.entityMethods.deleteAllEntity()
          .then(() => {
            console.log('deleted entities');

            methods.Academics.coursesOfferedMethods.deleteAllCoursesOffered()
              .then(() => {
                const entitytype = {
                  entity_type: 'people',
                  entity_type_slug: 'about',
                };
                methods.Entities.entityTypeMethods.addEntityType(entitytype)
                  .then((EntityType) => {
                    newEntityType.push(EntityType.dataValues);

                    const entity = {
                      entity_name: 'cse',
                      entity_slug: 'about',
                      entity_type_id: newEntityType[0].id,
                    };
                    methods.Entities.entityMethods.addEntity(entity)
                      .then((Entity) => {
                        newEntity.push(Entity.dataValues);
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

  it('POST /public/academics/courses_offered/', (done) => {
    const coursesoffered = {
      officialCourseId: 'Course ID',
      name: 'Name',
      departmentId: newEntity[0].id,
      credits: 4,
      validStartDate: '2012-12-07',
      validEndDate: '2014-04-08',
      durationInDays: 5,
    };

    chai.request(app)
      .post('/public/academics/courses_offered/')
      .send(coursesoffered)
      .end((err, result) => {
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

            methods.Academics.coursesOfferedMethods.deleteAllCoursesOffered()
              .then(() => {
                console.log('deleted coursesoffered');
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

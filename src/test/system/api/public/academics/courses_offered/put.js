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
const New = [];
const newCoursesOffered = [];

describe('/PUT/:courseid', () => {
  beforeEach((done) => {
    methods.Entities.entityTypeMethods.deleteAllEntityTypes()
      .then(() => {
        console.log('deleted entitytypes');

        methods.Entities.entityMethods.deleteAllEntity()
          .then(() => {
            console.log('deleted entities');

            methods.Academics.coursesOfferedMethods.deleteAllCoursesOffered()
              .then(() => {
                console.log('deleted coursesoffered');

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

                        const coursesoffered = {
                          official_course_id: 'Course ID',
                          name: 'Name',
                          department_id: newEntity[0].id,
                          credits: 4,
                          valid_start_date: '2012-12-07',
                          valid_end_date: '2014-04-08',
                          duration_in_days: 5,
                        };
                        methods.Academics.coursesOfferedMethods
                          .addCoursesOffered(coursesoffered)
                          .then((CoursesOffered) => {
                            newCoursesOffered.push(CoursesOffered.dataValues);

                            const ret = newCoursesOffered.map((values) => {
                              const val = values;
                              delete val.created_at;
                              delete val.updated_at;
                              return val;
                            });
                            New.push(ret[0]);
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
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('it should UPDATE courses_offered given the courseid', (done) => {
    methods.Academics.coursesOfferedMethods.getAllCoursesOffered()
      .then((res) => {
        let coursesOfferedId = {};
        coursesOfferedId = res[0].dataValues.id;
        const course = {
          officialCourseId: 'Course ID2',
          name: 'newName',
          departmentId: newEntity[0].id,
          credits: 3,
          validStartDate: '2012-12-10',
          validEndDate: '2013-04-12',
          durationInDays: 4,
        };

        chai.request(app)
          .put(`/public/academics/courses_offered/${coursesOfferedId}`)
          .send(course)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated courses offered');

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

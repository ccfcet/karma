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

const newPeople = [];
const newEntity = [];
const newEntityType = [];
const enttype = [];
const newFCAA = [];
const FCAA = [];
const streamType = [];
const streamsOffered = [];
const newClass = [];
const ent = [];
const newCoursesOffered = [];

describe('DELETE faculty_advisory_activity', () => {
  beforeEach((done) => {
    const newpeople = {
      first_name: 'John',
      middle_name: 'M',
      last_name: 'Doe',
      gender: 'M',
      date_of_birth: '1987-01-01',
      nationality: 'Indian',
    };

    methods.People.peopleMethods.addPeople(newpeople)
      .then((PEOPLE) => {
        newPeople.push(PEOPLE.dataValues);

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
                const streamtype = {
                  stream_type_long: '5',
                  stream_type_short: '5',
                  start_date: '2018-07-25',
                  end_date: '2018-07-29',
                };

                methods.Academics.streamTypesMethods.addStreamType(streamtype)
                  .then((model) => {
                    streamType.push(model.dataValues);
                    const newStream = {

                      stream_type_id: streamType[0].id,
                      stream_name: 'btech',
                      department_id: newEntity[0].id,
                      valid_start_date: '2018-07-25',
                      valid_end_date: '2018-07-25',
                    };
                    methods.Academics.streamsOfferedMethods
                      .addStreamsOffered(newStream)
                      .then((streams) => {
                        streamsOffered.push(streams.dataValues);

                        const classes = {
                          current_class_slug: 'Class Slug',
                          stream_id: streamsOffered[0].id,
                          start_date: '2012-08-03',
                          division: 6,
                          end_date: '2013-06-03',
                        };
                        methods.Academics.classesMethods.addClasses(classes)
                          .then((Class) => {
                            newClass.push(Class.dataValues);
                            const entitytype2 = {
                              entity_type: 'people2',
                              entity_type_slug: 'about2',
                            };
                            methods.Entities.entityTypeMethods
                              .addEntityType(entitytype2)
                              .then((etype) => {
                                enttype.push(etype.dataValues);
                                const entity2 = {
                                  entity_name: 'eee',
                                  entity_slug: 'about2',
                                  entity_type_id: enttype[0].id,
                                };
                                methods.Entities.entityMethods
                                  .addEntity(entity2)
                                  .then((ent2) => {
                                    ent.push(ent2.dataValues);
                                    const coursesoffered = {
                                      official_course_id: 'Course X',
                                      name: 'Name',
                                      department_id: ent[0].id,
                                      credits: 4,
                                      valid_start_date: '2012-12-07',
                                      valid_end_date: '2014-04-08',
                                      duration_in_days: 5,
                                    };
                                    methods.Academics.coursesOfferedMethods
                                      .addCoursesOffered(coursesoffered)
                                      .then((CoursesOffered) => {
                                        newCoursesOffered.push(
                                          CoursesOffered.dataValues,
                                        );

                                        const fcaa = {
                                          people_id: newPeople[0].id,
                                          class_id: newClass[0].id,
                                          activity: 'A',
                                          date_time: '2012-12-09 11:55:55',
                                          course_id: newCoursesOffered[0].id,

                                        };
                                        methods.Faculty
                                          .facultyClassAdvisoryMethods
                                          .addFacultyClassAdvisoryActivity(fcaa)
                                          .then((returns) => {
                                            FCAA.push(returns.dataValues);

                                            const ret = FCAA.map((values) => {
                                              const val = values;
                                              delete val.created_at;
                                              delete val.updated_at;
                                              return val;
                                            });
                                            newFCAA.push(ret[0]);
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
                            /*
                                 */
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

  it('it should DELETE faculty with advisoryId', (done) => {
    methods.Faculty.facultyClassAdvisoryMethods
      .getAllFacultyClassAdvisoryActivity()
      .then((res) => {
        const data = {};
        data.peopleId = res[0].dataValues.people_id;
        data.classId = res[0].dataValues.class_id;
        data.activity = res[0].dataValues.activity;
        console.log(data);
        chai.request(app)
          .delete('/private/faculty/faculty_class_advisory_activity/')
          .send({ data })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('faculty_advisory deleted');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterEach((done) => {
    methods.People.peopleMethods.deleteAllPeople()
      .then(() => {
        console.log('deleted people');

        methods.Entities.entityTypeMethods.deleteAllEntityTypes()
          .then(() => {
            console.log('deleted entitytypes');

            methods.Entities.entityMethods.deleteAllEntity()
              .then(() => {
                console.log('deleted entities');
                methods.Academics.streamTypesMethods.deleteAllStreamTypes()
                  .then(() => {
                    console.log('deleted stream types');
                    methods.Academics.streamsOfferedMethods
                      .deleteAllStreamsOffered()
                      .then(() => {
                        console.log('deleted streams offered');
                        methods.Academics.classesMethods.deleteAllClasses()
                          .then(() => {
                            console.log('deleted classes');
                            methods.Academics.coursesOfferedMethods
                              .deleteAllCoursesOffered()
                              .then(() => {
                                methods.Faculty.facultyClassAdvisoryMethods
                                  .deleteAllFacultyClassAdvisoryActivity()
                                  .then(() => {
                                    console.log('deleted faculty_class');
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

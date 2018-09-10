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

const newTimeSlot = [];
const newClasses = [];
const newClassesTT = [];
const newPeople = [];
const newEntity = [];
const newEntityType = [];
const newEntity1 = [];
const newEntityType1 = [];
const newEntity2 = [];
const newEntityType2 = [];
const newStreamsOffered = [];
const newEnrolmentActivity = [];
const newStreamType = [];
const newCoursesOffered = [];
const newCoursesOffered1 = [];
const New = [];

describe('/DELETE classes_time_tables', () => {
  beforeEach((done) => {
    const timeslot = {
      start_timestamp: '09:12:56',
      end_timestamp: '11:56:45',
    };
    methods.Academics.timeSlotsMethods.addTimeSlots(timeslot)
      .then((TimeSlot) => {
        newTimeSlot.push(TimeSlot.dataValues);

        const streamtype = {
          stream_type_long: '5',
          stream_type_short: '5',
          start_date: '2018-07-25',
          end_date: '2018-07-29',
        };
        methods.Academics.streamTypesMethods.addStreamType(streamtype)
          .then((StreamType) => {
            newStreamType.push(StreamType.dataValues);

            const entitytypes = {
              entity_type: 'people',
              entity_type_slug: 'about',
            };
            methods.Entities.entityTypeMethods.addEntityType(entitytypes)
              .then((EntityTypes) => {
                newEntityType.push(EntityTypes.dataValues);

                const entity = {
                  entity_name: 'cse',
                  entity_slug: 'about',
                  entity_type_id: newEntityType[0].id,
                };
                methods.Entities.entityMethods.addEntity(entity)
                  .then((Entity) => {
                    newEntity.push(Entity.dataValues);

                    const streamsoffered = {
                      stream_type_id: newStreamType[0].id,
                      stream_name: 'btech',
                      department_id: newEntity[0].id,
                      valid_start_date: '2018-07-25',
                      valid_end_date: '2018-07-25',
                    };
                    methods.Academics.streamsOfferedMethods
                      .addStreamsOffered(streamsoffered)
                      .then((StreamsOffered) => {
                        newStreamsOffered.push(StreamsOffered.dataValues);

                        const classes = {
                          current_class_slug: 'Class Slug',
                          stream_id: newStreamsOffered[0].id,
                          start_date: '2012-08-03',
                          division: 6,
                          end_date: '2013-06-03',
                        };
                        methods.Academics.classesMethods.addClasses(classes)
                          .then((Classes) => {
                            newClasses.push(Classes.dataValues);

                            const entitytypes1 = {
                              entity_type: 'people1',
                              entity_type_slug: 'about1',
                            };
                            methods.Entities.entityTypeMethods
                              .addEntityType(entitytypes1)
                              .then((EntityTypes1) => {
                                newEntityType1.push(EntityTypes1.dataValues);

                                const entity1 = {
                                  entity_name: 'cse1',
                                  entity_slug: 'about1',
                                  entity_type_id: newEntityType1[0].id,
                                };
                                methods.Entities.entityMethods
                                  .addEntity(entity1)
                                  .then((Entity1) => {
                                    newEntity1.push(Entity1.dataValues);

                                    const coursesoffered = {
                                      official_course_id: 'Course ID',
                                      name: 'Name',
                                      department_id: newEntity1[0].id,
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

                                        const people = {
                                          first_name: 'Firstname',
                                          middle_name: 'Middlename',
                                          last_name: 'Lastname',
                                          gender: 'M',
                                          date_of_birth: '2000-12-01',
                                          nationality: 'Indian',
                                        };
                                        methods.People.peopleMethods
                                          .addPeople(people)
                                          .then((PEOPLE) => {
                                            newPeople.push(PEOPLE.dataValues);

                                            const entitytypes2 = {
                                              entity_type: 'people2',
                                              entity_type_slug: 'about2',
                                            };
                                            methods.Entities.entityTypeMethods
                                              .addEntityType(entitytypes2)
                                              .then((EntityTypes2) => {
                                                newEntityType2
                                                  .push(
                                                    EntityTypes2.dataValues,
                                                  );

                                                const entity2 = {
                                                  entity_name: 'cse2',
                                                  entity_slug: 'about2',
                                                  entity_type_id:
                                                  newEntityType2[0].id,
                                                };
                                                methods.Entities.entityMethods
                                                  .addEntity(entity2)
                                                  .then((Entity2) => {
                                                    newEntity2.push(
                                                      Entity2.dataValues,
                                                    );

                                                    const coursesoffered1 = {
                                                      official_course_id:
                                                      'Course ID1',
                                                      name: 'Name1',
                                                      department_id:
                                                      newEntity2[0].id,
                                                      credits: 3,
                                                      valid_start_date:
                                                      '2010-11-07',
                                                      valid_end_date:
                                                      '2011-07-08',
                                                      duration_in_days: 4,
                                                    };
                                                    methods.Academics
                                                      .coursesOfferedMethods
                                                      .addCoursesOffered(
                                                        coursesoffered1,
                                                      )
                                                      .then(
                                                        (CoursesOffered1) => {
                                                          newCoursesOffered1
                                                            .push(
                                                              CoursesOffered1
                                                                .dataValues,
                                                            );

                                                          /* eslint-disable */
                                                        const enrolmentactivity = {
                                                          people_id:
                                                          newPeople[0]
                                                            .id,
                                                          course_id:
                                                          newCoursesOffered1[0]
                                                            .id,
                                                          activity: 'X',
                                                          date_time:
                                                          '2012-11-05 11:09:56',
                                                        };
                                                        methods.Faculty
                                                          .facultyEAMethods
                                                          .addFacultyAcademicEnrolmentActivity(
                                                            enrolmentactivity,
                                                          )
                                                          .then((EnrolmentActivity) => {
                                                            newEnrolmentActivity
                                                              .push(EnrolmentActivity
                                                                .dataValues);

                                                            const classestt = {
                                                              day: 'Monday',
                                                              faculty_id: newEnrolmentActivity[0].id,
                                                              class_id: newClasses[0].id,
                                                              time_slot_id: newTimeSlot[0].id,
                                                              course_id: newCoursesOffered[0].id,
                                                            };
                                                            methods
                                                              .Academics
                                                              .classesTimeTablesMethods
                                                              .addClassesTimeTables(
                                                                classestt,
                                                              )
                                                              .then((ClassesTT) => {
                                                                newClassesTT.push(ClassesTT.dataValues);
                                                                const ret = newClassesTT
                                                                  .map((values) => {
                                                                    const val = values;
                                                                    delete val
                                                                      .created_at;
                                                                    delete val
                                                                      .updated_at;
                                                                    return val;
                                                                  });
                                                                New
                                                                  .push(ret[0]);
                                                                done();
                                                              })
                                                              .catch((err) => {
                                                                console
                                                                  .log(err);
                                                              });
                                                          })
                                                          /* eslint-enable */
                                                            .catch((err) => {
                                                              console.log(err);
                                                            });
                                                        },
                                                      )
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

  it('it should DELETE classes_time_tables given the cttid', (done) => {
    methods.Academics.classesTimeTablesMethods.getAllClassesTimeTables()
      .then((res) => {
        const { id } = res[0].dataValues;

        chai.request(app)
          .delete('/public/academics/classes_time_tables/')
          .send({ id })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('classes_time_tables deleted');
            done();
          });
      })
      .catch((err) => {
        console.log('hello', err);
      });
  });

  afterEach((done) => {
    methods.Academics.timeSlotsMethods.deleteAllTimeSlots()
      .then(() => {
        console.log('deleted TimeSlots');
        methods.Academics.streamTypesMethods.deleteAllStreamTypes()
          .then(() => {
            console.log('deleted StreamTypes');
            methods.Entities.entityTypeMethods.deleteAllEntityTypes()
              .then(() => {
                console.log('deleted EntityTypes');
                methods.Entities.entityMethods.deleteAllEntity()
                  .then(() => {
                    console.log('deleted entities');
                    methods.Academics.streamsOfferedMethods
                      .deleteAllStreamsOffered()
                      .then(() => {
                        console.log('deleted StreamsOffered');
                        methods.Academics.classesMethods.deleteAllClasses()
                          .then(() => {
                            console.log('deleted Classes');
                            methods.Academics.coursesOfferedMethods
                              .deleteAllCoursesOffered()
                              .then(() => {
                                console.log('deleted CoursesOffered');
                                methods.People.peopleMethods.deleteAllPeople()
                                  .then(() => {
                                    console.log('delete People');
                                    methods.Faculty.facultyEAMethods
                                      // eslint-disable-next-line max-len
                                      .deleteAllFacultyAcademicEnrolmentActivity()
                                      .then(() => {
                                        console
                                          .log('deleted EnrolmentActivity');
                                        methods.Academics
                                          .classesTimeTablesMethods
                                          .deleteAllClassesTimeTables()
                                          .then(() => {
                                            console
                                              .log('deleted ClassesTimeTables');
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

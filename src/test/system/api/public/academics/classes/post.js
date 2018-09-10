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


const newStreamType = [];
const newEntity = [];
const newEntityType = [];
const newStreamsOffered = [];

describe('Post classes - POST', () => {
  beforeEach((done) => {
    methods.Entities.entityTypeMethods.deleteAllEntityTypes()
      .then(() => {
        console.log('deleted entitytypes');
        methods.Entities.entityMethods.deleteAllEntity()
          .then(() => {
            console.log('deleted entities');
            methods.Academics.streamTypesMethods.deleteAllStreamTypes()
              .then(() => {
                console.log('deleted streamtypes');
                methods.Academics.streamsOfferedMethods
                  .deleteAllStreamsOffered()
                  .then(() => {
                    console.log('deleted streamsoffered');
                    methods.Academics.classesMethods.deleteAllClasses()
                      .then(() => {
                        console.log('deleted classes');

                        const entityTypes = {
                          entity_type: 'people',
                          entity_type_slug: 'about',
                        };
                        methods.Entities.entityTypeMethods
                          .addEntityType(entityTypes)
                          .then((entitytype) => {
                            newEntityType.push(entitytype.dataValues);
                            console.log(newEntityType);
                            const entity = {
                              entity_name: 'cse',
                              entity_slug: 'about',
                              entity_type_id: newEntityType[0].id,
                            };
                            methods.Entities.entityMethods.addEntity(entity)
                              .then((entities) => {
                                newEntity.push(entities.dataValues);

                                const streamtype = {
                                  stream_type_long: '8',
                                  stream_type_short: '9',
                                  start_date: '2020-07-25',
                                  end_date: '2020-08-31',
                                };
                                methods.Academics.streamTypesMethods
                                  .addStreamType(streamtype)
                                  .then((streams) => {
                                    newStreamType.push(streams.dataValues);

                                    const streamsoffered = {
                                      stream_name: 'Stream',
                                      stream_type_id: newStreamType[0].id,
                                      department_id: newEntity[0].id,
                                      valid_start_date: '2001-12-12',
                                      valid_end_date: '2002-09-09',
                                    };
                                    methods.Academics.streamsOfferedMethods
                                      .addStreamsOffered(streamsoffered)
                                      .then((offeredstreams) => {
                                        newStreamsOffered
                                          .push(offeredstreams.dataValues);
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
  });
  it('POST /public/academics/classes/', (done) => {
    const classes = {
      currentClass: 'Class Slug',
      streamId: newStreamsOffered[0].id,
      startDate: '2012-08-03',
      division: 6,
      endDate: '2013-06-03',
    };

    chai.request(app)
      .post('/public/academics/classes/')
      .send(classes)
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
            methods.Academics.streamTypesMethods.deleteAllStreamTypes()
              .then(() => {
                console.log('deleted streamtypes');
                methods.Academics.streamsOfferedMethods
                  .deleteAllStreamsOffered()
                  .then(() => {
                    console.log('deleted streamsoffered');
                    methods.Academics.classesMethods.deleteAllClasses()
                      .then(() => {
                        console.log('deleted classes');
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

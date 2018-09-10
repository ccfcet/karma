
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


const streamType = [];
const newEntity = [];
const newEntityType = [];
const streamsOffered = [];
const newStreams = [];

describe('/PUT/:streamid ', () => {
  beforeEach((done) => {
    methods.Academics.streamTypesMethods.deleteAllStreamTypes().then(() => {
      console.log('deleted streamtypes');
      methods.Entities.entityTypeMethods.deleteAllEntityTypes().then(() => {
        console.log('deleted entitytypes');
        methods.Entities.entityMethods.deleteAllEntity().then(() => {
          console.log('deleted entities');

          methods.Academics.streamsOfferedMethods.deleteAllStreamsOffered()
            .then(() => {
              const classes = {
                stream_type_long: '5',
                stream_type_short: '5',
                start_date: '2018-07-25',
                end_date: '2018-07-29',
              };

              methods.Academics.streamTypesMethods.addStreamType(classes)
                .then((model) => {
                  streamType.push(model.dataValues);
                  const entityTypes = {
                    entity_type: 'people',
                    entity_type_slug: 'about',

                  };

                  methods.Entities.entityTypeMethods.addEntityType(entityTypes)
                    .then((entityType) => {
                      console.log('entered entity type');
                      newEntityType.push(entityType.dataValues);
                      const entity = {
                        entity_name: 'cse',
                        entity_slug: 'about',
                        entity_type_id: newEntityType[0].id,
                      };
                      methods.Entities.entityMethods.addEntity(entity)
                        .then((entities) => {
                          newEntity.push(entities.dataValues);

                          const newStream = {

                            stream_type_id: streamType[0].id,
                            stream_name: 'btech',
                            department_id: newEntity[0].id,
                            valid_start_date: '2018-07-25',
                            valid_end_date: '2018-07-25',
                          };
                          methods.Academics.streamsOfferedMethods
                            .addStreamsOffered(newStream).then((streams) => {
                              streamsOffered.push(streams.dataValues);

                              const returns = streamsOffered.map((values) => {
                                const val = values;
                                delete val.created_at;
                                delete val.updated_at;
                                return val;
                              });
                              newStreams.push(returns[0]);
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
                .catch(err => console.log(err));
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
  it('it should UPDATE streams offered given the streamid', (done) => {
    methods.Academics.streamsOfferedMethods.getAllStreamsOffered()
      .then((res) => {
        let streamsOfferedId = {};
        streamsOfferedId = res[0].dataValues.id;
        const stream = {
          streamId: streamType[0].id,
          streamName: 'mtech',
          departmentId: newEntity[0].id,
          startDate: '2018-07-25',
          endDate: '2018-07-25',
        };

        chai.request(app)
          .put(`/public/academics/streams_offered/${streamsOfferedId}`)
          .send(stream)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated streams offered');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  afterEach((done) => {
    methods.Academics.streamTypesMethods.deleteAllStreamTypes().then(() => {
      console.log('deleted streamtypes');
      methods.Entities.entityTypeMethods.deleteAllEntityTypes().then(() => {
        console.log('deleted entitytypes');
        methods.Entities.entityMethods.deleteAllEntity().then(() => {
          console.log('deleted entities');

          methods.Academics.streamsOfferedMethods.deleteAllStreamsOffered()
            .then(() => {
              console.log('deleted');
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

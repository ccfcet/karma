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
const newClass = [];
const New = [];

describe('Classes - GetClasses - GET', () => {
  beforeEach((done) => {
    const entityTypes = {
      entity_type: 'people',
      entity_type_slug: 'about',
    };
    methods.Entities.entityTypeMethods.addEntityType(entityTypes)
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
            methods.Academics.streamTypesMethods.addStreamType(streamtype)
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
                    newStreamsOffered.push(offeredstreams.dataValues);

                    const classes = {
                      current_class_slug: 'Class Slug',
                      stream_id: newStreamsOffered[0].id,
                      start_date: '2012-08-03',
                      division: 6,
                      end_date: '2013-06-03',
                    };
                    methods.Academics.classesMethods.addClasses(classes)
                      .then((Class) => {
                        newClass.push(Class.dataValues);
                        const ret = newClass.map((values) => {
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
  });

  it('GET /public/Academics/classes/', (done) => {
    chai.request(app)

      .get('/public/academics/classes/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        const re = res.body.classes;
        re[0].start_date = new Date(re[0].start_date);
        re[0].end_date = new Date(re[0].end_date);

        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(New);
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

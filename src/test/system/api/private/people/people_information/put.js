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
const newPIS = [];
const New = [];
const newPeopleInfo = [];

describe('/PUT/:peopleInfoId', () => {
  beforeEach((done) => {
    methods.People.peopleInfoSlugsMethods.deleteAllPeopleInfoSlugs()
      .then(() => {
        console.log('deleted peopleInfoSlugs');
        methods.People.peopleMethods.deleteAllPeople()
          .then(() => {
            console.log('deleted people');
            methods.People.peopleInfoMethods.deleteAllPeopleInfo()
              .then(() => {
                console.log('deleted peopleInfo');

                const peopleinfoslugs = {
                  slug_name: 'SlugName',
                };
                methods.People.peopleInfoSlugsMethods
                  .addPeopleInfoSlugs(peopleinfoslugs)
                  .then((PeopleIS) => {
                    newPIS.push(PeopleIS.dataValues);

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

                        const peopleinfo = {
                          people_id: newPeople[0].id,
                          slug_id: newPIS[0].id,
                          data: '{ "page": "/" }',
                        };
                        methods.People.peopleInfoMethods
                          .addPeopleInfo(peopleinfo)
                          .then((PeopleInfo) => {
                            newPeopleInfo.push(PeopleInfo.dataValues);

                            const ret = newPeopleInfo.map((values) => {
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

  it('it should UPDATE peopleInfo given the peopleInfoId', (done) => {
    methods.People.peopleInfoMethods.getAllPeopleInfo()
      .then((res) => {
        let peopleInfoId = {};
        peopleInfoId = res[0].dataValues.id;
        const piid = {
          peopleId: newPeople[0].id,
          slugId: newPIS[0].id,
          data: '{ "newPage": "../../" }',
        };

        chai.request(app)
          .put(`/private/people/people_information/${peopleInfoId}`)
          .send(piid)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated people_information');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterEach((done) => {
    methods.People.peopleInfoSlugsMethods.deleteAllPeopleInfoSlugs()
      .then(() => {
        console.log('deleted peopleInfoSlugs');
        methods.People.peopleMethods.deleteAllPeople()
          .then(() => {
            console.log('deleted people');
            methods.People.peopleInfoMethods.deleteAllPeopleInfo()
              .then(() => {
                console.log('deleted peopleInfo');
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

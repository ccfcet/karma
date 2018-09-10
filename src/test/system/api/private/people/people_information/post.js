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

describe('Post peopleInfo - POST', () => {
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

  it('POST /private/people/people_information/', (done) => {
    const peopleinfo = {
      peopleId: newPeople[0].id,
      slugId: newPIS[0].id,
      data: '{ "page": "/" }',
    };

    chai.request(app)
      .post('/private/people/people_information/')
      .send(peopleinfo)
      .end((err, result) => {
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
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

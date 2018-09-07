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

describe('PeopleInformation - GetPeopleInformation - GET', () => {
  beforeEach((done) => {
    const peopleinfoslugs = {
      slug_name: 'SlugName',
    };
    methods.People.peopleInfoSlugsMethods.addPeopleInfoSlugs(peopleinfoslugs)
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
            methods.People.peopleInfoMethods.addPeopleInfo(peopleinfo)
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
  });

  it('GET /private/people/people_information/', (done) => {
    chai.request(app)
      .get('/private/people/people_information/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        const re = res.body.classes;

        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(New);

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

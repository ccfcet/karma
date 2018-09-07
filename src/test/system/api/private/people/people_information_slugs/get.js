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


const newVar = [];
const tempVar = [];

describe('PeopleInfoSlugs - GetPeopleInfoSlugs - GET', () => {
  beforeEach((done) => {
    const peopleis = {
      slug_name: 'SlugName',
    };
    methods.People.peopleInfoSlugsMethods.addPeopleInfoSlugs(peopleis)
      .then((peopleIS) => {
        newVar.push(peopleIS.dataValues);

        const ret = newVar.map((values) => {
          const val = values;
          delete val.created_at;
          delete val.updated_at;
          return val;
        });
        tempVar.push(ret[0]);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('GET /private/people/people_information_slugs/', (done) => {
    chai.request(app)
      .get('/private/people/people_information_slugs/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        let re = [];
        re = res.body.classes;
        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempVar);

        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterEach((done) => {
    methods.People.peopleInfoSlugsMethods.deleteAllPeopleInfoSlugs()
      .then(() => {
        console.log('deleted people_information_slugs');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

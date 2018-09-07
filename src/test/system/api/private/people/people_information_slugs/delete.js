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

describe('/DELETE peopleInfoSlugs with peopleInfoSlugId', () => {
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

  it('it should DELETE peopleInfoSlugs given the peopleInfoSlugId', (done) => {
    methods.People.peopleInfoSlugsMethods.getAllPeopleInfoSlugs()
      .then((res) => {
        console.log(res[0].dataValues.id);
        let peopleInfoSlugId = {};
        peopleInfoSlugId = res[0].dataValues.id;

        chai.request(app)
          .delete('/private/people/people_information_slugs/')
          .send({ peopleInfoSlugId })
          .end((err, result) => {
            console.log(err);
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('deleted peopleInfoSlugs');
            done();
          });
      })
      .catch((err) => {
        console.log('hello', err);
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

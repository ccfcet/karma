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

describe('Post peopleInfoSlugs - POST', () => {
  beforeEach((done) => {
    methods.People.peopleInfoSlugsMethods.deleteAllPeopleInfoSlugs()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('POST /private/people/people_information_slugs/', (done) => {
    const classes = {
      slugName: 'Sluggy',
    };
    console.log(classes);
    chai.request(app)
      .post('/private/people/people_information_slugs/')
      .send(classes)
      .end((err, result) => {
        console.log(err);
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
      });
  });

  afterEach((done) => {
    methods.People.peopleInfoSlugsMethods.deleteAllPeopleInfoSlugs()
      .then(() => {
        console.log('done');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

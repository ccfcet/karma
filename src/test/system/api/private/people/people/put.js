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

describe('/PUT/:peopleId ', () => {
  beforeEach((done) => {
    const classes = {
      first_name: 'John',
      middle_name: 'M',
      last_name: 'Doe',
      gender: 'M',
      date_of_birth: '1987-01-01',
      nationality: 'Indian',
    };

    methods.People.peopleMethods.addPeople(classes)
      .then((model) => {
        newVar.push(model.dataValues);

        const ret = newVar.map((datum) => {
          const dat = datum;
          delete dat.created_at;
          delete dat.updated_at;
          return dat;
        });
        console.log(ret);
        tempVar.push(ret[0]);
        done();
      })
      .catch(err => console.log(err));
  });

  it('it should UPDATE people given the peopleId', (done) => {
    methods.People.peopleMethods.getAllPeople()
      .then((res) => {
        let peopleId = {};
        peopleId = res[0].dataValues.id;
        const Types = {
          firstName: 'John',
          middleName: 'Z',
          lastName: 'Wick',
          gender: 'M',
          dateOfBirth: '1988-03-06',
          nationality: 'Indian',
        };

        chai.request(app)
          .put(`/private/people/people/${peopleId}`)
          .send(Types)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('Updated People');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  afterEach((done) => {
    methods.People.peopleMethods.deleteAllPeople().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
});

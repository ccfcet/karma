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


describe('People - GetPeople - GET', () => {
  beforeEach((done) => {
    console.log('entered');
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


  it('GET /private/People/people/', (done) => {
    chai.request(app)
      .get('/private/people/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        let re = [];
        re = res.body.classes;
        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempVar);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterEach((done) => {
    methods.People.peopleMethods.deleteAllPeople()
      .then(() => {
        console.log('deleted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});


// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const chaiExclude = require('chai-exclude');

// chai.use(chaiExclude);
// const app = require('../../../../../bin/www');
// const methods = require('../../../../../lib/data/methods');

// process.nextTick(() => {
//   app.callback = run;
// });

// chai.use(chaiHttp);
// const { expect } = chai;

// let newVar = [];

// before((done) => {
//   methods.people.deleteAllPeople()
//     .then(() => {
//       const data = {
//         first_name: 'John',
//         middle_name: 'M',
//         last_name: 'Doe',
//         gender: 'M',
//         date_of_birth: '1987-01-01',
//         nationality: 'Indian',
//       };

//       methods.people.addPeople(data)
//         .then((model) => {
//           newVar = model.dataValues;
//           // newVar = _.omit(model.dataValues, ['created_at', 'updated_at']);

//           done();
//         })
//         .catch(err => console.log(err));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// describe('People - GetPeople - GET', () => {
//   it('GET /private/people/', (done) => {
//     chai.request(app)
//       .get('/private/people')
//       .then((res) => {
//         // const output  = res.body.people;
//         expect(res).to.have.status(200);
//         expect(res.body.status).equal('success');
//         expect(res.body.people)
//           .excluding(['created_at', 'updated_at']).to.deep.equal(newVar);

//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

// after(() => {
// });

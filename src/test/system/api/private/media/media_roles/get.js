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


describe('Media - GetMediaRoles - GET', () => {
  beforeEach((done) => {
    console.log('entered');
    const classes = {
      role_name: 'Name',
      role_slug: 'Slug',
      role_description: 'Description',
    };

    methods.Media.mediaRolesMethods.addMediaRoles(classes)
      .then((model) => {
        newVar.push(model.dataValues);

        const ret = newVar.map((datum) => {
          const dat = datum;
          delete dat.created_at;
          delete dat.updated_at;
          return dat;
        });
        tempVar.push(ret[0]);
        done();
      })
      .catch(err => console.log(err));
  });


  it('GET /private/media/media_roles/', (done) => {
    chai.request(app)
      .get('/private/media/media_roles/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        let re = [];
        re = res.body.classes;
        // re[0].start_date = new Date(re[0].start_date);
        // re[0].end_date = new Date(re[0].end_date);

        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempVar);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterEach((done) => {
    methods.Media.mediaRolesMethods.deleteAllMediaRoles()
      .then(() => {
        console.log('deleted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

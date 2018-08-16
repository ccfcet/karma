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


describe('Post mediaroles - POST', () => {
  beforeEach((done) => {
    methods.Media.mediaRolesMethods.deleteAllMediaRoles().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
  it('POST /private/media/media_roles/', (done) => {
    const classes = {
      roleName: 'Name',
      roleSlug: 'Slug',
      roleDescription: 'Description',
    };
    chai.request(app)
      .post('/private/media/media_roles/')
      .send(classes)
      .end((err, result) => {
        expect(result).to.have.status(200);
        expect(result.body).to.be.a('object');

        done();
      });
  });

  afterEach((done) => {
    methods.Media.mediaRolesMethods.deleteAllMediaRoles().then(() => {
      console.log('done');
      done();
    })
      .catch((err) => {
        console.log(err);
      });
  });
});

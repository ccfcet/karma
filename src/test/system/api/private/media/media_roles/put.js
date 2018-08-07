
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


describe('/PUT/:id ', () => {
  it('it should UPDATE media_roles given the id', (done) => {
    methods.Media.mediaRolesMethods.getAllMediaRoles()
      .then((res) => {
        const { id } = res[0].dataValues;
        console.log(`${id}`);
        const classes = {
          roleName: 'Name',
          roleSlug: 'Slug',
          roleDescription: 'Description',
        };


        chai.request(app)
          .put(`/private/media/media_roles/${id}`)
          .send(classes)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated mediaroles');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
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

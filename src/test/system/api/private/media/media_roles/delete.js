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


describe('/DELETE mediaroles with id ', () => {
  it('it should DELETE mediaroles given the slotid', (done) => {
    methods.Media.mediaRolesMethods.getAllMediaRoles()
      .then((res) => {
        const { id } = res[0].dataValues;
        // id = .id;

        chai.request(app)
          .delete('/private/media/media_roles/')
          .send({ id })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('mediaroles deleted');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

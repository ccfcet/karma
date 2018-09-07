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


describe('/DELETE media roles with id ', () => {
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
  it('it should DELETE media given the id', (done) => {
    methods.Media.mediaRolesMethods.getAllMediaRoles()
      .then((res) => {
        console.log(res);
        let Id = {};
        Id = res[0].dataValues.id;

        chai.request(app)
          .delete('/private/media/media_roles/')
          .send({ id: Id })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('Media Roles deleted');
            done();
          });
      })
      .catch((err) => {
        console.log('hello', err);
      });
  });
});

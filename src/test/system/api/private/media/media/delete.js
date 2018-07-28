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


describe('/DELETE media with id ', () => {
    it('it should DELETE media given the slotid', (done) => {
      methods.Media.mediaMethods.getAllMedia()
      .then((res) =>{
        const id = res[0].dataValues.id;
  
        chai.request(app)
          .delete('/private/media/media/')
          .send({id})
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.eql('media deleted');
            done();
          });
      })
      .catch((err)=>{
        console.log(err)
      })
    });
  });
  
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


describe('/DELETE stream_types with id ', () => {
    it('it should DELETE streamtypes given the streamid', (done) => {
      methods.Academics.streamTypesMethods.getAllStreamTypes()
      .then((res) =>{
        const streamId = res[0].dataValues.id;
  
        chai.request(app)
          .delete('/private/academics/stream_types/')
          .send({streamId})
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.eql('stream Type deleted');
            done();
          });
      })
      .catch((err)=>{
        console.log(err)
      })
    });
  });
  
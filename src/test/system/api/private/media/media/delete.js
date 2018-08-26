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


describe('/DELETE media with id ', () => {
  beforeEach((done) => {
    const classes = {
      media_title: 'Title',
      media_file_name: 'File Name',
      media_location: 'Location',
    };

    methods.Media.mediaMethods.addMedia(classes)
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
    methods.Media.mediaMethods.getAllMedia()
      .then((res) => {
        let Id = {};
        Id = res[0].dataValues.id;
        chai.request(app)
          .delete('/private/media/media/')
          .send({ id: Id })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('media deleted');
            done();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

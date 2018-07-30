// const axios = require('axios');
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

const newPeople = [];
const tempPeople = [];


describe('Media - GetMedia - GET', () => {
  beforeEach((done) => {
    methods.Media.mediaMethods.deleteAllMedia()
      .then(() => {
        const data = {
          media_title: 'Hello World',
          media_file_name: 'Hey there',
          media_location: 'Kottayam',
        };
        console.log('deleted')
  
        methods.Media.mediaMethods.addMedia(data)
          .then((model) => {
            console.log(model.dataValues.created_at);
            newPeople.push(model.dataValues);
  
            newPeople.map((datum) => {
              delete datum.created_at;
              delete datum.updated_at;
              tempPeople.push(datum);
            });
            done();
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('GET /private/media/media', (done) => {
    chai.request(app)
      .get('/private/media/media/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        expect(res.body.classes)
        .excluding(['created_at','updated_at']).to.deep.equal(tempPeople);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

after(() => {
});

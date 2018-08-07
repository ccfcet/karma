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


describe('Media - Media - GET', () => {
  beforeEach((done) => {
    console.log('entered');
    const classes = {
      media_title: 'Title',
      media_file_name: 'File Name',
      media_location: 'Location',
    };

    methods.Media.mediaMethods.addMedia(classes)
      .then((model) => {
        newPeople.push(model.dataValues);

        const ret = newPeople.map((datum) => {
          const dat = datum;
          delete dat.created_at;
          delete dat.updated_at;
          return dat;
        });
        console.log(ret);
        tempPeople.push(ret[0]);
        done();
      })
      .catch(err => console.log(err));
  });


  it('GET /private/media/media/', (done) => {
    chai.request(app)
      .get('/private/media/media/')
      .then((res) => {
        // const output  = res.body.people;
        expect(res).to.have.status(200);
        expect(res.body.status).equal('success');
        console.log('request', res.body);
        let re = [];
        re = res.body.classes;
        expect(re)
          .excluding(['created_at', 'updated_at']).to.deep.equal(tempPeople);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterEach((done) => {
    methods.Media.mediaMethods.deleteAllMedia()
      .then(() => {
        console.log('deleted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

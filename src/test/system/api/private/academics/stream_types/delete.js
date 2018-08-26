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


describe('/DELETE stream_types with id ', () => {
  beforeEach((done) => {
    console.log('entered');
    const classes = {
      stream_type_long: '5',
      stream_type_short: '5',
      start_date: '2018-07-25',
      end_date: '2018-07-29',
    };

    methods.Academics.streamTypesMethods.addStreamType(classes)
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
  it('it should DELETE streamtypes given the streamid', (done) => {
    methods.Academics.streamTypesMethods.getAllStreamTypes()
      .then((res) => {
        let streamId = {};
        streamId = res[0].dataValues.id;

        chai.request(app)
          .delete('/public/academics/stream_types/')
          .send({ streamId })
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('stream Type deleted');
            done();
          });
      })
      .catch((err) => {
        console.log('hello', err);
      });
  });
});

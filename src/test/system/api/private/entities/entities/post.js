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

const newEntityType = [];

describe('Entities - Entities - GET', () => {
    beforeEach((done) => {

        // methods.Entities.entityTypeMethods.deleteAllEntityTypes()
        // .then(() => {
        //     methods.Entities.entityMethods.deleteAllEntity()
        //     .then(() => {
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        const entitytype = {
            entity_type : 'people',
            entity_type_slug : 'about',    
        };
        methods.Entities.entityTypeMethods.addEntityType(entitytype)
        .then((EntityType) => {
            newEntityType.push(EntityType.dataValues);

                done();
        })
        .catch((err) => {
            console.log(err);
        });
    });

    it('POST /private/entities/entities/', (done) => {
        const entity = {
            entity_name:'cse',
            entity_slug: 'about',
            entity_type_id: newEntityType[0].id,
        };
        chai.request(app)
        .post('/private/entities/entities/')
        .send(entity)
        .end((err, result) => {
            console.log(err);
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');    
            done();
        });
    });

      afterEach((done) => {
        methods.Entities.entityTypeMethods.deleteAllEntityTypes()
        .then(() => {
            console.log('deleted entitytypes');
            methods.Entities.entityMethods.deleteAllEntity()
            .then(() => {
                console.log('deleted entities');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    });

});
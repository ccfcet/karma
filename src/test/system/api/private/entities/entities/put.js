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


const newEntity = [];
const newEntityType = [];
const tempVar = [];

describe('/PUT/:entityId ', () => {
  beforeEach((done) => {
    const entitytype = {
      entity_type: 'people',
      entity_type_slug: 'about',
    };
    methods.Entities.entityTypeMethods.addEntityType(entitytype)
      .then((EntityType) => {
        newEntityType.push(EntityType.dataValues);

        const entity = {
          entity_name: 'cse',
          entity_slug: 'about',
          entity_type_id: newEntityType[0].id,
        };
        methods.Entities.entityMethods.addEntity(entity)
          .then((Entity) => {
            newEntity.push(Entity.dataValues);

            const ret = newEntity.map((values) => {
              const val = values;
              delete val.created_at;
              delete val.updated_at;
              return val;
            });
            tempVar.push(ret[0]);
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

  it('it should UPDATE entities given the entityId', (done) => {
    methods.Entities.entityMethods.getAllEntities()
      .then((res) => {
        let entityId = {};
        entityId = res[0].dataValues.id;
        const New = {
          entityName: 'cse',
          entitySlug: 'about',
          entityTypeId: newEntityType[0].id,
        };

        chai.request(app)
          .put(`/private/entities/entities/${entityId}`)
          .send(New)
          .end((err, result) => {
            expect(result).to.have.status(200);
            expect(result.body).to.be.a('object');
            expect(result.body.status).to.eql('updated entities');

            done();
          });
      })
      .catch((err) => {
        console.log(err);
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

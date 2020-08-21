const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const connection = require('../db/db');
const tableNames = require('../constants/tableNames');
const {
  arrayConvertToCamel,
  doesPathExist,
  getColumnsWithAlias,
} = require('../lib/utils');

let nationalityType = new GraphQLObjectType({
  name: 'Nationality',
  fields: () => ({
    id: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

let peopleType = new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    middleName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    nationality: { type: nationalityType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    deletedAt: { type: GraphQLString },
  }),
});

// TODO: LOAD COLUMNS FROM DATABASE AND CACHE THEM
const tableColumns = {
  nationality: ['id', 'value'],
};

const nationalityColumns = getColumnsWithAlias(
  tableNames.nationality,
  tableColumns[tableNames.nationality]
);

const hydrate = (people) => {
  return people.map((element) => ({
    ...element,
    nationality: {
      id: element.nationality_id,
      value: element.nationality_value,
    },
  }));
};

// console.log(nationalityColumns);

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      people: {
        type: new GraphQLList(peopleType),
        resolve: async (_, __, ___, info) => {
          const shouldJoinNationalityTable = doesPathExist(info.fieldNodes, [
            'people',
            'nationality',
          ]);
          const qb = connection();
          let columns = ['people.*'];
          if (shouldJoinNationalityTable) {
            columns = [...columns, ...nationalityColumns];
            console.log(columns);
            qb.select(columns)
              .from('people')
              .leftJoin(
                'nationality',
                'nationality.id',
                'people.nationality_id'
              );
          } else {
            qb.select([columns]).from('people');
          }
          const result = await qb;
          return arrayConvertToCamel(hydrate(result));
        },
      },
    },
  }),
});

module.exports = schema;

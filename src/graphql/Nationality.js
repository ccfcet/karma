const { Nationality } = require('../models');
module.exports = {
  schema: `
    type Nationality {
      id: ID!
      value: String!
    }
  `,
  query: `
    nationality(id: ID): [Nationality!]
  `,
  mutation: ``,
  resolvers: {
    nationality: async ({ id }) => {
      let result;
      if (id) {
        result = await Nationality.query().where('id', id);
      } else {
        result = await Nationality.query();
      }
      const newResult = result.map((element) => {
        return {
          id: element.id,
          value: element.value,
        };
      });
      return newResult;
    },
  },
};

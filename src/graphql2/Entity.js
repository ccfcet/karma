const { gql } = require('apollo-server-express');
const { generateLoaders } = require('../lib/utils');

const connection = require('../db/db');

const typeDefs = gql`
  extend type Query {
    entity(id: ID): [Entity!]
  }

  type Entity {
    id: ID!
    name: String!
    entity_type: EntityType!
    children: [Entity!]
    created_at: String!
    updated_at: String!
    deleted_at: String
  }
`;

const resolvers = {
  Query: {
    entity: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection('entity').select().where('id', id);
      } else {
        result = await connection('entity').select();
      }
      return result;
    },
  },
  Entity: {
    entity_type: async (parent, _, ctx) => {
      return ctx.entityEntityTypeLoader.load(parent.id);
    },
    children: async (parent, _, ctx) => {
      return ctx.entityChildrenLoader.load(parent.id);
    },
  },
};

const relations = [
  {
    loaderName: 'entityEntityTypeLoader',
    type: 'one-to-many',
    from: {
      table: 'entity',
      column: 'entity.entity_type_id',
    },
    to: {
      table: 'entity_type',
      column: 'entity_type.id',
    },
  },
  {
    loaderName: 'entityChildrenLoader',
    type: 'many-to-many-children',
    from: {
      table: 'entity',
      column: 'entity.id',
    },
    via: {
      table: 'entity_parent_child',
      column1: 'entity_parent_child.parent_id',
      column2: 'entity_parent_child.child_id',
    },
    to: {
      table: 'entity',
      column: 'entity.id',
    },
  },
];

const loaders = generateLoaders(relations);

module.exports = {
  typeDefs,
  resolvers,
  loaders,
};

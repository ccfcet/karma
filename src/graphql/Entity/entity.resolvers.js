const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');
const {
  createEntityTypeSchema,
  updateEntityTypeSchema,
  deleteEntityTypeSchema,
  createEntitySchema,
  updateEntitySchema,
  deleteEntitySchema,
} = require('./entity.validation');
const { handleError } = require('../../lib/utils');

module.exports = {
  Query: {
    entity_type: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.entity_type)
          .select()
          .where('id', id);
      } else {
        result = await connection(tableNames.entity_type).select();
      }
      return result;
    },
    entity: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.entity).select().where('id', id);
      } else {
        result = await connection(tableNames.entity).select();
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
    address: async (parent, _, ctx) => {
      return ctx.entityAddressLoader.load(parent.id);
    },
  },
  Mutation: {
    createEntityType: async (_, { entity_type }) => {
      try {
        await createEntityTypeSchema.validate(entity_type, {
          abortEarly: false,
        });
        const [entityTypeResult] = await connection(tableNames.entity_type)
          .insert(entity_type)
          .returning('*');
        return entityTypeResult;
      } catch (err) {
        let errorCode = 'CREATE_ENTITY_TYPE_ERROR';
        return handleError(err, errorCode);
      }
    },
    updateEntityType: async (_, { entity_type }) => {
      try {
        await updateEntityTypeSchema.validate(entity_type, {
          abortEarly: false,
        });
        const entityTypeID = entity_type.id;
        delete entity_type.id;
        const [entityTypeResult] = await connection(tableNames.entity_type)
          .where({ id: entityTypeID })
          .update(entity_type)
          .returning('*');
        return entityTypeResult;
      } catch (err) {
        let errorCode = 'UPDATE_ENTITY_TYPE_ERROR';
        return handleError(err, errorCode);
      }
    },
    deleteEntityType: async (_, { id }) => {
      try {
        await deleteEntityTypeSchema.validate({ id }, { abortEarly: false });
        await connection(tableNames.entity_type).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_ENTITY_TYPE_ERROR';
        return handleError(err, errorCode);
      }
    },
    createEntity: async (_, { entity }) => {
      try {
        await createEntitySchema.validate(entity, {
          abortEarly: false,
        });
        const [entityResult] = await connection(tableNames.entity)
          .insert(entity)
          .returning('*');
        return entityResult;
      } catch (err) {
        let errorCode = 'CREATE_ENTITY_ERROR';
        return handleError(err, errorCode);
      }
    },
    updateEntity: async (_, { entity }) => {
      try {
        await updateEntitySchema.validate(entity, {
          abortEarly: false,
        });
        const entityID = entity.id;
        delete entity.id;
        const [entityResult] = await connection(tableNames.entity)
          .where({ id: entityID })
          .update(entity)
          .returning('*');
        return entityResult;
      } catch (err) {
        let errorCode = 'UPDATE_ENTITY_ERROR';
        return handleError(err, errorCode);
      }
    },
    deleteEntity: async (_, { id }) => {
      try {
        await deleteEntitySchema.validate({ id }, { abortEarly: false });
        await connection(tableNames.entity).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_ENTITY_ERROR';
        return handleError(err, errorCode);
      }
    },
  },
  MutateEntityTypeResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'EntityType';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
  MutateEntityResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'Entity';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
};

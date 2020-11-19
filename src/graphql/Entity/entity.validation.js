const yup = require('yup');
const tableNames = require('../../constants/tableNames');
const { checkExist } = require('../../lib/utils');

// TODO: Validate date using moment
// TODO: Change Nationality to use Cache
// TODO: Code Cleanup
yup.addMethod(yup.number, 'entityTypeExist', function () {
  return checkExist(this, 'entityTypeIdExist', tableNames.entity_type);
});

yup.addMethod(yup.number, 'entityExist', function () {
  return checkExist(this, 'entityIdExist', tableNames.entity);
});

const createEntityTypeSchema = yup.object().shape({
  value: yup.string().max(128).required().label('Value'),
});

const updateEntityTypeSchema = yup.object().shape({
  id: yup.number().required().entityTypeExist().label('Entity Type ID'),
  value: yup.string().max(128).required().label('Value'),
});

const deleteEntityTypeSchema = yup.object().shape({
  id: yup.number().required().entityTypeExist().label('Entity Type ID'),
});

const createEntitySchema = yup.object().shape({
  name: yup.string().max(128).required().label('Entity'),
  entity_type_id: yup
    .number()
    .required()
    .entityTypeExist()
    .label('Entity Type'),
});

const updateEntitySchema = yup.object().shape({
  id: yup.number().required().entityExist().label('Entity ID'),
  name: yup.string().max(128).label('Name'),
  entity_type_id: yup.number().entityTypeExist().label('Entity Type'),
});

const deleteEntitySchema = yup.object().shape({
  id: yup.number().required().entityExist().label('Entity ID'),
});

module.exports = {
  createEntityTypeSchema,
  updateEntityTypeSchema,
  deleteEntityTypeSchema,
  createEntitySchema,
  updateEntitySchema,
  deleteEntitySchema,
};

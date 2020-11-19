const yup = require('yup');
const tableNames = require('../../constants/tableNames');
const { checkExist } = require('../../lib/utils');

// TODO: Validate date using moment
// TODO: Change Nationality to use Cache
// TODO: Code Cleanup
yup.addMethod(yup.number, 'peopleExist', function () {
  return checkExist(this, 'peopleIdExist', tableNames.people);
});

yup.addMethod(yup.number, 'nationalityExist', function () {
  return checkExist(this, 'nationalityIdExist', tableNames.nationality);
});

yup.addMethod(yup.string, 'uniqueEmail', function () {
  return checkExist(this, 'emailIdExist', tableNames.email, true, 'email_id');
});

const createPeopleSchema = yup.object().shape({
  first_name: yup.string().max(128).required().label('First Name'),
  middle_name: yup.string().max(128).label('Middle Name'),
  last_name: yup.string().max(128).required().label('Last Name'),
  gender: yup.mixed().oneOf(['M', 'F', 'N']).required().label('Gender'),
  date_of_birth: yup.date().required().label('Date of Birth'),
  email: yup.string().email().required().uniqueEmail().label('Email'),
  nationality_id: yup
    .number()
    .required()
    .nationalityExist()
    .label('Nationality'),
});

const updatePeopleSchema = yup.object().shape({
  id: yup.number().required().peopleExist().label('People ID'),
  first_name: yup.string().max(128).label('First Name'),
  middle_name: yup.string().max(128).label('Middle Name'),
  last_name: yup.string().max(128).label('Last Name'),
  gender: yup.mixed().oneOf(['M', 'F', 'N']).label('Gender'),
  date_of_birth: yup.date().label('Date of Birth'),
  nationality_id: yup.number().nationalityExist().label('Nationality'),
});

const deletePeopleSchema = yup.object().shape({
  id: yup.number().required().peopleExist().label('People ID'),
});

module.exports = {
  createPeopleSchema,
  updatePeopleSchema,
  deletePeopleSchema,
};

const yup = require('yup');
const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');

// TODO: Validate date using moment
// TODO: Change Nationality to use Cache
// TODO: Code Cleanup
yup.addMethod(yup.number, 'peopleExist', function () {
  return this.test('idExist', "${path} doesn't exist", async function (value) {
    const result = await connection(tableNames.people)
      .select()
      .where(`${tableNames.people}.id`, value);
    return typeof result !== 'undefined' && result.length === 1;
  });
});

const createPeopleSchema = yup.object().shape({
  first_name: yup.string().max(128).required().label('First Name'),
  middle_name: yup.string().max(128).label('Middle Name'),
  last_name: yup.string().max(128).required().label('Last Name'),
  gender: yup.mixed().oneOf(['M', 'F', 'N']).required().label('Gender'),
  date_of_birth: yup.date().required().label('Date of Birth'),
  email: yup
    .string()
    .email()
    .required()
    .test('uniqueEmail', '${path} already exists.', async function (value) {
      const result = await connection(tableNames.email)
        .select()
        .where(`${tableNames.email}.email_id`, value);
      return typeof result !== 'undefined' && result.length === 0;
    })
    .label('Email'),
  nationality_id: yup
    .number()
    .required()
    .test('nationalityExist', "${path} doesn't exist", async function (value) {
      const result = await connection(tableNames.nationality)
        .select()
        .where(`${tableNames.nationality}.id`, value);
      return typeof result !== 'undefined' && result.length === 1;
    })
    .label('Nationality'),
});

const updatePeopleSchema = yup.object().shape({
  id: yup.number().required().peopleExist().label('ID'),
  first_name: yup.string().max(128).label('First Name'),
  middle_name: yup.string().max(128).label('Middle Name'),
  last_name: yup.string().max(128).label('Last Name'),
  gender: yup.mixed().oneOf(['M', 'F', 'N']).label('Gender'),
  date_of_birth: yup.date().label('Date of Birth'),
  nationality_id: yup
    .number()
    .test('nationalityExist', "${path} doesn't exist", async function (value) {
      if (value === undefined) return true;
      const result = await connection(tableNames.nationality)
        .select()
        .where(`${tableNames.nationality}.id`, value);
      return typeof result !== 'undefined' && result.length === 1;
    })
    .label('Nationality'),
});

const deletePeopleSchema = yup.object().shape({
  id: yup.number().required().peopleExist().label('ID'),
});

module.exports = {
  createPeopleSchema,
  updatePeopleSchema,
  deletePeopleSchema,
};

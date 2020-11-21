const yup = require('yup');
const tableNames = require('../../constants/tableNames');
const { checkExist } = require('../../lib/utils');

// TODO: Validate date using moment
// TODO: Change Nationality to use Cache
// TODO: Code Cleanup

yup.addMethod(yup.number, 'courseExist', function () {
  return checkExist(this, 'courseIdExist', tableNames.course);
});

yup.addMethod(yup.number, 'courseInstanceExist', function () {
  return checkExist(this, 'courseInstanceIdExist', tableNames.course_instance);
});

yup.addMethod(yup.number, 'academicDurationExist', function () {
  return checkExist(
    this,
    'academicDurationIdExist',
    tableNames.academic_duration
  );
});

// Add Yup validation methods globally
yup.addMethod(yup.number, 'entityExist', function () {
  return checkExist(this, 'entityIdExist', tableNames.entity);
});

const createCourseSchema = yup.object().shape({
  code: yup.string().max(128).required().label('Code'),
  name: yup.string().max(128).required().label('Name'),
  entity_id: yup.number().required().entityExist().label('Entity'),
  credits: yup.number().required().label('Credits'),
});

const updateCourseSchema = yup.object().shape({
  id: yup.number().required().courseExist().label('Course ID'),
  code: yup.string().max(128).label('Code'),
  name: yup.string().max(128).label('Name'),
  entity_id: yup.number().entityExist().label('Entity'),
  credits: yup.number().label('Credits'),
});

const deleteCourseSchema = yup.object().shape({
  id: yup.number().required().courseExist().label('Course ID'),
});

const createAcademicDurationSchema = yup.object().shape({
  name: yup.string().max(128).required().label('Name'),
  start_date: yup.date().required().label('Start Date'),
  end_date: yup.date().required().label('End Date'),
});

const updateAcademicDurationSchema = yup.object().shape({
  id: yup
    .number()
    .required()
    .academicDurationExist()
    .label('Academic Duration ID'),
  name: yup.string().max(128).label('Name'),
  start_date: yup.date().required().label('Start Date'),
  end_date: yup.date().required().label('End Date'),
});

const deleteAcademicDurationSchema = yup.object().shape({
  id: yup
    .number()
    .required()
    .academicDurationExist()
    .label('Academic Duration ID'),
});

// const createCourseInstanceSchema = yup.object().shape({
//   name: yup.string().max(128).required().label('CourseInstance'),
//   entity_type_id: yup
//     .number()
//     .required()
//     .entityTypeExist()
//     .label('Entity Type'),
// });

// const updateEntitySchema = yup.object().shape({
//   id: yup.number().required().entityExist().label('ID'),
//   name: yup.string().max(128).required().label('Name'),
//   entity_type_id: yup
//     .number()
//     .required()
//     .entityTypeExist()
//     .label('Entity Type'),
// });

// const deleteEntitySchema = yup.object().shape({
//   id: yup.number().required().entityExist().label('ID'),
// });

module.exports = {
  createCourseSchema,
  updateCourseSchema,
  deleteCourseSchema,
  createAcademicDurationSchema,
  updateAcademicDurationSchema,
  deleteAcademicDurationSchema,
  // createCourseInstanceSchema,
  // updateCourseInstanceSchema,
  // deleteCourseInstanceSchema,
};

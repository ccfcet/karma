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

yup.addMethod(yup.number, 'timeSlotExist', function () {
  return checkExist(this, 'timeSlotIdExist', tableNames.time_slot);
});

yup.addMethod(yup.string, 'uniqueTag', function () {
  return checkExist(this, 'emailIdExist', tableNames.email, true, 'email_id');
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
  start_date: yup.date().label('Start Date'),
  end_date: yup.date().label('End Date'),
});

const deleteAcademicDurationSchema = yup.object().shape({
  id: yup
    .number()
    .required()
    .academicDurationExist()
    .label('Academic Duration ID'),
});

const createCourseInstanceSchema = yup.object().shape({
  course_id: yup.number().required().courseExist().label('Course ID'),
  tag: yup.string().max(64).uniqueTag().required().label('Tag'),
  academic_duration_id: yup
    .number()
    .required()
    .academicDurationExist()
    .label('Academic Duration ID'),
});

const updateCourseInstanceSchema = yup.object().shape({
  id: yup.number().required().courseInstanceExist().label('Course Instance ID'),
  course_id: yup.number().required().courseExist().label('Course ID'),
  tag: yup.string().max(64).uniqueTag().required().label('Tag'),
  academic_duration_id: yup
    .number()
    .academicDurationExist()
    .label('Academic Duration ID'),
});

const deleteCourseInstanceSchema = yup.object().shape({
  id: yup.number().required().courseInstanceExist().label('ID'),
});

// Todo: Add validation for Time
const createTimeSlotSchema = yup.object().shape({
  course_instance_id: yup
    .number()
    .required()
    .courseInstanceExist()
    .label('Course Instance ID'),
  start_time: yup.string().max(64).required().label('Start Time'),
  end_time: yup.string().max(64).required().label('End Time'),
});

const updateTimeSlotSchema = yup.object().shape({
  id: yup.number().required().timeSlotExist().label('Time Slot ID'),
  course_instance_id: yup
    .number()
    .courseInstanceExist()
    .label('Course Instance ID'),
  start_time: yup.string().max(64).label('Start Time'),
  end_time: yup.string().max(64).label('End Time'),
});

const deleteTimeSlotSchema = yup.object().shape({
  id: yup.number().required().timeSlotExist().label('ID'),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
  deleteCourseSchema,
  createAcademicDurationSchema,
  updateAcademicDurationSchema,
  deleteAcademicDurationSchema,
  createCourseInstanceSchema,
  updateCourseInstanceSchema,
  deleteCourseInstanceSchema,
  createTimeSlotSchema,
  updateTimeSlotSchema,
  deleteTimeSlotSchema,
};

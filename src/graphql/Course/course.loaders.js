const { generateLoaders } = require('../../lib/utils');
const connection = require('../../db/db');
const { groupBy } = require('lodash');
const tableNames = require('../../constants/tableNames');
const DataLoader = require('dataloader');

const relations = [
  {
    loaderName: 'courseEntityLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.course,
      column: `${tableNames.course}.${tableNames.entity}_id`,
    },
    to: {
      table: `${tableNames.entity}`,
      column: `${tableNames.entity}.id`,
    },
  },
  {
    loaderName: 'courseInstanceMemberPeopleLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.course_instance_association,
      column: `${tableNames.course_instance_association}.${tableNames.people}_id`,
    },
    to: {
      table: `${tableNames.people}`,
      column: `${tableNames.people}.id`,
    },
  },
  {
    loaderName: 'courseInstanceAcademicDurationLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.course_instance,
      column: `${tableNames.course_instance}.${tableNames.academic_duration}_id`,
    },
    to: {
      table: `${tableNames.academic_duration}`,
      column: `${tableNames.academic_duration}.id`,
    },
  },
  {
    loaderName: 'courseInstanceTimeSlotLoader',
    type: 'one-to-many',
    from: {
      table: tableNames.time_slot,
      column: `${tableNames.time_slot}.${tableNames.course_instance}_id`,
    },
    to: {
      table: `${tableNames.course_instance}`,
      column: `${tableNames.course_instance}.id`,
    },
  },
  {
    loaderName: 'timeSlotAttendanceLoader',
    type: 'one-to-many',
    from: {
      table: tableNames.attendance_data,
      column: `${tableNames.attendance_data}.${tableNames.time_slot}_id`,
    },
    to: {
      table: `${tableNames.time_slot}`,
      column: `${tableNames.time_slot}.id`,
    },
  },
  {
    loaderName: 'attendancePeopleLoader',
    type: 'many-to-one',
    from: {
      table: tableNames.attendance_data,
      column: `${tableNames.attendance_data}.${tableNames.people}_id`,
    },
    to: {
      table: `${tableNames.people}`,
      column: `${tableNames.people}.id`,
    },
  },
];

let loaders = generateLoaders(relations);

// Custom loader for CourseInstanceMember
loaders.courseInstanceMemberLoader = new DataLoader(
  async (courseInstanceIDs) => {
    const types = ['Student', 'Professor', 'Teaching Assistant'];
    const result = await connection(
      tableNames.course_instance_association
    ).whereIn(
      `${tableNames.course_instance_association}.${tableNames.course_instance}_id`,
      courseInstanceIDs
    );

    const hydratedResult = result.map((member) => ({
      ...member,
      type: types[member.type],
    }));

    let objectMap = groupBy(hydratedResult, `${tableNames.course_instance}_id`);

    return courseInstanceIDs.map(
      (courseInstanceID) => objectMap[courseInstanceID]
    );
  }
);

module.exports = loaders;

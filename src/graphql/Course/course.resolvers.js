const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');

module.exports = {
  Query: {
    course: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.course).select().where('id', id);
      } else {
        result = await connection(tableNames.course).select();
      }
      return result;
    },
    course_instance: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.course_instance)
          .select()
          .where('id', id);
      } else {
        result = await connection(tableNames.course_instance).select();
      }
      return result;
    },
    academic_duration: async (_, { id }) => {
      let result;
      if (id) {
        result = await connection(tableNames.academic_duration)
          .select()
          .where('id', id);
      } else {
        result = await connection(tableNames.academic_duration).select();
      }
      return result;
    },
  },
  Course: {
    entity: async (parent, _, ctx) => {
      return ctx.courseEntityLoader.load(parent.id);
    },
  },
  CourseInstance: {
    academic_duration: async (parent, _, ctx) => {
      return ctx.courseInstanceAcademicDurationLoader.load(parent.id);
    },
    members: async (parent, _, ctx) => {
      return ctx.courseInstanceMemberLoader.load(parent.id);
    },
    time_slots: async (parent, _, ctx) => {
      return ctx.courseInstanceTimeSlotLoader.load(parent.id);
    },
    course: async (parent, _, ctx) => {
      return ctx.courseInstanceCourseLoader.load(parent.id);
    },
  },
  CourseInstanceMember: {
    people: async (parent, _, ctx) => {
      return ctx.courseInstanceMemberPeopleLoader.load(parent.id);
    },
  },
  TimeSlot: {
    attendance: async (parent, _, ctx) => {
      return ctx.timeSlotAttendanceLoader.load(parent.id);
    },
  },
  AttendanceData: {
    people: async (parent, _, ctx) => {
      return ctx.attendancePeopleLoader.load(parent.id);
    },
  },
};

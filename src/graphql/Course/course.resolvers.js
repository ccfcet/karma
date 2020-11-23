const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');
const {
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
} = require('./course.validation');
const { handleError } = require('../../lib/utils');

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
  Mutation: {
    createCourse: async (_, { course }) => {
      try {
        await createCourseSchema.validate(course, {
          abortEarly: false,
        });
        const [courseResult] = await connection(tableNames.course)
          .insert(course)
          .returning('*');
        return courseResult;
      } catch (err) {
        let errorCode = 'CREATE_COURSE_ERROR';
        return handleError(err, errorCode);
      }
    },
    updateCourse: async (_, { course }) => {
      try {
        await updateCourseSchema.validate(course, {
          abortEarly: false,
        });
        const courseID = course.id;
        delete course.id;
        const [courseResult] = await connection(tableNames.course)
          .where({ id: courseID })
          .update(course)
          .returning('*');
        return courseResult;
      } catch (err) {
        let errorCode = 'UPDATE_COURSE_ERROR';
        return handleError(err, errorCode);
      }
    },
    deleteCourse: async (_, { id }) => {
      try {
        await deleteCourseSchema.validate({ id }, { abortEarly: false });
        await connection(tableNames.course).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_COURSE_ERROR';
        return handleError(err, errorCode);
      }
    },
    createAcademicDuration: async (_, { academic_duration }) => {
      try {
        await createAcademicDurationSchema.validate(academic_duration, {
          abortEarly: false,
        });
        const [academicDurationResult] = await connection(
          tableNames.academic_duration
        )
          .insert(academic_duration)
          .returning('*');
        return academicDurationResult;
      } catch (err) {
        let errorCode = 'CREATE_ACADEMIC_DURATION_ERROR';
        return handleError(err, errorCode);
      }
    },
    updateAcademicDuration: async (_, { academic_duration }) => {
      try {
        await updateAcademicDurationSchema.validate(academic_duration, {
          abortEarly: false,
        });
        const academicDurationID = academic_duration.id;
        delete academic_duration.id;
        const [academicDurationResult] = await connection(
          tableNames.academic_duration
        )
          .where({ id: academicDurationID })
          .update(academic_duration)
          .returning('*');
        return academicDurationResult;
      } catch (err) {
        let errorCode = 'UPDATE_ACADEMIC_DURATION_ERROR';
        return handleError(err, errorCode);
      }
    },
    deleteAcademicDuration: async (_, { id }) => {
      try {
        await deleteAcademicDurationSchema.validate(
          { id },
          { abortEarly: false }
        );
        await connection(tableNames.academic_duration).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_ACADEMIC_DURATION_ERROR';
        return handleError(err, errorCode);
      }
    },
    createCourseInstance: async (_, { course_instance }) => {
      try {
        await createCourseInstanceSchema.validate(course_instance, {
          abortEarly: false,
        });
        const [courseInstanceResult] = await connection(
          tableNames.course_instance
        )
          .insert(course_instance)
          .returning('*');
        return courseInstanceResult;
      } catch (err) {
        let errorCode = 'CREATE_COURSE_INSTANCE_ERROR';
        return handleError(err, errorCode);
      }
    },
    updateCourseInstance: async (_, { course_instance }) => {
      try {
        await updateCourseInstanceSchema.validate(course_instance, {
          abortEarly: false,
        });
        const courseInstanceID = course_instance.id;
        delete course_instance.id;
        const [courseInstanceResult] = await connection(
          tableNames.course_instance
        )
          .where({ id: courseInstanceID })
          .update(course_instance)
          .returning('*');
        return courseInstanceResult;
      } catch (err) {
        let errorCode = 'UPDATE_COURSE_INSTANCE_ERROR';
        return handleError(err, errorCode);
      }
    },
    deleteCourseInstance: async (_, { id }) => {
      try {
        await deleteCourseInstanceSchema.validate(
          { id },
          { abortEarly: false }
        );
        await connection(tableNames.course_instance).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_COURSE_INSTANCE_ERROR';
        return handleError(err, errorCode);
      }
    },
    createTimeSlot: async (_, { time_slot }) => {
      try {
        await createTimeSlotSchema.validate(time_slot, {
          abortEarly: false,
        });
        const [timeSlotResult] = await connection(tableNames.time_slot)
          .insert(time_slot)
          .returning('*');
        return timeSlotResult;
      } catch (err) {
        let errorCode = 'CREATE_TIME_SLOT_ERROR';
        return handleError(err, errorCode);
      }
    },
    updateTimeSlot: async (_, { time_slot }) => {
      try {
        await updateTimeSlotSchema.validate(time_slot, {
          abortEarly: false,
        });
        const timeSlotID = time_slot.id;
        delete time_slot.id;
        const [timeSlotResult] = await connection(tableNames.time_slot)
          .where({ id: timeSlotID })
          .update(time_slot)
          .returning('*');
        return timeSlotResult;
      } catch (err) {
        let errorCode = 'UPDATE_TIME_SLOT_ERROR';
        return handleError(err, errorCode);
      }
    },
    deleteTimeSlot: async (_, { id }) => {
      try {
        await deleteTimeSlotSchema.validate({ id }, { abortEarly: false });
        await connection(tableNames.time_slot).where({ id }).delete();
        return {
          message: 'OK',
        };
      } catch (err) {
        let errorCode = 'DELETE_TIME_SLOT_ERROR';
        return handleError(err, errorCode);
      }
    },
  },
  MutateCourseResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'Course';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
  MutateAcademicDurationResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'AcademicDuration';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
  MutateCourseInstanceResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'CourseInstance';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
  MutateTimeSlotResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return 'TimeSlot';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
};

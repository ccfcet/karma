const connection = require('../../db/db');
const tableNames = require('../../constants/tableNames');
const {
  createCourseSchema,
  updateCourseSchema,
  deleteCourseSchema,
  // createCourseInstanceSchema,
  // updateCourseInstanceSchema,
  // deleteCourseInstanceSchema,
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
    // createEntity: async (_, { entity }) => {
    //   try {
    //     await createEntitySchema.validate(entity, {
    //       abortEarly: false,
    //     });
    //     const [entityResult] = await connection(tableNames.entity)
    //       .insert(entity)
    //       .returning('*');
    //     return entityResult;
    //   } catch (err) {
    //     let errorCode = 'CREATE_ENTITY_ERROR';
    //     return handleError(err, errorCode);
    //   }
    // },
    // updateEntity: async (_, { entity }) => {
    //   try {
    //     await updateEntitySchema.validate(entity, {
    //       abortEarly: false,
    //     });
    //     const entityID = entity.id;
    //     delete entity.id;
    //     const [entityResult] = await connection(tableNames.entity)
    //       .where({ id: entityID })
    //       .update(entity)
    //       .returning('*');
    //     return entityResult;
    //   } catch (err) {
    //     let errorCode = 'UPDATE_ENTITY_ERROR';
    //     return handleError(err, errorCode);
    //   }
    // },
    // deleteEntity: async (_, { id }) => {
    //   try {
    //     await deleteEntitySchema.validate({ id }, { abortEarly: false });
    //     await connection(tableNames.entity).where({ id }).delete();
    //     return {
    //       message: 'OK',
    //     };
    //   } catch (err) {
    //     let errorCode = 'DELETE_ENTITY_ERROR';
    //     return handleError(err, errorCode);
    //   }
    // },
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
  // MutateCourseInstanceResult: {
  //   __resolveType: (obj) => {
  //     if (obj.id) {
  //       return 'CourseInstance';
  //     }
  //     if (obj.fields) {
  //       return 'ValidationError';
  //     }
  //     return 'BaseError';
  //   },
  // },
};

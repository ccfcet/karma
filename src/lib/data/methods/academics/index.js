const Academics = {};

Academics.courses_offered = require('./courses_offered');
Academics.classesMethods = require('./classes');
Academics.classesTimeTablesMethods = require('./classes_time_tables');
Academics.streamTypesMethods = require('./stream_types');
Academics.streamsOfferedMethods = require('./streams_offered');
Academics.timeSlotsMethods = require('./time_slots');

module.exports = Academics;

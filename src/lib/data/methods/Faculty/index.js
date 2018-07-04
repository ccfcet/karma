const Faculty = {};

Faculty.obtainInformation = require('./obtainInformation');
Faculty
  .faculty_enrolment_activity = require('./faculty_enrolment_activity');
Faculty
  .faculty_advisory_activity = require('./faculty_advisory_activity');

module.exports = Faculty;

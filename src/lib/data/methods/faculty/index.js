const Faculty = {};

Faculty.obtainInformation = require('./obtainInformation');
Faculty
  .facultyMethods = require('./faculty_enrolment_activity');
Faculty
  .facultyClassAdvisoryMethods = require('./faculty_advisory_activity');

module.exports = Faculty;

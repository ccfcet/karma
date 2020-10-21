const tableNames = require('../../constants/tableNames');
const orderedTableNames = require('../../constants/orderedTableNames');

exports.seed = async (knex) => {
  await Promise.all(
    orderedTableNames.map((tableName) => knex(tableName).del())
  );

  const [createdNationality] = await knex(tableNames.nationality)
    .insert([
      {
        value: 'Indian',
      },
      {
        value: 'African',
      },
      {
        value: 'American',
      },
    ])
    .returning('*');

  const createdCountry = await knex(tableNames.country)
    .insert([
      {
        name: 'India',
        code: 'IND',
      },
      {
        name: 'United Arab Emirates',
        code: 'AE',
      },
    ])
    .returning('*');

  const [createdDataType] = await knex(tableNames.data_type)
    .insert([
      {
        value: 'Primary',
      },
      {
        value: 'Alternate',
      },
    ])
    .returning('*');

  const [createdState] = await knex(tableNames.state)
    .insert([
      {
        name: 'Kerala',
        code: 'KL',
        country_id: createdCountry[0].id,
      },
      {
        name: 'Dubai',
        code: 'DB',
        country_id: createdCountry[1].id,
      },
    ])
    .returning('*');

  const createdAddress = await knex(tableNames.address)
    .insert([
      {
        line_1: '"Jameelas", TKN WARD',
        line_2: 'Opp. United Tourist Home, Thalikkavu',
        city: 'Kannur',
        country_id: createdCountry[0].id,
        state_id: createdState.id,
        zipcode: '670001',
      },
      {
        line_1: 'Engineering College, Sreekaryam - Kulathoor Rd',
        line_2: 'P.O, Sreekariyam',
        city: 'Thiruvananthapuram',
        country_id: createdCountry[0].id,
        state_id: createdState.id,
        zipcode: '670001',
      },
    ])
    .returning('*');

  const [createdPeople] = await knex(tableNames.people)
    .insert([
      {
        first_name: 'Mohammed',
        middle_name: 'Rabeeh',
        last_name: 'Thufayil',
        gender: 'M',
        date_of_birth: new Date(1999, 0, 29),
        nationality_id: createdNationality.id,
      },
    ])
    .returning('*');

  await knex(tableNames.identifier).insert([
    {
      people_id: createdPeople.id,
      identifier: 'TVE18CS036',
    },
  ]);

  await knex(tableNames.people_address).insert([
    {
      people_id: createdPeople.id,
      address_id: createdAddress[0].id,
      data_type_id: createdDataType.id,
    },
  ]);

  await knex(tableNames.email).insert([
    {
      people_id: createdPeople.id,
      email: 'rabeeh@cet.ac.in',
      data_type_id: createdDataType.id,
    },
  ]);

  await knex(tableNames.auth).insert([
    {
      people_id: createdPeople.id,
      password_hash: 'wOWmUChSeCUrEPaSSworD',
    },
  ]);

  const createdEntityType = await knex(tableNames.entity_type)
    .insert([
      {
        value: 'College',
      },
      {
        value: 'Department',
      },
    ])
    .returning('*');

  const createdEntity = await knex(tableNames.entity)
    .insert([
      {
        name: 'College of Engineering Trivandrum',
        entity_type_id: createdEntityType[0].id,
      },
      {
        name: 'Computer Science and Engineering',
        entity_type_id: createdEntityType[1].id,
      },
    ])
    .returning('*');

  await knex(tableNames.entity_address).insert([
    {
      entity_id: createdEntity[0].id,
      address_id: createdAddress[1].id,
      data_type_id: createdDataType.id,
    },
  ]);

  await knex(tableNames.entity_parent_child).insert([
    {
      parent_id: createdEntity[0].id,
      child_id: createdEntity[1].id,
    },
  ]);

  const [createdCourse] = await knex(tableNames.course)
    .insert([
      {
        code: 'CS204',
        name: 'Operating Systems',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
    ])
    .returning('*');

  const [createdAcademicDuration] = await knex(tableNames.academic_duration)
    .insert([
      {
        name: 'Semester 4',
        start_date: new Date(2020, 2, 1),
        end_date: new Date(2020, 5, 31),
      },
    ])
    .returning('*');

  const [createdCourseInstance] = await knex(tableNames.course_instance)
    .insert([
      {
        course_id: createdCourse.id,
        tag: '2020-semester-4-os',
        academic_duration_id: createdAcademicDuration.id,
      },
    ])
    .returning('*');

  const createdRole = await knex(tableNames.role)
    .insert([
      {
        name: 'Student',
        tag: 'student-default',
      },
      {
        name: 'Principal',
        tag: 'principal-default',
      },
    ])
    .returning('*');

  await knex(tableNames.role_people_entity)
    .insert([
      {
        role_id: createdRole[1].id,
        people_id: createdPeople.id,
        entity_id: createdEntity[0].id,
      },
    ])
    .returning('*');

  await knex(tableNames.course_instance_association)
    .insert([
      {
        course_instance_id: createdCourseInstance.id,
        people_id: createdPeople.id,
        role_id: createdRole[0].id,
      },
    ])
    .returning('*');

  const [createdAttendanceData] = await knex(tableNames.attendance_data)
    .insert([
      {
        course_instance_id: createdCourseInstance.id,
        people_id: createdPeople.id,
        time: knex.fn.now(),
        value: 0,
      },
      {
        course_instance_id: createdCourseInstance.id,
        people_id: createdPeople.id,
        time: knex.fn.now(),
        value: 1,
      },
    ])
    .returning('*');

  console.log(createdAttendanceData);
};

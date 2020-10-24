const tableNames = require('../../constants/tableNames');
const orderedTableNames = require('../../constants/orderedTableNames');
/* eslint-disable node/no-unpublished-require */
const faker = require('faker');

const probability = (n) => {
  return Math.random() < n;
};

exports.seed = async (knex) => {
  await Promise.all(
    orderedTableNames.map((tableName) => knex(tableName).del())
  );

  const [createdNationality] = await knex(tableNames.nationality)
    .insert([
      {
        value: 'Indian',
      },
    ])
    .returning('*');

  const createdCountry = await knex(tableNames.country)
    .insert([
      {
        name: 'India',
        code: 'IND',
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
    },
  ]);

  await knex(tableNames.email).insert([
    {
      people_id: createdPeople.id,
      email_id: 'rabeeh@cet.ac.in',
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
      {
        value: 'Class',
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
      {
        name: 'S3 CS',
        entity_type_id: createdEntityType[2].id,
      },
      {
        name: 'S5 CS',
        entity_type_id: createdEntityType[2].id,
      },
    ])
    .returning('*');

  await knex(tableNames.entity_address).insert([
    {
      entity_id: createdEntity[0].id,
      address_id: createdAddress[1].id,
    },
  ]);

  await knex(tableNames.entity_parent_child).insert([
    {
      parent_id: createdEntity[0].id,
      child_id: createdEntity[1].id,
    },
    {
      parent_id: createdEntity[1].id,
      child_id: createdEntity[2].id,
    },
    {
      parent_id: createdEntity[1].id,
      child_id: createdEntity[3].id,
    },
  ]);

  const createdCourse = await knex(tableNames.course)
    .insert([
      {
        code: 'CS301',
        name: 'Theory of Computation',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS303',
        name: 'System Software',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS331',
        name: 'System Software Lab',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS305',
        name: 'Microprocessors and Microcontrollers',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS307',
        name: 'Data Communication',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS309',
        name: 'Graph Theory and Combinatorics',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS361',
        name: 'Soft Computing',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS333',
        name: 'Application Software Development Lab',
        entity_id: createdEntity[1].id,
        credits: 4,
      },
      {
        code: 'CS341',
        name: 'Design Project',
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

  const createdCourseInstance = await knex(tableNames.course_instance)
    .insert([
      {
        course_id: createdCourse[0].id,
        tag: '2020-semester-5-toc',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[1].id,
        tag: '2020-semester-5-ss',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[2].id,
        tag: '2020-semester-5-sslab',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[3].id,
        tag: '2020-semester-5-mp',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[4].id,
        tag: '2020-semester-5-dc',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[5].id,
        tag: '2020-semester-5-gt',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[6].id,
        tag: '2020-semester-5-sc',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[7].id,
        tag: '2020-semester-5-asdlab',
        academic_duration_id: createdAcademicDuration.id,
      },
      {
        course_id: createdCourse[8].id,
        tag: '2020-semester-5-dp',
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
        course_instance_id: createdCourseInstance[0].id,
        people_id: createdPeople.id,
        type: 0,
      },
    ])
    .returning('*');

  const [createdTimeSlot] = await knex(tableNames.time_slot)
    .insert([
      {
        course_instance_id: createdCourseInstance[0].id,
        start_time: knex.fn.now(),
        end_time: knex.fn.now(),
      },
    ])
    .returning('*');

  await knex(tableNames.attendance_data)
    .insert([
      {
        time_slot_id: createdTimeSlot.id,
        people_id: createdPeople.id,
        value: 0,
      },
      {
        time_slot_id: createdTimeSlot.id,
        people_id: createdPeople.id,
        value: 1,
      },
    ])
    .returning('*');

  for (let i = 0; i < 10; i += 1) {
    /* eslint-disable no-await-in-loop */
    const [Person] = await knex(tableNames.people)
      .insert([
        {
          first_name: faker.name.firstName(),
          middle_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          gender: probability(0.5) ? 'M' : 'F',
          date_of_birth: faker.date.past(),
          nationality_id: createdNationality.id,
        },
      ])
      .returning('*');
    let k = probability(0.75) ? 1 : 2;
    for (let j = 0; j < k; j += 1) {
      const [Address] = await knex(tableNames.address)
        .insert([
          {
            line_1: faker.address.streetName(),
            line_2: faker.address.streetAddress(),
            city: faker.address.city(),
            country_id: createdCountry[0].id,
            state_id: createdState.id,
            zipcode: faker.address.zipCode(),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),
          },
        ])
        .returning('*');

      await knex(tableNames.people_address).insert([
        {
          people_id: Person.id,
          address_id: Address.id,
        },
      ]);
      await knex(tableNames.email).insert([
        {
          people_id: Person.id,
          email_id: faker.internet.email(),
        },
      ]);
    }

    await knex(tableNames.identifier).insert([
      {
        people_id: Person.id,
        identifier: 'TVE18CS' + i,
      },
    ]);

    for (let j = 0; j < 9; j += 1) {
      await knex(tableNames.course_instance_association)
        .insert([
          {
            course_instance_id: createdCourseInstance[j].id,
            people_id: Person.id,
            type: probability(0.9) ? 0 : 1,
          },
        ])
        .returning('*');
    }
  }
};

-- It is assumed that database `karma` is already created by the user and all
-- the tables have been created within the database by sequelize.

-- create entity_type `college`
INSERT INTO `entity_types` (`id`, `entity_type`, `entity_type_slug`, `created_at`, `updated_at`) VALUES (NULL, 'College', 'college', CURRENT_TIME(), CURRENT_TIME());

-- create entity `College of Engineering Trivandrum
INSERT INTO `entities` (`id`, `entity_name`, `entity_slug`, `entity_type_id`, `created_at`, `updated_at`) VALUES (NULL, 'College of Engineering Trivandrum', 'cet', '1', CURRENT_TIME(), CURRENT_TIME());

-- create inital menu for `cet`
INSERT INTO `menu_data` (`id`, `entity_id`, `menu_type`, `menu_title`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', NULL, CURRENT_TIME(), CURRENT_TIME());

-- insert menu elements -- start
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'News', '/news', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'Events', '/events', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Academics', '/academics', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'Programmes', '/academics/programmes', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'Admissions', '/academics/admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Departments', '/academics/departments', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '4', 'People', '/academics/people', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '4', 'Research', '/research', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '5', 'Campus Life', '/campus_life', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'Fests', '/campus_life/fests', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'College Union', '/campus_life/college_union', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Clubs', '/campus_life/clubs', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '6', 'Facilities', '/facilities', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'Technical Library', '/facilities/technical_library', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'Placement Cell(CGPU)', '/facilities/placement_cell', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Central Computing Facility(CCF)', '/facilities/central_computing_facility', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '4', 'Bosch Rexroth', '/facilities/bosch_rexroth', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '5', 'Refrigerator and AC Maintenance Unit', '/facilities/refrigerator_and_ac_maintenance_unit', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '6', 'Centre for Continuing Education(CCE)', '/facilities/centre_for_continuing_education', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '7', 'Hostels', '/facilities/hostels', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '8', 'Guest House', '/facilities/guest_house', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '7', 'About', '/about', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '8', 'Search', '/search', CURRENT_TIME(), CURRENT_TIME());
-- insert menu elements -- end

-- insert parent child association of menu elements -- start
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '3', '4', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '3', '5', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '3', '6', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '3', '7', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '9', '10', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '9', '11', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '9', '12', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '14', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '15', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '16', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '17', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '18', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '19', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '20', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES (NULL, '13', '21', CURRENT_TIME(), CURRENT_TIME());
-- insert parent child association of menu elements -- end

-- insert about information slug
INSERT INTO `entity_information_slugs` (`id`, `slug_name`, `created_at`, `updated_at`) VALUES (NULL, 'about', CURRENT_TIME(), CURRENT_TIME());

-- insert academics_entities information slug
INSERT INTO `entity_information_slugs` (`id`, `slug_name`, `created_at`, `updated_at`) VALUES (NULL, 'academics_admissions', CURRENT_TIME(), CURRENT_TIME());

-- insert about information associated with `cet`
INSERT INTO `entity_information` (`id`, `entity_id`, `slug_id`, `data`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', '{\"data\": {\"heading\":  \"About\", \"beginning\": null, \"description\": \"hello\", \"mission\": \"buhaha\", \"vision\": \"heheh\"}}', CURRENT_TIME(), CURRENT_TIME());

-- insert academics_admissions information associated with `cet`
INSERT INTO `entity_information` (`id`, `entity_id`, `slug_id`, `data`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', '{\"title\": \"Admissions\", \"data\": \"College of Engineering Trivandrum(CET) offers degree programmes at the undergraduate (UG), postgraduate (PG) and doctorate (PhD) level. Besides offering programmes majorly in the streams of Engineering and Technology, the college also offers Architecture, Management and Computer Application programmes.  At the UG level, the BTech programmes are offered in the following specializations:      BTech in Civil Engineering     BTech in Electrical & electronics Engineering     BTech in Electronics & Communication Engineering     BTech in Applied Electronics & Instrumentation     BTech in Mechanical Engineering     BTech in Industrial  Engineering     BTech in Computer Science and Engineering  COE BTech Admission Minimum Eligibility Criteria 2018      Aspirants must have secured a minimum of 50% marks in PCM and 50% marks in Mathematics separately.     Aspirants must have passed Class 12th with Chemistry, Physics, Mathematics as mandatory subjects.     Besides the above, aspirants must also comply with the eligibility requirements of KEAM as admissions to BTech programmes at COE is based on this exam.  For more details of KEAM eligibility criteria, click the link above.  COE BTech Admission and Selection Process 2018  To secure admissions to BTech programmes at College of Engineering Trivandrum, aspirants must have qualified KEAM(Kerala Engineering, Architecture and Medical Entrance Exam) conducted by the Commissioner for Entrance Exams (CEE).\"}', CURRENT_TIME(), CURRENT_TIME());

--insert entity_type department
INSERT INTO `entity_types` (`id`, `entity_type`, `entity_type_slug`, `created_at`, `updated_at`) VALUES (2, 'Department', 'department', '2018-08-03 00:00:00', '2018-08-03 00:00:00');
--insert department
INSERT INTO `entities` (`id`, `entity_name`, `entity_slug`, `entity_type_id`, `created_at`, `updated_at`) VALUES (NULL, 'Department of Computer Science and Engineering', 'dcse', '2', CURRENT_DATE(), CURRENT_DATE());

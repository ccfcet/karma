-- It is assumed that database `karma` is already created by the user and all
-- the tables have been created within the database by sequelize.

-- create entity_type `college`
INSERT INTO `entity_types` (`id`, `entity_type`, `entity_type_slug`, `created_at`, `updated_at`) VALUES (NULL, 'College', 'college', CURRENT_TIME(), CURRENT_TIME());

-- create entity `College of Engineering Trivandrum
INSERT INTO `entities` (`id`, `entity_name`, `entity_slug`, `entity_type_id`, `created_at`, `updated_at`) VALUES (NULL, 'College of Engineering Trivandrum', 'cet', '1', CURRENT_TIME(), CURRENT_TIME());

-- create inital menu for `cet`
INSERT INTO `menu_data` (`id`, `entity_id`, `menu_type`, `menu_title`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', NULL, CURRENT_TIME(), CURRENT_TIME());

-- insert menu elements -- start
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'News', 'news', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'Events', 'events', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Academics', 'academics', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'Programmes', 'academics/programmes', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'Admissions', 'academics/admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Departments', 'academics/departments', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '4', 'People', 'academics/people', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '4', 'Research', 'research', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '5', 'Campus Life', 'campus_life', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'Fests', 'campus_life/fests', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'College Union', 'campus_life/college_union', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Clubs', 'campus_life/clubs', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '6', 'Facilities', 'facilities', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', 'Technical Library', 'facilities/technical_library', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', 'Placement Cell(CGPU)', 'facilities/placement_cell', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '3', 'Central Computing Facility(CCF)', 'facilities/central_computing_facility', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '4', 'Bosch Rexroth', 'facilities/bosch_rexroth', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '5', 'Refrigerator and AC Maintenance Unit', 'facilities/refrigerator_and_ac_maintenance_unit', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '6', 'Centre for Continuing Education(CCE)', 'facilities/centre_for_continuing_education', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '7', 'Hostels', 'facilities/hostels', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '8', 'Guest House', 'facilities/guest_house', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '7', 'About', 'about', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES (NULL, '1', '8', 'Search', 'search', CURRENT_TIME(), CURRENT_TIME());
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

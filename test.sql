-- insert menu elements
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'About', 'about', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'Leadership and Administration', 'administration', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Visitor Information', 'visitor_information', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Admissions', 'admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'Undergraduate Admissions', 'undergraduate_admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Graduate Admissions', 'graduate_admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '3', 'Academics', 'academics', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'Academic Programmes', 'academics/programmes', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Faculties', 'academics/faculties', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '3', 'Awards and Highlights', 'academics/awards_and_highlights', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '4', 'Facilities', 'academics/facilities', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '5', 'Library', 'academics/library', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '6', 'Academic Resources', 'academics/resources', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '4', 'Campus Life', 'campus_life', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '5', 'Research', 'research', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '1', 'Students', 'information/students', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '1', 'Communities and Groups', 'information/students/communities_and_groups', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '2', 'Faculty', 'information/faculty', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '3', 'Alumni', 'information/alumni', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '4', 'Employees', 'information/employees', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '5', 'Community', 'information/community', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '1', 'Neighbours and Non Profits', 'information/community/neighbours_and_non_profits', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '2', 'Parents', 'information/community/parents', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '2', '3', 'Conference and Event Services', 'information/community/conference_and_event_services', CURRENT_TIME(), CURRENT_TIME());

-- insert menuParentChildAssociations
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '3', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '4', '5', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '4', '6', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '7', '8', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '7', '9', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '7', '10', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '7', '11', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '7', '12', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '7', '13', CURRENT_TIME(), CURRENT_TIME());

INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '16', '17', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '21', '22', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '21', '23', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '21', '24', CURRENT_TIME(), CURRENT_TIME());

-- insert menu elements
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'About', 'about', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'Leadership and Administration', 'administration', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Visitor Information', 'visitor_information', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Admissions', 'admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '1', 'Undergraduate Admissions', 'undergraduate_admissions', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', 'Graduate Admissions', 'graduate_admissions', CURRENT_TIME(), CURRENT_TIME());

-- insert menuParentChildAssociations
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '2', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '1', '3', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '4', '5', CURRENT_TIME(), CURRENT_TIME());
INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `createdAt`, `updatedAt`) VALUES (NULL, '4', '6', CURRENT_TIME(), CURRENT_TIME());

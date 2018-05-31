-- insert menu elements
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '1', 'About', 'about', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '1', 'Leadership and Administration', 'administration', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '2', 'Visitor Information', 'visitor_information', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '2', 'Admissions', 'admissions', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '1', 'Undergraduate Admissions', 'undergraduate_admissions', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '2', 'Graduate Admissions', 'graduate_admissions', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '3', 'Academics', 'academics', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '1', 'Academic Programmes', 'academics/programmes', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '2', 'Faculties', 'academics/faculties', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '3', 'Awards and Highlights', 'academics/awards_and_highlights', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '4', 'Facilities', 'academics/facilities', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '5', 'Library', 'academics/library', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '6', 'Academic Resources', 'academics/resources', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '4', 'Campus Life', 'campus_life', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '1', '5', 'Research', 'research', NOW(), NOW());

INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '1', 'Students', 'information/students', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '1', 'Communities and Groups', 'information/students/communities_and_groups', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '2', 'Faculty', 'information/faculty', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '3', 'Alumni', 'information/alumni', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '4', 'Employees', 'information/employees', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '5', 'Community', 'information/community', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '1', 'Neighbours and Non Profits', 'information/community/neighbours_and_non_profits', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '2', 'Parents', 'information/community/parents', NOW(), NOW());
INSERT INTO "menu_elements" ("id", "menu_id", "position", "item_name", "item_url", "createdAt", "updatedAt") VALUES (NULL, '2', '3', 'Conference and Event Services', 'information/community/conference_and_event_services', NOW(), NOW());

-- insert menuParentChildAssociations
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '1', '2', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '1', '3', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '4', '5', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '4', '6', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '7', '8', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '7', '9', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '7', '10', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '7', '11', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '7', '12', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '7', '13', NOW(), NOW());

INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '16', '17', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '21', '22', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '21', '23', NOW(), NOW());
INSERT INTO "menu_parent_child_associations" ("id", "parent_id", "child_id", "createdAt", "updatedAt") VALUES (NULL, '21', '24', NOW(), NOW());

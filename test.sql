--
-- Dumping data for table `entity_types`
--

INSERT INTO `entity_types` (`id`, `entity_type`, `entity_type_slug`, `created_at`, `updated_at`) VALUES
(1, 'College', 'college', '2018-08-03 13:45:18', '2018-08-03 13:45:18'),
(2, 'Department', 'department', '2018-08-03 00:00:00', '2018-08-03 00:00:00');

-- --------------------------------------------------------

--
-- Dumping data for table `entities`
--

INSERT INTO `entities` (`id`, `entity_name`, `entity_slug`, `entity_type_id`, `created_at`, `updated_at`) VALUES
(1, 'College of Engineering Trivandrum', 'cet', 1, '2018-08-03 13:45:18', '2018-08-03 13:45:18'),
(2, 'Department of Computer Science and Engineering', 'dcse', 2, '2018-08-03 00:00:00', '2018-08-03 00:00:00');

-- --------------------------------------------------------

INSERT INTO `entity_information_slugs` (`id`, `slug_name`, `created_at`, `updated_at`) VALUES
(1, 'academics_admissions', '2018-08-03 13:45:23', '2018-08-03 13:45:23'),
(2, 'administration', '2018-08-07 13:39:42', '2018-08-07 13:39:42'),
(3, 'about', '2018-08-07 17:51:23', '2018-08-07 17:51:23');

-- --------------------------------------------------------

--
-- Dumping data for table `entity_information`
--

INSERT INTO `entity_information` (`id`, `entity_id`, `slug_id`, `data`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '{\"data\": \"College of Engineering Trivandrum(CET) offers degree programmes at the undergraduate (UG), postgraduate (PG) and doctorate (PhD) level. Besides offering programmes majorly in the streams of Engineering and Technology, the college also offers Architecture, Management and Computer Application programmes.  At the UG level, the BTech programmes are offered in the following specializations:      BTech in Civil Engineering     BTech in Electrical & electronics Engineering     BTech in Electronics & Communication Engineering     BTech in Applied Electronics & Instrumentation     BTech in Mechanical Engineering     BTech in Industrial  Engineering     BTech in Computer Science and Engineering  COE BTech Admission Minimum Eligibility Criteria 2018      Aspirants must have secured a minimum of 50% marks in PCM and 50% marks in Mathematics separately.     Aspirants must have passed Class 12th with Chemistry, Physics, Mathematics as mandatory subjects.     Besides the above, aspirants must also comply with the eligibility requirements of KEAM as admissions to BTech programmes at COE is based on this exam.  For more details of KEAM eligibility criteria, click the link above.  COE BTech Admission and Selection Process 2018  To secure admissions to BTech programmes at College of Engineering Trivandrum, aspirants must have qualified KEAM(Kerala Engineering, Architecture and Medical Entrance Exam) conducted by the Commissioner for Entrance Exams (CEE).\", \"title\": \"Admissions\"}', '2018-08-03 13:45:23', '2018-08-03 13:45:23'),
(2, 1, 2, '{\"rti\": {\"links\": [{\"url\": \"#\", \"title\": \"Appellate Authority\"}, {\"url\": \"#\", \"title\": \"Assistant Public Information Officer\"}, {\"url\": \"#\", \"title\": \"Public Information Officer\"}, {\"url\": \"#\", \"title\": \"Office of the Evening Courses\"}], \"title\": \"Right to Information\", \"description\": \"\"}, \"heading\": \"Administration\", \"offices\": {\"links\": [{\"url\": \"#\", \"title\": \"College Office\"}, {\"url\": \"#\", \"title\": \"Hostel Office\"}, {\"url\": \"#\", \"title\": \"Technical Documentation Center\"}, {\"url\": \"#\", \"title\": \"Office of the Evening Courses\"}], \"title\": \"Administrative Offices\", \"description\": \"College of Engineering Trivandrums administrative offices are essential to supporting the operations and mission of the college. They deal with a diverse range of issues including human resources, financial activities, research administration and student affairs.\"}, \"governance\": {\"links\": [{\"url\": \"#\", \"title\": \"Office of the Principal\"}, {\"url\": \"#\", \"title\": \"Office of the UG Dean\"}, {\"url\": \"#\", \"title\": \"Office of the PG Dean\"}, {\"url\": \"#\", \"title\": \"Office of the Research Dean\"}], \"title\": \"Governance\", \"description\": \"College of Engineering Trivandrum is led by the Principal, Deans and the College Council.\"}}', '2018-08-07 00:00:00', '2018-08-07 13:41:53'),
(3, 1, 3, '{\"vision\": \"To facilitate Quality Engineering Education to Equip and Enrich Young Men and Women to Meet Global challenges in Development, Innovation and Application of Technology in the service of Humanity.\", \"heading\": \"About CET\", \"mission\": \"National Level Excellence and International Visibility in every facet of Engineering Education.\", \"beginning\": \"The College of Engineering, Trivandrum was established in 1939 as the first Engineering College in the then Travancore State. The first classes were started on 3rd July 1939 during the reign of the Travancore King, Sri Chithira Thirunal Balarama Varma and as the head of the then Travancore state he deserves his share of credit in the establishment of the college. Initially the College was housed in the former office and bungalow of the Chief Engineer (present PMG Office). Maj T.H. Mathewman, a Britisher was the first Principal. Started as a constituent College of Travancore University, the College had an initial intake of 21 students each for Degree and Diploma courses in Civil, Mechanical and Electrical branches. With the establishment of the Directorate of Technical Education in the late fifties, the College administration came under the control of the Government of Kerala. The College was shifted to the present sprawling 125 acres in 1980.\", \"description\": \"A place for learning, discovery, innovation, expression and discourse\"}', '2018-08-07 17:58:51', '2018-08-07 17:58:51');

-- --------------------------------------------------------

--
-- Dumping data for table `menu_data`
--

INSERT INTO `menu_data` (`id`, `entity_id`, `menu_type`, `menu_title`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, '2018-08-03 13:45:18', '2018-08-03 13:45:18');

-- --------------------------------------------------------

--
-- Dumping data for table `menu_elements`
--

INSERT INTO `menu_elements` (`id`, `menu_id`, `position`, `item_name`, `item_url`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'News', '/news', '2018-08-03 13:45:18', '2018-08-03 13:45:18'),
(2, 1, 2, 'Events', '/events', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(3, 1, 3, 'Academics', '/academics', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(4, 1, 1, 'Programmes', '/academics/programmes', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(5, 1, 2, 'Admissions', '/academics/admissions', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(6, 1, 3, 'Departments', '/academics/departments', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(7, 1, 4, 'People', '/academics/people', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(8, 1, 4, 'Research', '/research', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(9, 1, 5, 'Campus Life', '/campus_life', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(10, 1, 1, 'Fests', '/campus_life/fests', '2018-08-03 13:45:19', '2018-08-03 13:45:19'),
(11, 1, 2, 'College Union', '/campus_life/college_union', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(12, 1, 3, 'Clubs', '/campus_life/clubs', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(13, 1, 6, 'Facilities', '/facilities', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(14, 1, 1, 'Technical Library', '/facilities/technical_library', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(15, 1, 2, 'Placement Cell(CGPU)', '/facilities/placement_cell', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(16, 1, 3, 'Central Computing Facility(CCF)', '/facilities/central_computing_facility', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(17, 1, 4, 'Bosch Rexroth', '/facilities/bosch_rexroth', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(18, 1, 5, 'Refrigerator and AC Maintenance Unit', '/facilities/refrigerator_and_ac_maintenance_unit', '2018-08-03 13:45:20', '2018-08-03 13:45:20'),
(19, 1, 6, 'Centre for Continuing Education(CCE)', '/facilities/centre_for_continuing_education', '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(20, 1, 7, 'Hostels', '/facilities/hostels', '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(21, 1, 8, 'Guest House', '/facilities/guest_house', '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(22, 1, 7, 'About', '/about', '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(23, 1, 8, 'Search', '/search', '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(24, 1, 1, 'College', '/about/college', '2018-08-07 13:30:29', '2018-08-07 13:30:29'),
(25, 1, 2, 'Administration', '/about/administration', '2018-08-07 13:31:02', '2018-08-07 13:31:02');

-- --------------------------------------------------------

--
-- Dumping data for table `menu_parent_child_associations`
--

INSERT INTO `menu_parent_child_associations` (`id`, `parent_id`, `child_id`, `created_at`, `updated_at`) VALUES
(1, 3, 4, '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(2, 3, 5, '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(3, 3, 6, '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(4, 3, 7, '2018-08-03 13:45:21', '2018-08-03 13:45:21'),
(5, 9, 10, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(6, 9, 11, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(7, 9, 12, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(8, 13, 14, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(9, 13, 15, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(10, 13, 16, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(11, 13, 17, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(12, 13, 18, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(13, 13, 19, '2018-08-03 13:45:22', '2018-08-03 13:45:22'),
(14, 13, 20, '2018-08-03 13:45:23', '2018-08-03 13:45:23'),
(15, 13, 21, '2018-08-03 13:45:23', '2018-08-03 13:45:23'),
(16, 22, 24, '2018-08-07 13:32:22', '2018-08-07 13:32:22'),
(17, 22, 25, '2018-08-07 13:32:59', '2018-08-07 13:32:59');

-- --------------------------------------------------------

--
-- Dumping data for table `news_data`
--

INSERT INTO `news_data` (`id`, `title`, `text`, `created_at`, `updated_at`) VALUES
(1, 'Govt appoints 2 members to CBDT after five months of positions lying vacant ', 'Almost after five months of vacancies in the Central Board of Direct Taxes (CBDT), the government on Monday appointed two members, Aditya Vikram, IRS (IT) 1981 batch & Pramod Chandra Mody, IRS (IT) 1982 batch, as members in the apex body. ', '2018-08-04 14:51:35', '2018-08-04 14:51:35'),
(2, ' Cab-hailing firm Ola to launch in the UK ', ' Indian ride-hailing firm Ola said on Tuesday it plans to launch services in the United Kingdom this year, months after it expanded its operations in Australia, in an ongoing turf war with rival Uber Technologies.', '2018-08-04 15:55:38', '2018-08-04 15:55:38'),
(3, 'Dotslash 2019', 'Dotslash 2019 will be conducted on February 18 - 19', '2018-08-04 15:56:14', '2018-08-04 15:56:14'),
(4, 'RBI must resume issuing LoUs, LoCs, says parliamentary panel ', 'The Reserve Bank of India’s decision to discontinue the issuance of Letters of Undertaking (LoU) and Letters of Credit (LoC) for trade credit was a “knee-jerk reaction” to the Punjab National Bank fraud case and the facility should be restored at the earliest, the Parliamentary Standing Committee on Commerce said in a report tabled in the Rajya Sabha on Monday.', '2018-08-07 12:50:34', '2018-08-07 12:50:34');

-- --------------------------------------------------------

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `news_id`, `entity_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2018-08-04 14:51:35', '2018-08-04 14:51:35'),
(2, 2, 1, '2018-08-04 15:55:38', '2018-08-04 15:55:38'),
(3, 3, 2, '2018-08-04 15:56:15', '2018-08-04 15:56:15'),
(4, 4, 1, '2018-08-07 12:51:04', '2018-08-07 12:51:04');

-- --------------------------------------------------------

--
-- Dumping data for table `stream_types`
--

INSERT INTO `stream_types` (`id`, `stream_type_long`, `stream_type_short`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'Bachelor of Technology', 'B.Tech', '1997-01-01 00:00:00', '1998-01-01 00:00:00', '2018-08-04 00:51:52', '2018-08-04 01:00:38'),
(2, 'Master of Technology', 'M.Tech', '1997-01-01 00:00:00', '1998-01-01 00:00:00', '2018-08-04 00:54:43', '2018-08-04 01:00:51');

-- --------------------------------------------------------

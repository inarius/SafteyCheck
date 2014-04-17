-- SELECTS

--usage data
select * from app_session
select c.code, c.descrip, lr.* from location_check_round lr
join category_entries c on c.category_nbr = location_category
select c.code, c.descrip, lc.* from location_check lc
join code_entries c on c.code_nbr = location_code

--foundation data
select * from category_entries where table_code = 'WFLOC'
select * from code_entries where table_code = 'WFLOC'
select * from barcode

/*
-- INSERTS (data has already been inserted)

--OLD TABLES
--truncate table probation.dbo.location_check_round_type
--INSERT INTO probation.dbo.location_check_round_type
--VALUES ('WF', 340, 'WF Males', 'Male rooms at Work Furlough', getdate(), null)
--INSERT INTO probation.dbo.location_check_round_type
--VALUES ('WF', 339, 'WF Females', 'Female rooms at Work Furlough', getdate(), null)
--
--truncate table probation.dbo.location_round_type_assoc
--INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9001, 1, getdate(), null)
--INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9002, 2, getdate(), null)
--INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9003, 3, getdate(), null)
--INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9004, 4, getdate(), null)
--INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9005, 5, getdate(), null)

-- Code entries
INSERT INTO probation.dbo.code_mstr VALUES ('WFLOC', 2, 'Work Furlough Locations')

INSERT INTO probation.dbo.category_entries VALUES (99991, 'WFLOC', 'WF Male', null, null, getdate(), 'Work Furlough male round')
INSERT INTO probation.dbo.category_entries VALUES (99992, 'WFLOC', 'WF Female', null, null, getdate(), 'Work Furlough female round')
INSERT INTO probation.dbo.category_entries VALUES (99993, 'WFLOC', 'WF Night', null, null, getdate(), 'Work Furlough night round')

INSERT INTO probation.dbo.code_entries VALUES (99901, 'WFLOC', '101', null, null, getdate(), 'Room 101')
INSERT INTO probation.dbo.code_entries VALUES (99902, 'WFLOC', '102', null, null, getdate(), 'Room 102')
INSERT INTO probation.dbo.code_entries VALUES (99903, 'WFLOC', 'FTV', null, null, getdate(), 'Female TV')
INSERT INTO probation.dbo.code_entries VALUES (99904, 'WFLOC', '201', null, null, getdate(), 'Room 201')
INSERT INTO probation.dbo.code_entries VALUES (99905, 'WFLOC', '202', null, null, getdate(), 'Room 202')
INSERT INTO probation.dbo.code_entries VALUES (99906, 'WFLOC', 'MLaundry', null, null, getdate(), 'Male Laundry')
INSERT INTO probation.dbo.code_entries VALUES (99907, 'WFLOC', 'MCanteen', null, null, getdate(), 'Male Canteen')

INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99901, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99902, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99903, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99904, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99905, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99906, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99907, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99901, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99902, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99903, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99904, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99905, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99906, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99907, null, null, getdate())

-- Application tables
--truncate table probation.dbo.app_session
INSERT INTO probation.dbo.app_session
VALUES ('VCPASafetyCk', '### token ###', '04/09/2014 08:04AM', '04/09/2014 08:05AM', '04/09/2014 08:07AM', 0, 5248, null)
INSERT INTO probation.dbo.app_session
VALUES ('VCPASafetyCk', '### token ###', '04/09/2014 08:07AM', '04/09/2014 08:26AM', '04/09/2014 08:26AM', 0, 5248, null)
INSERT INTO probation.dbo.app_session
VALUES ('VCPASafetyCk', '### token ###', '04/09/2014 08:30AM', '04/09/2014 08:43AM', '04/09/2014 08:43AM', 0, 5248, null)
INSERT INTO probation.dbo.app_session
VALUES ('VCPASafetyCk', '### token ###', '04/09/2014 09:03AM', '04/09/2014 09:10AM', '04/09/2014 09:15AM', 1, 5248, null)
INSERT INTO probation.dbo.app_session
VALUES ('VCPASafetyCk', '### token ###', '04/09/2014 09:23AM', '04/09/2014 09:35AM', '04/09/2014 09:35AM', 0, 5248, null)
INSERT INTO probation.dbo.app_session
VALUES ('VCPASafetyCk', '### token ###', '04/09/2014 09:40AM', '04/09/2014 09:41AM', null, 0, 5248, null)

--truncate table probation.dbo.location_check_round
INSERT INTO probation.dbo.location_check_round VALUES (5248, 10, 99991, '04/09/2014 08:05AM', '04/09/2014 08:26AM')
INSERT INTO probation.dbo.location_check_round VALUES (5248, 11, 99991, '04/09/2014 08:30AM', '04/09/2014 08:43AM')
INSERT INTO probation.dbo.location_check_round VALUES (5248, 12, 99991, '04/09/2014 9:05PM', null)
INSERT INTO probation.dbo.location_check_round VALUES (5248, 13, 99991, '04/09/2014 9:23AM', '04/09/2014 9:35AM')
INSERT INTO probation.dbo.location_check_round VALUES (5248, 14, 99991, '04/09/2014 9:40AM', null)

--truncate table probation.dbo.location_check
INSERT INTO probation.dbo.location_check VALUES (1, 99903, '04/09/2014 08:05AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 99904, '04/09/2014 08:10AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 99905, '04/09/2014 08:15AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 99906, '04/09/2014 08:20AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 99907, '04/09/2014 08:25AM', 'Soda machine front casing is cracked', null)
INSERT INTO probation.dbo.location_check VALUES (3, 99903, '04/09/2014 09:05AM', 'James was in the wrong room', '04/09/2014 09:11AM')
INSERT INTO probation.dbo.location_check VALUES (3, 99904, '04/09/2014 09:10AM', null, null)

-- PLEASE DO NOT reinsert user barcode data

--user barcodes
--insert into barcode 
--values(getdate(), NULL, NULL, NULL, 20198, hashbytes('sha1', '1234567890'), getdate(), NULL)
--insert into barcode
--values(getdate(), NULL, NULL, NULL, 5248, hashbytes('sha1', '1234567890'), getdate(), NULL)

--location barcodes
insert into barcode 
values(getdate(), NULL, 9001, 'https://probation.co.ventura.ca.us/id/location/9001', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9002, 'https://probation.co.ventura.ca.us/id/location/9002', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9003, 'https://probation.co.ventura.ca.us/id/location/9003', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9004, 'https://probation.co.ventura.ca.us/id/location/9004', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9005, 'https://probation.co.ventura.ca.us/id/location/9005', null, null, getdate(), NULL)


*/
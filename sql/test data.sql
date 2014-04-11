-- SELECTS

--usage data
select * from app_session
select * from location_check_round
select * from location_check

--foundation data
select * from location_check_round_type
select * from location_round_type_assoc
join code_entries c on c.code_nbr = location_code
select * from barcode

/*
-- INSERTS (data has already been inserted)

--truncate table probation.dbo.location_check_round_type
INSERT INTO probation.dbo.location_check_round_type
VALUES ('WF', 340, 'WF Males', 'Male rooms at Work Furlough', getdate(), null)
INSERT INTO probation.dbo.location_check_round_type
VALUES ('WF', 339, 'WF Females', 'Female rooms at Work Furlough', getdate(), null)

INSERT INTO probation.dbo.code_entries VALUES (9001, 'WFLOC', 'M101', null, null, getdate(), 'Men''s Room 101')
INSERT INTO probation.dbo.code_entries VALUES (9002, 'WFLOC', 'M102', null, null, getdate(), 'Men''s Room 102')
INSERT INTO probation.dbo.code_entries VALUES (9003, 'WFLOC', 'M103', null, null, getdate(), 'Men''s Room 103')
INSERT INTO probation.dbo.code_entries VALUES (9004, 'WFLOC', 'M104', null, null, getdate(), 'Men''s Laundry')
INSERT INTO probation.dbo.code_entries VALUES (9005, 'WFLOC', 'M105', null, null, getdate(), 'Men''s Canteen')

--truncate table probation.dbo.location_round_type_assoc
INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9001, 1, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9002, 2, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9003, 3, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9004, 4, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (1, 9005, 5, getdate(), null)

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
INSERT INTO probation.dbo.location_check_round VALUES (5248, 10, 'WF', 1, '04/09/2014 08:05AM', '04/09/2014 08:26AM')
INSERT INTO probation.dbo.location_check_round VALUES (5248, 11, 'WF', 2, '04/09/2014 08:30AM', '04/09/2014 08:43AM')
INSERT INTO probation.dbo.location_check_round VALUES (5248, 12, 'WF', 1, '04/09/2014 9:05PM', null)
INSERT INTO probation.dbo.location_check_round VALUES (5248, 13, 'WF', 2, '04/09/2014 9:23AM', '04/09/2014 9:35AM')
INSERT INTO probation.dbo.location_check_round VALUES (5248, 14, 'WF', 1, '04/09/2014 9:40AM', null)

--truncate table probation.dbo.location_check
INSERT INTO probation.dbo.location_check VALUES (1, 9001, '04/09/2014 08:05AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 9002, '04/09/2014 08:10AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 9003, '04/09/2014 08:15AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 9004, '04/09/2014 08:20AM', null, null)
INSERT INTO probation.dbo.location_check VALUES (1, 9005, '04/09/2014 08:25AM', 'Soda machine front casing is cracked', null)
INSERT INTO probation.dbo.location_check VALUES (3, 9001, '04/09/2014 09:05AM', 'James was in the wrong room', '04/09/2014 09:11AM')
INSERT INTO probation.dbo.location_check VALUES (3, 9002, '04/09/2014 09:10AM', null, null)

-- PLEASE DO NOT reinsert user barcode data

--user barcodes
--insert into barcode 
--values(getdate(), NULL, NULL, NULL, 20198, hashbytes('sha1', '1234567890'), getdate(), NULL)
--insert into barcode
--values(getdate(), NULL, NULL, NULL, 5248, hashbytes('sha1', '1234567890'), getdate(), NULL)

--location barcodes
insert into barcode 
values(getdate(), NULL, 9001, 'https://probation.co.ventura.ca.us/id/lcation/WF/9001', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9002, 'https://probation.co.ventura.ca.us/id/lcation/WF/9002', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9003, 'https://probation.co.ventura.ca.us/id/lcation/WF/9003', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9004, 'https://probation.co.ventura.ca.us/id/lcation/WF/9004', null, null, getdate(), NULL)
insert into barcode 
values(getdate(), NULL, 9005, 'https://probation.co.ventura.ca.us/id/lcation/WF/9005', null, null, getdate(), NULL)


*/
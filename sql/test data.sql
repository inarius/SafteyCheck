select * from location_check_round_type
select * from location_round_type_assoc
join code_entries c on c.code_nbr = location_code

--truncate table probation.dbo.location_check_round_type
--truncate table probation.dbo.location_round_type_assoc
INSERT INTO probation.dbo.location_check_round_type
VALUES ('WF', 'M', 'WF Males', 'Male rooms at Work Furlough', '4/2/2014', null)
INSERT INTO probation.dbo.location_check_round_type
VALUES ('WF', 'F', 'WF Females', 'Female rooms at Work Furlough', '4/2/2014', null)

--truncate table probation.dbo.location_round_type_assoc
INSERT INTO probation.dbo.location_round_type_assoc VALUES (4, 9001, 1, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (4, 9002, 2, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (4, 9003, 3, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (4, 9004, 4, getdate(), null)
INSERT INTO probation.dbo.location_round_type_assoc VALUES (4, 9005, 5, getdate(), null)


INSERT INTO probation.dbo.code_entries VALUES (9001, 'WFLOC', 'M101', null, null, getdate(), 'Men''s Room 101')
INSERT INTO probation.dbo.code_entries VALUES (9002, 'WFLOC', 'M102', null, null, getdate(), 'Men''s Room 102')
INSERT INTO probation.dbo.code_entries VALUES (9003, 'WFLOC', 'M103', null, null, getdate(), 'Men''s Room 103')
INSERT INTO probation.dbo.code_entries VALUES (9004, 'WFLOC', 'M104', null, null, getdate(), 'Men''s Laundry')
INSERT INTO probation.dbo.code_entries VALUES (9005, 'WFLOC', 'M105', null, null, getdate(), 'Men''s Canteen')

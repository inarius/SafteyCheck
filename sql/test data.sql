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

-- Code entries
INSERT INTO probation.dbo.code_mstr VALUES ('WFLOC', 2, 'Work Furlough Locations')

-- Categories
INSERT INTO probation.dbo.category_entries VALUES (99991, 'WFLOC', 'WF males', null, null, getdate(), 'Work Furlough male round')
INSERT INTO probation.dbo.category_entries VALUES (99992, 'WFLOC', 'WF females', null, null, getdate(), 'Work Furlough female round')
INSERT INTO probation.dbo.category_entries VALUES (99993, 'WFLOC', 'WF night', null, null, getdate(), 'Work Furlough night round')

-- Codes (the following will get overwritten in UT every night)
INSERT INTO probation.dbo.code_entries VALUES (99901, 'WFLOC', '101', null, null, getdate(), 'Room 101')
INSERT INTO probation.dbo.code_entries VALUES (99902, 'WFLOC', '102', null, null, getdate(), 'Room 102')
INSERT INTO probation.dbo.code_entries VALUES (99903, 'WFLOC', '103', null, null, getdate(), 'Room 103')
INSERT INTO probation.dbo.code_entries VALUES (99904, 'WFLOC', '104', null, null, getdate(), 'Room 104')
INSERT INTO probation.dbo.code_entries VALUES (99905, 'WFLOC', '105', null, null, getdate(), 'Room 105')
INSERT INTO probation.dbo.code_entries VALUES (99906, 'WFLOC', '106', null, null, getdate(), 'Room 106')
INSERT INTO probation.dbo.code_entries VALUES (99907, 'WFLOC', '107', null, null, getdate(), 'Room 107')
INSERT INTO probation.dbo.code_entries VALUES (99908, 'WFLOC', '108', null, null, getdate(), 'Room 108')
INSERT INTO probation.dbo.code_entries VALUES (99909, 'WFLOC', 'FTV', null, null, getdate(), 'Female TV')
INSERT INTO probation.dbo.code_entries VALUES (99910, 'WFLOC', 'FLaundry', null, null, getdate(), 'Female laundry')
INSERT INTO probation.dbo.code_entries VALUES (99911, 'WFLOC', 'FPatio', null, null, getdate(), 'Female patio')
INSERT INTO probation.dbo.code_entries VALUES (99912, 'WFLOC', '201', null, null, getdate(), 'Room 201')
INSERT INTO probation.dbo.code_entries VALUES (99913, 'WFLOC', '202', null, null, getdate(), 'Room 202')
INSERT INTO probation.dbo.code_entries VALUES (99914, 'WFLOC', '203', null, null, getdate(), 'Room 203')
INSERT INTO probation.dbo.code_entries VALUES (99915, 'WFLOC', '204', null, null, getdate(), 'Room 204')
INSERT INTO probation.dbo.code_entries VALUES (99916, 'WFLOC', '205', null, null, getdate(), 'Room 205')
INSERT INTO probation.dbo.code_entries VALUES (99917, 'WFLOC', '206', null, null, getdate(), 'Room 206')
INSERT INTO probation.dbo.code_entries VALUES (99918, 'WFLOC', '207', null, null, getdate(), 'Room 207')
INSERT INTO probation.dbo.code_entries VALUES (99919, 'WFLOC', '208', null, null, getdate(), 'Room 208')
INSERT INTO probation.dbo.code_entries VALUES (99920, 'WFLOC', 'MLaundry', null, null, getdate(), 'Male laundry')
INSERT INTO probation.dbo.code_entries VALUES (99921, 'WFLOC', 'EnglishTV', null, null, getdate(), 'English TV')
INSERT INTO probation.dbo.code_entries VALUES (99922, 'WFLOC', 'SpanishTV', null, null, getdate(), 'Spanish TV')
INSERT INTO probation.dbo.code_entries VALUES (99923, 'WFLOC', '215', null, null, getdate(), 'Room 215')
INSERT INTO probation.dbo.code_entries VALUES (99924, 'WFLOC', '216', null, null, getdate(), 'Room 216')
INSERT INTO probation.dbo.code_entries VALUES (99925, 'WFLOC', '217', null, null, getdate(), 'Room 217')
INSERT INTO probation.dbo.code_entries VALUES (99926, 'WFLOC', '218', null, null, getdate(), 'Room 218')
INSERT INTO probation.dbo.code_entries VALUES (99927, 'WFLOC', '219', null, null, getdate(), 'Room 219')
INSERT INTO probation.dbo.code_entries VALUES (99928, 'WFLOC', '220', null, null, getdate(), 'Room 220')
INSERT INTO probation.dbo.code_entries VALUES (99929, 'WFLOC', '221', null, null, getdate(), 'Room 221')
INSERT INTO probation.dbo.code_entries VALUES (99930, 'WFLOC', '222', null, null, getdate(), 'Room 222')
INSERT INTO probation.dbo.code_entries VALUES (99931, 'WFLOC', '223', null, null, getdate(), 'Room 223')
INSERT INTO probation.dbo.code_entries VALUES (99932, 'WFLOC', '224', null, null, getdate(), 'Room 224')
INSERT INTO probation.dbo.code_entries VALUES (99933, 'WFLOC', '225', null, null, getdate(), 'Room 225')
INSERT INTO probation.dbo.code_entries VALUES (99934, 'WFLOC', '226', null, null, getdate(), 'Room 226')
INSERT INTO probation.dbo.code_entries VALUES (99935, 'WFLOC', '227', null, null, getdate(), 'Room 227')
INSERT INTO probation.dbo.code_entries VALUES (99936, 'WFLOC', '228', null, null, getdate(), 'Room 228')
INSERT INTO probation.dbo.code_entries VALUES (99937, 'WFLOC', '229', null, null, getdate(), 'Room 229')
INSERT INTO probation.dbo.code_entries VALUES (99938, 'WFLOC', '230', null, null, getdate(), 'Room 230')
INSERT INTO probation.dbo.code_entries VALUES (99939, 'WFLOC', '231', null, null, getdate(), 'Room 231')
INSERT INTO probation.dbo.code_entries VALUES (99940, 'WFLOC', '232', null, null, getdate(), 'Room 232')
INSERT INTO probation.dbo.code_entries VALUES (99941, 'WFLOC', '233', null, null, getdate(), 'Room 233')
INSERT INTO probation.dbo.code_entries VALUES (99942, 'WFLOC', '234', null, null, getdate(), 'Room 234')
--INSERT INTO probation.dbo.code_entries VALUES (null, 'WFLOC', 'Program', null, null, getdate(), 'Program') -- plan to code these rooms by id (119 & 121) because that is what the room label itself says
--INSERT INTO probation.dbo.code_entries VALUES (null, 'WFLOC', 'Orientation', null, null, getdate(), 'Orientation') -- plan to code this room by id (116), because that is what the room label itself says
INSERT INTO probation.dbo.code_entries VALUES (99943, 'WFLOC', 'ChowHall', null, null, getdate(), 'Chow hall')
INSERT INTO probation.dbo.code_entries VALUES (99944, 'WFLOC', 'MLibrary', null, null, getdate(), 'Male library')
INSERT INTO probation.dbo.code_entries VALUES (99945, 'WFLOC', 'LowerTV', null, null, getdate(), 'Lower TV')
INSERT INTO probation.dbo.code_entries VALUES (99946, 'WFLOC', '116', null, null, getdate(), 'Orientation')
INSERT INTO probation.dbo.code_entries VALUES (99947, 'WFLOC', '117', null, null, getdate(), 'Room 117')
INSERT INTO probation.dbo.code_entries VALUES (99948, 'WFLOC', '118', null, null, getdate(), 'Room 118')
INSERT INTO probation.dbo.code_entries VALUES (99949, 'WFLOC', '119', null, null, getdate(), 'Program [119]')
INSERT INTO probation.dbo.code_entries VALUES (99950, 'WFLOC', '120', null, null, getdate(), 'Room 120')
INSERT INTO probation.dbo.code_entries VALUES (99951, 'WFLOC', '121', null, null, getdate(), 'Program [121]')
INSERT INTO probation.dbo.code_entries VALUES (99952, 'WFLOC', '122', null, null, getdate(), 'Room 122')
INSERT INTO probation.dbo.code_entries VALUES (99953, 'WFLOC', '123', null, null, getdate(), 'Room 123')
INSERT INTO probation.dbo.code_entries VALUES (99954, 'WFLOC', '124', null, null, getdate(), 'Room 124')
INSERT INTO probation.dbo.code_entries VALUES (99955, 'WFLOC', '125', null, null, getdate(), 'Room 125')
INSERT INTO probation.dbo.code_entries VALUES (99956, 'WFLOC', '126', null, null, getdate(), 'Room 126')
INSERT INTO probation.dbo.code_entries VALUES (99957, 'WFLOC', '127', null, null, getdate(), 'Room 127')
INSERT INTO probation.dbo.code_entries VALUES (99958, 'WFLOC', '128', null, null, getdate(), 'Room 128')
INSERT INTO probation.dbo.code_entries VALUES (99959, 'WFLOC', '129', null, null, getdate(), 'Room 129')
INSERT INTO probation.dbo.code_entries VALUES (99960, 'WFLOC', '130', null, null, getdate(), 'Room 130')
INSERT INTO probation.dbo.code_entries VALUES (99961, 'WFLOC', 'MCanteen', null, null, getdate(), 'Male canteen')
INSERT INTO probation.dbo.code_entries VALUES (99962, 'WFLOC', 'RecYard', null, null, getdate(), 'Rec yard')
INSERT INTO probation.dbo.code_entries VALUES (99963, 'WFLOC', 'Visiting', null, null, getdate(), 'Visiting')
-- Male route
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99912, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99913, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99914, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99915, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99916, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99917, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99918, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99919, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99920, null, null, getdate()) -- Male laundry
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99921, null, null, getdate()) -- English TV
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99922, null, null, getdate()) -- Spanish TV
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99923, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99924, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99925, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99926, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99927, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99928, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99929, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99930, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99931, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99932, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99933, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99934, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99935, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99936, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99937, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99938, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99939, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99940, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99941, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99942, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99943, null, null, getdate()) -- Chow hall
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99944, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99945, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99946, null, null, getdate()) -- Orientation
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99947, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99948, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99949, null, null, getdate()) -- Program [119]
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99950, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99951, null, null, getdate()) -- Program [121]
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99952, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99953, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99954, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99955, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99956, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99957, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99958, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99959, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99960, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99961, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99962, null, null, getdate()) -- Rec yard
INSERT INTO probation.dbo.code_category_assoc VALUES (99991, 99963, null, null, getdate()) -- Visiting
-- Female route
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99901, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99902, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99903, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99904, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99905, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99906, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99907, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99908, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99909, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99910, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99911, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99943, null, null, getdate()) -- Chow hall
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99946, null, null, getdate()) -- Orientation
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99949, null, null, getdate()) -- Program [119]
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99951, null, null, getdate()) -- Program [121]
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99962, null, null, getdate()) -- Rec yard
INSERT INTO probation.dbo.code_category_assoc VALUES (99992, 99963, null, null, getdate()) -- Visiting
-- Night route
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99901, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99902, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99903, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99904, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99905, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99906, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99907, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99908, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99909, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99910, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99911, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99912, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99913, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99914, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99915, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99916, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99917, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99918, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99919, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99920, null, null, getdate()) -- Male laundry
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99921, null, null, getdate()) -- English TV
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99922, null, null, getdate()) -- Spanish TV
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99923, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99924, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99925, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99926, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99927, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99928, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99929, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99930, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99931, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99932, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99933, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99934, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99935, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99936, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99937, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99938, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99939, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99940, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99941, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99942, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99943, null, null, getdate()) -- Chow hall
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99944, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99945, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99946, null, null, getdate()) -- Orientation
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99947, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99948, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99949, null, null, getdate()) -- Program [119]
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99950, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99951, null, null, getdate()) -- Program [121]
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99952, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99953, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99954, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99955, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99956, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99957, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99958, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99959, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99960, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99961, null, null, getdate())
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99962, null, null, getdate()) -- Rec yard
INSERT INTO probation.dbo.code_category_assoc VALUES (99993, 99963, null, null, getdate()) -- Visiting

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
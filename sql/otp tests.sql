--truncate table barcode
select * from barcode

select hashbytes('sha1', '1234567890')

using ASCII encoding instead (same password):
hex:
01 3f 07 3f 3f 4f 54 3f 5a 3f 3f 3b 3f 6b 3f 3f 3f 3f 3e 3f
ascii:
\a??OT?Z??;?k????>?
base64:
AT8HPz9PVD9aPz87P2s/Pz8/Pj8=

sybase utf8 encoding:
hex:
0x446F5DA85FD59A1C926CF24CD11E65768321DCA8
base64:
BEb12oX9WaHJJs8kzRHmV2gyHcoI

insert into barcode 
values('3/17/2014 12:00:00 AM', NULL, NULL, NULL, 20198, hashbytes('sha1', '1234567890'), '3/17/2014 12:00:00 AM', NULL)
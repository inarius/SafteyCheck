# Saftey check #

Witten by Jason Simone

How to test locally
===================
The server.js file is a Node.js server definition which can host the
application with the proper protocols for local testing. The
node_modules folder is a self-contained set of node dependencies.

To test the app, navigate to the www folder and run the command:

> node server.js

Then, in a browser navigate to:

http://localhost:8081/

To debug using weinre, run:

> weinre --boundHost -all-

Then use the console located at:

http://localhost:8080/client/#nfc


How to package and run
======================
To build the application, package the Application files listed below
into a zip and upload it to PhoneGap Build. The application can then
be installed or downloaded from the PhoneGap Build website.


About the file structure
========================
The files present in the project folder serve a dual purpose. Some
are components of the application as it should be packaged for 
PhoneGap Build. Others are modified for testing purposes, and should
not be packed and submitted to the build service.

Application files
-----------------
These files (only) must be included in the PhoenGap Build package:
+ \www\css\*
+ \www\font\*
+ \www\js\*
+ \www\lib\*
+ \www\views\*
+ \www\index.html
+ \www\config.xml

Modified PhoneGap project files (for testing)
---------------------------------------------
These files have been modified to facilitate local testing and 
should _not_ be replaced with files distributed in PhoneGap apks:
- \www\cordova.js
- \www\phonegap.js

Non-project files (for testing)
-------------------------------
These files are for local testing infrastructure only and are not a
component of the application project:
- \www\node_modules\*
- \www\server.js
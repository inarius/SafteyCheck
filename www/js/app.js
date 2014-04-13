var app = {
    config: {
        api_url: "http://169.231.51.222:58914/"
    },
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    user: { 
        session: null,
        auth: null
    },
    currentPage: null,
    route: {},
	scans: [],
	initialize: function () {
	    //app.clearScreen();
	    app.slider = new PageSlider($('body'));
        app.bindDevice();
        app.compileTemplates();
		app.addTemplateHelpers();
		//app.showInstructions("Starting. Please wait...");
	},
	eventBus: _.extend({}, Backbone.Events),
	openMenu: function () {
		$('#right').animate({ translate3d:'260px,0,0' }, 200);
		//$('#right').animate({ left: 250 }, 350);
		$('#side-menu-button.off').addClass("on");
		$('#side-menu-button.off').removeClass("off");
		$('#side-menu-button.on').on('click', app.closeMenu);
		document.removeEventListener("menubutton", app.openMenu, false);
		document.addEventListener("menubutton", app.closeMenu, false);
		document.addEventListener("backbutton", app.closeMenu, false);
	},
	closeMenu: function () {
		$('#right').animate({ translate3d:'0,0,0' }, 200);
		//$('#right').animate({ left: 0 }, 300);
		$('#side-menu-button.on').addClass("off");
		$('#side-menu-button.on').removeClass("on");
		$('#side-menu-button.off').on('click', app.openMenu);
		document.removeEventListener("menubutton", app.closeMenu, false);
		document.removeEventListener("backbutton", app.closeMenu, false);
		document.addEventListener("menubutton", app.openMenu, false);
	},
	setAccessToken: function (accessToken) {
		localStorage["accessToken"] = accessToken;
	},
	getAccessToken: function (accessToken) {
		return localStorage["accessToken"];
	},
	clearAccessToken: function () {
		localStorage.removeItem("accessToken");
	},
	getSecurityHeaders: function () {
		var accessToken = app.getAccessToken();
		if (accessToken) {
			return { "Authorization": "Bearer " + accessToken };
		}
		return {};
	},
	loginSucceeded: function () {
		console.log("Login sucessful");
		$("#loginForm").hide();
		var userInfoPromise = app.getUserInfo();
		userInfoPromise.done(function (data) {
			console.log("Logged in as: " + data.userName);
			alert(data.userName);
		});
	},
	getUserInfo: function () {
		console.log("Getting user data");
		var userInfoUrl = "http://157.145.184.4:58914/api/Account/UserInfo";
		var headers = app.getSecurityHeaders();
		return $.ajax({
			url: userInfoUrl,
			cache: false,
			headers: headers
		});
	},
	bindDevice: function () {
	    document.addEventListener('deviceready', this.deviceready, false);
	},
    deviceready: function () {
        document.addEventListener("menubutton", app.openMenu, false);
        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }
        if (typeof nfc != "undefined") {
            nfc.addNdefListener(
                app.onNdef,
                function () {
                    console.log("Listening for NDEF tags.");
                },
                failure
            );
            if (device.platform == "Android") {
                // Android launches the app when tags with mime type text/pg are scanned
                // because of an intent in AndroidManifest.xml.
                // phonegap-nfc fires an ndef-mime event (as opposed to an ndef event)
                nfc.addMimeTypeListener(
                    'text/pg',
                    app.onNdef,
                    function () {
                        console.log("Listening for NDEF mime tags with type text/pg.");
                    },
                    failure
                );
            };
        }
        else {
            console.log("No NFC. We must be testing...");
        }
        app.runLogic();
    },
    onNdef: function (nfcEvent) {
        debug.nfcEvent = nfcEvent;
        console.log("debug.nfcEvent stored");
        console.log("encoded nfcEvent.tag: " + JSON.stringify(nfcEvent.tag));
        var tag = nfcEvent.tag;
        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }
        tag = decodeTag(tag);
        console.log("decoded nfcEvent.tag: " + JSON.stringify(tag));
        for (var i = 0; i < tag.ndefMessage.length; i++) {
            switch (tag.ndefMessage[i].type) {
                case "application/prismuser":
                    console.log("PRISM user tag scanned");
                    if (app.currentPage == "login") {
                        // calling eventBus with payload: http://stackoverflow.com/questions/16874252/should-i-use-a-central-event-bus-with-backbone-js
                        console.log("Triggering login scan process");
                        app.eventBus.trigger("onNfcPrismUser:login", nfcEvent, i);
                    }
                    else {
                        // otherwise ignore the scan
                        console.log("Not on login page -- scan ignored");
                    }
                    break;
                case "application/location":
                    app.onNfcLocation(nfcEvent, i);
                    break;
            }
        }

        app.scans[app.scans.length] = decodePayload(tag.ndefMessage[0]);
        console.log('new scan history: ' + JSON.stringify(app.scans));
        tagContents.innerHTML = app.tagStatusTemplate(tag) + app.tagListTemplate(app.scans);
        navigator.notification.vibrate(100);
        app.hideInstructions();
        app.runLogic();
    },
    onNfcLocation: function (nfcEvent, ndefIndex) {
        alert("Location scanned: " + JSON.stringify(nfcEvent.tag.ndefMessage[ndefIndex].payload));
    },
    clearScreen: function () {
        tagContents.innerHTML = "";
        messageContents.innerHTML = "";
    },
    showInstructions: function (text) {
        console.log("showing instructions text: " + text);
        $('.hidden').remove();
        $('.instructions').remove();
        messageContents.innerHTML += app.views.InstructionsDivView(text).render().$el.html();
        var hidden = document.getElementsByClassName('hidden');
        if (hidden && hidden.length) {
            hidden[0].className = 'instructions';
        }
    },
    hideInstructions: function () {
        var instructions = document.getElementsByClassName('instructions');
        if (instructions && instructions.length) {
            instructions[0].className += ' hidden';
        }
    },
    runLogic: function () {
        if (app.scans.length == 0)
            app.showInstructions("Ready! Please start by scanning Miguel...");
        else if (app.scans.length >= 5) {
            app.showInstructions("I think that's about enough scanning. Don't you?");
            app.onNdef = function () { };
        }
        else {
            if ($.inArray("Miguel", app.scans) == -1)
                app.showInstructions("That's not Miguel...");
            else {
                if ($.inArray("Jason", app.scans) == -1)
                    app.showInstructions("Now scan Jason...");
                else
                    app.showInstructions("You scanned everyone!");
            }
        }
    },
    compileTemplates: function () {
        app.router = new app.routers.AppRouter();
        app.utils.templates.load(["HomeView", "LoginView", "LoginFormView", "InstructionsDivView", "RoundTypeButtonView"],
            function () {
                app.router = new app.routers.AppRouter();
                Backbone.history.start();
            });

        //template = Handlebars.getTemplate("InstructionsDivView");
        //app.instructionsTemplate = Handlebars.compile(template);

        //template = document.getElementById('tag-template').innerHTML;
        //app.tagTemplate = Handlebars.compile(template);
        //template = document.getElementById('tag-list-template').innerHTML;
        //app.tagListTemplate = Handlebars.compile(template);
        //template = document.getElementById('tag-status-template').innerHTML;
        //app.tagStatusTemplate = Handlebars.compile(template);
    },
    addTemplateHelpers: function () {
        Handlebars.registerHelper('bytesToString', function(byteArray) {
            return nfc.bytesToString(byteArray);
        });
        Handlebars.registerHelper('bytesToHexString', function(byteArray) {
            return nfc.bytesToHexString(byteArray);
        });
        // useful for boolean
        Handlebars.registerHelper('toString', function(value) {
            return String(value);
        });
        Handlebars.registerHelper('tnfToString', function(tnf) {
            return tnfToString(tnf);
        });
        Handlebars.registerHelper('decodePayload', function(record) {
            return decodePayload(record);
			//alert(nfc.decodePayload);
            // TODO: FIX THIS!!!!
        });
        Handlebars.registerHelper('exclamation', function(record) {
			var exclamations = [
				'Awesome!',
				'Great!',
				'Ok.',
				'Fantastic!'];
            return exclamations[Math.floor(Math.random() * exclamations.length)];
        });
        Handlebars.registerHelper('pluralize', function(number, single, plural) {
          if (number === 1) { return single; }
          else { return plural; }
        });
    }
};

// ideally some form of this can move to phonegap-nfc util
function decodeTag(tag) {
    if (typeof tag.ndefMessage != 'undefined') {
        console.log("Record has ndef message(s).");
        for (var i = 0; i < tag.ndefMessage.length; i++) {
            tag.ndefMessage[i] = decodeNdef(tag.ndefMessage[i]);
        }
    }
    return tag;
}
function decodeNdef(ndef) {
    console.log("decoding ndef: " + JSON.stringify(ndef));
    if (typeof ndef.ndefMessage != 'undefined') {
        console.log("Record has ndef message(s).");
        ndef = ndef.ndefMessage[0];
    }
    if (typeof ndef.type != 'undefined') {
        ndef.type = nfc.bytesToString(ndef.type);
        ndef.payload = nfc.bytesToString(ndef.payload);
    }
    else {
        console.log("Record doesn't have ndef message.");
    }
    return ndef;
}

// ideally some form of this can move to phonegap-nfc util
function decodePayload(record) {
    console.log("decoding record: "  + JSON.stringify(record));
    console.log("record ndef object type: " + typeof record.ndefMessage);
    if (typeof record.ndefMessage != 'undefined') {
        console.log("Record has ndef message.");
        record = record.ndefMessage[0];
    }
    if (typeof record.type != 'undefined') {
        var recordType = nfc.bytesToString(record.type),
            payload;
        // TODO extract this out to decoders that live in NFC code
        // TODO add a method to ndefRecord so the helper
        // TODO doesn't need to do this
        if (recordType === "T") {
            var langCodeLength = record.payload[0],
            text = record.payload.slice((1 + langCodeLength), record.payload.length);
            payload = nfc.bytesToString(text);

        } else if (recordType === "U") {
            var identifierCode = record.payload.shift(),
            uri = nfc.bytesToString(record.payload);
            if (identifierCode !== 0) {
                // TODO decode based on URI Record Type Definition
                console.log("WARNING: uri needs to be decoded");
            }
            //payload = "<a href='" + uri + "'>" + uri + "<\/a>";
            payload = uri;
        } else {
            // kludge assume we can treat as String
            payload = nfc.bytesToString(record.payload);
        }
    }
    else {
        console.log("Record doesn't have ndef message.");
        payload = record;
    }
    return payload;
}

// TODO move to phonegap-nfc util
function tnfToString(tnf) {
    var value = tnf;
    switch (tnf) {
    case ndef.TNF_EMPTY:
        value = "Empty";
        break;
    case ndef.TNF_WELL_KNOWN:
        value = "Well Known";
        break;
    case ndef.TNF_MIME_MEDIA:
        value = "Mime Media";
        break;
    case ndef.TNF_ABSOLUTE_URI:
        value = "Absolute URI";
        break;
    case ndef.TNF_EXTERNAL_TYPE:
        value = "External";
        break;
    case ndef.TNF_UNKNOWN:
        value = "Unknown";
        break;
    case ndef.TNF_UNCHANGED:
        value = "Unchanged";
        break;
    case ndef.TNF_RESERVED:
        value = "Reserved";
        break;
    }
    return value;
}

function testStart() {
    app.deviceready();
}
function testScan(string) {
    app.scans[app.scans.length] = string;
    tagContents.innerHTML = app.tagStatusTemplate(string) + app.tagListTemplate(app.scans);
    app.hideInstructions();
    app.runLogic();
}


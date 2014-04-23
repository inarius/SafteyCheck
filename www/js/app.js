/*
IMPORTANT - done
*/

/*
Highly Desireable
*/
// TODO: Go through all my TODOs (add to GitHub?)
// TODO: Session expiration (client)
// TODO: Manual login (or at least remove it)
// TODO: NFC write
// TODO: Handle failed API calls to allow retry/logoff (loading location list)

/*
NOT important
*/
// TODO: Session expiration (server)
// TODO: Fix models
// TODO: More polish (maybe a splash)
// TODO: Kiosk mode (tablet)
// TODO: Tear out unused (sample) code
// TODO: Don't scroll *too much* (locations list -- only off-screen)

var config = {};
config.api_url = "http://11.0.0.118:58914/";
config.userInfo_api_url = config.api_url + "api/Account/UserInfo";
config.locationsCodeTable = "WFLOC";

var app = {
    config: config,
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    currentPage: null,
    round: {
        type: {},
        locations: {}
    },
    user: {
        session: null,
        auth: null,
        userTagMessage: null
    },
    writeNfc: false, // TODO: DON'T DO THIS!
	initialize: function () {
	    //app.clearScreen();
	    app.slider = new PageSlider($('body'));
        app.bindDevice();
        app.compileTemplates();
		app.addTemplateHelpers();
		//app.showInstructions("Starting. Please wait...");
	},
	reinitialize: function() { // clear all session-specific data so the app can be reused (should be headed to the login screen)
	    delete app.homeView.model;
	    delete app.loginView.model;
	    delete app.homeView;
	    delete app.loginView;
	    delete app.user.session;
	    delete app.user.auth;
	    delete app.user.userTagMessage;
	    delete app.currentPage;
	    delete app.round.type;
	    delete app.round.locations;
	    delete app.writeNfc;
	},
	eventBus: _.extend({}, Backbone.Events),
    // call the notifier like this: app.notifier.notify({message:'Hello notifier!',type:'error'});
	notifier: new Backbone.Notifier({	
	    el: 'body', 	// container for notification (default: 'body')
	    //baseCls: 'notifier',// css classes prefix, should match css file. Change to solve conflicts.
	    theme: 'dark',// default theme for notifications (available: 'plastic'/'clean').
	    //types: ['warning', 'error', 'info', 'success'],// available notification styles
	    type: null, 	// default notification type (null/'warning'/'error'/'info'/'success')
	    dialog: false,	// whether display the notification with a title bar and a dialog style.
	    modal: false,	// whether to dark and block the UI behind the notification (default: false)
	    title: undefined,// default notification title, if defined, causes the notification to be 'dialog' (unless dialog is 'false')
	    closeBtn: false, // whether to display an enabled close button on notification
	    ms: 10000,	// milliseconds before hiding (null || false => no timeout) (default: 10000)
	    'class': null, // additional css class
	    hideOnClick: true,// whether to hide the notifications on mouse click (default: true)
	    loader: false,	// whether to display loader animation in notifications (default: false)
	    destroy: false,// notification or selector of notifications to hide on show (default: false)
	    opacity: .9,	// notification's opacity (default: 1)
	    offsetY: 0,	// distance between the notifications and the top/bottom edge (default: 0)
	    fadeInMs: 500,	// duration (milliseconds) of notification's fade-in effect (default: 500)
	    fadeOutMs: 500,	// duration (milliseconds) of notification's fade-out effect (default: 500)
	    position: 'bottom',// default notifications position ('top' / 'center' / 'bottom')
	    zIndex: 10000,	// minimal z-index for notifications
	    screenOpacity: 0.5// opacity of dark screen background that goes behind for modals (0 to 1)
	}),
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
	getUserInfo: function () {
		console.log("Getting user data");
		var userInfoUrl = config.userInfo_api_url;
		var headers = app.getSecurityHeaders();
		return $.ajax({
			url: userInfoUrl,
			cache: false,
			headers: headers
		});
	},
	getLocations: function () {
	    console.log("Getting possible locations on route");
	    var userInfoUrl = app.config.api_url + "api/Account/UserInfo";
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
        // no menu for now
        //document.addEventListener("menubutton", app.openMenu, false);
        document.addEventListener("menubutton", function (e) { e.stopImmediatePropagation(); }, false);
        document.addEventListener("backbutton", function (e) { e.stopImmediatePropagation(); }, false);
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
        if (app.writeNfc) {
            app.eventBus.trigger("writeNfcPrismUser:login", null);
            return;
        }
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
                    if (app.currentPage == "home") {
                        app.eventBus.trigger("onNfcLocation:home", nfcEvent, i);
                    }
                    else {
                        // otherwise ignore the scan
                        console.log("Not on login page -- scan ignored");
                    }
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
        app.utils.templates.load(["HomeView", "LoginView", "LoginFormView", "LocationCategoryButtonView", "LocationListItemView", "LocationCommentsModalView"],
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
        Handlebars.registerHelper('formatTime', function (date) {
            return new Date(date).toTimeString().substring(0,5);
        });
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

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    return JSON.parse(JSON.stringify(a));
}
app.views.LoginView = Backbone.View.extend({

    initialize: function () {
        //global events
        _.bindAll(this, 'showLoginForm'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        _.bindAll(this, 'onNfcPrismUser'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        _.bindAll(this, 'writeNfcPrismUser'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        app.eventBus.on("showLoginForm:login", this.showLoginForm); // call to execute: app.eventBus.trigger("showLoginForm:login");
        app.eventBus.on("onNfcPrismUser:login", this.onNfcPrismUser); // call to execute: app.eventBus.trigger("onNfcPrismUser:login", nfcEvent, ndefMessageIndex);
        app.eventBus.on("writeNfcPrismUser:login", this.writeNfcPrismUser); // call to execute: app.eventBus.trigger("writeNfcPrismUser:login", authenticationData);
    },

    render: function () {
        this.$el.html(this.template());
        this.bindDOM();
        return this;
    },

    bindDOM: function () {
        // No menu needed
        //$('#side-menu-button.off', this.el).on('click', app.openMenu);
        //$('#side-menu-button.on', this.el).on('click', app.closeMenu);
    },

    events: { //local events
        //"keyup .search-key":    "search",
        //"keypress .search-key": "onkeypress"
        // TODO? how to do nfc here? EventBus? 
        // TODO? Perhaps a global function could consider app state and call eventBus.on with the proper :context?
    },

    animate: function() {
        $('#scan-animation svg', this.el).hide();
        var imgs = $('#scan-animation svg', this.el),
            index = 0;
        imgs[0].style.display = 'block';
        setInterval(function () {
            imgs[index].style.display = 'none';
            index = (index + 1) % imgs.length;
            imgs[index].style.display = 'block';
        }, 800);
    },
    showLoginForm: function (userTagMessage) {
        // test with: app.eventBus.trigger("onNfcPrismUser:login",debug.sampleNfcEvent,0);

        // begin grabbing the LocationCategory model data
        var locationCategories = new app.models.LocationCategoryCollection();
        locationCategories.fetch({
            error: function (error) {
                // TODO: error handling
                console.log(error);
                console.log("LocationCategory API call failed: " + error);
            }
        });
        app.user.userTagMessage = userTagMessage;
        this.loginFormView = new app.views.LoginFormView({ model: locationCategories });
        this.loginFormView.parent = this;
        $('.login-page #content', this.el).html(this.loginFormView.render().el);
        $('h1').text("Please enter your password");
        $('#loginForm h2').append(" as " + userTagMessage.login);
        //pre-fill input fields
        $("#loginForm input[name='username']", this.el).val(userTagMessage.login);
        $("#loginForm input[name='one_time_password']", this.el).val(userTagMessage.otp);
    },
    onNfcPrismUser: function (nfcEvent, ndefIndex) {
        // TODO: (eventually) should validate the user tag separately (first) for smoother multi-factor auth
        // TODO? do it twice? read-only to progress to login, then write back new otp with password?

        // TODO: (precondition) request the roundType list (async - how to handle this?)
        // TODO? when can we render the loginform? can that be the impetus for the ajax call?
        // (precondition) we are here because the nfcEvent was a scan of type "application/prismuser"
        //TODO: Load login page with user and otp prefilled (hidden) - prompt for pass and route buttons
        app.eventBus.off("onNfcPrismUser:login"); // ignore nfc user tags for a little while
        app.writeNfc = true;
        var payload = JSON.parse(nfcEvent.tag.ndefMessage[ndefIndex].payload);
        app.eventBus.trigger("showLoginForm:login", payload);
        //TODO? harcode route buttons?
    },
    writeNfcPrismUser: function (authenticationData) {
        app.user.userTagMessage.otp = "test";
        if (typeof nfc != "undefined") {
            var record = ndef.mimeMediaRecord("application/prismuser", nfc.stringToBytes(
                JSON.stringify(app.user.userTagMessage)
            ));
            //nfc.addTagDiscoveredListener(
            nfc.write({
                message: ndef.textRecord("Plain text message"),
                onSucess: function () {
                    navigator.notification.vibrate(100);
                    alert("yay!");
                },
                onFailure: function (reason) {
                    navigator.notification.alert(reason, function () { }, "There was a problem");
                    alert("boo!");
                    console.log("boo! " + reason);
                    // TODO: dont store token and prompt for tag again - if we don't get it kick us back out to the login page
                }
            });
            //    }), 
            //    console.log("Listening for NDEF tags to write to"),
            //    alert('Failed to register NFC Listener')
            //);
        }

        // TODO: only if sucessfully written...
        app.writeNfc = false;
        app.setAccessToken(authenticationData.access_token);
        console.log("Stored access token: " + authenticationData.access_token);
        this.loginSucceeded(authenticationData);
    },
    loginSucceeded: function (authenticationData) {
        app.user.auth = authenticationData;
        console.log("Logged in as: " + authenticationData.userName);

        //var userInfoPromise = app.getUserInfo();
        //userInfoPromise.fail(function (error) {
        //    console.log(error);
        //    alert(error);
        //});
        //userInfoPromise.done(function (data) {
        //    console.log("Logged in as: " + data.userName);
        //    window.location = "#";
        //});

        // TODO: add the session record first!

        // TODO: create a new specialized route model here instead of using LocationCategory and copy the locations over
        // TODO? create an app method for this save and use promise callback approach (to handle errors/logic)?
        // use LocationCategory to save the route start
        app.round.type.save({ startDate: new Date().toLocaleString() }, {
            success: function (response) {
                console.log('round start saved with id: ' + response);
            },
            error: function (error) {
                // TODO: do something here!
                console.log('failed to save round start: ' + error);
            }
        });

        // TODO: does this work?
        // Reregister all view events
        this.initialize();

        // Let the home route (controller) fetch the locations
        window.location = "#";
    },
    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }

});
app.views.LoginView = Backbone.View.extend({

    initialize: function () {
        //TODO: consider splitting most content into separate pages, except small or reusable blocks (like rows or dialogs...)
        // local views
        this.loginFormView = new app.views.LoginFormView();
        this.loginFormView.parent = this;

        //global events
        _.bindAll(this, 'showLoginForm'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        _.bindAll(this, 'onNfcPrismUser'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        app.eventBus.on("showLoginForm:login", this.showLoginForm); // call to execute: app.eventBus.trigger("showLoginForm:login");
        app.eventBus.on("onNfcPrismUser:login", this.onNfcPrismUser); // call to execute: app.eventBus.trigger("onNfcPrismUser:login");
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
    showLoginForm: function (user) {
        $('.login-page #content', this.el).html(this.loginFormView.render().el);
        $('h1').text("Please enter your password");
        $('#loginForm h2').append(" as " + user);
    },
    onNfcPrismUser: function (nfcEvent, ndefIndex) {
        // TODO: (precondition) request the roundType list (async - how to handle this?)
            // TODO? when can we render the loginform? can that be the impetus for the ajax call?
        // (precondition) we are here because the nfcEvent was a scan of type "application/prismuser"
        //TODO: Load login page with user and otp prefilled (hidden) - prompt for pass and route buttons
        var payload = JSON.parse(nfcEvent.tag.ndefMessage[ndefIndex].payload);
        app.eventBus.trigger("showLoginForm:login", payload.login);
        //TODO? harcode route buttons?
    },
    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }

});
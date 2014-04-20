app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        //TODO: don't forget app.homeView and app.loginView are both global also!... and prerendered!
        //global events
        _.bindAll(this, 'showLogin'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        _.bindAll(this, 'onNfcLocation'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        app.eventBus.on("showLogin:home", this.showLogin); // call to execute: App.eventBus.trigger("showLogin:home");
        app.eventBus.on("onNfcLocation:home", this.onNfcLocation); // call to execute: app.eventBus.trigger("onNfcLocation:home", nfcEvent, ndefMessageIndex);

        var self = this;
        this.model.allLocations.on("reset", this.render, this);
        this.model.allLocations.on("add", function (location) {
            if (self.spinner)
                self.spinner.spin(false);
            $('#locations-list', self.el).append(new app.views.LocationListItemView({ model: location }).render().el);
        });
    },

    render: function () {
        this.$el.empty();
        this.$el.html(this.template());

        //TODO: to alter spinner size: vary the width, radius, and lines
        var opts = {
            lines: 50, // The number of lines to draw
            length: 1, // The length of each line
            width: 3, // The line thickness
            radius: 5, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: .7, // Rounds per second
            trail: 90, // Afterglow percentage
            hwaccel: true, // Whether to use hardware acceleration
            opacity: '0.03',
            color: app.loginView.$el.css('color')
        };
        this.spinner = new Spinner(opts).spin();

        this.bindDOM();
        var self = this;
        _.each(this.model.allLocations.models.attributes, function (location) {
            self.spinner.spin(false);
            $('#locations-list', self.el).append(new app.views.LocationListItemView({ model: location }).render().el);
        }, this);
        return this;
    },


    bindDOM: function () {
        // No menu needed
        //$('#side-menu-button.off', this.el).on('click', app.openMenu);
        //$('#side-menu-button.on', this.el).on('click', app.closeMenu);
    },

    events: { //local events
        "click .comments":    "onCommentClick",
        //"keypress .search-key": "onkeypress"
    },

    search: function (event) {
        //var key = $('.search-key').val();
        //this.searchResults.fetch({reset: true, data: {name: key}});
    },

    showLogin: function() {
        app.slider.slidePage(app.loginView.$el);
    },
    onNfcLocation: function (nfcEvent, ndefIndex) {
        // TODO: (eventually) should validate the location tag id against the database
        // (precondition) we are here because the nfcEvent was a scan of type "application/location on the home page"
        var payload = JSON.parse(nfcEvent.tag.ndefMessage[ndefIndex].payload);
        if (payload.uri) {
            payload.location_code = payload.uri.match('[^/]*$')[0];
            var location = this.model.allLocations.get(payload.location_code);
            location.set("dateChecked", new Date().toLocaleString());
            this.model.allLocations.sync("update", null, {  // to the web services! (save[patch] all every time incase we lost connection somewhere)
                success: function (response) {
                    console.log('location checks saved ' + response);
                },
                error: function (error) {
                    // TODO: do something here!
                    console.log('failed to save location checks: ' + error);
                }
            });
        }
        else {
            console.log('Invalid location scanned');
        }
    },
    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    },
    onCommentClick: function (event) {
        var $target = $(event.target);
        console.log($target.parent());
        var modalCommentsView = new app.views.LocationCommentsModalView({ model: this.model.allLocations.get($target.parent().attr("id")) });
        $("body").append(modalCommentsView.render().el);
    }
});

app.views.LocationListItemView = Backbone.View.extend({

    initialize: function () {
        // TODO: Need to call a function and try to sync on change
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render: function () {
        // setElement() overrides the default this.el div element
        //this.setElement(this.template({ model: this.model.attributes }));
        // I can't use setElement because it won't re-render?
        this.$el.html(this.template({ model: this.model.attributes }));
        return this;
    }

});

app.views.LocationCommentsModalView = Backbone.Modal.extend({

    initialize: function () {
        // implement the base Modal properties
        this.cancelEl = 'a.cancel';

        // TODO: How best to save the comment? Just write it to the location model and let the parent sync handle it?

        // we can't remder (or bind to) the view ourselves without messing up the Modal?
        //this.template = this.template({ model: this.model.attributes });
        //this.model.on("change", this.render, this);
        //this.model.on("destroy", this.close, this);
    }

});
app.views.LoginView = Backbone.View.extend({

    initialize: function () {
        //TODO: consider splitting most content into separate pages, except small or reusable blocks (like rows or dialogs...)
        this.loginFormView = new app.views.LoginFormView();

        //global events
        _.bindAll(this, 'showLoginForm'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        app.eventBus.on("showLoginForm:login", this.showLoginForm); // call to execute: App.eventBus.trigger("showLoginForm:login");
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
    },

    search: function (event) {
        //var key = $('.search-key').val();
        //this.searchResults.fetch({reset: true, data: {name: key}});
    },

    showLoginForm: function () {
        $('#login', this.el).html(this.loginFormView.render().el);
    },
    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }

});

app.views.LoginFormView = Backbone.View.extend({

    //tagName: "li",

    //className: "topcoat-list__item",

    initialize: function () {
        //this.searchResults = new app.models.EmployeeCollection();
        //this.searchresultsView = new app.views.EmployeeListView({model: this.searchResults});
    },

    render: function () {
        this.$el.html(this.template());
        this.bindDOM();
        //$('.scroller', this.el).append(this.searchresultsView.render().el);
        return this;
    },

    bindDOM: function () {
        $('#loginForm', this.el).submit(function (e) {
            e.preventDefault();
            console.log("Submitting: " + $(this).serialize() + " to: " + $(this).attr('action'));
            $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: $(this).serialize(), // serializes the form's elements.
                success: function (data) {
                    console.log("success!");
                    $('#loginError').removeClass("appear");
                    console.log(data);
                    app.setAccessToken(data.access_token);
                    console.log("Stored access token: " + data.access_token);
                    app.loginSucceeded();
                },
                error: function (data) {
                    console.log("Login failed!");
                    var rtn = { error_description: "no server response" };
                    if (data.responseText)
                        rtn = eval("(" + data.responseText + ")");
                    $('#loginError').html("<div class='topcoat-icon inline-icon icomatic'>error</div>" + rtn.error_description);
                    $('#loginError').addClass("appear");
                    // TODO: blink??
                }
            });
        });
    },

    events: {
        //"keyup .search-key":    "search",
        //"keypress .search-key": "onkeypress"
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }

});

app.views.InstructionsDivView = Backbone.View.extend({

    //tagName: "li",

    //className: "topcoat-list__item",

    initialize: function () {
        //this.model.on("change", this.render, this);
        //this.model.on("destroy", this.close, this);
    },

    render: function () {
        return this.template(this);
    }

});
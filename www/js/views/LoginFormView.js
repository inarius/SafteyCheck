app.views.LoginFormView = Backbone.View.extend({

    initialize: function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (roundType) {
            if (self.spinner)
                self.spinner.spin(false);
            $('#submit-buttons', self.el).append(new app.views.RoundTypeButtonView({ model: roundType }).render().el);
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
        _.each(this.model.models, function (roundType) {
            self.spinner.spin(false);
            $('#submit-buttons', self.el).append(new app.views.RoundTypeButtonView({ model: roundType }).render().el);
        }, this);
        return this;
    },

    bindDOM: function () {
        var self = this;
        $('#loginForm', this.el).submit(function (e) {
            e.preventDefault();
            console.log("Submitting: " + $(this).serialize() + " to: " + $(this).attr('action'));
            $.ajax({
                type: $(this).attr('method'),
                url: app.config.api_url + "Token",
                data: $(this).serialize(), // serializes the form's elements.
                success: function (data) {
                    console.log("success!");
                    $('#loginError').removeClass("appear");
                    console.log(data);
                    app.setAccessToken(data.access_token);
                    console.log("Stored access token: " + data.access_token);
                    self.loginSucceeded();
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
        this.spinner.spin();
        $('#submit-buttons', this.el).append(this.spinner.el);
        $("#loginForm input[name='password']", this.el).focus();
    },

    events: { //local events
        //"keyup .search-key":    "search",
        //"keypress .search-key": "onkeypress"
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    },

    loginSucceeded: function () {
        console.log("Login sucessful");
        var userInfoPromise = app.getUserInfo();
        userInfoPromise.done(function (data) {
            app.user.auth = data;
            console.log("Logged in as: " + data.userName);
            alert(data.userName);
            window.location = "#home";
        });
    }

});

app.views.RoundTypeButtonView = Backbone.View.extend({

    //tagName: "button",
    //className: "topcoat-button--cta",
    //attributes: {
    //    type: "submit"
    //},

    initialize: function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render: function () {
        // setElement() overrides the default this.el div element
        this.setElement(this.template({ model: this.model.attributes }));
        return this;
    }

});
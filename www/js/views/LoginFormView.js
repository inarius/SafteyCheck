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
    }

});

app.views.RoundTypeButtonView = Backbone.View.extend({

    // TODO? use setElement() instead?
    tagName: "button",
    className: "topcoat-button--cta",
    attributes: {
        type: "submit"
    },

    initialize: function () {
        //this.model.on("change", this.render, this);
        //this.model.on("destroy", this.close, this);
    },

    render: function () {
        this.$el.html(this.template({ model: this.model.toJSON() }));
        //this.$el.html(this.template({ model: this.model.attributes }));
        return this;
    }

});
app.views.LoginFormView = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        this.$el.html(this.template());
        this.bindDOM();
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
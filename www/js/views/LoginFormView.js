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
        $("#loginForm input[name='password']", this.el).focus();
        //var opts = {
        //    lines: 50, // The number of lines to draw
        //    length: 1, // The length of each line
        //    width: 3, // The line thickness
        //    radius: 8, // The radius of the inner circle
        //    corners: 0, // Corner roundness (0..1)
        //    rotate: 0, // The rotation offset
        //    direction: 1, // 1: clockwise, -1: counterclockwise
        //    speed: .7, // Rounds per second
        //    trail: 90, // Afterglow percentage
        //    hwaccel: true, // Whether to use hardware acceleration
        //    opacity: '0.03',
        //    color: this.parent.$el.css('color')
        //};
        //var opts = {
        //    lines: 100, // The number of lines to draw
        //    length: 3, // The length of each line
        //    width: 1, // The line thickness
        //    radius: 10, // The radius of the inner circle
        //    corners: 0, // Corner roundness (0..1)
        //    rotate: 0, // The rotation offset
        //    direction: 1, // 1: clockwise, -1: counterclockwise
        //    speed: .7, // Rounds per second
        //    trail: 90, // Afterglow percentage
        //    hwaccel: true, // Whether to use hardware acceleration
        //    opacity: '0.03',
        //    color: this.parent.$el.css('color')
        //};
        //TODO: width, radius, and lines can vary when altering the size
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
            color: this.parent.$el.css('color')
        };
        var spinner = new Spinner(opts).spin();
        $('#submit-buttons', this.el).append(spinner.el);
        $('input[name="password"]', this.el).focus();
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
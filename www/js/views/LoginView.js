app.views.LoginView = Backbone.View.extend({

    initialize: function () {
        //TODO: consider splitting most content into separate pages, except small or reusable blocks (like rows or dialogs...)
        // local views
        this.loginFormView = new app.views.LoginFormView();

        //global events
        _.bindAll(this, 'showLoginForm'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        app.eventBus.on("showLoginForm:login", this.showLoginForm); // call to execute: app.eventBus.trigger("showLoginForm:login");
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

    animate: function() {
        $('#login svg', this.el).hide();
        var imgs = $('#login svg', this.el),
            index = 0;
        imgs[0].style.display = 'block';
        setInterval(function () {
            imgs[index].style.display = 'none';
            index = (index + 1) % imgs.length;
            imgs[index].style.display = 'block';
        }, 800);
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
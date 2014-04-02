app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        //TODO: consider splitting most content into separate pages, except small or reusable blocks (like rows or dialogs...)

        //this.searchResults = new app.models.EmployeeCollection();
        this.loginView = new app.views.LoginView();
        
        //global events
        //TODO: don't forget app.homeView is global also...!
        _.bindAll(this, 'showLogin'); // "_.bindAll() changes 'this' in the named functions to always point to that object"
        app.eventBus.on("showLogin:home", this.showLogin); // call to execute: App.eventBus.trigger("showLogin:home");
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

    showLogin: function() {
        //$('#content', this.el).html(this.loginView.render().el);
        app.slider.slidePage(this.loginView.render().el);
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
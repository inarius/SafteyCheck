app.routers.AppRouter = Backbone.Router.extend({
    routes: {
        "":                         "home",
        "login":                    "login", // TODO? how can I use this?
        "manualLogin":              "manualLogin",
        "employees/:id":            "employeeDetails",
        "employees/:id/reports":    "reports"/*,
        "employees/:id/map":        "map"
        #removed ^
        */
    },

    initialize: function () {
        // Doing this here seems to break things?
        //app.initialize();
    },

    // controller functions
    home: function () {
        // TODO? how do we identify that the user didn't get here deliberately? (i.e. from a user tag scan with app closed)
        app.currentPage = "home";
        console.log("current page: " + app.currentPage);

        // The home view never changes, so we instantiate and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }

        if (app.user.auth == null) {
            // goto login
            window.location = "#login";
        } else {
            // load the home view
            app.slider.slidePage(app.homeView.$el);
        }
    },

    login: function () {
        app.currentPage = "login";
        console.log("current page: " + app.currentPage);

        // logoff
        app.user.auth = null;
        app.user.session = null;

        // The login view never changes, so we instantiate and render it only once
        if (!app.loginView) {
            app.loginView = new app.views.LoginView();
            app.loginView.render(); //TODO? Should we render the login view just because we visit home?
        } else {
            console.log('reusing login view');
            app.loginView.delegateEvents(); // delegate events when the view is recycled
        }

        // load the login view
        app.slider.slidePage(app.loginView.$el);
    },

    manualLogin: function () {
        app.currentPage = "manualLogin";
        console.log("current page: " + app.currentPage);

        alert('manualLogin not implemented');
        window.location = "#login";
    },

    employeeDetails: function (id) {
        var employee = new app.models.Employee({id: id});
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EmployeeView
                // instead of creating new instances
                app.slider.slidePage(new app.views.EmployeeView({model: data}).render().$el);
            }
        });
    },

    reports: function (id) {
        var employee = new app.models.Employee({id: id});
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of ReportsView
                // instead of creating new instances
                app.slider.slidePage(new app.views.ReportsView({model: data}).render().$el);
            }
        });
    }/*,

    map: function (id) {
        app.slider.slidePage(new app.views.MapView().render().$el);
    }
    #removed ^
    */

});
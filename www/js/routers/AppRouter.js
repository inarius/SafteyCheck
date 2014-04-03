app.routers.AppRouter = Backbone.Router.extend({
    routes: {
        "":                         "home",
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

    home: function () {
        console.log("we're home!");

        // The following ("home-route") views never change, so we instantiate and render them only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        if (!app.loginView) {
            app.loginView = new app.views.LoginView();
            app.loginView.render(); //TODO? Should we render the login view just because we visit home?
        } else {
            console.log('reusing login view');
            app.loginView.delegateEvents(); // delegate events when the view is recycled
        }

        // show the home view
        app.slider.slidePage(app.homeView.$el);
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
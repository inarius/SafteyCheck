app.models.Route = Backbone.Model.extend({
    initialize: function () {
        this.allLocations = new app.models.LocationCollection();
        this.allLocations.parent = this;
        this.checkedLocations = new app.models.LocationCollection();
        this.checkedLocations.parent = this;
    },
    sync: function (method, model, options) {
        if (method === "read") {
            app.adapters.route.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }
});
app.models.Location = Backbone.Model.extend({
    initialize:function () {
    },
    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.location.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }
});
app.models.LocationCollection = Backbone.Collection.extend({
    model: app.models.Location,
    sync: function(method, model, options) {
        if (method === "read") {
            // TODO: Fix this
            app.adapters.location.findByRoute(parseInt(this.parent.id)).done(function (data) {
                options.success(data);
            });
        }
    }
});
// LocationCategories
app.models.LocationCategory = Backbone.Model.extend({
    initialize: function () {
        this.uri = app.config.api_url + 'api/locationCategory/' + this.id;
        this.allLocations = new app.models.LocationCollection({}, {parent: this});
        //this.checkedLocations = new app.models.LocationCollection({}, { parent: this });
    }
});
app.models.LocationCategoryCollection = Backbone.Collection.extend({
    model: app.models.LocationCategory,
    url: app.config.api_url + 'api/locationCategories.json?table=' + app.config.locationsCodeTable
});

// Locations
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
    initialize: function (attributes, options) {
        this.parent = options.parent;
        this.uri = this.parent.uri + '/locations';
        this.url = this.uri + '.json';
    },
    sync: function (method, model, options) {
        options = options || {};
        if (method === "read") {
            // TODO: add support for token auth
            // TODO: add direct support for deferred / adapter interface
            console.log("Getting possible locations on route");
            var headers = app.getSecurityHeaders();
            $.ajax({
                url: this.url,
                cache: false,
                headers: headers
                }).done(function (data) {
                    options.success(data);
                });

            // TODO: Fix this
            //app.adapters.location.findByCategory(parseInt(this.parent.id)).done(function (data) {
            //    options.success(data);
            //});
        }
    }
});
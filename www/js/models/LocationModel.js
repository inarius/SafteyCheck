// RoundTypes
app.models.RoundType = Backbone.Model.extend({
    initialize: function () {
        this.uri = app.config.api_url + 'api/roundType/' + this.id;
        this.allLocations = new app.models.LocationCollection({}, {parent: this});
        this.checkedLocations = new app.models.LocationCollection({}, { parent: this });
    }
});
app.models.RoundTypeCollection = Backbone.Collection.extend({
    model: app.models.RoundType,
    url: app.config.api_url + 'api/roundTypes.json'
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
        this.url = this.parent.uri + '/locations';
    },
    sync: function (method, model, options) {
        options = options || {};
        if (method === "read") {
            // TODO: Fix this
            //app.adapters.location.findByRound(parseInt(this.parent.id)).done(function (data) {
            //    options.success(data);
            //});

            // TODO: add support for token auth
            return Backbone.sync.apply(this, arguments);
        }
    }
});
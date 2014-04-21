// TODO! I should not be using the category to double as the route (model for the homepage) I should create the route and location_check models and copy category.allLocations over to it...
// TODO? Should I create all model properties even thought they won't do anything? (they'd give Intellisense and help *pretend* this is a strict language)

// LocationCategories
app.models.LocationCategory = Backbone.Model.extend({
    initialize: function () {
        this.uri = app.config.api_url + 'api/locationCategory/' + this.id;
        this.allLocations = new app.models.LocationCollection({}, { parent: this });
        //this.checkedLocations = new app.models.LocationCollection({}, { parent: this });
        // TODO? can we make checkedLocations a function() of allLocations?
    },
    save: function (attributes, options) {
        // TODO: handle sync errors
        // hack: this nonsense is because I dont have a specialized model...
        attributes.locationCategoryId = this.id;
        this.set(attributes); // merge attributes as in the stock save() method

        var model = this;
        var headers = app.getSecurityHeaders();
        var data = JSON.stringify(model.toJSON(options));
        if (!options.patch) {
            console.log("Saving selected category to locationCheckRounds");
            $.ajax({
                url: app.config.api_url + 'api/locationCheckRounds',
                type: "POST",
                contentType: "application/json",
                data: data,
                headers: headers
            }).done(function (response) {
                // this service returns the generated identity value
                // hack: have to use a new field here because I haven't created a specialized model
                model.roundId = response;
                app.round.id = model.roundId;
                options.success(response);
            }).fail(function (error) {
                options.error(error);
            });
        }
        else {
            console.log("Saving patch to locationCheckRound/{id}");
            $.ajax({
                url: app.config.api_url + 'api/locationCheckRound/' + app.round.id,
                type: "PATCH",
                contentType: "application/json",
                data: data,
                headers: headers
            }).done(function (response) {
                options.success(response);
            }).fail(function (error) {
                options.error(error);
            });
        }
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
            // TODO: add direct support for deferred / adapter (promise) interface
            console.log("Getting possible locations on route");
            var headers = app.getSecurityHeaders();
            $.ajax({
                url: this.url,
                cache: false,
                headers: headers
                }).done(function (data) {
                    options.success(data);
                });

            // TODO: Use adapters instead of inline sync as much as possible
            //app.adapters.location.findByCategory(parseInt(this.parent.id)).done(function (data) {
            //    options.success(data);
            //});
        }
        if (method === "update") {
            // TODO: add direct support for deferred / adapter (promise) interface
            console.log("Saving location check changes");
            var model = this;
            // hack: this nonsense is because I dont have a specialized model...
            model.each(function (loc) {
                loc.attributes.location = loc.id;
            });
            var headers = app.getSecurityHeaders();
            var data = JSON.stringify(
                new app.models.LocationCollection(
                    model.filter(function (location) { return _.isString(location.get("dateChecked")) } // just get checked locations
                    ), {parent: {uri: null}}) // hack: non-specialized model, etc...
                .toJSON(options)
                );
            $.ajax({
                url: app.config.api_url + 'api/locationCheckRound/' + this.parent.roundId + '/locations',
                type: "PATCH",
                contentType: "application/json",
                data: data,
                headers: headers
            }).done(function (response) {
                options.success(response);
            }).fail(function (error) {
                options.error(error);
            });

            // TODO: Use adapters instead of inline sync as much as possible
        }
    }
});
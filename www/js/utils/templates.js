Handlebars.getTemplate = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url: 'views/' + name + '.html',
            success: function (data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async: false
        });
    }
    return Handlebars.templates[name];
};

app.utils.templates = (function () {

    var load = function(views, callback) {
        $.each(views, function(index, view) {
            if (app.views[view]) {
                app.views[view].prototype.template = Handlebars.getTemplate(view);
            } else {
                alert(view + " not found");
            }
        });
        callback();
    }

    // The public API
    return {
        load: load
    };

}());
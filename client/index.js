exports.init = function () {
    this.routeNotFound = this.flow("notFound");
    this.ruuts = [];
    for (var i = 0; i < this._config.ruuts.length; ++i) {
        this.ruuts.push(engine.instances[this_.config.ruuts[i]]._originalRouter);
    }
    global.addEventListener("popstate", this.check.bind(this, null));
};

exports.check = function () {
    for (var i = 0; i < this.ruuts.length; ++i) {
        if (this.ruuts[i](location.pathname)) {
            return;
        }
    }
    this.routeNotFound.write(null, {
        url: location.pathname
    });
};

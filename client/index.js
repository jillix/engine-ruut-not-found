exports.init = function () {
    this.routeNotFound = this.flow("notFound");
    this.ruuts = [];
    for (var i = 0; i < this._config.ruuts.length; ++i) {
        var cIns = engine.instances[this._config.ruuts[i]];
        if (!cIns) { continue; }
        this.ruuts.push(cIns._originalRouter);
    }
    global.addEventListener("popstate", this.check.bind(this, null));
    if (this._config.autocheck !== false) {
        this.check();
    }
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

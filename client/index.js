exports.init = function () {
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

/**
 * check
 * This checks if the current pathname is configured in the ruut instances.
 *
 * @name check
 * @function
 */
exports.check = function () {
    for (var i = 0; i < this.ruuts.length; ++i) {
        if (this.ruuts[i](location.pathname)) {
            return;
        }
    }
    this.flow("notFound").write(null, {
        url: location.pathname
    }).end();
};

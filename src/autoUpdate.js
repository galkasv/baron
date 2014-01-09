/* Autoupdate plugin for baron 0.6+ */
(function(window, undefined) {
    var mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;

    var autoUpdate = function() {
        var self = this;

        this._observer = new MutationObserver(function() {
            self.update();
        });

        this.on('init', function() {
            self._observer.observe(self.root, {childList: true, subtree: true, characterData: true});
        });

        this.on('dispose', function() {
            self._observer.dissconect();
            delete self._observer;
        });

    };

    baron.fn.autoUpdate = function(params) {
        if(!mutationObserver) return this;

        var i = 0;

        while (this[i]) {
            autoUpdate.call(this[i], params);
            i++;
        }

        return this;
    };
})(window);
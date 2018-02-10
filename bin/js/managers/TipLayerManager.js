var managers;
(function (managers) {
    // import TipLayer = views.layers.TipLayer;
    /**
     * 弹出层管理器（最上层的弹出框）
     */
    var TipLayerManager = /** @class */ (function () {
        /**
         * 弹出层管理器
         */
        function TipLayerManager() {
            TipLayerManager.tipLayer = new views.layers.TipLayer();
            TipLayerManager.tipLayer.showMainSceneCursor();
        }
        TipLayerManager.getInstance = function () {
            if (!TipLayerManager.instance)
                TipLayerManager.instance = new TipLayerManager();
            return TipLayerManager.instance;
        };
        TipLayerManager.prototype.initTip = function () {
        };
        return TipLayerManager;
    }());
    managers.TipLayerManager = TipLayerManager;
})(managers || (managers = {}));
//# sourceMappingURL=TipLayerManager.js.map
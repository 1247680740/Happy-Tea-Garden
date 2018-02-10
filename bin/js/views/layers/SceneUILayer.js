var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var layers;
    (function (layers) {
        var BaseView = views.base.BaseView;
        var GameConfig = configs.GameConfig;
        /**
         * 茶园场景UI层
         */
        var SceneUILayer = /** @class */ (function (_super) {
            __extends(SceneUILayer, _super);
            function SceneUILayer() {
                var _this = _super.call(this) || this;
                _this.downToolBarView = views.teaRoom.toolBar.DownToolBarView.instance;
                _this.downToolBarView.name = "downToolBarView";
                _this.downToolBarView.x = (GameConfig.GAME_WINDOW_WIDTH - _this.downToolBarView.width >> 1) >> 1;
                _this.downToolBarView.x -= 50;
                _this.downToolBarView.y = 570;
                _this.addChild(_this.downToolBarView);
                _this.rightDownToolBarView = new views.teaRoom.toolBar.RightDownToolBarView();
                _this.rightDownToolBarView.name = "rightDownToolBarView";
                _this.rightDownToolBarView.x = _this.downToolBarView.x + _this.downToolBarView.width + 20;
                _this.rightDownToolBarView.y = 550;
                _this.addChild(_this.rightDownToolBarView);
                // 光标设置
                _this.resetCursorState();
                Laya.timer.loop(100, _this, _this.updateCursorPosFn);
                return _this;
            }
            Object.defineProperty(SceneUILayer, "instance", {
                get: function () {
                    if (!SceneUILayer._instance)
                        SceneUILayer._instance = new SceneUILayer();
                    return SceneUILayer._instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 复位光标状态（普通鼠标类型）
             */
            SceneUILayer.prototype.resetCursorState = function () {
                if (TipLayerManager.tipLayer) {
                    if (!TipLayerManager.tipLayer.getChildByName("sceneCursor"))
                        TipLayerManager.tipLayer.addChild(views.teaRoom.toolBar.DownToolBarView.curShowCursor);
                }
                this.downToolBarView.setShowTypeAndState("commonMouse", this.downToolBarView.commonMouse);
            };
            /**
             * 更新光标位置
             */
            SceneUILayer.prototype.updateCursorPosFn = function () {
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.x = Laya.stage.mouseX;
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.y = Laya.stage.mouseY;
            };
            return SceneUILayer;
        }(BaseView));
        layers.SceneUILayer = SceneUILayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=SceneUILayer.js.map
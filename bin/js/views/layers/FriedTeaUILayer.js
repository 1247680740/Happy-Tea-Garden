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
         * 炒茶室UI层
         */
        var FriedTeaUILayer = /** @class */ (function (_super) {
            __extends(FriedTeaUILayer, _super);
            function FriedTeaUILayer() {
                var _this = _super.call(this) || this;
                // this.playerInfoView = PlayerInfoCtrl.playerInfoView;
                // this.playerInfoView.x=5;
                // this.playerInfoView.y=0;
                // this.playerInfoView.visible=true;
                // this.addChild(this.playerInfoView);
                _this.downToolBarView = views.friedRoom.toolBar.FireTeaHome_DownToolBarView.instance;
                _this.downToolBarView.x = (GameConfig.GAME_WINDOW_WIDTH - _this.downToolBarView.width >> 1) >> 1;
                _this.downToolBarView.x -= 50;
                _this.downToolBarView.y = 570;
                _this.addChild(_this.downToolBarView);
                _this.rightDownToolBarView = new views.friedRoom.toolBar.FriedRightDownToolBarView();
                _this.rightDownToolBarView.x = _this.downToolBarView.x + _this.downToolBarView.width + 30;
                _this.rightDownToolBarView.y = 545;
                _this.addChild(_this.rightDownToolBarView);
                // 光标设置
                // this.resetCursorState();
                Laya.timer.loop(100, _this, _this.updateCursorPosFn);
                return _this;
            }
            /**
             * 复位光标状态（普通鼠标类型）
             */
            FriedTeaUILayer.prototype.resetCursorState = function () {
                if (TipLayerManager.tipLayer) {
                    if (!TipLayerManager.tipLayer.getChildByName("fireTeaCursor"))
                        TipLayerManager.tipLayer.addChild(views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor);
                }
                this.downToolBarView.setShowTypeAndState2("hand1", this.downToolBarView.hand1);
                console.log("鼠标复位成功");
            };
            /**
             * 更新光标位置
             */
            FriedTeaUILayer.prototype.updateCursorPosFn = function () {
                views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.x = Laya.stage.mouseX;
                views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.y = Laya.stage.mouseY;
            };
            FriedTeaUILayer.prototype.init = function (event) {
                _super.prototype.init.call(this);
            };
            return FriedTeaUILayer;
        }(BaseView));
        layers.FriedTeaUILayer = FriedTeaUILayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=FriedTeaUILayer.js.map
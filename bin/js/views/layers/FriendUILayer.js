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
         * 好友UI层（进入好友主页面UI层）
         */
        var FriendUILayer = /** @class */ (function (_super) {
            __extends(FriendUILayer, _super);
            function FriendUILayer() {
                var _this = _super.call(this) || this;
                _this.friendInfoView = controllers.player.PlayerInfoCtrl.friendInfoView;
                _this.friendInfoView.x = _this.friendInfoView.width + 15;
                _this.friendInfoView.y = 0;
                _this.friendInfoView.visible = true;
                _this.addChild(_this.friendInfoView);
                _this.downToolBarView = views.friendList.FriendList_DownToolBarView.instance;
                _this.downToolBarView.x = GameConfig.GAME_WINDOW_WIDTH - _this.downToolBarView.width >> 1;
                _this.downToolBarView.y = 570;
                _this.addChild(_this.downToolBarView);
                _this.rightDownToolBarView = new views.teaRoom.toolBar.RightDownToolBarView();
                _this.rightDownToolBarView.name = "rightDownToolBarView";
                _this.rightDownToolBarView.x = _this.downToolBarView.x + _this.downToolBarView.width + 30;
                _this.rightDownToolBarView.y = 575;
                _this.rightDownToolBarView.storage.visible = false;
                _this.rightDownToolBarView.shop.visible = false;
                _this.rightDownToolBarView.teaWiki.visible = false;
                _this.rightDownToolBarView.exam.visible = false;
                _this.rightDownToolBarView.storage.mouseEnabled = false;
                _this.rightDownToolBarView.shop.mouseEnabled = false;
                _this.rightDownToolBarView.teaWiki.mouseEnabled = false;
                _this.rightDownToolBarView.exam.mouseEnabled = false;
                _this.addChild(_this.rightDownToolBarView);
                _this.resetCursorState();
                Laya.timer.loop(100, _this, _this.updateCursorPosFn);
                return _this;
            }
            Object.defineProperty(FriendUILayer, "instance", {
                get: function () {
                    if (!FriendUILayer._instance)
                        FriendUILayer._instance = new FriendUILayer();
                    return FriendUILayer._instance;
                },
                enumerable: true,
                configurable: true
            });
            FriendUILayer.prototype.init = function (event) {
                _super.prototype.init.call(this);
            };
            /**
             * 复位光标状态（普通鼠标类型）
             */
            FriendUILayer.prototype.resetCursorState = function () {
                if (TipLayerManager.tipLayer) {
                    if (!TipLayerManager.tipLayer.getChildByName("friendSceneCursor"))
                        TipLayerManager.tipLayer.addChild(views.friendList.FriendList_DownToolBarView.curShowCursor);
                }
                this.downToolBarView.setShowTypeAndState("commonMouse", this.downToolBarView.commonMouse);
            };
            /**
             * 更新光标位置
             */
            FriendUILayer.prototype.updateCursorPosFn = function () {
                views.friendList.FriendList_DownToolBarView.curShowCursor.x = Laya.stage.mouseX;
                views.friendList.FriendList_DownToolBarView.curShowCursor.y = Laya.stage.mouseY;
            };
            return FriendUILayer;
        }(BaseView));
        layers.FriendUILayer = FriendUILayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendUILayer.js.map
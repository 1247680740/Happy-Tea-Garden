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
    var friendList;
    (function (friendList) {
        var Event = laya.events.Event;
        var FriendList_DownToolBarUI = ui.gameUI.toolBar.FriendList_DownToolBarUI;
        var Image = laya.ui.Image;
        /**
         * 下部工具条视图
         */
        var FriendList_DownToolBarView = /** @class */ (function (_super) {
            __extends(FriendList_DownToolBarView, _super);
            function FriendList_DownToolBarView() {
                var _this = _super.call(this) || this;
                FriendList_DownToolBarView.curShowCursor = new Image();
                // 鼠标可穿透，增加点击的精确性
                _this.mouseThrough = true;
                _this.on(Event.CLICK, _this, _this.toolBarClkedFn);
                return _this;
            }
            Object.defineProperty(FriendList_DownToolBarView, "instance", {
                get: function () {
                    if (!FriendList_DownToolBarView._instance)
                        FriendList_DownToolBarView._instance = new FriendList_DownToolBarView();
                    return FriendList_DownToolBarView._instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 点击工具条上的各个功能按钮
             */
            FriendList_DownToolBarView.prototype.toolBarClkedFn = function (event) {
                var curName = event.target.name;
                if (this.toolBoxView)
                    this.toolBoxView.visible = false;
                // 普通手型光标
                if (curName == "commonMouse") {
                    this.setShowTypeAndState("commonMouse", this.commonMouse);
                } // 我的家园
                else if (curName == "myHome") {
                    UILayerManager.uiLayer.loadTeaRoom();
                } // 工具箱
                else if (curName === "toolBox") {
                    if (!this.toolBoxView)
                        this.toolBoxView = new views.friendList.FriendList_DownToolBoxView();
                    this.toolBoxView.visible = true;
                    this.toolBoxView.name = "toolBoxView";
                    UILayerManager.friendUILayer.addChild(this.toolBoxView);
                    this.toolBoxView.x = this.toolBox.x + 160;
                    this.toolBoxView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - this.toolBoxView.height - 50;
                } // 全部收获
                else if (curName == "harvestAll") {
                    this.setShowTypeAndState("harvestAll", this.harvestAll);
                }
            };
            /**
             * 设置当前光标的类型和状态
             * @param type 操作类型
             * @param btnOrImg 图标对象，如 Button/Image
             */
            FriendList_DownToolBarView.prototype.setShowTypeAndState = function (type, btnOrImg) {
                configs.GameConfig.curOperateType = type;
                FriendList_DownToolBarView.curShowCursor.skin = btnOrImg.skin;
                FriendList_DownToolBarView.curShowCursor.name = btnOrImg.name;
                FriendList_DownToolBarView.curShowCursor.x = btnOrImg.x;
                FriendList_DownToolBarView.curShowCursor.y = btnOrImg.y - 50;
                if (btnOrImg.name == "commonMouse") {
                    FriendList_DownToolBarView.curShowCursor.pivotX = 5;
                    FriendList_DownToolBarView.curShowCursor.pivotY = 5;
                }
                else {
                    FriendList_DownToolBarView.curShowCursor.pivotX = 5;
                    FriendList_DownToolBarView.curShowCursor.pivotY = FriendList_DownToolBarView.curShowCursor.height / 2 + 10;
                }
            };
            return FriendList_DownToolBarView;
        }(FriendList_DownToolBarUI));
        friendList.FriendList_DownToolBarView = FriendList_DownToolBarView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendList_DownToolBarView.js.map
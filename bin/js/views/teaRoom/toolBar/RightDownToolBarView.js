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
    var teaRoom;
    (function (teaRoom) {
        var toolBar;
        (function (toolBar) {
            var Event = laya.events.Event;
            var RightDownToolBarUI = ui.gameUI.toolBar.RightDownToolBarUI;
            var DownToolBarView = views.teaRoom.toolBar.DownToolBarView;
            /**
             * 右下部工具条：仓库、商店……
             */
            var RightDownToolBarView = /** @class */ (function (_super) {
                __extends(RightDownToolBarView, _super);
                function RightDownToolBarView() {
                    var _this = _super.call(this) || this;
                    _this.mouseThrough = true;
                    _this.on(Event.CLICK, _this, _this.btnClkedFn);
                    return _this;
                }
                RightDownToolBarView.prototype.btnClkedFn = function (event) {
                    var btnName = event.target.name;
                    if (btnName == "storage") {
                        controllers.teaRoom.storage.StorageCtrl.getInstance().showStorageDialog();
                        this.setShowTypeAndState("commonMouse", DownToolBarView.commonMouse);
                    }
                    else if (btnName == "shop") {
                        controllers.teaRoom.shop.ShopCtrl.getInstance().showShopDialog();
                        this.setShowTypeAndState("commonMouse", DownToolBarView.commonMouse);
                    }
                    else if (btnName == "teaWiki") {
                        controllers.teaWiki.TeaWikiCtrl.getInstance().showFireTeaWiki();
                        this.setShowTypeAndState("commonMouse", DownToolBarView.commonMouse);
                    }
                    else if (btnName == "exam") {
                        controllers.exam.ExamDialogCtrl.getInstance().showExamDialog();
                        this.setShowTypeAndState("commonMouse", DownToolBarView.commonMouse);
                    }
                    else if (btnName == "friendBtn") {
                        controllers.friendList.FriendListCtrl.getInstance().showFriendList();
                        this.setShowTypeAndState("commonMouse", DownToolBarView.commonMouse);
                    }
                };
                /**
                 * 设置当前光标的类型和状态
                 * @param type 操作类型
                 * @param btnOrImg 图标对象，如 Button/Image
                 */
                RightDownToolBarView.prototype.setShowTypeAndState = function (type, btnOrImg) {
                    configs.GameConfig.curOperateType = type;
                    DownToolBarView.curShowCursor.skin = btnOrImg.skin;
                    DownToolBarView.curShowCursor.name = btnOrImg.name;
                    DownToolBarView.curShowCursor.x = btnOrImg.x;
                    DownToolBarView.curShowCursor.y = btnOrImg.y - 50;
                    if (btnOrImg.name == "commonMouse") {
                        DownToolBarView.curShowCursor.pivotX = 5;
                        DownToolBarView.curShowCursor.pivotY = 5;
                    }
                    else {
                        DownToolBarView.curShowCursor.pivotX = 5;
                        DownToolBarView.curShowCursor.pivotY = DownToolBarView.curShowCursor.height / 2 + 10;
                    }
                };
                return RightDownToolBarView;
            }(RightDownToolBarUI));
            toolBar.RightDownToolBarView = RightDownToolBarView;
        })(toolBar = teaRoom.toolBar || (teaRoom.toolBar = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=RightDownToolBarView.js.map
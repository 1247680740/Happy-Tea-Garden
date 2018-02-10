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
    var friedRoom;
    (function (friedRoom) {
        var toolBar;
        (function (toolBar) {
            var Event = laya.events.Event;
            var FriedRightDownToolBarUI = ui.gameUI.toolBar.FireTeaHome_RightDownToolBarUI;
            var FriedTeaHomeShopCtrl = controllers.friedRoom.shop.FriedTeaHomeShopCtrl;
            var FriedTeaStorageCtrl = controllers.friedRoom.storage.FriedTeaStorageCtrl;
            var ExamDialogCtrl = controllers.exam.ExamDialogCtrl;
            var TeaWikiCtrl = controllers.teaWiki.TeaWikiCtrl;
            var FireTeaHome_DownToolBarView = views.friedRoom.toolBar.FireTeaHome_DownToolBarView;
            /**
             * 炒茶室右下部工具条：仓库、商店……
             */
            var FriedRightDownToolBarView = /** @class */ (function (_super) {
                __extends(FriedRightDownToolBarView, _super);
                function FriedRightDownToolBarView() {
                    var _this = _super.call(this) || this;
                    _this.mouseThrough = true;
                    _this.on(Event.CLICK, _this, _this.btnClkedFn);
                    return _this;
                }
                FriedRightDownToolBarView.prototype.btnClkedFn = function (event) {
                    var btnName = event.target.name;
                    if (btnName == "storage") {
                        FriedTeaStorageCtrl.getInstance().showStorageDialog();
                        this.setShowTypeAndState2("hand1", FireTeaHome_DownToolBarView.commonMouse);
                    }
                    else if (btnName == "shop") {
                        FriedTeaHomeShopCtrl.getInstance().showShopDialog();
                        this.setShowTypeAndState2("hand1", FireTeaHome_DownToolBarView.commonMouse);
                    }
                    else if (btnName == "teaWiki") {
                        TeaWikiCtrl.getInstance().showFireTeaWiki();
                        this.setShowTypeAndState2("hand1", FireTeaHome_DownToolBarView.commonMouse);
                    }
                    else if (btnName == "exam") {
                        ExamDialogCtrl.getInstance().showExamDialog();
                        this.setShowTypeAndState2("hand1", FireTeaHome_DownToolBarView.commonMouse);
                    }
                };
                /**
                 * 设置当前光标的类型和状态
                 * @param type 操作类型
                 * @param btnOrImg 图标对象，如 Button/Image
                 */
                FriedRightDownToolBarView.prototype.setShowTypeAndState2 = function (type, btnOrImg) {
                    configs.GameConfig.curOperateType = type;
                    FireTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
                    FireTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
                    FireTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
                    FireTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;
                    if (btnOrImg.name == "hand1") {
                        FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
                        FireTeaHome_DownToolBarView.curCursor.pivotY = 5;
                    }
                    else {
                        FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
                        FireTeaHome_DownToolBarView.curCursor.pivotY = FireTeaHome_DownToolBarView.curCursor.height / 2 + 10;
                    }
                };
                return FriedRightDownToolBarView;
            }(FriedRightDownToolBarUI));
            toolBar.FriedRightDownToolBarView = FriedRightDownToolBarView;
        })(toolBar = friedRoom.toolBar || (friedRoom.toolBar = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=FireTeaHome_RightDownToolBarView.js.map
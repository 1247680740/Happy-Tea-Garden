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
    var makeRoom;
    (function (makeRoom) {
        var toolBar;
        (function (toolBar) {
            var Event = laya.events.Event;
            var MakeTeaRightDownToolBarUI = ui.gameUI.toolBar.MakeTeaHome_RightDownToolBarUI;
            var MakeTeaHomeShopCtrl = controllers.makeRoom.shop.MakeTeaHomeShopCtrl;
            var MakeTeaStorageCtrl = controllers.makeRoom.storage.MakeTeaStorageCtrl;
            var ExamDialogCtrl = controllers.exam.ExamDialogCtrl;
            var TeaWikiCtrl = controllers.teaWiki.TeaWikiCtrl;
            var MakeTeaHome_DownToolBarView = views.makeRoom.toolBar.MakeTeaHome_DownToolBarView;
            /**
             * 泡茶室右下部工具条：仓库、商店……
             */
            var MakeTeaRightDownToolBarView = /** @class */ (function (_super) {
                __extends(MakeTeaRightDownToolBarView, _super);
                function MakeTeaRightDownToolBarView() {
                    var _this = _super.call(this) || this;
                    _this.on(Event.CLICK, _this, _this.btnClkedFn);
                    return _this;
                }
                MakeTeaRightDownToolBarView.prototype.btnClkedFn = function (event) {
                    var btnName = event.target.name;
                    if (btnName == "storage") {
                        MakeTeaStorageCtrl.getInstance().showStorageDialog();
                        // this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
                    }
                    else if (btnName == "shop") {
                        MakeTeaHomeShopCtrl.getInstance().showShopDialog();
                        // this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
                    }
                    else if (btnName == "teaWiki") {
                        TeaWikiCtrl.getInstance().showFireTeaWiki();
                        // this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
                    }
                    else if (btnName == "exam") {
                        ExamDialogCtrl.getInstance().showExamDialog();
                        // this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
                    }
                };
                /**
                 * 设置当前光标的类型和状态
                 * @param type 操作类型
                 * @param btnOrImg 图标对象，如 Button/Image
                 */
                MakeTeaRightDownToolBarView.prototype.setShowTypeAndState2 = function (type, btnOrImg) {
                    configs.GameConfig.curOperateType = type;
                    MakeTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
                    MakeTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
                    MakeTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
                    MakeTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;
                    console.info("当前选中 id：" + btnOrImg.name + ", skin:" + btnOrImg.skin);
                };
                return MakeTeaRightDownToolBarView;
            }(MakeTeaRightDownToolBarUI));
            toolBar.MakeTeaRightDownToolBarView = MakeTeaRightDownToolBarView;
        })(toolBar = makeRoom.toolBar || (makeRoom.toolBar = {}));
    })(makeRoom = views.makeRoom || (views.makeRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=MakeTeaHome_RightDownToolBarView.js.map
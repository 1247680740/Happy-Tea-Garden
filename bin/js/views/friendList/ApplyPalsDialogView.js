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
        var SinglePersonUI = ui.gameUI.friendList.SinglePersonUI;
        var AddFriendDialogCtrl = controllers.friendList.AddFriendDialogCtrl;
        var FriendListCtrl = controllers.friendList.FriendListCtrl;
        /**
         * 好友申请弹窗面板
         */
        var ApplyPalsDialogView = /** @class */ (function (_super) {
            __extends(ApplyPalsDialogView, _super);
            function ApplyPalsDialogView() {
                var _this = _super.call(this) || this;
                // 图片路径
                _this.imgPath = "gameUI/friendList/";
                //图片后缀名
                _this.imgSuffix = ".png";
                // 当前页数
                _this.curPage = 1;
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                _this.addAllBtn1.visible = false;
                _this.botoom.visible = false;
                ApplyPalsDialogView.IdStr = "";
                _this.gridContainer.vScrollBarSkin = "";
                _this.dialogTitle.skin = _this.imgPath + "applyTitle" + _this.imgSuffix;
                _this.listTitle.skin = _this.imgPath + "applyTopTip" + _this.imgSuffix;
                _this.addAllBtnBg.skin = _this.imgPath + "agreeAll" + _this.imgSuffix;
                _this.addAllBtn.on(Laya.Event.CLICK, _this, _this.agreeAll);
                _this.lastPageBtn.on(Laya.Event.CLICK, _this, _this.lastPagePals);
                _this.nextPageBtn.on(Laya.Event.CLICK, _this, _this.nextPagePals);
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.cancleBtnFn);
                return _this;
            }
            ApplyPalsDialogView.prototype.addNewPalInfo = function (newPalInfoVOArr) {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                if (newPalInfoVOArr.length <= 0) {
                    var textAri = new Laya.TextArea();
                    textAri.text = "温馨提示：暂时还没有好友向你发出请求";
                    textAri.size(232, 18);
                    textAri.fontSize = 12;
                    textAri.color = "#885B2E";
                    this.gridContainer.addChild(textAri);
                    textAri.pos(0, this.gridContainer.height >> 1);
                    this.firstPage.text = this.pageNums.text = 1 + "";
                }
                else {
                    var len = newPalInfoVOArr.length;
                    var i = void 0;
                    var userVO = void 0;
                    friendList.AddFriendDialogView.IdStr = "";
                    friendList.AddFriendDialogView.index = 0;
                    for (i = 0; i < len; i++) {
                        userVO = newPalInfoVOArr[i];
                        var gridItem = new SinglePersonUI();
                        gridItem.name = (i + 1) + "";
                        this.firstPage.text = this.curPage + "";
                        this.pageNums.text = userVO.pageNums;
                        gridItem.orderBg.skin = this.imgPath + "love" + this.imgSuffix;
                        gridItem.orderNum.text = userVO.level + "";
                        gridItem.personName.text = userVO.userName;
                        gridItem.x = 10;
                        gridItem.y = i * (gridItem.height + 3);
                        // 最多显示7小项
                        if (i < 7)
                            this.gridContainer.addChild(gridItem);
                        ApplyPalsDialogView.IdStr += userVO.userId + ",";
                    }
                }
            };
            ApplyPalsDialogView.prototype.agreeAll = function () {
                if (ApplyPalsDialogView.IdStr.indexOf(",") > 0) {
                    var str = ApplyPalsDialogView.IdStr;
                    ApplyPalsDialogView.IdStr = (str.substring(str.length - 1) == ",") ? str.substring(0, str.length - 1) : str;
                    AddFriendDialogCtrl.getInstance().request_agreeApply(ApplyPalsDialogView.IdStr, 1);
                }
                else {
                    return;
                }
            };
            ApplyPalsDialogView.prototype.lastPagePals = function () {
                if (parseInt(this.firstPage.text) < 2)
                    return;
                this.curPage--;
                if (this.curPage < 1) {
                    this.curPage = 1;
                    this.firstPage.text = this.curPage + "";
                }
                else {
                    this.firstPage.text = this.curPage + "";
                    FriendListCtrl.getInstance().request_getPalsApply(this.curPage);
                }
            };
            ApplyPalsDialogView.prototype.nextPagePals = function () {
                if (parseInt(this.pageNums.text) < 2)
                    return;
                this.curPage++;
                if (this.curPage > parseInt(this.pageNums.text)) {
                    this.curPage = parseInt(this.pageNums.text);
                    this.firstPage.text = this.curPage + "";
                }
                else {
                    this.firstPage.text = this.curPage + "";
                    FriendListCtrl.getInstance().request_getPalsApply(this.curPage);
                }
            };
            ApplyPalsDialogView.prototype.cancleBtnFn = function () {
                this.removeSelf();
            };
            ApplyPalsDialogView.index = 0;
            return ApplyPalsDialogView;
        }(ui.gameUI.friendList.SearchPalsUI));
        friendList.ApplyPalsDialogView = ApplyPalsDialogView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=ApplyPalsDialogView.js.map
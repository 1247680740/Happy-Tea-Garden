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
         * 添加好友弹窗面板
         */
        var AddFriendDialogView = /** @class */ (function (_super) {
            __extends(AddFriendDialogView, _super);
            function AddFriendDialogView() {
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
                _this.gridContainer.vScrollBarSkin = "";
                _this.addAllBtn.on(Laya.Event.CLICK, _this, _this.addFriend);
                _this.lastPageBtn.on(Laya.Event.CLICK, _this, _this.lastPagePals);
                _this.nextPageBtn.on(Laya.Event.CLICK, _this, _this.nextPagePals);
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.cancleBtnFn);
                return _this;
            }
            AddFriendDialogView.prototype.addNewPalInfo = function (newPalInfoVOArr) {
                if (!newPalInfoVOArr)
                    return;
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                var len = newPalInfoVOArr.length;
                var i;
                var userVO;
                AddFriendDialogView.IdStr = "";
                AddFriendDialogView.index = 0;
                for (i = 0; i < len; i++) {
                    userVO = newPalInfoVOArr[i];
                    var gridItem = new SinglePersonUI();
                    this.cb = this.createCheckBox(gridItem);
                    gridItem.name = (i + 1) + "";
                    this.firstPage.text = this.curPage + "";
                    this.pageNums.text = userVO.pageNums;
                    gridItem.orderBg.skin = this.imgPath + "love" + this.imgSuffix;
                    gridItem.orderNum.text = userVO.level + "";
                    gridItem.headPic.skin = userVO.imgurl;
                    gridItem.personName.text = userVO.userName;
                    this.curPalName = userVO.userName;
                    gridItem.statusPic.visible = false;
                    gridItem.x = 10;
                    gridItem.y = i * (gridItem.height + 3);
                    // 最多显示7小项
                    if (i < 7)
                        this.gridContainer.addChild(gridItem);
                    this.cb.on(Laya.Event.CLICK, this, this.selectItem, [userVO, this.cb]);
                }
            };
            AddFriendDialogView.prototype.lastPagePals = function () {
                if (parseInt(this.firstPage.text) < 2)
                    return;
                this.curPage--;
                if (this.curPage < 1) {
                    this.curPage = 1;
                    this.firstPage.text = this.curPage + "";
                }
                else {
                    this.firstPage.text = this.curPage + "";
                    FriendListCtrl.getInstance().request_getPagePals(this.curPalName, this.curPage);
                }
            };
            AddFriendDialogView.prototype.nextPagePals = function () {
                if (parseInt(this.pageNums.text) < 2)
                    return;
                this.curPage++;
                if (this.curPage > parseInt(this.pageNums.text)) {
                    this.curPage = parseInt(this.pageNums.text);
                    this.firstPage.text = this.curPage + "";
                }
                else {
                    this.firstPage.text = this.curPage + "";
                    FriendListCtrl.getInstance().request_getPagePals(this.curPalName, this.curPage);
                }
            };
            AddFriendDialogView.prototype.selectItem = function (userVO, cb) {
                if (cb.selected == true) {
                    AddFriendDialogView.index++;
                    if (AddFriendDialogView.index > 1) {
                        AddFriendDialogView.IdStr += "," + userVO.userId;
                    }
                    else {
                        AddFriendDialogView.IdStr += userVO.userId + ",";
                        var str = AddFriendDialogView.IdStr;
                        AddFriendDialogView.IdStr = (str.substring(str.length - 1) == ",") ? str.substring(0, str.length - 1) : str;
                    }
                }
                else {
                    var strStatus = AddFriendDialogView.IdStr.indexOf(userVO.userId);
                    if (strStatus >= 0) {
                        var delStr = userVO.userId;
                        AddFriendDialogView.IdStr = AddFriendDialogView.IdStr.replace(delStr, "");
                        var strRemove = AddFriendDialogView.IdStr;
                        AddFriendDialogView.IdStr = (strRemove.substring(strRemove.length - 1) == ",") ? strRemove.substring(0, strRemove.length - 1) : strRemove;
                    }
                    else {
                    }
                }
            };
            /** 创建一个checkBox组件 */
            AddFriendDialogView.prototype.createCheckBox = function (gridItem) {
                var cbSkin = this.imgPath + "checkbox1" + this.imgSuffix;
                var cb = new Laya.CheckBox(cbSkin);
                gridItem.addChild(cb);
                cb.pos(181, 12);
                cb.size(20, 20);
                cb.selected = false;
                return cb;
            };
            AddFriendDialogView.prototype.addFriend = function () {
                console.log("当前添加的Id：" + AddFriendDialogView.IdStr);
                AddFriendDialogCtrl.getInstance().request_startAddPals(AddFriendDialogView.IdStr);
                this.cancleBtnFn();
            };
            AddFriendDialogView.prototype.cancleBtnFn = function () {
                this.removeSelf();
            };
            // 选中的好友Id串
            AddFriendDialogView.IdStr = "";
            AddFriendDialogView.index = 0;
            return AddFriendDialogView;
        }(ui.gameUI.friendList.SearchPalsUI));
        friendList.AddFriendDialogView = AddFriendDialogView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=AddFriendDialogView.js.map
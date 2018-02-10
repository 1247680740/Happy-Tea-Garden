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
        /**
         * 推荐好友弹窗面板
         */
        var RecomPalsDialogView = /** @class */ (function (_super) {
            __extends(RecomPalsDialogView, _super);
            function RecomPalsDialogView() {
                var _this = _super.call(this) || this;
                // 图片路径
                _this.imgPath = "gameUI/friendList/";
                //图片后缀名
                _this.imgSuffix = ".png";
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                _this.addAllBtn1.visible = true;
                _this.botoom.visible = true;
                _this.listTitle.visible = false;
                _this.listTitleBg.visible = false;
                _this.addAllBtn.visible = false;
                _this.lastPageBtn.visible = false;
                _this.lastPageBtn.mouseEnabled = false;
                _this.nextPageBtn.visible = false;
                _this.nextPageBtn.mouseEnabled = false;
                _this.firstPage.visible = false;
                _this.pageNums.visible = false;
                _this.line.visible = false;
                _this.dialogTitle.skin = _this.imgPath + "recommonTitle" + _this.imgSuffix;
                _this.addAllBtn1.on(Laya.Event.CLICK, _this, _this.addFriend);
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.cancleBtnFn);
                return _this;
            }
            RecomPalsDialogView.prototype.addNewPalInfo = function (newPalInfoVOArr) {
                if (!newPalInfoVOArr)
                    return;
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                var len = newPalInfoVOArr.length;
                var i;
                var userVO;
                RecomPalsDialogView.IdStr = "";
                RecomPalsDialogView.index = 0;
                for (i = 0; i < len; i++) {
                    userVO = newPalInfoVOArr[i];
                    var gridItem = new SinglePersonUI();
                    this.cb = this.createCheckBox(gridItem);
                    gridItem.name = (i + 1) + "";
                    this.firstPage.text = 1 + "";
                    this.pageNums.text = userVO.pageNums;
                    gridItem.orderBg.skin = this.imgPath + "love" + this.imgSuffix;
                    gridItem.orderNum.text = userVO.level + "";
                    gridItem.headPic.skin = userVO.imgurl;
                    gridItem.personName.text = userVO.userName;
                    gridItem.statusPic.visible = false;
                    gridItem.statusPic.mouseEnabled = false;
                    gridItem.x = 10;
                    gridItem.y = i * (gridItem.height + 3);
                    // 最多显示7小项
                    if (i < 7)
                        this.gridContainer.addChild(gridItem);
                    this.cb.on(Laya.Event.CLICK, this, this.selectItem, [userVO, this.cb]);
                }
            };
            RecomPalsDialogView.prototype.selectItem = function (userVO, cb) {
                if (cb.selected == true) {
                    RecomPalsDialogView.index++;
                    if (RecomPalsDialogView.index > 1) {
                        RecomPalsDialogView.IdStr += "," + userVO.userId;
                    }
                    else {
                        RecomPalsDialogView.IdStr += userVO.userId + ",";
                        var str = RecomPalsDialogView.IdStr;
                        console.log("获得的Id字符串：" + str);
                        RecomPalsDialogView.IdStr = (str.substring(str.length - 1) == ",") ? str.substring(0, str.length - 1) : str;
                        console.log("完善后的Id字符串：" + RecomPalsDialogView.IdStr);
                    }
                }
                else {
                    var strStatus = RecomPalsDialogView.IdStr.indexOf(userVO.userId);
                    if (strStatus >= 0) {
                        var delStr = userVO.userId;
                        RecomPalsDialogView.IdStr = RecomPalsDialogView.IdStr.replace(delStr, "");
                        var strRemove = RecomPalsDialogView.IdStr;
                        console.log("移除符号后获得的Id字符串：" + strRemove);
                        RecomPalsDialogView.IdStr = (strRemove.substring(strRemove.length - 1) == ",") ? strRemove.substring(0, strRemove.length - 1) : strRemove;
                        console.log("移除后最终获得的的Id字符串：" + RecomPalsDialogView.IdStr);
                    }
                    else {
                    }
                }
            };
            /** 创建一个checkBox组件 */
            RecomPalsDialogView.prototype.createCheckBox = function (gridItem) {
                var cbSkin = this.imgPath + "checkbox1" + this.imgSuffix;
                var cb = new Laya.CheckBox(cbSkin);
                gridItem.addChild(cb);
                cb.pos(181, 12);
                cb.size(20, 20);
                cb.selected = false;
                return cb;
            };
            RecomPalsDialogView.prototype.addFriend = function () {
                console.log("当前添加的Id：" + RecomPalsDialogView.IdStr);
                AddFriendDialogCtrl.getInstance().request_sendApplyInfo(RecomPalsDialogView.IdStr);
            };
            RecomPalsDialogView.prototype.cancleBtnFn = function () {
                this.removeSelf();
            };
            // 选中的好友Id串
            RecomPalsDialogView.IdStr = "";
            RecomPalsDialogView.index = 0;
            return RecomPalsDialogView;
        }(ui.gameUI.friendList.SearchPalsUI));
        friendList.RecomPalsDialogView = RecomPalsDialogView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=RecomPalsDialogView.js.map
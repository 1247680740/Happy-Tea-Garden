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
        var bag;
        (function (bag) {
            var Event = laya.events.Event;
            var TabItemUI = ui.gameUI.common.TabItemUI;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            /**
             * 炒锅背包弹出面板
             */
            var FireTeaBagDialogView = /** @class */ (function (_super) {
                __extends(FireTeaBagDialogView, _super);
                function FireTeaBagDialogView() {
                    var _this = _super.call(this) || this;
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.cacheAs = "bitmap";
                    _this.bgImg.size(647, 268);
                    _this.size(647, 268);
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (647 - 600) / 600;
                    var hRate = 268 / 400;
                    _this.closeBtn.x += _this.closeBtn.x * wRate;
                    _this.closeBtn.y -= _this.closeBtn.y * hRate;
                    _this.titleImg.skin = "gameUI/common/icon/bagName.png";
                    _this.titleImg.x = _this.width - _this.titleImg.width >> 1;
                    _this.titleImg.y -= 8;
                    _this.toolTab = new TabItemUI();
                    _this.toolTab.tabName.skin = "gameUI/common/icon/toolTab.png";
                    _this.toolTab.pos(22, 70);
                    _this.addChild(_this.toolTab);
                    _this.gridContainer = new Laya.Panel();
                    _this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                    _this.gridContainer.pos(117, 70);
                    _this.gridContainer.size(505, 172);
                    _this.addChild(_this.gridContainer);
                    _this.toolTabFn();
                    _this.toolTab.on(Event.CLICK, _this, _this.toolTabFn);
                    var rect = new Laya.Rectangle(-10, -10, _this.closeBtn.width + 20, _this.closeBtn.height + 20);
                    _this.closeBtn.hitArea = rect;
                    _this.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    return _this;
                }
                /**
                 * 填充背包格子（道具）
                 */
                FireTeaBagDialogView.prototype.addBagGrid = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr)
                        return;
                    if (voArr.length > 0) {
                        var len = voArr.length;
                        var i = void 0;
                        if (this.curSelectedTabName == "toolTab") {
                            var toolVO = void 0;
                            for (i = 0; i < len; i++) {
                                var gridItem = new ui.gameUI.common.BagGridItemUI();
                                toolVO = voArr[i];
                                gridItem.name = toolVO.id + "";
                                gridItem.lvl.text = toolVO.lvl + "级";
                                gridItem.nums.text = toolVO.nums + "";
                                gridItem.imgContainer.skin = toolVO.icon;
                                this.gridContainer.addChild(gridItem);
                                gridItem.x = i * (gridItem.width + 15);
                                gridItem.on(Event.CLICK, this, this.gridItemClkedFn);
                            }
                        }
                    }
                    else {
                        var l = new laya.ui.Label();
                        l.text = "空无一物，赶快去商店买些道具吧！";
                        l.fontSize = 15;
                        l.color = "#0000FF";
                        l.underline = true;
                        l.pos(this.gridContainer.width - l.width >> 1, this.gridContainer.height - l.height >> 1);
                        l.once(Event.CLICK, this, this.gotoShop);
                        this.gridContainer.addChild(l);
                    }
                };
                /**
                 * 跳转至商店
                 */
                FireTeaBagDialogView.prototype.gotoShop = function () {
                    this.closeBtnFn();
                    controllers.friedRoom.shop.FriedTeaHomeShopCtrl.getInstance().showShopDialog();
                };
                FireTeaBagDialogView.prototype.toolTabFn = function () {
                    this.toolTab.selectBg.visible = true;
                    this.toolTab.unSelectBg.visible = false;
                    this.curSelectedTabName = "toolTab";
                };
                /**
                 * 点击火把后
                 */
                FireTeaBagDialogView.prototype.gridItemClkedFn = function (event) {
                    console.log("cur name:" + event.target.name);
                    var curGrid = event.target;
                    if (!curGrid)
                        return;
                    if (this.curSelectedTabName == "toolTab") {
                        // ==================== 为炒锅加火时需用到此处 -- hsx ====================
                        configs.GameConfig.curOperateType = "fire";
                    }
                    curGrid.imgContainer.name = curGrid.name;
                    views.friedRoom.toolBar.FireTeaHome_DownToolBarView.instance.setShowTypeAndState2(configs.GameConfig.curOperateType, curGrid.imgContainer);
                    this.removeSelf();
                };
                FireTeaBagDialogView.prototype.closeBtnFn = function () {
                    this.removeSelf();
                };
                return FireTeaBagDialogView;
            }(BaseBorderUI));
            bag.FireTeaBagDialogView = FireTeaBagDialogView;
        })(bag = friedRoom.bag || (friedRoom.bag = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=FireTeaBagDialogView.js.map
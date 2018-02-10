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
        var bag;
        (function (bag) {
            var Event = laya.events.Event;
            var TabItemUI = ui.gameUI.common.TabItemUI;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            /**
             * 背包弹出面板
             */
            var BagDialogView = /** @class */ (function (_super) {
                __extends(BagDialogView, _super);
                function BagDialogView() {
                    var _this = _super.call(this) || this;
                    /** 类型前缀 */
                    _this.typePrefix = "gameUI/common/resTypeIcon/";
                    /** 类型后缀 */
                    _this.typeSuffix = ".png";
                    _this.cacheAs = "bitmap";
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.bgImg.size(647, 268);
                    _this.size(647, 268);
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (647 - 600) / 600;
                    var hRate = 268 / 400;
                    _this.closeBtn.x += _this.closeBtn.x * wRate;
                    _this.closeBtn.y -= _this.closeBtn.y * hRate;
                    // 缩放Dialog的尺寸
                    // Dialog.manager.popupEffect=null;
                    // Dialog.manager.closeEffect=null;
                    // this.scale(1.1,0.7);
                    _this.titleImg.skin = "gameUI/common/icon/bagName.png";
                    _this.titleImg.x = _this.width - _this.titleImg.width >> 1;
                    _this.titleImg.y -= 8;
                    _this.seedTab = new TabItemUI();
                    _this.seedTab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
                    _this.seedTab.pos(13, 70);
                    _this.addChild(_this.seedTab);
                    _this.toolTab = new TabItemUI();
                    _this.toolTab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
                    _this.toolTab.pos(13, 150);
                    _this.addChild(_this.toolTab);
                    _this.gridContainer = new Laya.Panel();
                    _this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                    _this.gridContainer.pos(110, 70);
                    _this.gridContainer.size(512, 172);
                    _this.addChild(_this.gridContainer);
                    // this.show();
                    //增加点击区
                    // 法一
                    // let g:Laya.Graphics = new Laya.Graphics();
                    // g.drawRect(-10,-10,this.closeBtn.width+20,this.closeBtn.height+20,"#000000");
                    // let hitA:Laya.HitArea = new Laya.HitArea();
                    // hitA.hit = g;
                    // this.closeBtn.hitArea = hitA;
                    // 法二
                    var rect = new Laya.Rectangle(-10, -10, _this.closeBtn.width + 20, _this.closeBtn.height + 20);
                    _this.closeBtn.hitArea = rect;
                    _this.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    // this.closeHandler = Handler.create(this,this.myCloseHandler,["close"]);
                    _this.seedTabFn();
                    // 点击种子选项卡
                    _this.seedTab.on(Event.CLICK, _this, _this.seedTabFn);
                    // 点击工具选项卡
                    _this.toolTab.on(Event.CLICK, _this, _this.toolTabFn);
                    return _this;
                }
                BagDialogView.prototype.seedTabFn = function () {
                    this.seedTab.selectBg.visible = true;
                    this.seedTab.unSelectBg.visible = false;
                    this.toolTab.selectBg.visible = false;
                    this.toolTab.unSelectBg.visible = true;
                    this.curSelectedTabName = "seedTab";
                    this.addBagGrid([]);
                };
                /** 填充背包格子（种子、道具） */
                BagDialogView.prototype.addBagGrid = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr || !voArr.length)
                        return;
                    var len = voArr.length;
                    var i;
                    // 种子
                    if (this.curSelectedTabName == "seedTab") {
                        var seedVO = void 0;
                        for (i = 0; i < len; i++) {
                            // 尝试 MovieClip 同步统一加载（没异步加载方便！）
                            var gridItem = new ui.gameUI.common.BagGridItemUI();
                            seedVO = voArr[i];
                            gridItem.name = seedVO.id + "";
                            gridItem.lvl.text = seedVO.lvl + "";
                            gridItem.nums.text = seedVO.seedNums + "";
                            var _type = void 0;
                            if (seedVO.type == "teaseed")
                                _type = "tea";
                            else if (seedVO.type == "flowerseed")
                                _type = "flower";
                            else if (seedVO.type == "othersseed")
                                _type = "food";
                            if (_type)
                                gridItem.typeIcon.skin = this.typePrefix + _type + this.typeSuffix;
                            // gridItem.imgContainer.addChild(mc);
                            gridItem.imgContainer.skin = seedVO.icon;
                            this.gridContainer.addChild(gridItem);
                            console.log("type:" + seedVO.type);
                            // 每行最多放 6 个
                            if (i >= 6) {
                                gridItem.x = parseInt((i - 6) % 6 + "") * (gridItem.width + 15);
                                gridItem.y = (parseInt((i - 6) / 6 + "") + 1) * (gridItem.height + 15);
                            }
                            else {
                                gridItem.x = i * (gridItem.width + 15);
                            }
                            gridItem.on(Event.CLICK, this, this.gridItemClkedFn);
                        }
                    } // 道具
                    else if (this.curSelectedTabName == "toolTab") {
                        var toolVO = void 0;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.BagGridItemUI();
                            toolVO = voArr[i];
                            gridItem.name = toolVO.id + "";
                            gridItem.lvl.text = toolVO.lvl + "";
                            gridItem.nums.text = toolVO.nums + "";
                            gridItem.typeIcon.skin = this.typePrefix + toolVO["type"] + this.typeSuffix;
                            // gridItem.imgContainer.addChild(mc);
                            gridItem.imgContainer.skin = toolVO.icon;
                            this.gridContainer.addChild(gridItem);
                            // this.gridContainer.space = 15;
                            gridItem.x = i * (gridItem.width + 15);
                            gridItem.on(Event.CLICK, this, this.gridItemClkedFn);
                        }
                    }
                };
                BagDialogView.prototype.toolTabFn = function () {
                    this.toolTab.selectBg.visible = true;
                    this.toolTab.unSelectBg.visible = false;
                    this.seedTab.selectBg.visible = false;
                    this.seedTab.unSelectBg.visible = true;
                    this.curSelectedTabName = "toolTab";
                };
                /**
                 * 注意：调用 laya 的关闭操作再打开不显示
                 */
                BagDialogView.prototype.myCloseHandler = function (name) {
                    if (name === Dialog.CLOSE) {
                        console.log("BagDialogView has closed...");
                        // this.visible = false;
                        this.removeSelf();
                    }
                };
                /** 点击种子或化肥后 */
                BagDialogView.prototype.gridItemClkedFn = function (event) {
                    console.log("cur name:" + event.target.name);
                    var curGrid = event.target;
                    if (!curGrid)
                        return;
                    // 种子 => 种植
                    if (this.curSelectedTabName == "seedTab") {
                        configs.GameConfig.curOperateType = "plant";
                    } // 道具 => 化肥 （不只化肥，待完善！！！）
                    else if (this.curSelectedTabName == "toolTab") {
                        configs.GameConfig.curOperateType = "fertilize";
                    }
                    curGrid.imgContainer.name = curGrid.name;
                    views.teaRoom.toolBar.DownToolBarView.instance.setShowTypeAndState(configs.GameConfig.curOperateType, curGrid.imgContainer);
                    this.removeSelf();
                };
                BagDialogView.prototype.closeBtnFn = function () {
                    // this.close("close");
                    // this.closeHandler
                    this.removeSelf();
                    // this.destroy();	// 不销毁,否则后续报错
                    // 默认选中第一个选项卡
                    this.seedTabFn();
                };
                return BagDialogView;
            }(BaseBorderUI));
            bag.BagDialogView = BagDialogView;
        })(bag = teaRoom.bag || (teaRoom.bag = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=BagDialogView.js.map
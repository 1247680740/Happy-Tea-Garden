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
        var storage;
        (function (storage) {
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var StorageDialogUI = ui.gameUI.storage.StorageDialogUI;
            var Event = laya.events.Event;
            /**
             * 泡茶室仓库面板
             */
            var MakeTeaStorageView = /** @class */ (function (_super) {
                __extends(MakeTeaStorageView, _super);
                function MakeTeaStorageView() {
                    var _this = _super.call(this) || this;
                    /** 卖出数量 */
                    _this.saleNums = 0;
                    _this.titleUrl = "gameUI/common/icon/storageName.png";
                    _this.baseUrl = "gameUI/common/icon/";
                    /** 类型前缀 */
                    _this.typePrefix = _this.baseUrl + "resTypeIcon/";
                    /** 类型后缀 */
                    _this.typeSuffix = ".png";
                    /** 茶叶 */
                    _this.teaLogoUrl = _this.baseUrl + "teaTabBg.png";
                    /** 道具 */
                    _this.toolLogoUrl = _this.baseUrl + "toolTabBg.png";
                    _this.hasInit = false;
                    _this.seedTabFn();
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.cacheAs = "bitmap";
                    ////////// =>
                    _this.bgUI = new BaseBorderUI();
                    _this.bgUI.bgImg.size(788, 450);
                    _this.bgUI.size(788, 450);
                    _this.bgUI.addChild(_this);
                    _this.x = _this.y = 15;
                    _this.bgUI.titleImg.skin = _this.titleUrl;
                    _this.bgUI.titleImg.x = _this.width - _this.bgUI.titleImg.width >> 1;
                    _this.bgUI.titleImg.y += 3;
                    _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (788 - 600) / 600;
                    var hRate = (450 - 400) / 400;
                    _this.bgUI.closeBtn.x += _this.bgUI.closeBtn.x * wRate;
                    _this.bgUI.closeBtn.y -= _this.bgUI.closeBtn.y * hRate;
                    _this.bgUI.closeBtn.scale(1.3, 1.3);
                    _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    ////////// <=
                    _this.saleNumTxt.restrict = "0-9";
                    _this.decorateTab.visible = false;
                    _this.fruitTab.visible = false;
                    _this.seedTab.getChildByName("tabIcon").skin = _this.teaLogoUrl;
                    _this.toolTab.getChildByName("tabIcon").skin = _this.toolLogoUrl;
                    // 种子（=> 茶叶）
                    _this.seedTab.on(Event.CLICK, _this, _this.seedTabFn);
                    // 工具（=> 道具）
                    _this.toolTab.on(Event.CLICK, _this, _this.toolTabFn);
                    return _this;
                    // this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
                }
                MakeTeaStorageView.prototype.seedTabFn = function () {
                    this.curSelectedTabName = "seedTab";
                    this.selectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.unSelectTab(this.fruitTab);
                    this.unSelectTab(this.decorateTab);
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                MakeTeaStorageView.prototype.toolTabFn = function () {
                    this.curSelectedTabName = "toolTab";
                    this.selectTab(this.toolTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.fruitTab);
                    this.unSelectTab(this.decorateTab);
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                MakeTeaStorageView.prototype.selectTab = function (tab) {
                    tab.getChildByName("selectBg").visible = true;
                    tab.getChildByName("unSelectBg").visible = false;
                };
                MakeTeaStorageView.prototype.unSelectTab = function (tab) {
                    tab.getChildByName("selectBg").visible = false;
                    tab.getChildByName("unSelectBg").visible = true;
                };
                /**
                 * 将原素材的 swf 格式转换成 png 格式
                 */
                MakeTeaStorageView.prototype.translateSwfTypeToPngType = function (swfUrl) {
                    var pngUrl;
                    if (!swfUrl)
                        return null;
                    pngUrl = swfUrl.substring(0, swfUrl.lastIndexOf("."));
                    pngUrl += ".png";
                    return pngUrl;
                };
                /**
                 * 填充仓库格子 ———— 此函数待重构！
                 */
                MakeTeaStorageView.prototype.addStorageGrids = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr || !voArr.length)
                        return;
                    var toolObjArr = ResourceManager.toolsObjArr;
                    var toolObj;
                    var len = voArr.length;
                    var len2 = toolObjArr.length;
                    var i;
                    var j;
                    // 种子（原料）
                    if (this.curSelectedTabName == "seedTab") {
                        // 存储最终要用到的数据
                        var seedVO = void 0;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            seedVO = voArr[i];
                            gridItem.name = seedVO.id + "";
                            gridItem.lvl.text = seedVO.lvl + "级";
                            gridItem.nums.text = seedVO.fruitNums + "";
                            gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedVO.icon);
                            gridItem.imgContainer.size(50, 50);
                            gridItem.nameTxt.text = seedVO.name;
                            gridItem.salePrice.text = seedVO.fruitSalePrice + "";
                            gridItem.typeIcon.visible = false;
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                this.updateRightContent(seedVO);
                            }
                            // 每行最多放 4 个
                            if (i >= 4) {
                                gridItem.x = parseInt((i - 4) % 4 + "") * (gridItem.width + 5);
                                gridItem.y = (parseInt((i - 4) / 4 + "") + 1) * (gridItem.height + 5);
                            }
                            else {
                                gridItem.x = i * (gridItem.width + 5);
                            }
                            this.gridContainer.addChild(gridItem);
                            gridItem.on(Event.CLICK, this, this.updateRightContent, [seedVO]);
                        }
                    } // 道具
                    else if (this.curSelectedTabName == "toolTab") {
                        var toolVO = void 0;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            toolVO = voArr[i];
                            for (j = 0; j < len2; j++) {
                                toolObj = toolObjArr[j];
                                if (parseInt(toolObj["id"]) == toolVO.id) {
                                    gridItem.name = toolVO.id + "";
                                    gridItem.lvl.text = toolObj["level"] + "级";
                                    gridItem.nums.text = toolVO.nums + "";
                                    gridItem.imgContainer.skin = HttpConfig.serverResUrl + toolObj["res"];
                                    gridItem.nameTxt.text = toolObj["name"];
                                    gridItem.salePrice.text = toolVO.price + "";
                                    toolVO.name = toolObj["name"];
                                    toolVO.icon = HttpConfig.serverResUrl + toolObj["res"];
                                    toolVO.des = toolObj["desc"];
                                    toolVO.type = toolObj["category"];
                                }
                            }
                            // if((gridItem.imgContainer.width>60) && (gridItem.imgContainer.height>60))
                            gridItem.imgContainer.size(50, 50);
                            gridItem.typeIcon.visible = false;
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                this.updateRightContent(toolVO);
                            }
                            // 每行最多放 4 个
                            if (i >= 4) {
                                gridItem.x = parseInt((i - 4) % 4 + "") * (gridItem.width + 5);
                                gridItem.y = (parseInt((i - 4) / 4 + "") + 1) * (gridItem.height + 5);
                            }
                            else {
                                gridItem.x = i * (gridItem.width + 5);
                            }
                            this.gridContainer.addChild(gridItem);
                            gridItem.on(Event.CLICK, this, this.updateRightContent, [toolVO]);
                        }
                    }
                    this.hasInit = true;
                };
                /**
                 * 输入框输入后
                 */
                MakeTeaStorageView.prototype.saleNumsInputOverFn = function (event) {
                    if (isNaN(parseInt(this.saleNumTxt.text))) {
                        this.saleNums = 0;
                    }
                    else if (parseInt(this.saleNumTxt.text) > this.curItem["allNums"])
                        this.saleNums = this.curItem["allNums"];
                    else if (parseInt(this.saleNumTxt.text) < 0)
                        this.saleNums = 0;
                    else
                        this.saleNums = parseInt(this.saleNumTxt.text);
                    this.saleNumTxt.text = this.saleNums + "";
                    this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
                };
                /**
                 * 购买数量+1
                 */
                MakeTeaStorageView.prototype.addOneBtnFn = function (event) {
                    if (this.saleNums > this.curItem["allNums"])
                        return;
                    this.saleNums++;
                    if (this.saleNums > this.curItem["allNums"])
                        this.saleNums = this.curItem["allNums"];
                    this.saleNumTxt.text = this.saleNums + "";
                    this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
                };
                /**
                 * 购买数量-1
                 */
                MakeTeaStorageView.prototype.reduceOneBtnFn = function (event) {
                    if (this.saleNums == 0)
                        return;
                    this.saleNums--;
                    this.saleNumTxt.text = this.saleNums + "";
                    this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
                };
                /**
                 * 更新右侧信息
                 * obj格式： {"type":obj["st"],"vo":seedVO};
                 */
                MakeTeaStorageView.prototype.updateRightContent = function (obj) {
                    this.curItem = obj;
                    if (!obj || !obj["type"])
                        return;
                    var type = obj["type"];
                    var curObjData = obj;
                    if (!curObjData)
                        return;
                    switch (type) {
                        case "leaf":
                            this.priceOne.text = curObjData.fruitSalePrice;
                            this.priceAll.text = curObjData.fruitSalePrice;
                            this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
                            if (curObjData["seedFruitDes"])
                                this.desTxt.text = curObjData["seedFruitDes"];
                            this.curItem["allNums"] = curObjData.fruitNums;
                            this.curItem["quality"] = curObjData["quality"];
                            break;
                        case "water":
                            this.priceOne.text = curObjData.price + "";
                            this.priceAll.text = curObjData.price * parseInt(this.saleNumTxt.text) + "";
                            this.iconImg.skin = curObjData.icon;
                            if (curObjData.des)
                                this.desTxt.text = curObjData.des;
                            this.curItem["allNums"] = curObjData.nums;
                            break;
                    }
                    this.nameTxt.text = curObjData.name;
                    this.saleNumTxt.text = "1"; // 默认1个
                    this.saleNums = 1;
                    this.iconImg.size(50, 50);
                    this.saleNumTxt.on(Event.INPUT, this, this.saleNumsInputOverFn);
                    this.saleNumTxt.on(Event.BLUR, this, this.saleNumsInputOverFn);
                    this.addOneBtn.on(Event.CLICK, this, this.addOneBtnFn);
                    this.reduceOneBtn.on(Event.CLICK, this, this.reduceOneBtnFn);
                };
                MakeTeaStorageView.prototype.closeBtnFn = function () {
                    this.bgUI.removeSelf();
                    // 默认选中第一个选项卡
                    this.seedTabFn();
                };
                return MakeTeaStorageView;
            }(StorageDialogUI));
            storage.MakeTeaStorageView = MakeTeaStorageView;
        })(storage = makeRoom.storage || (makeRoom.storage = {}));
    })(makeRoom = views.makeRoom || (views.makeRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=MakeTeaStorageView.js.map
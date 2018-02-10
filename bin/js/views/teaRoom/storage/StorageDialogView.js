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
        var storage;
        (function (storage) {
            var Event = laya.events.Event;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var StorageDialogUI = ui.gameUI.storage.StorageDialogUI;
            /**
             * 仓库弹出面板（时间匆忙，待重构）
             */
            var StorageDialogView = /** @class */ (function (_super) {
                __extends(StorageDialogView, _super);
                function StorageDialogView() {
                    var _this = _super.call(this) || this;
                    /** 卖出数量 */
                    _this.saleNums = 0;
                    /** 类型前缀 */
                    _this.typePrefix = "gameUI/common/resTypeIcon/";
                    /** 类型后缀 */
                    _this.typeSuffix = ".png";
                    _this.hasInit = false;
                    _this.seedTabFn();
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.saleNumTxt.restrict = "0-9";
                    _this.cacheAs = "bitmap";
                    _this.bgUI = new BaseBorderUI();
                    _this.bgUI.bgImg.size(788, 450);
                    _this.bgUI.size(788, 450);
                    _this.bgUI.addChild(_this);
                    _this.x = _this.y = 15;
                    _this.bgUI.titleImg.skin = "gameUI/common/icon/storageName.png";
                    _this.bgUI.titleImg.x = _this.width - _this.bgUI.titleImg.width >> 1;
                    _this.bgUI.titleImg.y += 3;
                    _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (788 - 600) / 600;
                    var hRate = (450 - 400) / 400;
                    _this.bgUI.closeBtn.x += _this.bgUI.closeBtn.x * wRate;
                    _this.bgUI.closeBtn.y -= _this.bgUI.closeBtn.y * hRate;
                    _this.bgUI.closeBtn.scale(1.5, 1.5);
                    _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    // 点击种子选项卡
                    _this.seedTab.on(Event.CLICK, _this, _this.seedTabFn);
                    // 点击工具选项卡
                    _this.toolTab.on(Event.CLICK, _this, _this.toolTabFn);
                    _this.fruitTab.on(Event.CLICK, _this, _this.fruitTabFn);
                    _this.decorateTab.on(Event.CLICK, _this, _this.decorateTabFn);
                    return _this;
                }
                StorageDialogView.prototype.seedTabFn = function () {
                    this.curSelectedTabName = "seedTab";
                    this.selectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.unSelectTab(this.fruitTab);
                    this.unSelectTab(this.decorateTab);
                    // this.addStorageGrids([ ]);
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                StorageDialogView.prototype.toolTabFn = function () {
                    this.curSelectedTabName = "toolTab";
                    this.selectTab(this.toolTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.fruitTab);
                    this.unSelectTab(this.decorateTab);
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                StorageDialogView.prototype.fruitTabFn = function () {
                    this.curSelectedTabName = "fruitTab";
                    this.selectTab(this.fruitTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.unSelectTab(this.decorateTab);
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                StorageDialogView.prototype.decorateTabFn = function () {
                    this.curSelectedTabName = "decorateTab";
                    this.selectTab(this.decorateTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.unSelectTab(this.fruitTab);
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                StorageDialogView.prototype.selectTab = function (tab) {
                    tab.getChildByName("selectBg").visible = true;
                    tab.getChildByName("unSelectBg").visible = false;
                };
                StorageDialogView.prototype.unSelectTab = function (tab) {
                    tab.getChildByName("selectBg").visible = false;
                    tab.getChildByName("unSelectBg").visible = true;
                };
                /**
                 * 将原素材的 swf 格式转换成 png 格式
                 */
                StorageDialogView.prototype.translateSwfTypeToPngType = function (swfUrl) {
                    var pngUrl;
                    if (!swfUrl)
                        return null;
                    pngUrl = swfUrl.substring(0, swfUrl.lastIndexOf("."));
                    pngUrl += ".png";
                    return pngUrl;
                };
                /**
                 * 填充仓库格子（种子、道具、果实）———— 此函数待重构！
                 */
                StorageDialogView.prototype.addStorageGrids = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr || !voArr.length)
                        return;
                    var len = voArr.length;
                    var i;
                    var j;
                    // 种子
                    if (this.curSelectedTabName == "seedTab") {
                        var seedVO = void 0;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            seedVO = voArr[i];
                            gridItem.name = seedVO.id + "";
                            gridItem.lvl.text = seedVO.lvl + "级";
                            gridItem.nums.text = seedVO.seedNums + "";
                            // gridItem.imgContainer.addChild(mc);
                            gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedVO.icon);
                            // gridItem.imgContainer.autoSize = true;
                            console.log("imgContainer, w:" + gridItem.imgContainer.width + ", h:" + gridItem.imgContainer.height + ", seedVO.type:" + seedVO.type);
                            if (gridItem.imgContainer.width > 60 && gridItem.imgContainer.height > 60)
                                gridItem.imgContainer.size(60, 60);
                            gridItem.nameTxt.text = seedVO.name;
                            gridItem.salePrice.text = seedVO.fruitSalePrice + "";
                            var _type = void 0;
                            if (seedVO.type == "teaseed")
                                _type = "tea";
                            else if (seedVO.type == "flowerseed")
                                _type = "flower";
                            else if (seedVO.type == "othersseed")
                                _type = "food";
                            if (_type)
                                gridItem.typeIcon.skin = this.typePrefix + _type + this.typeSuffix; // seedVO.type
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                // this.gridItemClkedFn(seedVO);
                                this.updateRightContent(seedVO);
                            }
                            this.gridContainer.addChild(gridItem);
                            // this.gridContainer.vScrollBar = this.vscrollBar;	// 2017-09-15 hsx
                            // this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                            // 每行最多放 4 个
                            if (i >= 4) {
                                gridItem.x = parseInt((i - 4) % 4 + "") * (gridItem.width + 5);
                                gridItem.y = (parseInt((i - 4) / 4 + "") + 1) * (gridItem.height + 5);
                            }
                            else {
                                gridItem.x = i * (gridItem.width + 5);
                            }
                            gridItem.on(Event.CLICK, this, this.updateRightContent, [seedVO]);
                        }
                    } // 道具
                    else if (this.curSelectedTabName == "toolTab") {
                        var toolVO = void 0;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            toolVO = voArr[i];
                            gridItem.name = toolVO.id + "";
                            gridItem.lvl.text = toolVO.lvl + "级";
                            gridItem.nums.text = toolVO.nums + "";
                            // gridItem.imgContainer.addChild(mc);
                            gridItem.imgContainer.skin = this.translateSwfTypeToPngType(toolVO.icon); // toolVO.icon;
                            // gridItem.imgContainer.autoSize = true;
                            console.log("imgContainer, w:" + gridItem.imgContainer.width + ", h:" + gridItem.imgContainer.height + ", toolVO.type:" + toolVO.type);
                            if ((gridItem.imgContainer.width > 60) && (gridItem.imgContainer.height > 60))
                                gridItem.imgContainer.size(60, 60);
                            // gridItem.imgContainer.pos(gridItem.imgBg.width-gridItem.imgContainer.width>>1,gridItem.imgBg.height-gridItem.imgContainer.height>>1);
                            gridItem.nameTxt.text = toolVO.name;
                            gridItem.salePrice.text = toolVO.price + "";
                            console.log("== imgBg.width:" + gridItem.imgBg.width + ", imgContainer.width:" + gridItem.imgContainer.width);
                            gridItem.typeIcon.skin = this.typePrefix + toolVO.type + this.typeSuffix;
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                // this.gridItemClkedFn(toolVO);
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
                            // gridItem.x = i * (gridItem.width + 5);
                            gridItem.on(Event.CLICK, this, this.updateRightContent, [toolVO]);
                        }
                    } // 果实
                    else if (this.curSelectedTabName == "fruitTab") {
                        var seedsObjArr = managers.ResourceManager.seedsObjArr;
                        if (!seedsObjArr || seedsObjArr.length == 0)
                            return;
                        var _len = seedsObjArr.length;
                        // 存储最终要用到的数据
                        var _seedsObjArr = new Array();
                        var seedVO = void 0;
                        var seedObj = void 0;
                        for (i = 0; i < len; i++) {
                            seedVO = voArr[i];
                            for (j = 0; j < _len; j++) {
                                seedObj = seedsObjArr[j];
                                if (seedVO.id == seedObj["id"]) {
                                    seedObj["fruitNums"] = seedVO.fruitNums;
                                    seedObj["type"] = seedObj["group"] + "fruit";
                                    _seedsObjArr.push(seedObj);
                                    break;
                                }
                            }
                        }
                        if (_seedsObjArr.length == 0)
                            return;
                        len = _seedsObjArr.length;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            seedObj = _seedsObjArr[i];
                            gridItem.name = seedObj["id"];
                            gridItem.lvl.text = seedObj["level"] + "级";
                            gridItem.nums.text = seedObj["fruitNums"];
                            gridItem.imgContainer.skin = HttpConfig.serverResUrl + seedObj["res"];
                            // gridItem.imgContainer.autoSize = true;
                            console.log("imgContainer, w:" + gridItem.imgContainer.width + ", h:" + gridItem.imgContainer.height + ",seedObj.type:" + seedObj["type"]);
                            if ((gridItem.imgContainer.width > 60) && (gridItem.imgContainer.height > 60))
                                gridItem.imgContainer.size(60, 60);
                            gridItem.nameTxt.text = seedObj["name"];
                            gridItem.salePrice.text = seedObj["fruitShopPrice"]; // seedObj["price"];
                            var _type = void 0;
                            if (seedObj["type"] == "teafruit")
                                _type = "tea";
                            else if (seedObj["type"] == "flowerfruit")
                                _type = "flower";
                            else if (seedObj["type"] == "othersfruit")
                                _type = "food";
                            if (_type)
                                gridItem.typeIcon.skin = this.typePrefix + _type + this.typeSuffix;
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                // this.gridItemClkedFn(seedObj);
                                this.updateRightContent(seedObj);
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
                            gridItem.on(Event.CLICK, this, this.updateRightContent, [seedObj]);
                        }
                    } // 装饰
                    else {
                        var decorateObj = void 0;
                        for (i = 0; i < len; i++) {
                            var gridItem = new ui.gameUI.common.BagGridItemUI();
                            decorateObj = voArr[i];
                            gridItem.name = decorateObj["di"];
                            gridItem.imgContainer.skin = decorateObj["dimg"]; // "realimg"
                            if ((gridItem.imgContainer.width > 60) && (gridItem.imgContainer.height > 60))
                                gridItem.imgContainer.size(60, 60);
                            // 类型图标
                            gridItem.typeIcon.skin = this.typePrefix + decorateObj["ty"] + this.typeSuffix;
                            console.log("== skin:" + gridItem.typeIcon.skin);
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                this.updateRightContent(decorateObj);
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
                            gridItem.on(Event.CLICK, this, this.updateRightContent, [decorateObj]);
                        }
                    }
                    this.hasInit = true;
                };
                /**
                 * 输入框输入后
                 */
                StorageDialogView.prototype.saleNumsInputOverFn = function (event) {
                    if (parseInt(this.saleNumTxt.text) > this.curItem["allNums"])
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
                StorageDialogView.prototype.addOneBtnFn = function (event) {
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
                StorageDialogView.prototype.reduceOneBtnFn = function (event) {
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
                StorageDialogView.prototype.updateRightContent = function (obj) {
                    this.curItem = obj;
                    if (!obj || !obj["type"])
                        return;
                    var type = obj["type"];
                    var curObjData = obj;
                    if (!curObjData)
                        return;
                    // this.curItem = curObjData;
                    // 普通种子、数字种子等
                    if (type.indexOf("seed") > 0) {
                        this.priceOne.text = curObjData.fruitSalePrice + "";
                        this.priceAll.text = curObjData.fruitSalePrice + "";
                        this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
                        if (curObjData.seedFruitDes)
                            this.desTxt.text = curObjData.seedFruitDes;
                        this.curItem["allNums"] = curObjData.seedNums;
                    } // 道具
                    else if (type == "prop") {
                        this.priceOne.text = curObjData.price + "";
                        this.priceAll.text = curObjData.price + "";
                        this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
                        if (curObjData.des)
                            this.desTxt.text = curObjData.des;
                        this.curItem["allNums"] = curObjData.nums;
                    } // 果实 (类型：teafruit、flowerfruit、othersfruit)
                    else if (type.indexOf("fruit") > 0) {
                        this.priceOne.text = curObjData["fruitShopPrice"];
                        this.priceAll.text = curObjData["fruitShopPrice"];
                        this.iconImg.skin = HttpConfig.serverResUrl + curObjData["res"];
                        if (curObjData["desc"])
                            this.desTxt.text = curObjData["desc"];
                        this.curItem["allNums"] = curObjData.fruitNums;
                    }
                    this.nameTxt.text = curObjData.name;
                    this.saleNumTxt.text = "1"; // 默认1个
                    this.saleNums = 1;
                    // this.iconImg.autoSize = true;
                    if ((this.iconImg.width > 60) && (this.iconImg.height > 60))
                        this.iconImg.size(60, 60);
                    this.saleNumTxt.on(Event.INPUT, this, this.saleNumsInputOverFn);
                    this.saleNumTxt.on(Event.BLUR, this, this.saleNumsInputOverFn);
                    this.addOneBtn.on(Event.CLICK, this, this.addOneBtnFn);
                    this.reduceOneBtn.on(Event.CLICK, this, this.reduceOneBtnFn);
                };
                StorageDialogView.prototype.closeBtnFn = function () {
                    // this.removeSelf();
                    this.bgUI.removeSelf();
                    // 默认选中第一个选项卡
                    this.seedTabFn();
                };
                return StorageDialogView;
            }(StorageDialogUI));
            storage.StorageDialogView = StorageDialogView;
        })(storage = teaRoom.storage || (teaRoom.storage = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=StorageDialogView.js.map
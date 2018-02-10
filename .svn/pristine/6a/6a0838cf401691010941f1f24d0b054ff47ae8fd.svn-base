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
        var shop;
        (function (shop) {
            var Event = laya.events.Event;
            var TabItemUI = ui.gameUI.common.TabItemUI;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var ShopRightContentUI = ui.gameUI.shop.ShopRightContentUI;
            /**
             * 商店弹出面板（时间匆忙，待重构）
             */
            var ShopDialogView = /** @class */ (function (_super) {
                __extends(ShopDialogView, _super);
                function ShopDialogView() {
                    var _this = _super.call(this) || this;
                    _this.titleUrl = "gameUI/common/icon/shopName.png";
                    /** 类型前缀 */
                    _this.typePrefix = "gameUI/common/resTypeIcon/";
                    /** 类型后缀 */
                    _this.typeSuffix = ".png";
                    /** 金币图标 */
                    _this.moneyUrl = "gameUI/common/icon/money.png";
                    /** 钻石图标 */
                    _this.goldUrl = "gameUI/common/icon/gold.png";
                    /** 购买数量 */
                    _this.buyNums = 0;
                    /** 当前项的单价 */
                    _this.singlePrice = 0;
                    _this.titleImg.skin = _this.titleUrl;
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.cacheAs = "bitmap";
                    _this.bgImg.size(788, 450);
                    _this.size(788, 450);
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (788 - 600) / 600;
                    var hRate = (450 - 400) / 400;
                    _this.closeBtn.x += _this.closeBtn.x * wRate;
                    _this.closeBtn.y -= _this.closeBtn.y * hRate;
                    _this.closeBtn.scale(1.5, 1.5);
                    _this.titleImg.skin = "gameUI/common/icon/shopName.png";
                    _this.titleImg.x = _this.width - _this.titleImg.width >> 1;
                    _this.titleImg.y += 3;
                    // 种子
                    _this.seedTab = new TabItemUI();
                    _this.seedTab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
                    _this.seedTab.pos(20, 100);
                    _this.addChild(_this.seedTab);
                    _this.seedTab.on(Event.CLICK, _this, _this.seedTabFn);
                    // 道具
                    _this.toolTab = new TabItemUI();
                    _this.toolTab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
                    _this.toolTab.pos(20, 176);
                    _this.addChild(_this.toolTab);
                    _this.toolTab.on(Event.CLICK, _this, _this.toolTabFn);
                    // 装饰
                    _this.decorateTab = new TabItemUI();
                    _this.decorateTab.tabName.skin = "gameUI/common/icon/decorateTabBg.png";
                    _this.decorateTab.pos(20, 252);
                    _this.addChild(_this.decorateTab);
                    _this.decorateTab.visible = false;
                    _this.decorateTab.on(Event.CLICK, _this, _this.decorateTabFn);
                    _this.gridContainer = new Laya.Panel();
                    _this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                    _this.gridContainer.pos(115, 100);
                    _this.gridContainer.size(333, 333);
                    _this.addChild(_this.gridContainer);
                    _this.rightContent = new ShopRightContentUI();
                    _this.addChild(_this.rightContent);
                    _this.rightContent.pos(_this.gridContainer.x + _this.gridContainer.width + 10, 100);
                    _this.rightContent.buyNumTxt.restrict = "0-9";
                    _this.seedTabFn();
                    _this.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    return _this;
                }
                ShopDialogView.prototype.seedTabFn = function () {
                    this.curSelectedTabName = "seedTab";
                    this.selectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.unSelectTab(this.decorateTab);
                    this.changeBtnState();
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                ShopDialogView.prototype.toolTabFn = function () {
                    this.curSelectedTabName = "toolTab";
                    this.selectTab(this.toolTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.decorateTab);
                    this.changeBtnState();
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                ShopDialogView.prototype.decorateTabFn = function () {
                    this.curSelectedTabName = "decorateTab";
                    this.selectTab(this.decorateTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.changeBtnState();
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                ShopDialogView.prototype.selectTab = function (tab) {
                    this.setTabIcon(tab);
                    tab.selectBg.visible = true;
                    tab.unSelectBg.visible = false;
                };
                ShopDialogView.prototype.unSelectTab = function (tab) {
                    this.setTabIcon(tab);
                    tab.selectBg.visible = false;
                    tab.unSelectBg.visible = true;
                };
                ShopDialogView.prototype.setTabIcon = function (tab) {
                    if (tab === this.seedTab)
                        tab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
                    else if (tab === this.toolTab)
                        tab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
                    else if (tab === this.decorateTab)
                        tab.tabName.skin = "gameUI/common/icon/decorateTabBg.png";
                };
                /**
                 * 根据选项卡切换对应的操作按钮
                 */
                ShopDialogView.prototype.changeBtnState = function () {
                    if (this.curSelectedTabName == "decorateTab") {
                        this.rightContent.buyBtn.visible = false;
                        this.rightContent.preViewBtn.visible = true;
                    }
                    else {
                        this.rightContent.buyBtn.visible = true;
                        this.rightContent.preViewBtn.visible = false;
                    }
                };
                ShopDialogView.prototype.closeBtnFn = function () {
                    this.removeSelf();
                    // 默认选中第一个选项卡
                    this.seedTabFn();
                };
                /**
                 * 添加选项卡下的格子项
                 */
                ShopDialogView.prototype.addTabGrids = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr || !voArr.length)
                        return;
                    voArr.sort(this.sortArrById);
                    var i;
                    var len = voArr.length;
                    // 种子
                    if (this.curSelectedTabName == "seedTab") {
                        /*			界面显示（种子）：
                                    左侧：
                                    等级、名称、图标、买入价格、类型（茶、花、粮）
                                    右侧：
                                    名称、图标、售价、"作物类型（一季作物）、产量、果实售价、收入、收获经验、等级（等级不足）、成熟时间、再次成熟"、   描述
                        */
                        // 需置顶项：  "id"=="105"、
                        var firstObj = void 0;
                        for (i = 0; i < len; i++) {
                            firstObj = voArr[i];
                            if (firstObj["id"] == "105") {
                                voArr.splice(i, 1);
                                voArr.unshift(firstObj);
                                break;
                            }
                        }
                        var seedObj = void 0;
                        var j = 0;
                        for (i = 0; i < len; i++) {
                            seedObj = voArr[i];
                            // 数字种子 不可在此显示
                            if (seedObj["group"] == "number") {
                                continue;
                            }
                            else {
                                j++;
                                var gridItem = new ui.gameUI.common.GridItemUI();
                                gridItem.name = seedObj["id"];
                                gridItem.lvl.text = seedObj["level"] + "级";
                                gridItem.nameTxt.text = seedObj["name"];
                                gridItem.nums.visible = false;
                                gridItem.imgContainer.skin = HttpConfig.serverResUrl + seedObj["res"];
                                if (gridItem.imgContainer.width > 60 && gridItem.imgContainer.height > 60)
                                    gridItem.imgContainer.size(60, 60);
                                // 因是异步加载，gridItem.imgContainer 的 width/heiht 时常为0
                                // gridItem.imgContainer.x = gridItem.imgBg.width-gridItem.imgContainer.width>>1;
                                // gridItem.imgContainer.y = gridItem.imgBg.height-gridItem.imgContainer.height>>1;
                                // 金币 or 钻石
                                if (parseInt(seedObj["price"])) {
                                    gridItem.salePrice.text = seedObj["price"];
                                    gridItem.priceIcon.skin = this.moneyUrl;
                                }
                                else if (parseInt(seedObj["yb"])) {
                                    gridItem.salePrice.text = seedObj["yb"];
                                    gridItem.priceIcon.skin = this.goldUrl;
                                }
                                /*						种子：
                                                        group: flower
                                                        group: tea
                                                        group: other
                                */
                                // 类型图标([group]: tea: 茶; flower：花； others：粮 等)
                                if (seedObj["group"] == "others")
                                    gridItem.typeIcon.skin = this.typePrefix + "food" + this.typeSuffix;
                                else
                                    gridItem.typeIcon.skin = this.typePrefix + seedObj["group"] + this.typeSuffix;
                                // 显示首个对象的右侧信息
                                if (j == 1) {
                                    // this.updateRightContent(seedObj);
                                    this.gridItemClkedFn(seedObj);
                                }
                                this.gridContainer.addChild(gridItem);
                                // 每行最多放 4 个
                                if (j >= 5) {
                                    gridItem.x = parseInt((j - 5) % 5 + "") * (gridItem.width + 5);
                                    gridItem.y = (parseInt((j - 5) / 5 + "") + 1) * (gridItem.height + 5);
                                }
                                else {
                                    gridItem.x = (j - 1) * (gridItem.width + 5);
                                }
                                gridItem.on(Event.CLICK, this, this.gridItemClkedFn, [seedObj]);
                            }
                        }
                    } // 道具
                    else if (this.curSelectedTabName == "toolTab") {
                        /*			界面显示（道具）：
                                    左侧：
                                    等级、名称、图标、买入价格、类型（肥、薪、汇、农、狗、饲、）
                                    右侧：
                                    名称、图标、售价、"类型"、 描述
                        */
                        var j = 0;
                        var toolObj = void 0;
                        for (i = 0; i < len; i++) {
                            toolObj = voArr[i];
                            // 不可在此显示的项： 工艺书("book")、茶具("teapot")、水("water")、矿石("saute_tool")、实物六堡茶("real")、免邮兑换码("free_postage")、大于当前等级的道具
                            if (toolObj["category"] == "book" || toolObj["category"] == "teapot" || toolObj["category"] == "water" || toolObj["category"] == "saute_tool" ||
                                toolObj["category"] == "real" || toolObj["category"] == "free_postage" || toolObj["category"] == undefined || (toolObj["level"] > models.player.PlayerInfoModel.playerInfo.level)) {
                                // TS中的如下写法不可行
                                // i--;
                                // continue;
                            }
                            else {
                                j++;
                                var gridItem = new ui.gameUI.common.GridItemUI();
                                gridItem.name = toolObj["id"];
                                gridItem.lvl.text = toolObj["level"] + "级";
                                gridItem.nameTxt.text = toolObj["name"];
                                gridItem.nums.visible = false;
                                gridItem.imgContainer.skin = HttpConfig.serverResUrl + toolObj["res"];
                                if (gridItem.imgContainer.width > 60 && gridItem.imgContainer.height > 60)
                                    gridItem.imgContainer.size(60, 60);
                                var salePrice = "0";
                                // 金币 or 钻石
                                if (parseInt(toolObj["price"])) {
                                    gridItem.salePrice.text = toolObj["price"];
                                    gridItem.priceIcon.skin = this.moneyUrl;
                                }
                                else if (parseInt(toolObj["yb"])) {
                                    gridItem.salePrice.text = toolObj["yb"];
                                    gridItem.priceIcon.skin = this.goldUrl;
                                }
                                // 是否已购买过
                                if (toolObj["hasBuy"] == "true")
                                    gridItem.disabled = true;
                                else
                                    gridItem.disabled = false;
                                /* 道具：
                                category:prop
                                category:coin
                                category:point_card
                                category:farmercard
                                category:farmer
                                category:dogfood
                                category:dog*/
                                gridItem.typeIcon.skin = this.typePrefix + toolObj["category"] + this.typeSuffix;
                                // 显示首个对象的右侧信息
                                if (j == 1) {
                                    // this.updateRightContent(toolObj);
                                    this.gridItemClkedFn(toolObj);
                                }
                                this.gridContainer.addChild(gridItem);
                                // 每行最多放 4 个
                                if (j >= 5) {
                                    gridItem.x = parseInt((j - 5) % 5 + "") * (gridItem.width + 5);
                                    gridItem.y = (parseInt((j - 5) / 5 + "") + 1) * (gridItem.height + 5);
                                }
                                else {
                                    gridItem.x = (j - 1) * (gridItem.width + 5);
                                }
                                gridItem.on(Event.CLICK, this, this.gridItemClkedFn, [toolObj]);
                            }
                        }
                    }
                };
                /**
                 * 按等级从小到大排序
                 */
                ShopDialogView.prototype.sortArrById = function (obj1, obj2) {
                    var l1 = parseInt(obj1["level"]);
                    var l2 = parseInt(obj2["level"]);
                    if (l1 > l2)
                        return 1;
                    else if (l1 < l2)
                        return -1;
                    else
                        return 0;
                };
                /**
                 * 输入框输入后
                 */
                ShopDialogView.prototype.saleNumsInputOverFn = function (event) {
                    // 需根据金币或钻石的量来判断能买多少
                };
                /**
                 * 购买数量+1
                 */
                ShopDialogView.prototype.addOneBtnFn = function (event) {
                    this.buyNums++;
                    this.curBuyObj["bct"] = this.buyNums;
                    this.rightContent.buyNumTxt.text = this.buyNums + "";
                    this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
                    console.log("buyNums:" + this.buyNums + ", 总价：" + this.rightContent.buyPrice.text);
                    /*			if(this.saleNums > this.curItem["allNums"])
                                    return;
                                this.saleNums++;
                                if(this.saleNums > this.curItem["allNums"])
                                    this.saleNums = this.curItem["allNums"];
                                this.saleNumTxt.text = this.saleNums+"";
                                this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
                    */
                };
                /**
                 * 购买数量-1
                 */
                ShopDialogView.prototype.reduceOneBtnFn = function (event) {
                    if (this.buyNums == 0)
                        return;
                    this.buyNums--;
                    this.curBuyObj["bct"] = this.buyNums;
                    this.rightContent.buyNumTxt.text = this.buyNums + "";
                    this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
                    console.log("buyNums:" + this.buyNums);
                };
                ShopDialogView.prototype.buyNumInputOverFn = function (event) {
                    this.buyNums = parseInt(this.rightContent.buyNumTxt.text);
                    this.curBuyObj["bct"] = this.buyNums;
                    this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
                };
                ShopDialogView.prototype.gridItemClkedFn = function (obj) {
                    console.log("=== 当前类型：" + obj["category"]);
                    this.buyNums = 1;
                    this.rightContent.buyNumTxt.text = "1";
                    this.curBuyObj = { "si": obj["id"], "st": this.getObjType(obj), "bct": this.buyNums };
                    this.curItem = obj;
                    // 右侧信息
                    this.updateRightContent(obj);
                };
                /**
                 * 更新右侧信息
                 */
                ShopDialogView.prototype.updateRightContent = function (obj) {
                    // 名称、图标、售价、"类型"、 描述
                    this.rightContent.nameTxt.text = obj["name"];
                    this.rightContent.iconImg.skin = HttpConfig.serverResUrl + obj["res"];
                    // 等级不足
                    if (obj["level"] > models.player.PlayerInfoModel.playerInfo.level)
                        this.rightContent.lvlNoEnougnImg.visible = true;
                    else
                        this.rightContent.lvlNoEnougnImg.visible = false;
                    // 金币 or 钻石
                    if (parseInt(obj["price"])) {
                        this.singlePrice = parseInt(obj["price"]);
                        this.rightContent.buyPrice.text = obj["price"];
                        this.rightContent.priceIcon.skin = this.moneyUrl;
                    }
                    else if (parseInt(obj["yb"])) {
                        this.singlePrice = parseInt(obj["yb"]);
                        this.rightContent.buyPrice.text = obj["yb"];
                        this.rightContent.priceIcon.skin = this.goldUrl;
                    }
                    this.rightContent.buyNumTxt.on(Event.INPUT, this, this.buyNumInputOverFn);
                    this.rightContent.buyNumTxt.on(Event.BLUR, this, this.buyNumInputOverFn);
                    this.rightContent.addOneBtn.on(Event.CLICK, this, this.addOneBtnFn);
                    this.rightContent.reduceOneBtn.on(Event.CLICK, this, this.reduceOneBtnFn);
                    if (this.curSelectedTabName == "seedTab") {
                        this.rightContent.desTxt.text = obj["shopDesc"];
                        // "预计收入":预计产量*果实售价 ？
                        // "成熟时间": growCircle参数之和,秒换成小时
                        // this.rightContent.contentArea.fontSize = 12;
                        this.rightContent.contentArea.text = "作物类型:" + obj["seasonName"] + "\n\n预计产量:" + obj["output"] +
                            "\n\n果实售价:" + obj["fruitShopPrice"] + "\n\n收获经验:" + obj["exp"] + "/季" +
                            "\n\n作物等级:" + obj["level"];
                    }
                    else if (this.curSelectedTabName == "toolTab") {
                        this.rightContent.desTxt.text = obj["desc"];
                        this.rightContent.contentArea.text = "类型:" + obj["cname"];
                    }
                    else if (this.curSelectedTabName == "decorateTab") {
                    }
                };
                /**
                 * 返回要购买项所属类型
                 */
                ShopDialogView.prototype.getObjType = function (obj) {
                    var curType = "";
                    if (obj["group"]) {
                        curType = obj["group"];
                        if (curType != "") {
                            if (curType == "tea")
                                curType = "teaseed";
                            else if (curType == "flower")
                                curType = "flowerseed";
                            else if (curType == "others")
                                curType = "othersseed";
                        }
                    }
                    else if (obj["category"]) {
                        curType = obj["category"];
                    }
                    console.log("== 购买类型, curType:" + curType);
                    return curType;
                };
                return ShopDialogView;
            }(BaseBorderUI));
            shop.ShopDialogView = ShopDialogView;
        })(shop = teaRoom.shop || (teaRoom.shop = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=ShopDialogView.js.map
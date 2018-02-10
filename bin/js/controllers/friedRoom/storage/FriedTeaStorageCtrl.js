var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var storage;
        (function (storage) {
            var FriedTeaStorageModel = models.friedRoom.storage.FriedTeaStorageModel;
            var Event = laya.events.Event;
            var TweenUtil = utils.TweenUtil;
            /**
             * 炒茶仓库控制器类
             */
            var FriedTeaStorageCtrl = /** @class */ (function () {
                function FriedTeaStorageCtrl() {
                    if (!FriedTeaStorageCtrl.model)
                        FriedTeaStorageCtrl.model = FriedTeaStorageModel.getInstance();
                    if (!FriedTeaStorageCtrl.view)
                        FriedTeaStorageCtrl.view = new views.friedRoom.storage.FriedTeaStorageView();
                    FriedTeaStorageCtrl.view.seedTab.on(Event.CLICK, this, this.request_getMaterial);
                    FriedTeaStorageCtrl.view.toolTab.on(Event.CLICK, this, this.request_getTool);
                    FriedTeaStorageCtrl.view.fruitTab.on(Event.CLICK, this, this.request_getDepottea);
                    FriedTeaStorageCtrl.view.on(Event.CLICK, this, this.itemClkedFn);
                    FriedTeaStorageCtrl.view.saleBtn.on(Event.CLICK, this, this.saleFn);
                }
                FriedTeaStorageCtrl.getInstance = function () {
                    if (!FriedTeaStorageCtrl.instance)
                        FriedTeaStorageCtrl.instance = new FriedTeaStorageCtrl();
                    return FriedTeaStorageCtrl.instance;
                };
                /**
                 * 点击每项，请求右侧的内容信息
                 */
                FriedTeaStorageCtrl.prototype.itemClkedFn = function (event) {
                    var flag = event.target instanceof ui.gameUI.common.GridItemUI;
                    if (!flag)
                        return;
                    // 原料栏、道具栏、茶叶栏
                    var curItem = FriedTeaStorageCtrl.view.curItem;
                    if (curItem) {
                        var paraObj = { "si": curItem["id"], "st": curItem["type"] };
                        FriedTeaStorageModel.callback = this.getRightContentOverFn;
                        FriedTeaStorageCtrl.model.request_getDepotRightContentData(paraObj);
                    }
                };
                /**
                 * 卖出操作
                 */
                FriedTeaStorageCtrl.prototype.saleFn = function (event) {
                    var curItem = FriedTeaStorageCtrl.view.curItem;
                    if (curItem) {
                        var saleNums = parseInt(FriedTeaStorageCtrl.view.saleNumTxt.text);
                        switch (curItem["type"]) {
                            case "material":
                                if (curItem["seedNums"] >= saleNums)
                                    curItem["saleNums"] = saleNums;
                                break;
                            case "book":
                            case "saute_tool":
                                if (curItem["nums"] >= saleNums)
                                    curItem["saleNums"] = saleNums;
                                break;
                            case "leaf":
                                if (curItem["fruitNums"] >= saleNums)
                                    curItem["saleNums"] = saleNums;
                                break;
                        }
                        if (curItem["saleNums"] > 0) {
                            FriedTeaStorageModel.callback = this.saleOverFn;
                            FriedTeaStorageCtrl.model.request_sellSingle({ "si": curItem["id"], "st": curItem["type"], "sct": curItem["saleNums"], "q": curItem["quality"] });
                        }
                    }
                };
                FriedTeaStorageCtrl.prototype.saleOverFn = function (takeData) {
                    if (!takeData)
                        return;
                    if (takeData["errMsg"]) {
                        TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
                    }
                    else {
                        if (takeData["exp"] > 0)
                            TweenUtil.tweenTo(views.common.CommonDisplay.expPrize(takeData["exp"]));
                        if (takeData["money"] > 0)
                            TweenUtil.tweenTo(views.common.CommonDisplay.moneyPrize(takeData["money"]));
                        // 更新仓库状态
                        if (FriedTeaStorageCtrl.view.curSelectedTabName == "seedTab") {
                            FriedTeaStorageCtrl.instance.request_getMaterial();
                        }
                        else if (FriedTeaStorageCtrl.view.curSelectedTabName == "toolTab") {
                            FriedTeaStorageCtrl.instance.request_getTool();
                        }
                        else if (FriedTeaStorageCtrl.view.curSelectedTabName == "fruitTab") {
                            FriedTeaStorageCtrl.instance.request_getDepottea();
                        }
                    }
                };
                /**
                 * 更新右侧信息（与 FriedTeaStorageView 中的 gridItem 点击事件重复，待整合）
                 */
                FriedTeaStorageCtrl.prototype.getRightContentOverFn = function () {
                    FriedTeaStorageCtrl.view.updateRightContent(FriedTeaStorageModel.curSelectedObjVO);
                };
                /**
                 * 点击工具栏仓库图标显示仓库面板
                 */
                FriedTeaStorageCtrl.prototype.showStorageDialog = function () {
                    UILayerManager.uiLayer.addChild(FriedTeaStorageCtrl.view.bgUI);
                    FriedTeaStorageCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriedTeaStorageCtrl.view.bgUI.width >> 1;
                    FriedTeaStorageCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriedTeaStorageCtrl.view.bgUI.height >> 1;
                    this.request_getMaterial();
                };
                /**
                 * 获取种子
                 */
                FriedTeaStorageCtrl.prototype.request_getMaterial = function () {
                    FriedTeaStorageModel.callback = this.getMaterialOverFn;
                    FriedTeaStorageCtrl.model.request_getMaterial();
                };
                FriedTeaStorageCtrl.prototype.getMaterialOverFn = function (takeData) {
                    FriedTeaStorageCtrl.view.addStorageGrids(FriedTeaStorageModel.getInstance().seedVOArr);
                };
                /**
                 * 获取道具
                 */
                FriedTeaStorageCtrl.prototype.request_getTool = function () {
                    FriedTeaStorageModel.callback = this.getScrollOverFn;
                    FriedTeaStorageCtrl.model.request_getScroll();
                };
                FriedTeaStorageCtrl.prototype.getScrollOverFn = function (takeData) {
                    FriedTeaStorageCtrl.view.addStorageGrids(FriedTeaStorageModel.getInstance().toolVOArr);
                };
                /**
                 * 获取果实（茶叶）
                 */
                FriedTeaStorageCtrl.prototype.request_getDepottea = function () {
                    FriedTeaStorageModel.callback = this.getDepotteaOverFn;
                    FriedTeaStorageCtrl.model.request_getDepottea();
                };
                FriedTeaStorageCtrl.prototype.getDepotteaOverFn = function (takeData) {
                    FriedTeaStorageCtrl.view.addStorageGrids(FriedTeaStorageModel.getInstance().seedVOArr);
                };
                return FriedTeaStorageCtrl;
            }());
            storage.FriedTeaStorageCtrl = FriedTeaStorageCtrl;
        })(storage = friedRoom.storage || (friedRoom.storage = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=FriedTeaStorageCtrl.js.map
var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var shop;
        (function (shop) {
            /**
             * 炒茶室商店数据模型
             */
            var FriedTeaHomeShopModel = /** @class */ (function () {
                function FriedTeaHomeShopModel() {
                    this.seedObjArr = managers.ResourceManager.seedsObjArr;
                    this.toolObjArr = managers.ResourceManager.toolsObjArr;
                }
                Object.defineProperty(FriedTeaHomeShopModel, "instance", {
                    get: function () {
                        if (!FriedTeaHomeShopModel._instance)
                            FriedTeaHomeShopModel._instance = new FriedTeaHomeShopModel();
                        return FriedTeaHomeShopModel._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 获取原料数据
                 */
                FriedTeaHomeShopModel.prototype.request_getChaoMaterial = function () {
                    HttpServiceProxy.request("getChaoMaterial", null, this.getAllSeedData);
                };
                FriedTeaHomeShopModel.prototype.getAllSeedData = function (receiveData) {
                    if (!receiveData)
                        return;
                    var objsArr = receiveData["_d"];
                    if (!objsArr)
                        return;
                    FriedTeaHomeShopModel.instance.seedVOsArr = [];
                    var curObj;
                    var tempObj;
                    var seedVO;
                    var i;
                    var j;
                    var len = objsArr.length;
                    var len2 = FriedTeaHomeShopModel.instance.seedObjArr.length;
                    for (i = 0; i < len; i++) {
                        // every item:  {l,si,simg,sn,tea,ty,yb,ybp}
                        curObj = objsArr[i];
                        seedVO = new models.base.SeedVO();
                        seedVO.id = curObj["si"];
                        seedVO.name = curObj["sn"];
                        seedVO.teaType = curObj["tea"];
                        seedVO.icon = curObj["simg"];
                        seedVO.seedBuyPrice = curObj["yb"];
                        seedVO.lvl = curObj["l"];
                        seedVO.seedNums = curObj["ybp"];
                        seedVO.type = curObj["ty"];
                        for (j = 0; j < len2; j++) {
                            tempObj = FriedTeaHomeShopModel.instance.seedObjArr[j];
                            if (seedVO.id == parseInt(tempObj["id"])) {
                                seedVO.seedDes = tempObj["shopDesc"];
                                if (!seedVO.seedDes)
                                    seedVO.seedDes = "无";
                            }
                        }
                        FriedTeaHomeShopModel.instance.seedVOsArr.push(seedVO);
                    }
                    FriedTeaHomeShopModel.instance.handleCallback(FriedTeaHomeShopModel.instance.seedVOsArr);
                };
                /**
                 * 道具项（返回已购买的道具id）
                 */
                FriedTeaHomeShopModel.prototype.request_getShopScroll = function () {
                    HttpServiceProxy.request("getShopScroll", null, this.getShopScrollOver);
                };
                FriedTeaHomeShopModel.prototype.getShopScrollOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    var objsArr = receiveData["_d"];
                    if (!objsArr)
                        return;
                    FriedTeaHomeShopModel.instance.toolVOsArr = [];
                    var curObj;
                    var tempObj;
                    var toolVO;
                    var i;
                    var j;
                    var len = objsArr.length;
                    var len2 = FriedTeaHomeShopModel.instance.toolObjArr.length;
                    var index = 0;
                    for (i = 0; i < len; i++) {
                        // every item:  {l,ti,timg,tn,ty,yb,p}
                        curObj = objsArr[i];
                        toolVO = new models.base.ToolVO();
                        toolVO.id = curObj["ti"];
                        toolVO.name = curObj["tn"];
                        toolVO.icon = curObj["timg"];
                        toolVO.price = curObj["yb"] ? curObj["yb"] : (curObj["p"] ? curObj["p"] : 0);
                        toolVO.lvl = curObj["l"];
                        toolVO.type = curObj["ty"];
                        for (j = 0; j < len2; j++) {
                            tempObj = FriedTeaHomeShopModel.instance.toolObjArr[j];
                            if (toolVO.id == parseInt(tempObj["id"])) {
                                index++;
                                toolVO.des = tempObj["desc"];
                            }
                        }
                        // 注意：部分无说明（tools.xml和Tencent不同步，缺少内容！）
                        if (!toolVO.des)
                            toolVO.des = "无";
                        FriedTeaHomeShopModel.instance.toolVOsArr.push(toolVO);
                    }
                    FriedTeaHomeShopModel.instance.handleCallback(FriedTeaHomeShopModel.instance.toolVOsArr);
                };
                /**
                 * 购买物品
                 */
                FriedTeaHomeShopModel.prototype.request_buySingleGoods = function (obj) {
                    HttpServiceProxy.request("buySingleGoods", obj, this.buySingleGoodsOver);
                };
                FriedTeaHomeShopModel.prototype.buySingleGoodsOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    var spendObj;
                    if (receiveData["_g"])
                        spendObj = { "type": "金币", "nums": receiveData["_g"] };
                    else if (receiveData["_y"])
                        spendObj = { "type": "钻石", "nums": receiveData["_y"] };
                    if (spendObj)
                        TipLayerManager.tipLayer.showDrawBgTip("购买成功，花费：" + Math.abs(spendObj["nums"]) + "个" + spendObj["type"] + "！");
                    // 更新玩家信息
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                };
                /**
                 * 获取右侧内容数据
                 */
                FriedTeaHomeShopModel.prototype.request_getShopRightContentData = function (obj) {
                    // HttpServiceProxy.request("getShopRightContentData",{"si":，"st":},this.getShopRightContentDataFn);
                };
                FriedTeaHomeShopModel.prototype.getShopRightContentDataFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    this.rightContentObj = {};
                    this.rightContentObj["errMsg"] = receiveData["_cmsg"];
                    this.rightContentObj["exp"] = receiveData["_e"];
                    this.rightContentObj["gold"] = receiveData["_g"];
                    this.rightContentObj["d"] = receiveData["d"];
                    this.rightContentObj["ext"] = receiveData["ext"];
                };
                FriedTeaHomeShopModel.prototype.handleCallback = function (takeData) {
                    if (FriedTeaHomeShopModel.callback) {
                        if (takeData)
                            FriedTeaHomeShopModel.callback(takeData);
                        else
                            FriedTeaHomeShopModel.callback();
                    }
                };
                return FriedTeaHomeShopModel;
            }());
            shop.FriedTeaHomeShopModel = FriedTeaHomeShopModel;
        })(shop = friedRoom.shop || (friedRoom.shop = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=FriedTeaHomeShopModel.js.map
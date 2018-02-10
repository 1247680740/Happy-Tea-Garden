var models;
(function (models) {
    var makeRoom;
    (function (makeRoom) {
        var shop;
        (function (shop) {
            /**
             * 泡茶室商店数据模型
             */
            var MakeTeaHomeShopModel = /** @class */ (function () {
                function MakeTeaHomeShopModel() {
                    this.teaLeafObjArr = managers.ResourceManager.tealeafObjArr;
                    this.toolObjArr = managers.ResourceManager.toolsObjArr;
                }
                Object.defineProperty(MakeTeaHomeShopModel, "instance", {
                    get: function () {
                        if (!MakeTeaHomeShopModel._instance)
                            MakeTeaHomeShopModel._instance = new MakeTeaHomeShopModel();
                        return MakeTeaHomeShopModel._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 获取原料数据
                 */
                MakeTeaHomeShopModel.prototype.request_getChaoMaterial = function () {
                    HttpServiceProxy.request("getPaoMaterial", null, this.getAllSeedData);
                };
                MakeTeaHomeShopModel.prototype.getAllSeedData = function (receiveData) {
                    if (!receiveData)
                        return;
                    var objsArr = receiveData["_d"];
                    if (!objsArr)
                        return;
                    MakeTeaHomeShopModel.instance.seedVOsArr = [];
                    var curObj;
                    var tempObj;
                    var seedVO;
                    var j;
                    var key;
                    var len = MakeTeaHomeShopModel.instance.teaLeafObjArr.length;
                    for (key in objsArr) {
                        curObj = objsArr[key];
                        seedVO = new models.base.SeedVO();
                        seedVO.id = curObj["si"];
                        seedVO.name = curObj["sn"];
                        seedVO.icon = curObj["simg"];
                        seedVO.seedBuyPrice = curObj["yb"];
                        seedVO.lvl = curObj["l"];
                        seedVO.type = curObj["ty"];
                        for (j = 0; j < len; j++) {
                            tempObj = MakeTeaHomeShopModel.instance.teaLeafObjArr[j];
                            if (parseInt(tempObj["id"]) == seedVO.id) {
                                seedVO.seedDes = tempObj["desc"];
                                seedVO.fruitNums = parseInt(tempObj["yb"]);
                                if (!seedVO.seedDes)
                                    seedVO.seedDes = "无";
                            }
                        }
                        MakeTeaHomeShopModel.instance.seedVOsArr.push(seedVO);
                    }
                    MakeTeaHomeShopModel.instance.handleCallback(MakeTeaHomeShopModel.instance.seedVOsArr);
                };
                /** 道具项（返回已购买的道具id） */
                MakeTeaHomeShopModel.prototype.request_getShopScroll = function () {
                    HttpServiceProxy.request("getWater", null, this.getShopScrollOver);
                };
                MakeTeaHomeShopModel.prototype.getShopScrollOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    var objsArr = receiveData["_d"];
                    if (!objsArr)
                        return;
                    MakeTeaHomeShopModel.instance.toolVOsArr = [];
                    var curObj;
                    var tempObj;
                    var toolVO;
                    var i;
                    var j;
                    var len = objsArr.length;
                    var len2 = MakeTeaHomeShopModel.instance.toolObjArr.length;
                    var index = 0;
                    for (i = 0; i < len; i++) {
                        curObj = objsArr[i];
                        toolVO = new models.base.ToolVO();
                        toolVO.id = curObj["ti"];
                        toolVO.name = curObj["tn"];
                        toolVO.icon = curObj["timg"];
                        toolVO.price = curObj["yb"] ? curObj["yb"] : (curObj["p"] ? curObj["p"] : 0);
                        toolVO.lvl = curObj["l"];
                        toolVO.type = curObj["ty"];
                        for (j = 0; j < len2; j++) {
                            tempObj = MakeTeaHomeShopModel.instance.toolObjArr[j];
                            if (toolVO.id == parseInt(tempObj["id"])) {
                                index++;
                                toolVO.des = tempObj["desc"];
                            }
                        }
                        // 注意：部分无说明（tools.xml和Tencent不同步，缺少内容！）
                        if (!toolVO.des)
                            toolVO.des = "无";
                        MakeTeaHomeShopModel.instance.toolVOsArr.push(toolVO);
                    }
                    MakeTeaHomeShopModel.instance.handleCallback(MakeTeaHomeShopModel.instance.toolVOsArr);
                };
                /**
                 * 购买物品
                 */
                MakeTeaHomeShopModel.prototype.request_buySingleGoods = function (obj) {
                    HttpServiceProxy.request("buySingleGoods", obj, this.buySingleGoodsOver);
                };
                MakeTeaHomeShopModel.prototype.buySingleGoodsOver = function (receiveData) {
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
                MakeTeaHomeShopModel.prototype.request_getShopRightContentData = function (obj) {
                    // HttpServiceProxy.request("getShopRightContentData",{"si":，"st":},this.getShopRightContentDataFn);
                };
                MakeTeaHomeShopModel.prototype.getShopRightContentDataFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    this.rightContentObj = {};
                    this.rightContentObj["errMsg"] = receiveData["_cmsg"];
                    this.rightContentObj["exp"] = receiveData["_e"];
                    this.rightContentObj["gold"] = receiveData["_g"];
                    this.rightContentObj["d"] = receiveData["d"];
                    this.rightContentObj["ext"] = receiveData["ext"];
                };
                MakeTeaHomeShopModel.prototype.handleCallback = function (takeData) {
                    if (MakeTeaHomeShopModel.callback) {
                        if (takeData)
                            MakeTeaHomeShopModel.callback(takeData);
                        else
                            MakeTeaHomeShopModel.callback();
                    }
                };
                return MakeTeaHomeShopModel;
            }());
            shop.MakeTeaHomeShopModel = MakeTeaHomeShopModel;
        })(shop = makeRoom.shop || (makeRoom.shop = {}));
    })(makeRoom = models.makeRoom || (models.makeRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=MakeTeaHomeShopModel.js.map
var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var EventDispatcher = laya.events.EventDispatcher;
            /**
             * 炒锅相关的数据模型
             */
            var PotModel = /** @class */ (function () {
                function PotModel() {
                    if (!PotModel.potArr)
                        PotModel.potArr = new Array();
                    if (!PotModel.teaArr)
                        PotModel.teaArr = new Array();
                }
                PotModel.getInstance = function () {
                    if (!PotModel.instance)
                        PotModel.instance = new PotModel();
                    return PotModel.instance;
                };
                /** 请求所有炒锅数据 */
                PotModel.prototype.request_getCauldron = function () {
                    HttpServiceProxy.request("getCauldron", null, this.getFarmPotFn);
                };
                /** 请求激活炒锅所需条件接口 */
                PotModel.prototype.request_getAssartPotInfo = function (id) {
                    HttpServiceProxy.request("getCauldronBuyInfo", { "hi": id }, this.getAssartPotInfoFn, { "hi": id }); // ,curLandVO
                };
                /** 请求激活炒锅接口 */
                PotModel.prototype.request_actAssartPot = function (id) {
                    HttpServiceProxy.request("actBuyCauldron", { "hi": id }, this.actAssartPotFn, id);
                };
                /** 请求单个收获的接口 */
                PotModel.prototype.request_reapTeaInfo = function (potId) {
                    HttpServiceProxy.request("actChaoCollect", { "hi": potId }, this.getTeaFruitInfo, { "potId": potId });
                };
                /** 请求清除炒锅的接口 */
                PotModel.prototype.request_brushPotInfo = function (potId) {
                    HttpServiceProxy.request("brushTea", { "hi": potId }, this.getBrushPotInfo, { "potId": potId });
                };
                /**
                 * 使用火把道具
                 */
                PotModel.prototype.request_sauteUseTool = function (potId, toolId) {
                    HttpServiceProxy.request("sauteUseTool", { "hi": potId, "tid": toolId }, this.useToolOver, { "potId": potId });
                };
                /** 请求炒锅所有状态接口后的回调 */
                PotModel.prototype.getFarmPotFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    PotModel.receiveData = receiveData;
                    if (takeData)
                        PotModel.takeData = takeData;
                    // if(!PotModel.potArr)
                    PotModel.potArr = new Array();
                    // "_d":[{"pi":0,"hi":1,"hl":1,"hw":["生铁锅",{"tealeaf_max_level":20,"max_count":5}],"hs":0,"status":0}]
                    var allPotArr = PotModel.receiveData["_d"];
                    var tempObj;
                    var index;
                    var potVO;
                    for (index = 0; index < allPotArr.length; index++) {
                        tempObj = allPotArr[index];
                        if (!tempObj)
                            continue;
                        potVO = new pot.PotVO(tempObj["hi"], tempObj["hl"], tempObj["status"]);
                        potVO.intensifyLvl = tempObj["hs"];
                        potVO.posId = tempObj["pi"];
                        if (potVO.status == 0) {
                            if (tempObj["hw"] != null) {
                                var tempArr = tempObj["hw"];
                                var obj = tempArr[1];
                                potVO.name = tempArr[0];
                                potVO.friedTeaMaxLvl = obj["tealeaf_max_level"];
                                potVO.friedTeaMaxNums = obj["max_count"];
                            }
                        }
                        else if (potVO.status == 1) {
                            potVO.teaId = tempObj["li"];
                            potVO.friedTeaNums = tempObj["lc"];
                            potVO.friedTeaRemainTime = tempObj["lt"];
                            potVO.friedTeaTime = tempObj["nt"];
                        }
                        else if (potVO.status == 2) {
                            potVO.teaId = tempObj["li"];
                            potVO.friedTeaNums = tempObj["lc"];
                        }
                        PotModel.potArr.push(potVO);
                    }
                    // 在 View 中更新炒锅
                    PotModel.instance.handleCallback(takeData);
                };
                PotModel.prototype.getAssartPotInfoFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    if (takeData) {
                        PotModel.takeData = takeData;
                    }
                    PotModel.receiveData = receiveData;
                    PotModel.instance.handleCallback(receiveData);
                };
                /**
                 * 点击激活炒锅后的回调
                 */
                PotModel.prototype.actAssartPotFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    // 激活失败
                    if (receiveData.hasOwnProperty("_cmsg")) {
                        TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                        return;
                    } // 激活成功
                    else {
                    }
                    console.log("=================receiveData接收到的值为" + JSON.stringify(receiveData));
                    PotModel.instance.handleCallback(takeData);
                };
                PotModel.prototype.getPotLevelUpFn = function (receiveData, takeData) {
                    // {"_c":"1","errMsg":" ","_api":"getPotLevelUpInfo_84874","nm":51100,"ny	":0,"nl":37,"_cmd":"","_g":"","_e":""}
                    if (!receiveData)
                        return;
                    if (receiveData["errMsg"]) {
                        // TipLayerManager.tipLayer.showCommonTip(receiveData["errMsg"]);
                        TipLayerManager.tipLayer.showDrawBgTip(receiveData["errMsg"]);
                    }
                    else {
                        takeData["needMoney"] = receiveData["nm"];
                        takeData["needDiamond"] = receiveData["ny"];
                        takeData["needLevel"] = receiveData["nl"];
                        PotModel.instance.handleCallback(takeData);
                    }
                };
                /**
                 * 炒锅升级成功
                 */
                PotModel.prototype.actPotLevelUpFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    if (!receiveData["errMsg"]) {
                        TipLayerManager.tipLayer.showDrawBgTip("炒锅升级成功！");
                        PotModel.instance.updatePotLvl(takeData["potId"]);
                        PotModel.instance.handleCallback(takeData);
                    }
                };
                /**
                 * 更新炒锅等级数据
                 */
                PotModel.prototype.updatePotLvl = function (potId) {
                    var i;
                    var len = PotModel.potArr.length;
                    var curPotVO;
                    for (i = 0; i < len; i++) {
                        curPotVO = PotModel.potArr[i];
                        if (curPotVO.id == potId) {
                            curPotVO.level += 1;
                            break;
                        }
                    }
                };
                PotModel.prototype.handleCallback = function (takeData) {
                    if (PotModel.callback) {
                        if (takeData)
                            PotModel.callback(takeData);
                        else
                            PotModel.callback();
                    }
                };
                /**
                 * 通过炒锅 id 获取炒锅数据
                 */
                PotModel.getPotVOByPotId = function (potId) {
                    var potVO;
                    var len = PotModel.potArr.length;
                    var i;
                    for (i = 0; i < len; i++) {
                        potVO = PotModel.potArr[i];
                        if (potId == potVO.id)
                            return potVO;
                    }
                    return null;
                };
                /** 炒锅等级, 0：普通炒锅，1：青色炒锅，2：金色炒锅，3：紫色炒锅，4：金黄色炒锅*/
                PotModel.prototype.getLevelByPotId = function (potId) {
                    var potLvlMsg;
                    var potVO = PotModel.getPotVOByPotId(potId);
                    if (!potVO)
                        potLvlMsg = undefined;
                    if (potVO.level == 0)
                        potLvlMsg = "普通炒锅";
                    else if (potVO.level == 1)
                        potLvlMsg = "青色炒锅";
                    else if (potVO.level == 2)
                        potLvlMsg = "金色炒锅";
                    else if (potVO.level == 3)
                        potLvlMsg = "紫色炒锅";
                    else if (potVO.level == 4)
                        potLvlMsg = "金黄色炒锅";
                    return potLvlMsg;
                };
                /** 获取炒茶后的成品 */
                PotModel.prototype.getTeaFruitInfo = function (receiveData, takeData) {
                    if (receiveData) {
                        PotModel.receiveData = receiveData;
                    }
                    var infoObj;
                    var key;
                    var seedVO = new models.base.SeedVO();
                    infoObj = receiveData["_d"];
                    for (key in infoObj) {
                        if (infoObj.hasOwnProperty("count")) {
                            seedVO.yield = infoObj["count"];
                            seedVO.Tealvl = infoObj["quality"];
                            PotModel.teaArr.push(seedVO);
                        }
                    }
                    PotModel.instance.handleCallback(takeData);
                };
                /** 获取清除炒锅的数据 */
                PotModel.prototype.getBrushPotInfo = function (receiveData, takeData) {
                    if (receiveData) {
                        PotModel.receiveData = receiveData;
                    }
                    // TipLayerManager.tipLayer.showCommonTip("炒锅已清理完成！");
                    PotModel.instance.handleCallback(takeData);
                };
                PotModel.prototype.useToolOver = function (receiveData, takeData) {
                    takeData["left"] = receiveData["left"];
                    PotModel.instance.handleCallback(takeData);
                };
                PotModel.eventDispatcher = new EventDispatcher();
                PotModel.DATA_HANDLED = "data_handled";
                return PotModel;
            }());
            pot.PotModel = PotModel;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=PotModel.js.map
var models;
(function (models) {
    var makeRoom;
    (function (makeRoom) {
        /**
         * 炒茶相关数据
         */
        var MakeTeaDialogModel = /** @class */ (function () {
            function MakeTeaDialogModel() {
                MakeTeaDialogModel.allTeaVOArr = new Array();
                MakeTeaDialogModel.teaShowVOArr = new Array();
                MakeTeaDialogModel.dataShowVOArr = new Array();
                MakeTeaDialogModel.waterVOArr = new Array();
                MakeTeaDialogModel.teaSetVOArr = new Array();
                MakeTeaDialogModel.friedWaterVOArr = new Array();
                MakeTeaDialogModel.seeVO = new models.base.SeedVO();
            }
            MakeTeaDialogModel.getInstance = function () {
                if (!MakeTeaDialogModel.instance)
                    MakeTeaDialogModel.instance = new MakeTeaDialogModel();
                return MakeTeaDialogModel.instance;
            };
            /**
             * 获取分类茶叶数据
             */
            MakeTeaDialogModel.prototype.request_getClassify = function (type) {
                HttpServiceProxy.request("getMakeTeaInfoList", { "tt": type }, this.getClassFyOverFn);
            };
            /**
             * 获取茶叶描述信息
             */
            MakeTeaDialogModel.prototype.request_getDepotRightContentData = function (teaId) {
                HttpServiceProxy.request("getMakeTeaInfo", { "si": teaId }, this.getFirstTeaContentFn);
            };
            /** 获取泡茶所需茶叶材料信息 */
            MakeTeaDialogModel.prototype.request_getMaterRightContentData = function (teaId) {
                HttpServiceProxy.request("getMaterialData", { "li": teaId }, this.getFirstTeamaterContent); //teaId
            };
            /** 获取泡茶所需要的水源信息 */
            MakeTeaDialogModel.prototype.request_getWater = function () {
                HttpServiceProxy.request("getNeedWaterData", null, this.getNeedWater);
            };
            /** 获取泡茶所需要的茶具信息 */
            MakeTeaDialogModel.prototype.request_getTeaSet = function () {
                HttpServiceProxy.request("getTeaSetData", null, this.getTeaSetData);
            };
            /** 获取当前泡茶组合得分 */
            MakeTeaDialogModel.prototype.request_getScore = function (teaId, waterId, teaSetId) {
                HttpServiceProxy.request("getTeaQualityData", { "li": teaId, "wi": waterId, "pi": teaSetId }, this.getScore);
            };
            /** 购买玄天符 */
            MakeTeaDialogModel.prototype.request_getXTF = function (st, si, bct) {
                HttpServiceProxy.request("buySingleGoods", { "st": st, "si": si, "bct": bct }, this.getXTFPrice);
            };
            /** 购买单一水源 */
            MakeTeaDialogModel.prototype.request_getBuyWater = function (st, si, bct) {
                HttpServiceProxy.request("buySingleGoods", { "st": st, "si": si, "bct": bct }, this.getBuyWater, { "si": si, "bct": bct });
            };
            /** 购买单一茶叶 */
            MakeTeaDialogModel.prototype.request_buyleaf = function (st, si, bct, nums) {
                HttpServiceProxy.request("buySingleGoods", { "st": st, "si": si, "bct": bct }, this.getBuyLeaf, { "nums": nums });
            };
            /** 开始烧水 */
            MakeTeaDialogModel.prototype.request_friedWater = function (teaId, teaLvl, waterId, teaSetId, makeTeaNums, useToolFn) {
                HttpServiceProxy.request("startMakeTeaData", { "li": teaId, "tq": teaLvl, "wi": waterId, "pi": teaSetId, "lic": makeTeaNums, "ut": useToolFn }, this.getFriedWaterData);
            };
            MakeTeaDialogModel.prototype.getClassFyOverFn = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var teasObj = receiveData["_d"];
                var key;
                var teaObj;
                var teaVO;
                MakeTeaDialogModel.allTeaVOArr.splice(0, MakeTeaDialogModel.allTeaVOArr.length);
                for (key in teasObj) {
                    teaObj = teasObj[key];
                    teaVO = new models.base.SeedVO();
                    teaVO.id = teaObj["li"]; // 茶叶Id
                    teaVO.Teaname = teaObj["ln"]; // 茶叶名称
                    MakeTeaDialogModel.allTeaVOArr.push(teaVO);
                }
                MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.allTeaVOArr);
            };
            /**
             * 茶叶的详情信息
             */
            MakeTeaDialogModel.prototype.getFirstTeaContentFn = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var teaShowObj = receiveData["_d"];
                MakeTeaDialogModel.teaShowVOArr.splice(0, MakeTeaDialogModel.teaShowVOArr.length);
                var teaShowVO = new models.base.SeedVO();
                teaShowVO.id = teaShowObj["li"]; // 茶叶Id
                teaShowVO.Teaname = teaShowObj["ln"]; // 茶叶名称
                teaShowVO.teaIcon = teaShowObj["limg"]; //茶叶图片
                teaShowVO.teaSet = teaShowObj["rmdpi"]; //茶具
                teaShowVO.water = teaShowObj["rmdti"]; //泡茶用水
                teaShowVO.remtemp = teaShowObj["remtemp"]; //水温
                teaShowVO.optimal = teaShowObj["quality"]; //最优组合
                MakeTeaDialogModel.teaShowVOArr.push(teaShowVO);
                MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.teaShowVOArr);
            };
            /**泡茶条件中的茶叶数据 */
            MakeTeaDialogModel.prototype.getFirstTeamaterContent = function (receiveData) {
                if (receiveData) {
                    this.receiveData = receiveData;
                }
                var seedsObj = receiveData["_d"];
                var seedObj;
                MakeTeaDialogModel.dataShowVOArr.splice(0, MakeTeaDialogModel.dataShowVOArr.length);
                if (seedsObj["tf"].length == 0) {
                    MakeTeaDialogModel.dataShowVOArr.push();
                }
                else {
                    seedObj = seedsObj["tf"];
                    MakeTeaDialogModel.dataShowVOArr.push(seedObj);
                }
                console.log("泡茶所需茶叶的数据" + JSON.stringify(MakeTeaDialogModel.dataShowVOArr));
                MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.dataShowVOArr);
            };
            /** 泡茶条件中的水源数据 */
            MakeTeaDialogModel.prototype.getNeedWater = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var waterArr = receiveData["_d"];
                MakeTeaDialogModel.waterVOArr.splice(0, MakeTeaDialogModel.waterVOArr.length);
                var waterVO;
                var waterObj;
                var i;
                var len = waterArr.length;
                for (i = 0; i < len; i++) {
                    waterVO = new models.base.SeedVO();
                    waterObj = waterArr[i];
                    waterVO.waterId = waterObj["li"]; //水源ID
                    waterVO.waterNums = waterObj["c"]; //仓库里水的数量
                    waterVO.waterLockNums = waterObj["sc"]; //是否缺少（标识）
                    MakeTeaDialogModel.waterVOArr.push(waterVO);
                }
                waterVO = new models.base.SeedVO();
                waterVO.symbolNums = receiveData["xtf"]; //玄天符的数量
                MakeTeaDialogModel.waterVOArr.push(waterVO);
                console.log("水源的数据" + JSON.stringify(MakeTeaDialogModel.waterVOArr));
                MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.waterVOArr);
            };
            /** 泡茶条件中的茶具数据 */
            MakeTeaDialogModel.prototype.getTeaSetData = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var teaSetArr = this.receiveData["_d"];
                MakeTeaDialogModel.teaSetVOArr.splice(0, MakeTeaDialogModel.teaSetVOArr.length);
                var i;
                var len = teaSetArr.length;
                var teaSetVO;
                for (i = 0; i < len; i++) {
                    teaSetVO = new models.base.SeedVO();
                    teaSetVO.teaSetId = teaSetArr[i];
                    MakeTeaDialogModel.teaSetVOArr.push(teaSetVO);
                }
                MakeTeaDialogModel.instance.handleCallback();
            };
            /** 当前泡茶组合得分数据 */
            MakeTeaDialogModel.prototype.getScore = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var scoreObj = receiveData["_d"];
                MakeTeaDialogModel.curScore = scoreObj["quality"];
                MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.curScore);
            };
            /**  购买玄天符*/
            MakeTeaDialogModel.prototype.getXTFPrice = function (receiveData) {
                if (receiveData) {
                    this.receiveData = receiveData;
                }
                TipLayerManager.tipLayer.showDrawBgTip("购买成功！ 花费：" + receiveData["_y"] + "个钻石！");
                controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                MakeTeaDialogModel.waterVOArr[3].symbolNums += 1;
                MakeTeaDialogModel.instance.handleCallback();
            };
            MakeTeaDialogModel.prototype.getBuyWater = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                var i;
                var len = MakeTeaDialogModel.waterVOArr.length - 1;
                TipLayerManager.tipLayer.showDrawBgTip("购买成功！ 花费：" + receiveData["_g"] + "个金币");
                controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                for (i = 0; i < len; i++) {
                    if (takeData["si"] == MakeTeaDialogModel.waterVOArr[i].waterId) {
                        MakeTeaDialogModel.waterVOArr[i].waterNums += takeData["bct"];
                    }
                }
                MakeTeaDialogModel.instance.handleCallback();
            };
            MakeTeaDialogModel.prototype.getBuyLeaf = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                var i;
                var leafObj;
                TipLayerManager.tipLayer.showDrawBgTip("购买成功！ 花费：" + receiveData["_y"] + "个钻石");
                controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                var len = MakeTeaDialogModel.dataShowVOArr.length;
                if (len > 0) {
                    for (i = 0; i < len; i++) {
                        leafObj = MakeTeaDialogModel.dataShowVOArr[i];
                        if (leafObj.hasOwnProperty("1")) {
                            leafObj["1"] += takeData["nums"];
                        }
                        else {
                            leafObj["1"] = takeData["nums"];
                        }
                    }
                }
                else {
                    leafObj = { "1": takeData["nums"] };
                    MakeTeaDialogModel.dataShowVOArr.unshift(leafObj);
                }
                MakeTeaDialogModel.instance.handleCallback();
            };
            MakeTeaDialogModel.prototype.getFriedWaterData = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var takeData = {};
                MakeTeaDialogModel.friedWaterVOArr.splice(0, MakeTeaDialogModel.friedWaterVOArr.length);
                var i;
                var friedWaterVO = new models.base.SeedVO();
                // 正在烧水
                if (receiveData["_cmsg"] && receiveData["_cmsg"].length > 2) {
                    takeData["errMsg"] = receiveData["_cmsg"];
                }
                else {
                    var friedWaterObj = receiveData["_cmd"];
                    var infoObj = friedWaterObj["param"];
                    friedWaterVO.name = friedWaterObj["name"]; //接口类型
                    friedWaterVO.teaSet = infoObj["potType"]; //茶具类型（名称）
                    friedWaterVO.makeTeaNum = infoObj["nums"]; //泡茶数量
                    friedWaterVO.temperature = infoObj["temperature"]; //泡茶室的起始温度
                    var temArr = infoObj["fitTemperature"]; //泡茶需要的温度
                    friedWaterVO.tempBottom = temArr[0]; //泡茶的最低温度
                    friedWaterVO.tempTop = temArr[1]; //泡茶的最高温度
                    MakeTeaDialogModel.friedWaterVOArr.push(friedWaterVO);
                }
                console.log("烧水数据：" + JSON.stringify(MakeTeaDialogModel.friedWaterVOArr));
                MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.friedWaterVOArr);
            };
            MakeTeaDialogModel.prototype.handleCallback = function (takeData) {
                if (MakeTeaDialogModel.callback) {
                    if (takeData)
                        MakeTeaDialogModel.callback(takeData);
                    else
                        MakeTeaDialogModel.callback();
                }
            };
            return MakeTeaDialogModel;
        }());
        makeRoom.MakeTeaDialogModel = MakeTeaDialogModel;
    })(makeRoom = models.makeRoom || (models.makeRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=MakeTeaDialogModel.js.map
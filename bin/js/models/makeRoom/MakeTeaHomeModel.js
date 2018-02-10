var models;
(function (models) {
    var makeRoom;
    (function (makeRoom) {
        // import SeedVO=models.base.SeedVO;
        /**
         * 泡茶室相关数据
         */
        var MakeTeaHomeModel = /** @class */ (function () {
            function MakeTeaHomeModel() {
                MakeTeaHomeModel.makeTeaPowerVOArr = new Array();
                MakeTeaHomeModel.firedWaterVOArr = new Array();
                MakeTeaHomeModel.startMakeTeaVOArr = new Array();
            }
            MakeTeaHomeModel.getInstance = function () {
                if (!MakeTeaHomeModel.instance)
                    MakeTeaHomeModel.instance = new MakeTeaHomeModel();
                return MakeTeaHomeModel.instance;
            };
            /** 初始化泡茶室获取泡茶权限 */
            MakeTeaHomeModel.prototype.request_MakeTeaPower = function () {
                HttpServiceProxy.request("Paoinit", null, this.getMakeTeaPowerData);
            };
            /** 停止加热获取得分（需要参数：温度temp  前端获取） */
            MakeTeaHomeModel.prototype.request_stopFire = function (temp) {
                HttpServiceProxy.request("stopFire", { "temp": temp }, this.stopFire);
            };
            /** 开始泡茶产生的数据 */
            MakeTeaHomeModel.prototype.request_startMakeTea = function () {
                HttpServiceProxy.request("startDunk", null, this.startMakeTea);
            };
            /** 出售泡的茶 */
            MakeTeaHomeModel.prototype.request_saleTea = function () {
                HttpServiceProxy.request("sellTea", null, this.saleTea);
            };
            /** 倒掉烧好的水/将茶叶放回仓库 */
            MakeTeaHomeModel.prototype.request_getWater = function () {
                HttpServiceProxy.request("pourWater", null, this.pourWater);
            };
            /** 泡茶权限数据 */
            MakeTeaHomeModel.prototype.getMakeTeaPowerData = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var powerVOArr = receiveData["_cmd"];
                MakeTeaHomeModel.makeTeaPowerVOArr.splice(0, MakeTeaHomeModel.makeTeaPowerVOArr.length);
                var i;
                var key;
                var len = powerVOArr.length;
                var powerVO;
                if (len <= 0) {
                    powerVO = new models.base.SeedVO();
                    powerVO.symbolNums = receiveData["xtf"];
                    powerVO.name = "";
                    MakeTeaHomeModel.makeTeaPowerVOArr.push(powerVO);
                }
                else {
                    powerVO = new models.base.SeedVO();
                    for (i = 0; i < len; i++) {
                        var powerObj = powerVOArr[i];
                        powerVO.name = powerObj["name"];
                        powerVO.symbolNums = receiveData["xtf"];
                        var dataObj = powerObj["param"];
                        powerVO.teaSet = dataObj["potType"];
                        powerVO.quality = dataObj["quality"];
                        if (powerVO.name == "finishDunkTea") {
                            powerVO.teaPrice = dataObj["price"];
                            powerVO.teaSetNums = dataObj["nums"];
                            MakeTeaHomeModel.makeTeaPowerVOArr.push(powerVO);
                        }
                        else {
                            powerVO.quality = dataObj["quality"];
                            powerVO.temperature = dataObj["temperature"];
                            var tempObj = dataObj["fitTemperature"];
                            for (key in tempObj) {
                                if (key == "0")
                                    powerVO.tempBottom = tempObj[key];
                                else
                                    powerVO.tempTop = tempObj[key];
                            }
                            MakeTeaHomeModel.makeTeaPowerVOArr.push(powerVO);
                        }
                    }
                }
                MakeTeaHomeModel.instance.handleCallback(MakeTeaHomeModel.makeTeaPowerVOArr);
            };
            /** 停止加热获取得分 */
            MakeTeaHomeModel.prototype.stopFire = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var firedWaterObj = receiveData;
                MakeTeaHomeModel.firedWaterVOArr.splice(0, MakeTeaHomeModel.firedWaterVOArr.length);
                var teaVO = new models.base.SeedVO();
                teaVO.quality = firedWaterObj["quality"]; //茶水品质
                teaVO.waterStatus = firedWaterObj["waterstatus"]; //水温的品质
                MakeTeaHomeModel.firedWaterVOArr.push(teaVO);
                MakeTeaHomeModel.instance.handleCallback(MakeTeaHomeModel.firedWaterVOArr);
            };
            /** 开始泡茶数据 */
            MakeTeaHomeModel.prototype.startMakeTea = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var teaShowObj = receiveData;
                MakeTeaHomeModel.startMakeTeaVOArr.splice(0, MakeTeaHomeModel.startMakeTeaVOArr.length);
                var teaShowVO = new models.base.SeedVO();
                teaShowVO.teaPrice = teaShowObj["price"]; // 泡好的茶叶单价
                MakeTeaHomeModel.startMakeTeaVOArr.push(teaShowVO);
                // MakeTeaHomeModel.instance.handleCallback(MakeTeaHomeModel.startMakeTeaVOArr);
            };
            /**  出售泡的茶 */
            MakeTeaHomeModel.prototype.saleTea = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var takeData = {};
                // 出售失败
                if (receiveData["_cmsg"] && receiveData["_cmsg"].length > 2) {
                    takeData["errMsg"] = receiveData["_cmsg"];
                }
                else {
                    if (receiveData["_e"] > 0) {
                        takeData["exp"] = receiveData["_e"];
                    }
                    if (receiveData["_g"] > 0) {
                        takeData["money"] = receiveData["_g"];
                    }
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    MakeTeaHomeModel.startMakeTeaVOArr.length = 0;
                    makeRoom.MakeTeaDialogModel.friedWaterVOArr.length = 0;
                    MakeTeaHomeModel.makeTeaPowerVOArr.length = 0;
                    var PowerVO = new models.base.SeedVO();
                    PowerVO.name = "";
                    MakeTeaHomeModel.makeTeaPowerVOArr.push(PowerVO);
                }
                // MakeTeaHomeModel.instance.handleCallback(takeData);
            };
            /** 倒掉烧好的水 */
            MakeTeaHomeModel.prototype.pourWater = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var takeData = {};
                // 接收数据
                if (receiveData["_cmsg"] && receiveData["_cmsg"].length > 2) {
                    takeData["errMsg"] = receiveData["_cmsg"];
                }
                MakeTeaHomeModel.startMakeTeaVOArr.length = 0;
                makeRoom.MakeTeaDialogModel.friedWaterVOArr.length = 0;
                MakeTeaHomeModel.makeTeaPowerVOArr.length = 0;
                var PowerVO = new models.base.SeedVO();
                PowerVO.name = "";
                MakeTeaHomeModel.makeTeaPowerVOArr.push(PowerVO);
                // MakeTeaHomeModel.instance.handleCallback(takeData);
            };
            MakeTeaHomeModel.prototype.handleCallback = function (takeData) {
                if (MakeTeaHomeModel.callback) {
                    if (takeData)
                        MakeTeaHomeModel.callback(takeData);
                    else
                        MakeTeaHomeModel.callback();
                }
            };
            return MakeTeaHomeModel;
        }());
        makeRoom.MakeTeaHomeModel = MakeTeaHomeModel;
    })(makeRoom = models.makeRoom || (models.makeRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=MakeTeaHomeModel.js.map
var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        // import PlayerInfoModel = models.player.PlayerInfoModel;
        /**
         * 茶园场景数据模型
         * @author hsx
         */
        var TeaGardenModel = /** @class */ (function () {
            function TeaGardenModel() {
                TeaGardenModel.teaGardenVO = new models.base.TeaGardenVO();
                TeaGardenModel.friendTeaGardenVO = new models.base.TeaGardenVO();
                TeaGardenModel.userDecVOArr = new Array();
                TeaGardenModel.decorationVOArr = new Array();
            }
            Object.defineProperty(TeaGardenModel, "instance", {
                get: function () {
                    if (!TeaGardenModel._instance)
                        TeaGardenModel._instance = new TeaGardenModel();
                    return TeaGardenModel._instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 请求狗的数据 (get url about dog's id)
             * 有 "getDog" 接口与之对应（get dog's id）
             */
            TeaGardenModel.prototype.request_initDog = function () {
                HttpServiceProxy.request("initDog", null, this.initDogOver);
            };
            TeaGardenModel.prototype.request_initFriendDog = function (userId) {
                HttpServiceProxy.request("initDog", { "_f": userId }, this.initFriendDogOver);
            };
            TeaGardenModel.prototype.initDogOver = function (receiveData) {
                if (!receiveData)
                    return;
                var takeData = new Object();
                takeData["swfUrl"] = receiveData["timg"];
                TeaGardenModel.instance.handleCallback(takeData);
            };
            TeaGardenModel.prototype.initFriendDogOver = function (receiveData) {
                if (!receiveData)
                    return;
                var takeData = new Object();
                takeData["swfUrl"] = receiveData["timg"];
                TeaGardenModel.instance.handleCallback(takeData);
            };
            /**
             * 请求茶农数据 (get url about farmer's id)
             * 有 "getFarmer" 接口与之对应（get farmer's id）
             */
            TeaGardenModel.prototype.request_initFarmer = function () {
                HttpServiceProxy.request("initFarmer", null, this.initFarmerOver);
            };
            TeaGardenModel.prototype.request_initFriendFarmer = function (userId) {
                HttpServiceProxy.request("initFarmer", { "_f": userId }, this.initFriendFarmerOver);
            };
            TeaGardenModel.prototype.initFarmerOver = function (receiveData) {
                if (!receiveData)
                    return;
                // {"_c":"1","_cmsg":"","_api":"initFarmer_5699","tn":"张大姐","timg":"http://kaixins.app100712594.twsapp.com/static/farmer_13.swf",
                // "farmercard":72678,"_cmd":"","_g":"","_e":""}
                if (receiveData["_cmsg"].length == 0) {
                    TeaGardenModel.teaGardenVO.restTimeOfWork = receiveData["farmercard"] ? receiveData["farmercard"] : 0;
                    TeaGardenModel.teaGardenVO.farmerUrl = receiveData["timg"] ? receiveData["timg"] : null;
                    TeaGardenModel.instance.handleCallback(receiveData);
                }
            };
            TeaGardenModel.prototype.initFriendFarmerOver = function (receiveData) {
                if (!receiveData)
                    return;
                // {"_c":"1","_cmsg":"","_api":"initFarmer_5699","tn":"张大姐","timg":"http://kaixins.app100712594.twsapp.com/static/farmer_13.swf",
                // "farmercard":72678,"_cmd":"","_g":"","_e":""}
                if (receiveData["_cmsg"].length == 0) {
                    TeaGardenModel.friendTeaGardenVO.restTimeOfWork = receiveData["farmercard"] ? receiveData["farmercard"] : 0;
                    TeaGardenModel.friendTeaGardenVO.farmerUrl = receiveData["timg"] ? receiveData["timg"] : null;
                    TeaGardenModel.instance.handleCallback(receiveData);
                }
            };
            /**
             * 请求用户自己的茶园背景
             */
            TeaGardenModel.prototype.request_getUserGardenDec = function () {
                HttpServiceProxy.request("getFarmDecoration", null, this.getUserGardenDec);
            };
            /**
             * 请求好友茶园背景
             */
            TeaGardenModel.prototype.request_getFarmDecoration = function (userId) {
                HttpServiceProxy.request("getFarmDecoration", { "_f": userId }, this.getFarmDecorationOver);
            };
            TeaGardenModel.prototype.getUserGardenDec = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var decInfoArr = receiveData["_d"];
                TeaGardenModel.userDecVOArr.length = 0;
                var key;
                var decVO;
                var storageDecVO;
                var decObj;
                var storageDecObj;
                var decObjArr;
                for (key in decInfoArr) {
                    decVO = new models.base.ToolVO();
                    decObj = decInfoArr[key];
                    decVO.id = decObj["di"];
                    decVO.name = decObj["dn"];
                    decVO.icon = decObj["realimg"];
                    decVO.des = decObj["ty"];
                    TeaGardenModel.userDecVOArr.push(decVO);
                    decObjArr = decObj["attach"];
                    for (var j = 0; j < decObjArr.length; j++) {
                        storageDecVO = new models.base.ToolVO();
                        storageDecObj = decObjArr[j];
                        storageDecVO.id = storageDecObj["di"];
                        storageDecVO.name = storageDecObj["dn"];
                        storageDecVO.icon = storageDecObj["realimg"];
                        storageDecVO.des = storageDecObj["ty"];
                        TeaGardenModel.userDecVOArr.push(storageDecVO);
                    }
                }
                TeaGardenModel.instance.handleCallback(TeaGardenModel.userDecVOArr);
            };
            TeaGardenModel.prototype.getFarmDecorationOver = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                TeaGardenModel.decorationVOArr.length = 0;
                var decInfoArr = receiveData["_d"];
                var key;
                var decVO;
                var decObj;
                for (key in decInfoArr) {
                    decVO = new models.base.ToolVO();
                    decObj = decInfoArr[key];
                    decVO.id = decObj["di"];
                    decVO.name = decObj["dn"];
                    decVO.icon = decObj["realimg"];
                    decVO.des = decObj["ty"];
                    TeaGardenModel.decorationVOArr.push(decVO);
                }
                TeaGardenModel.instance.handleCallback(TeaGardenModel.decorationVOArr);
            };
            /**
             * 根据服务器返回的结果做相应的后续处理
             */
            TeaGardenModel.prototype.resultHandler = function (receiveData, takeData) {
                if (receiveData["_cmsg"]) {
                    takeData["errMsg"] = receiveData["_cmsg"];
                }
                else {
                    var exp = receiveData["_e"] ? receiveData["_e"] : 0;
                    if (exp) {
                        takeData["exp"] = exp;
                    }
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                }
                TeaGardenModel.instance.handleCallback(takeData);
            };
            TeaGardenModel.prototype.handleCallback = function (takeData) {
                if (TeaGardenModel.callback) {
                    if (takeData)
                        TeaGardenModel.callback(takeData);
                    else
                        TeaGardenModel.callback();
                }
            };
            return TeaGardenModel;
        }());
        teaRoom.TeaGardenModel = TeaGardenModel;
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=TeaGardenModel.js.map
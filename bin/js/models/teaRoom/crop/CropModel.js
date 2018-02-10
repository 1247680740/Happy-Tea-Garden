var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        var crop;
        (function (crop) {
            // import CropCtrl = controllers.teaRoom.crop.CropCtrl;
            // import PlayerInfoModel = models.player.PlayerInfoModel;
            /**
             * 作物相关数据模型
             */
            var CropModel = /** @class */ (function () {
                function CropModel() {
                    CropModel.cropVOArr = new Array();
                    CropModel.friendCropVOArr = new Array();
                    CropModel.dryCropVOsArr = new Array();
                    CropModel.grassCropVOsArr = new Array();
                    CropModel.wormCropVOsArr = new Array();
                    CropModel.dryCropVOsArr1 = new Array();
                    CropModel.grassCropVOsArr1 = new Array();
                    CropModel.wormCropVOsArr1 = new Array();
                }
                CropModel.getInstance = function () {
                    if (!CropModel.instance)
                        CropModel.instance = new CropModel();
                    return CropModel.instance;
                };
                /** 种植 */
                CropModel.prototype.request_doGrow = function (landId, seedId) {
                    if (!landId || !seedId)
                        return;
                    HttpServiceProxy.request("doGrow", { "li": landId, "si": seedId }, this.doGrowFn, { "landId": landId, "seedId": seedId });
                };
                /** 种植是否成功 */
                CropModel.prototype.doGrowFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    takeData && (CropModel.takeData = takeData);
                    // takeData = {};
                    if (receiveData["_cmsg"]) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        // 经验 + _e 个
                        var exp = parseInt(receiveData["_e"]);
                        takeData["exp"] = exp;
                        controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                /** 种植成功或状态更新后请求作物状态等相关数据 */
                CropModel.prototype.request_initCrop = function (landId, seedId) {
                    if (!landId || !seedId)
                        return;
                    HttpServiceProxy.request("initCrop", { "li": landId, "si": seedId }, this.initCropFn, { "landId": landId, "seedId": seedId });
                };
                CropModel.prototype.request_initFriendCrop = function (landId, seedId) {
                    if (!landId || !seedId)
                        return;
                    HttpServiceProxy.request("initCrop", { "_f": models.player.PlayerInfoModel.friendInfo.userId, "li": landId, "si": seedId }, this.initFriendCropFn, { "landId": landId, "seedId": seedId });
                };
                /**
                 * 除草
                 */
                CropModel.prototype.request_actWipeGrass = function (cropVO, isFarmer, curCoordinate) {
                    if (isFarmer === void 0) { isFarmer = false; }
                    if (isFarmer)
                        HttpServiceProxy.request("actWipeGrass", { "li": cropVO.landId }, this.removeOneGrassOverFn, { "landId": cropVO.landId, "isFarmer": "removeGrass", "curCoordinate": curCoordinate });
                    else
                        HttpServiceProxy.request("actWipeGrass", { "li": cropVO.landId }, this.removeOneGrassOverFn, { "landId": cropVO.landId });
                };
                CropModel.prototype.request_actFriendWipeGrass = function (cropVO) {
                    HttpServiceProxy.request("actWipeGrass", { "_f": models.player.PlayerInfoModel.friendInfo.userId, "li": cropVO.landId }, this.removeOneGrassOverFn, { "landId": cropVO.landId });
                };
                /**
                 * 除虫
                 */
                CropModel.prototype.request_actPesticide = function (cropVO, isFarmer, curCoordinate) {
                    if (isFarmer === void 0) { isFarmer = false; }
                    if (isFarmer)
                        HttpServiceProxy.request("actPesticide", { "li": cropVO.landId }, this.removeOneWormOverFn, { "landId": cropVO.landId, "isFarmer": "killWrom", "curCoordinate": curCoordinate });
                    else
                        HttpServiceProxy.request("actPesticide", { "li": cropVO.landId }, this.removeOneWormOverFn, { "landId": cropVO.landId });
                };
                CropModel.prototype.request_actFriendPesticide = function (cropVO) {
                    HttpServiceProxy.request("actPesticide", { "_f": models.player.PlayerInfoModel.friendInfo.userId, "li": cropVO.landId }, this.removeOneWormOverFn, { "landId": cropVO.landId });
                };
                /**
                 * 浇水
                 */
                CropModel.prototype.request_actWater = function (cropVO, isFarmer, curCoordinate) {
                    if (isFarmer === void 0) { isFarmer = false; }
                    if (isFarmer)
                        HttpServiceProxy.request("actWater", { "li": cropVO.landId }, this.waterOverFn, { "landId": cropVO.landId, "isFarmer": "water", "curCoordinate": curCoordinate });
                    else
                        HttpServiceProxy.request("actWater", { "li": cropVO.landId }, this.waterOverFn, { "landId": cropVO.landId });
                };
                CropModel.prototype.request_actFriendWater = function (cropVO) {
                    HttpServiceProxy.request("actWater", { "_f": models.player.PlayerInfoModel.friendInfo.userId, "li": cropVO.landId }, this.waterOverFn, { "landId": cropVO.landId });
                };
                /**
                 * 放草
                 */
                CropModel.prototype.request_putGrass = function (cropVO) {
                    HttpServiceProxy.request("actPutGrass", { "_f": models.player.PlayerInfoModel.friendInfo.userId, "li": cropVO.landId }, this.putGrassOverFn, { "landId": cropVO.landId });
                };
                /**
                 * 放虫
                 */
                CropModel.prototype.request_putWorm = function (cropVO) {
                    HttpServiceProxy.request("actWorm", { "_f": models.player.PlayerInfoModel.friendInfo.userId, "li": cropVO.landId }, this.putWormOverFn, { "land": cropVO });
                };
                /**
                 * 获取作物（游戏初始化时）
                 */
                CropModel.prototype.request_getCrop = function () {
                    HttpServiceProxy.request("getCrop", null, this.getCropFn);
                };
                /**
                 *  获取好友游戏作物
                 */
                CropModel.prototype.request_getFriendCrop = function () {
                    HttpServiceProxy.request("getCrop", { "_f": models.player.PlayerInfoModel.friendInfo.userId }, this.getFriendCropFn);
                };
                CropModel.prototype.getCropFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    if (takeData)
                        CropModel.takeData = takeData;
                    CropModel.cropVOArr.length = 0;
                    var allObj = receiveData["_d"];
                    if (!allObj)
                        return;
                    CropModel.cropVOArr.length = 0;
                    var cropVO;
                    var landId;
                    var cropObj;
                    for (landId in allObj) {
                        cropObj = allObj[landId];
                        cropVO = new models.base.CropVO();
                        cropVO.landId = parseInt(landId);
                        // {"1":{,"gt":113306328,"hc":0,"ll":0,"cp":3,"s":1,"die":0,"th":0,"lc":15,"o":"26","c":1}
                        cropVO.id = cropObj["si"]; // 此处是种子id，注意与 SeedVO 的关系！
                        cropVO.totalGrowthTime = cropObj["gt"];
                        // cropVO. = cropObj["hc"];	// harvest count
                        // cropVO. = cropObj["ll"];	// land level
                        cropVO.growthStatus = cropObj["cp"];
                        cropVO.worm = cropObj["vc"] ? cropObj["vc"] : 0;
                        cropVO.grass = cropObj["wc"] ? cropObj["wc"] : 0;
                        cropVO.dry = cropObj["dr"] ? cropObj["dr"] : 0;
                        // cropVO.debuff["worm"] = cropObj["vc"]?cropObj["vc"]:0;
                        // cropVO.debuff["grass"] = cropObj["wc"]?cropObj["wc"]:0;
                        // cropVO.debuff["dry"] = cropObj["dr"]?cropObj["dr"]:0;
                        cropVO.season = cropObj["s"];
                        cropVO.isDeath = cropObj["die"];
                        cropVO.isSteal = cropObj["th"];
                        cropVO.remnantOutput = cropObj["lc"];
                        cropVO.growthTime = cropObj["nt"] ? cropObj["nt"] : 0;
                        CropModel.cropVOArr.push(cropVO);
                    }
                    CropModel.cropVOArr.sort(CropModel.instance.sortCropVOArr);
                    CropModel.instance.saveCropVOsByDebuffType(); // 2017-08-07 hsx
                    CropModel.instance.handleCallback(takeData);
                };
                CropModel.prototype.getFriendCropFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    if (takeData)
                        CropModel.takeData = takeData;
                    CropModel.friendCropVOArr.length = 0;
                    var allObj = receiveData["_d"];
                    if (!allObj)
                        return;
                    var cropVO;
                    var landId;
                    var cropObj;
                    for (landId in allObj) {
                        cropObj = allObj[landId];
                        cropVO = new models.base.CropVO();
                        cropVO.landId = parseInt(landId);
                        cropVO.id = cropObj["si"];
                        cropVO.totalGrowthTime = cropObj["gt"];
                        cropVO.growthStatus = cropObj["cp"];
                        cropVO.worm = cropObj["vc"] ? cropObj["vc"] : 0;
                        cropVO.grass = cropObj["wc"] ? cropObj["wc"] : 0;
                        cropVO.dry = cropObj["dr"] ? cropObj["dr"] : 0;
                        cropVO.season = cropObj["s"];
                        cropVO.isDeath = cropObj["die"];
                        cropVO.isSteal = cropObj["th"];
                        cropVO.remnantOutput = cropObj["lc"];
                        cropVO.growthTime = cropObj["nt"] ? cropObj["nt"] : 0;
                        CropModel.friendCropVOArr.push(cropVO);
                    }
                    CropModel.friendCropVOArr.sort(CropModel.instance.sortCropVOArr);
                    CropModel.instance.saveFriendCropVOsByDebuffType(); // 2017-10-23 hsx
                    CropModel.instance.handleCallback(takeData);
                };
                /**
                 * 种植成功、施肥、收获完毕或其它状态更新后的作物数据
                 */
                CropModel.prototype.initCropFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    CropModel.takeData = takeData;
                    if (receiveData["_cmsg"]) {
                        takeData = {};
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        var cropVO = CropModel.instance.getCropVOByLandIdAndSeedId(takeData);
                        if (!cropVO) {
                            cropVO = new models.base.CropVO();
                            CropModel.cropVOArr.push(cropVO);
                        }
                        CropModel.instance.fillVO(cropVO, receiveData);
                        // 自带数据赋值
                        cropVO.id = takeData["seedId"];
                        cropVO.landId = takeData["landId"];
                        CropModel.instance.curPlantCropVO = cropVO;
                        // 按 landId 排序
                        CropModel.cropVOArr.sort(CropModel.instance.sortCropVOArr);
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                CropModel.prototype.initFriendCropFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    CropModel.takeData = takeData;
                    if (receiveData["_cmsg"]) {
                        takeData = {};
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        var cropVO = CropModel.instance.getFriendCropVOByLandIdAndSeedId(takeData);
                        if (!cropVO) {
                            cropVO = new models.base.CropVO();
                            CropModel.friendCropVOArr.push(cropVO);
                        }
                        CropModel.instance.fillVO(cropVO, receiveData);
                        // 自带数据赋值
                        cropVO.id = takeData["seedId"];
                        cropVO.landId = takeData["landId"];
                        CropModel.instance.curPlantCropVO = cropVO;
                        // 按 landId 排序
                        CropModel.friendCropVOArr.sort(CropModel.instance.sortCropVOArr);
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                /**
                 * 先判断相应地块是否已种植特定作物，若有，则在其基础上更新数据
                 */
                CropModel.prototype.getCropVOByLandIdAndSeedId = function (takeData) {
                    if (!takeData["landId"] || !takeData["seedId"])
                        return null;
                    var cropVO = null;
                    if (CropModel.cropVOArr && CropModel.cropVOArr.length) {
                        var len = CropModel.cropVOArr.length;
                        var i = void 0;
                        for (i = 0; i < len; i++) {
                            cropVO = CropModel.cropVOArr[i];
                            // 若当前地块上已有此作物
                            if (cropVO.id == takeData["seedId"] && cropVO.landId == takeData["landId"]) {
                                // CropModel.cropVOArr.splice(i,1);
                                // break;
                                return cropVO;
                            }
                        }
                    }
                    return null;
                };
                /** (好友) 先判断相应地块是否已种植特定作物，若有，则在其基础上更新数据 */
                CropModel.prototype.getFriendCropVOByLandIdAndSeedId = function (takeData) {
                    if (!takeData["landId"] || !takeData["seedId"])
                        return null;
                    var cropVO = null;
                    if (CropModel.friendCropVOArr && CropModel.friendCropVOArr.length) {
                        var len = CropModel.friendCropVOArr.length;
                        var i = void 0;
                        for (i = 0; i < len; i++) {
                            cropVO = CropModel.friendCropVOArr[i];
                            // 若当前地块上已有此作物
                            if (cropVO.id == takeData["seedId"] && cropVO.landId == takeData["landId"]) {
                                // CropModel.cropVOArr.splice(i,1);
                                // break;
                                return cropVO;
                            }
                        }
                    }
                    return null;
                };
                /**
                 * 填充VO数据，供 initCrop / actCollect 通用
                 */
                CropModel.prototype.fillVO = function (cropVO, receiveData) {
                    cropVO.levelText = receiveData["cpn"];
                    cropVO.season = receiveData["s"];
                    cropVO.name = receiveData["sn"];
                    // let isDeath:boolean = false;
                    cropVO.isDeath = receiveData["die"] ? receiveData["die"] : false;
                    // receiveData["die"];
                    cropVO.isSteal = receiveData["th"];
                    cropVO.iconUrl = receiveData["simg"];
                    cropVO.remnantOutput = receiveData["lc"];
                    // 未成熟
                    cropVO.nextLevelText = receiveData["npn"] ? receiveData["npn"] : "";
                    cropVO.growthTime = receiveData["nt"] ? receiveData["nt"] : 0; // "nt" 与 "et" 的区别
                    cropVO.totalGrowthTime = receiveData["et"] ? receiveData["et"] : 0;
                    // 成熟
                    cropVO.totalOutput = receiveData["o"] ? receiveData["o"] : 0;
                };
                /**
                 * 施肥
                 */
                CropModel.prototype.request_actProp = function (paramObj) {
                    var landId = paramObj["landId"];
                    var seedId = paramObj["seedId"];
                    var toolId = paramObj["toolId"];
                    HttpServiceProxy.request("actProp", { "li": landId, "si": seedId, "ti": toolId }, this.fertilizeOver, { "landId": landId, "seedId": seedId });
                };
                CropModel.prototype.fertilizeOver = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    if (receiveData["_cmsg"]) {
                        takeData = {};
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                /**
                 * 收获单个作物
                 */
                CropModel.prototype.request_actCollect = function (landId, seedId) {
                    HttpServiceProxy.request("actCollect", { "li": landId, "si": seedId }, this.harvestCropOver, { "landId": landId, "seedId": seedId });
                };
                /**
                 * 单个作物收获完成(与收益相关的东西确认是否还需完善！！！)
                 */
                CropModel.prototype.harvestCropOver = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    if (receiveData["_cmsg"]) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        CropModel.instance.harvestSingleCropHandler(receiveData, takeData);
                    }
                    CropModel.instance.handleCallback(takeData);
                    // 会调用接口：getUserLevel，确认什么情况下调用 ！！！
                };
                /** 单个作物收获后的处理 */
                CropModel.prototype.harvestSingleCropHandler = function (cropObj, takeData) {
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(cropObj);
                    takeData["exp"] = parseInt(cropObj["exp"]);
                    var cropVO = CropModel.instance.getCropVOByLandIdAndSeedId(takeData);
                    if (!cropVO)
                        return;
                    CropModel.instance.fillVO(cropVO, cropObj);
                    // cropVO.   = receiveData["hc"];
                    // 			   receiveData["_t"];
                };
                /** 偷茶单个作物收获后的处理 */
                CropModel.prototype.harvestFriendSingleCropHandler = function (cropObj, takeData) {
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(cropObj);
                    takeData["exp"] = parseInt(cropObj["exp"]);
                    var cropVO = CropModel.instance.getFriendCropVOByLandIdAndSeedId(takeData);
                    if (!cropVO)
                        return;
                    CropModel.instance.fillVO(cropVO, cropObj);
                    // cropVO.   = receiveData["hc"];
                    // 			   receiveData["_t"];
                };
                /** 一键收获 */
                CropModel.prototype.request_actAllCollect = function () {
                    HttpServiceProxy.request("actAllCollect", null, this.harvestAllCropOver);
                };
                /** 偷茶（一键收获） */
                CropModel.prototype.request_actFriendAllCollect = function () {
                    HttpServiceProxy.request("actAllCollect", { "_f": models.player.PlayerInfoModel.friendInfo.userId }, this.harvestFriendAllCropOver);
                };
                CropModel.prototype.harvestAllCropOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    var takeData = {};
                    var cropObjArr = new Array();
                    if (receiveData["_cmsg"]) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        var landId = void 0;
                        var cropObj = void 0;
                        var curCropVO = void 0;
                        for (landId in receiveData["_d"]) {
                            cropObj = receiveData["_d"][landId];
                            curCropVO = CropModel.getCropVOByLandId(cropObj["li"]);
                            if (!curCropVO)
                                continue;
                            var _takeData = {};
                            _takeData["seedId"] = curCropVO.id;
                            _takeData["landId"] = parseInt(landId);
                            cropObjArr.push(_takeData);
                            // 结果处理
                            CropModel.instance.harvestSingleCropHandler(cropObj, _takeData);
                        }
                        takeData["cropObjArr"] = cropObjArr;
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                CropModel.prototype.harvestFriendAllCropOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    var takeData = {};
                    var friendCropObjArr = new Array();
                    if (receiveData["_cmsg"]) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        var landId = void 0;
                        var cropObj = void 0;
                        var curCropVO = void 0;
                        for (landId in receiveData["_d"]) {
                            cropObj = receiveData["_d"][landId];
                            // cropObjArr.push(cropObj);
                            curCropVO = CropModel.getFriendCropVOByLandId(cropObj["li"]);
                            if (!curCropVO)
                                continue;
                            var _takeData = {};
                            _takeData["seedId"] = curCropVO.id;
                            _takeData["landId"] = parseInt(landId);
                            friendCropObjArr.push(_takeData);
                            // 结果处理
                            CropModel.instance.harvestFriendSingleCropHandler(cropObj, _takeData);
                        }
                        takeData["friendCropObjArr"] = friendCropObjArr;
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                /**
                 * 铲除作物
                 */
                CropModel.prototype.request_deleteCrop = function (landId, seedId) {
                    HttpServiceProxy.request("deleteCrop", { "li": landId, "si": seedId }, this.deleteCropOver, { "landId": landId });
                };
                CropModel.prototype.deleteCropOver = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    CropModel.receiveData = receiveData;
                    if (receiveData["_cmsg"]) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        var exp = receiveData["_e"] ? receiveData["_e"] : 0;
                        if (exp)
                            takeData["exp"] = exp;
                        controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    }
                    CropModel.instance.handleCallback(takeData);
                };
                CropModel.prototype.removeOneGrassOverFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    // "_t"（针对好友）:  0:正常;1:可偷;2:可浇水;3:可除草;4:可除虫;  => 由后端源码推测，优先级由高到低依次为：1、2、3、4、0
                    CropModel.instance.resultHandler(receiveData, takeData);
                };
                CropModel.prototype.removeOneWormOverFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    // "_t":  0:正常;1:可偷;2:可浇水;3:可除草;4:可除虫;
                    // {"_e":2,"_t":2,"_c":1,"_cmd":[],"_api":"actPesticide_78925"}
                    CropModel.instance.resultHandler(receiveData, takeData);
                };
                CropModel.prototype.waterOverFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    // "_t"   "_e"
                    takeData["newStatus"] = receiveData["_t"];
                    CropModel.instance.resultHandler(receiveData, takeData);
                };
                CropModel.prototype.putGrassOverFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    // takeData["newStatus"] = receiveData["_c"];
                    CropModel.instance.resultHandler(receiveData, takeData);
                };
                CropModel.prototype.putWormOverFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    // takeData["newStatus"] = receiveData["_c"];
                    CropModel.instance.resultHandler(receiveData, takeData);
                };
                /**
                 * 根据服务器返回的结果做相应的后续处理
                 */
                CropModel.prototype.resultHandler = function (receiveData, takeData) {
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
                    CropModel.instance.handleCallback(takeData);
                };
                CropModel.prototype.handleCallback = function (takeData) {
                    if (CropModel.callback) {
                        if (takeData)
                            CropModel.callback(takeData);
                        else
                            CropModel.callback();
                    }
                };
                /**
                 * 调用回调（备用！）
                 */
                CropModel.prototype.handleCallback2 = function (receiveData, takeData) {
                    if (CropModel.callback) {
                        if (receiveData) {
                            if (takeData)
                                CropModel.callback(receiveData, takeData);
                            else
                                CropModel.callback(receiveData);
                        }
                        else {
                            if (takeData)
                                CropModel.callback(takeData);
                            else
                                CropModel.callback();
                        }
                    }
                };
                /**
                 * 对作物数据数组按 landId 排序
                 */
                CropModel.prototype.sortCropVOArr = function (a, b) {
                    if (a.landId > b.landId)
                        return 1;
                    else if (a.landId < b.landId)
                        return -1;
                    else
                        return 0;
                };
                /**
                 * 移除特定地块所对应作物的数据
                 */
                CropModel.prototype.removeCropVOFromArr = function (landId) {
                    var i;
                    var len = CropModel.cropVOArr.length;
                    var curCropVO;
                    for (i = 0; i < len; i++) {
                        curCropVO = CropModel.cropVOArr[i];
                        if (curCropVO.landId == landId) {
                            CropModel.cropVOArr.splice(i, 1);
                            break;
                        }
                    }
                };
                /**
                 * 通过地块 id 获得其上对应的作物数据
                 */
                CropModel.getCropVOByLandId = function (landId) {
                    var cropNum = CropModel.cropVOArr.length;
                    var curCropVO;
                    var i;
                    for (i = 0; i < cropNum; i++) {
                        curCropVO = CropModel.cropVOArr[i];
                        if (curCropVO.landId == landId) {
                            return curCropVO;
                        }
                    }
                    return null;
                };
                /**
                 * 通过地块 id 获得好友土地上对应的作物数据
                 */
                CropModel.getFriendCropVOByLandId = function (landId) {
                    var cropNum = CropModel.friendCropVOArr.length;
                    var curCropVO;
                    var i;
                    for (i = 0; i < cropNum; i++) {
                        curCropVO = CropModel.friendCropVOArr[i];
                        if (curCropVO.landId == landId) {
                            return curCropVO;
                        }
                    }
                    return null;
                };
                /**
                 * 判断特定的土地上是否有作物
                 */
                CropModel.isHasCropInLandGrid = function (landId) {
                    if (CropModel.getCropVOByLandId(landId))
                        return true;
                    else
                        return false;
                };
                /**
                 * 判断特定好友的土地上是否有作物
                 */
                CropModel.isHasFriendCropInLandGrid = function (landId) {
                    if (CropModel.getFriendCropVOByLandId(landId))
                        return true;
                    else
                        return false;
                };
                /**
                 * 所有作物是否有不良状态存在
                 */
                CropModel.isHasDebuff = function () {
                    var cropNum = CropModel.cropVOArr.length;
                    var curCropVO;
                    var i;
                    for (i = 0; i < cropNum; i++) {
                        curCropVO = CropModel.cropVOArr[i];
                        if (curCropVO.isHasDebuff) {
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 * 好友所有作物是否有不良状态存在
                 */
                CropModel.isHasFriendDebuff = function () {
                    var cropNum = CropModel.friendCropVOArr.length;
                    var curCropVO;
                    var i;
                    for (i = 0; i < cropNum; i++) {
                        curCropVO = CropModel.friendCropVOArr[i];
                        if (curCropVO.isHasDebuff) {
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 * 按是否有干旱、草、虫情况依次存储所对应的作物数据（也可按作物显示顺序依次判断进行处理！）
                 */
                CropModel.prototype.saveCropVOsByDebuffType = function () {
                    var cropNum = CropModel.cropVOArr.length;
                    var curCropVO;
                    var i;
                    CropModel.dryCropVOsArr = new Array();
                    CropModel.grassCropVOsArr = new Array();
                    CropModel.wormCropVOsArr = new Array();
                    for (i = 0; i < cropNum; i++) {
                        curCropVO = CropModel.cropVOArr[i];
                        if (curCropVO.dry)
                            CropModel.dryCropVOsArr.push(curCropVO);
                        if (curCropVO.grass)
                            CropModel.grassCropVOsArr.push(curCropVO);
                        if (curCropVO.worm)
                            CropModel.wormCropVOsArr.push(curCropVO);
                    }
                };
                CropModel.prototype.saveFriendCropVOsByDebuffType = function () {
                    var cropNum = CropModel.friendCropVOArr.length;
                    var curCropVO;
                    var i;
                    CropModel.dryCropVOsArr1 = new Array();
                    CropModel.grassCropVOsArr1 = new Array();
                    CropModel.wormCropVOsArr1 = new Array();
                    for (i = 0; i < cropNum; i++) {
                        curCropVO = CropModel.friendCropVOArr[i];
                        if (curCropVO.dry)
                            CropModel.dryCropVOsArr1.push(curCropVO);
                        if (curCropVO.grass)
                            CropModel.grassCropVOsArr1.push(curCropVO);
                        if (curCropVO.worm)
                            CropModel.wormCropVOsArr1.push(curCropVO);
                    }
                };
                return CropModel;
            }());
            crop.CropModel = CropModel;
        })(crop = teaRoom.crop || (teaRoom.crop = {}));
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=CropModel.js.map
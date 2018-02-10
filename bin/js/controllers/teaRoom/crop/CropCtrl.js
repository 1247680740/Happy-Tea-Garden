var controllers;
(function (controllers) {
    var teaRoom;
    (function (teaRoom) {
        var crop;
        (function (crop) {
            var CropVO = models.base.CropVO;
            var CropModel = models.teaRoom.crop.CropModel;
            var TimerUtil = utils.TimerUtil;
            var TweenUtil = utils.TweenUtil;
            var Handler = laya.utils.Handler;
            var LandCtrl = controllers.teaRoom.LandCtrl;
            var CropCtrl = /** @class */ (function () {
                function CropCtrl() {
                    CropCtrl.cropModel = CropModel.getInstance();
                    this.cropViewArr = new Array();
                    this.friendCropViewArr = new Array();
                    if (!CropCtrl.cropView)
                        CropCtrl.cropView = new views.teaRoom.crop.CropView();
                    if (!CropCtrl.friendCropView)
                        CropCtrl.friendCropView = new views.friendList.FriendCropView();
                }
                CropCtrl.getInstance = function () {
                    if (!CropCtrl.instance)
                        CropCtrl.instance = new CropCtrl();
                    return CropCtrl.instance;
                };
                Object.defineProperty(CropCtrl.prototype, "setRunKey", {
                    /**
                     * 供外部调用来设置相关操作命令（与 callback/callbackFn() 配合使用）
                     * @param : {"key":"harvestOne","value":landId}
                     * @example :
                     * CropCtrl.callback = CropCtrl.getInstance().callbackFn;
                     * CropCtrl.getInstance().setRunKey = {"key":"harvestOne","value":landId};
                     */
                    set: function (param) {
                        if (!param || !param["key"])
                            return;
                        if (CropCtrl.callback)
                            CropCtrl.callback(param); // 即：callbackFn()
                    },
                    enumerable: true,
                    configurable: true
                });
                CropCtrl.prototype.callbackFn = function (param) {
                    // 施肥
                    if (param["key"] == CropCtrl.FERTILIZE) {
                        CropCtrl.instance.request_actProp(param["value"]);
                    } // 单个收获
                    else if (param["key"] == CropCtrl.HARVEST_ONE) {
                        console.log("收获地块：" + param["value"]);
                        var seedId = CropModel.getCropVOByLandId(param["value"]).id;
                        if (seedId)
                            CropCtrl.instance.request_actCollect(param["value"], seedId);
                    } // 全部收获
                    else if (param["key"] == CropCtrl.HARVEST_ALL) {
                        CropCtrl.instance.request_actAllCollect();
                    }
                };
                CropCtrl.prototype.FriendCallbackFn = function (param) {
                    if (param["key"] == CropCtrl.HARVEST_ALL) {
                        CropCtrl.instance.request_actFriendAllCollect();
                    }
                    else {
                        return;
                    }
                };
                /**
                 * 回调的结果处理
                 * 1、异常：弹错误提示框
                 * 2、正常：经验动画、玩家信息重新渲染
                 * @param takeData: {"errMsg":xxx} or {"exp":xxx}
                 */
                CropCtrl.prototype.resultHandler = function (takeData) {
                    if (!takeData)
                        return;
                    if (takeData["errMsg"]) {
                        TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
                    }
                    else {
                        if (takeData["exp"] > 0) {
                            TweenUtil.tweenTo(views.common.CommonDisplay.expPrize(takeData["exp"]), takeData["curCoordinate"]);
                        }
                    }
                };
                /**
                 * 获取作物（游戏初始化时）
                 */
                CropCtrl.prototype.request_getCrop = function () {
                    CropModel.callback = this.getCropOver;
                    CropCtrl.cropModel.request_getCrop();
                };
                /** 获取好友作物 */
                CropCtrl.prototype.request_getFriendCrop = function () {
                    CropModel.callback = this.getFriendCropOver;
                    CropCtrl.cropModel.request_getFriendCrop();
                };
                /**
                 * 种植作物
                 */
                CropCtrl.prototype.request_doGrow = function (landId, seedId) {
                    CropModel.callback = this.doGrowOver;
                    CropCtrl.cropModel.request_doGrow(landId, seedId);
                };
                CropCtrl.prototype.doGrowOver = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        var landId = takeData["landId"];
                        var seedId = takeData["seedId"];
                        // 更新种子数量
                        var resultObj = controllers.teaRoom.bag.BagCtrl.bagModel.updateSeedNums(seedId);
                        if (resultObj["isSuccess"]) {
                            if (resultObj["remain"] == 0) {
                                // 复位鼠标默认状态
                                views.layers.SceneUILayer.instance.resetCursorState();
                            }
                            else {
                                TipLayerManager.tipLayer.showDrawBgTip("种植成功！");
                            }
                        }
                        // 更新作物状态
                        CropCtrl.instance.request_initCrop(landId, seedId);
                    }
                };
                /**
                 * 种植成功、施肥、收获等作物状态发生变化后更新数据
                 */
                CropCtrl.prototype.request_initCrop = function (landId, seedId) {
                    CropModel.callback = CropCtrl.instance.initCropOver;
                    CropCtrl.cropModel.request_initCrop(landId, seedId);
                };
                CropCtrl.prototype.request_initFriendCrop = function (landId, seedId) {
                    CropModel.callback = CropCtrl.instance.initFriendCropOver;
                    CropCtrl.cropModel.request_initFriendCrop(landId, seedId);
                };
                CropCtrl.prototype.getCropOver = function () {
                    var i;
                    var nums = CropModel.cropVOArr.length;
                    for (i = 0; i < nums; i++) {
                        var cropVO = CropModel.cropVOArr[i];
                        // 显示作物
                        CropCtrl.instance.addCropToLandGrid(cropVO);
                        // 更新状态
                        // CropCtrl.instance.initCropOver(cropVO);
                    }
                    CropCtrl.instance.cropViewArr.sort(this.sortCropViewArrById);
                    // ================== 请求狗的数据   ==================
                    controllers.teaRoom.TeaGardenCtrl.getInstance().request_initDog();
                };
                CropCtrl.prototype.getFriendCropOver = function () {
                    var i;
                    var nums = CropModel.friendCropVOArr.length;
                    for (i = 0; i < nums; i++) {
                        var cropVO = CropModel.friendCropVOArr[i];
                        // 显示作物
                        CropCtrl.instance.addFriendCropToLandGrid(cropVO);
                        // 更新状态
                        // CropCtrl.instance.initCropOver(cropVO);
                    }
                    CropCtrl.instance.friendCropViewArr.sort(this.sortFriendCropViewArrById);
                    // ================== 请求狗(好友)的数据   ==================
                    controllers.teaRoom.TeaGardenCtrl.getInstance().request_initFriendDog();
                };
                /**
                 * 更新作物状态
                 */
                CropCtrl.prototype.initCropOver = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (takeData["errMsg"])
                        return;
                    var cropVO;
                    var cropView;
                    var texture;
                    // "initCrop" 接口：
                    if (takeData.hasOwnProperty("seedId")) {
                        cropVO = CropModel.getCropVOByLandId(takeData["landId"]);
                        console.info("==> takeData, landId:" + takeData["landId"]);
                    } // "getCrop" 接口
                    else if (takeData instanceof CropVO) {
                        cropVO = takeData;
                    }
                    if (!cropVO)
                        return;
                    // 当前地块
                    var landGrid = LandCtrl.landView.getLandGridById(cropVO.landId);
                    if (!landGrid)
                        return;
                    cropView = landGrid.cropView;
                    if (!cropView) {
                        CropCtrl.instance.addCropToLandGrid(cropVO);
                        console.error("====> 无对应作物视图 <==== ");
                    }
                    else {
                        // 枯萎：移除收获星号图标、 隐藏作物信息提示
                        if (cropVO.isDeath) {
                            cropView.removeHarvestIcon();
                            var cropInfoTip = views.teaRoom.LandView.instance.getChildByName("cropTip");
                            cropInfoTip && (cropInfoTip.visible = false);
                        }
                        // ================ 多季作物收获后还会有星标显示的处理（待确认是否有更好的方法）-- 2017-08-11 17:50 hsx ================
                        if (cropVO.growthStatus >= 4)
                            cropView.removeHarvestIcon();
                        cropView.cropIconUrl = cropVO.iconUrl;
                        // cropView.cropIcon.cacheAs = "bitmap";
                        // 改变作物显示状态
                        // 遗留的老作物是没有 iconUrl 的   // 2017-09-16 hsx
                        if (cropVO.iconUrl) {
                            cropView.cropIcon.loadImage(cropVO.iconUrl, 0, 0, 0, 0, Handler.create(this, function () {
                                texture = Laya.loader.getRes(cropVO.iconUrl);
                                if (texture) {
                                    // cropView.cropIcon.reCache();
                                    // cropView.cropIcon.repaint();
                                    cropView.cropIcon.source = texture; // 图片显示状态无法正常切换的解决方式！
                                    cropView.cropIcon.width = texture.width; // 77
                                    cropView.cropIcon.height = texture.height; // 21
                                    if (landGrid) {
                                        if (cropVO.levelText == "幼苗期" || cropVO.levelText == "发芽") {
                                            cropView.pos(50, 5);
                                        }
                                        else if (cropVO.levelText == "生长" || cropVO.levelText == "成形" || cropVO.levelText == "初熟" || cropVO.levelText == "长叶") {
                                            cropView.pos(47, -14);
                                        }
                                        else if (cropVO.levelText == "茂盛" || cropVO.levelText == "成熟") {
                                            cropView.pos(35, -40);
                                        }
                                        else {
                                            cropView.pos(landGrid.width - cropView.width >> 1, landGrid.height - cropView.height >> 1);
                                        }
                                        // cropView.x = landGrid.width-cropView.width>>1;	 // 28;
                                        // cropView.y = landGrid.height-cropView.height>>1; // -20;
                                        cropView.updateWormOrGrassPos();
                                    }
                                }
                            }));
                        }
                    }
                    // 一个地块上的作物对应一个特定计时器
                    var timerUtil;
                    if (!cropVO.timerUtil) {
                        timerUtil = new TimerUtil();
                        cropVO.timerUtil = timerUtil;
                    }
                    else
                        timerUtil = cropVO.timerUtil;
                    // 死亡
                    if (cropVO.isDeath) {
                        // 死亡状态，死亡量+1
                        // 移除计时器
                        timerUtil.removeTimerCallback({ "callback": CropCtrl.instance.timerFn, "cropVO": cropVO });
                    }
                    else {
                        // 阶段成熟
                        if (cropVO.remnantOutput > 0) {
                            // 显示成熟状态图标
                            if (cropView) {
                                // console.log("成熟");
                                cropView.addHarvestIcon();
                            }
                            // 移除计时器
                            timerUtil.removeTimerCallback({ "callback": CropCtrl.instance.timerFn, "cropVO": cropVO });
                        }
                        else {
                            if (cropVO.growthTime <= 0) {
                                console.info("倒计时 <= 0,需移除计时器...");
                            }
                            else {
                                console.log("未成熟");
                                // 注册倒计时器
                                timerUtil.initCropPara = { "landId": cropVO.landId, "seedId": cropVO.id };
                                timerUtil.regTimer(cropVO.growthTime);
                                // 作物的状态更新计时器
                                timerUtil.addTimerCallback({ "callback": CropCtrl.instance.timerFn, "cropVO": cropVO });
                            }
                        }
                    }
                    // 一键收获后更新作物状态
                    if (!CropCtrl.instance.cropObjArr || CropCtrl.instance.cropObjArr.length == 0)
                        return;
                    Laya.timer.loop(500, CropCtrl.instance, CropCtrl.instance.callLaterFn);
                };
                CropCtrl.prototype.initFriendCropOver = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (takeData["errMsg"])
                        return;
                    var cropVO;
                    var cropView;
                    var texture;
                    // "initCrop" 接口：
                    if (takeData.hasOwnProperty("seedId")) {
                        cropVO = CropModel.getFriendCropVOByLandId(takeData["landId"]);
                    } // "getCrop" 接口
                    else if (takeData instanceof CropVO) {
                        cropVO = takeData;
                    }
                    if (!cropVO)
                        return;
                    // 当前地块
                    var landGrid = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
                    if (!landGrid)
                        return;
                    cropView = landGrid.cropView;
                    if (!cropView) {
                        CropCtrl.instance.addFriendCropToLandGrid(cropVO);
                        console.error("====> 无对应作物视图 <==== ");
                    }
                    else {
                        // 枯萎：移除收获星号图标、 隐藏作物信息提示
                        if (cropVO.isDeath) {
                            cropView.removeHarvestIcon();
                            var cropInfoTip = views.friendList.FriendLandView.instance.getChildByName("friendCropTip");
                            cropInfoTip && (cropInfoTip.visible = false);
                        }
                        // ================ 多季作物收获后还会有星标显示的处理（待确认是否有更好的方法）-- 2017-08-11 17:50 hsx ================
                        if (cropVO.growthStatus >= 4)
                            cropView.removeHarvestIcon();
                        cropView.cropIconUrl = cropVO.iconUrl;
                        // cropView.cropIcon.cacheAs = "bitmap";
                        // 改变作物显示状态
                        // 遗留的老作物是没有 iconUrl 的   // 2017-09-16 hsx
                        if (cropVO.iconUrl) {
                            cropView.cropIcon.loadImage(cropVO.iconUrl, 0, 0, 0, 0, Handler.create(this, function () {
                                texture = Laya.loader.getRes(cropVO.iconUrl);
                                if (texture) {
                                    cropView.cropIcon.source = texture; // 图片显示状态无法正常切换的解决方式！
                                    cropView.cropIcon.width = texture.width; // 77
                                    cropView.cropIcon.height = texture.height; // 21
                                    if (landGrid) {
                                        cropView.x = landGrid.width - cropView.width >> 1; // 28;
                                        cropView.y = landGrid.height - cropView.height >> 1; // -20;
                                        cropView.updateWormOrGrassPos();
                                    }
                                }
                            }));
                        }
                    }
                    // 一个地块上的作物对应一个特定计时器
                    var timerUtil;
                    if (!cropVO.timerUtil) {
                        timerUtil = new TimerUtil();
                        cropVO.timerUtil = timerUtil;
                    }
                    else
                        timerUtil = cropVO.timerUtil;
                    // 死亡
                    if (cropVO.isDeath) {
                        // 死亡状态，死亡量+1
                        // 移除计时器
                        timerUtil.removeTimerCallback({ "callback": CropCtrl.instance.friendTimerFn, "cropVO": cropVO });
                    }
                    else {
                        // 阶段成熟
                        if (cropVO.remnantOutput > 0) {
                            // 显示成熟状态图标
                            if (cropView) {
                                // console.log("成熟");
                                cropView.addHarvestIcon();
                            }
                            // 移除计时器
                            timerUtil.removeTimerCallback({ "callback": CropCtrl.instance.friendTimerFn, "cropVO": cropVO });
                        }
                        else {
                            if (cropVO.growthTime <= 0) {
                                console.info("倒计时 <= 0,需移除计时器...");
                            }
                            else {
                                console.log("未成熟");
                                // 注册倒计时器
                                timerUtil.initCropPara = { "landId": cropVO.landId, "seedId": cropVO.id };
                                timerUtil.regTimer(cropVO.growthTime);
                                // 作物的状态更新计时器
                                timerUtil.addTimerCallback({ "callback": CropCtrl.instance.friendTimerFn, "cropVO": cropVO });
                            }
                        }
                    }
                    // 一键收获后更新作物状态
                    if (!CropCtrl.instance.cropObjArr || CropCtrl.instance.cropObjArr.length == 0)
                        return;
                    Laya.timer.loop(500, CropCtrl.instance, CropCtrl.instance.friendCallLaterFn);
                };
                /**
                 * 加入时间延迟，以一定时间间隔来收获多个作物
                 */
                CropCtrl.prototype.callLaterFn = function () {
                    console.log("timer is running...");
                    var obj;
                    if (CropCtrl.instance.cropObjArr.length > 0) {
                        obj = CropCtrl.instance.cropObjArr.splice(0, 1)[0];
                        CropCtrl.instance.resultHandler(obj);
                        CropCtrl.instance.request_initCrop(obj["landId"], obj["seedId"]);
                    }
                    else {
                        Laya.timer.clear(this, CropCtrl.instance.callLaterFn);
                    }
                };
                CropCtrl.prototype.friendCallLaterFn = function () {
                    var obj;
                    if (CropCtrl.instance.cropObjArr.length > 0) {
                        obj = CropCtrl.instance.cropObjArr.splice(0, 1)[0];
                        CropCtrl.instance.resultHandler(obj);
                        CropCtrl.instance.request_initFriendCrop(obj["landId"], obj["seedId"]);
                    }
                    else {
                        Laya.timer.clear(this, CropCtrl.instance.friendCallLaterFn);
                    }
                };
                /**
                 * 倒计时更新作物状态
                 * @nowTime 当前剩余时间（秒）
                 */
                CropCtrl.prototype.timerFn = function (cropVO, nowTime) {
                    if (!cropVO)
                        return;
                    var curGrid = LandCtrl.landView.getLandGridById(cropVO.landId);
                    if (!curGrid)
                        return;
                    var cropView = curGrid.cropView;
                    if (!cropView)
                        return;
                    var cropTip = views.teaRoom.crop.CropView.cropTip; // cropView.cropTip;
                    if (!cropTip)
                        return;
                    cropVO.growthTime = nowTime;
                    cropTip.cropName.text = cropVO.name + "(第" + cropVO.season + "季)";
                    cropTip.state.text = "状态(" + cropVO.statusTxt + ")";
                    if (cropVO.remnantOutput) {
                        cropTip.phase.text = cropVO.growthStateTxt + "(产：" + cropVO.totalOutput + "剩：" + cropVO.remnantOutput + ")";
                    }
                    else {
                        if (cropVO.growthTime <= 120)
                            cropTip.phase.text = cropVO.growthStateTxt + "(" + cropVO.growthTimeTxt(true) + (cropVO.nextLevelText ? cropVO.nextLevelText : "") + ")";
                        else
                            cropTip.phase.text = cropVO.growthStateTxt + "(" + cropVO.growthTimeTxt(false) + (cropVO.nextLevelText ? cropVO.nextLevelText : "") + ")";
                        // cropTip.phase.text = cropVO.levelText+"("+cropVO.growthTime+cropVO.nextLevelText+")";
                    }
                    if (cropVO.growthRate)
                        cropTip.progress.value = cropVO.growthRate;
                    else
                        cropTip.progress.visible = false;
                    // console.log("作物状态计时器更新成功！！！");
                };
                CropCtrl.prototype.friendTimerFn = function (cropVO, nowTime) {
                    if (!cropVO)
                        return;
                    var curGrid = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
                    if (!curGrid)
                        return;
                    var cropView = curGrid.cropView;
                    if (!cropView)
                        return;
                    var cropTip = views.friendList.FriendCropView.cropTip; // cropView.cropTip;
                    if (!cropTip)
                        return;
                    cropVO.growthTime = nowTime;
                    cropTip.cropName.text = cropVO.name + "(第" + cropVO.season + "季)";
                    cropTip.state.text = "状态(" + cropVO.statusTxt + ")";
                    if (cropVO.remnantOutput) {
                        cropTip.phase.text = cropVO.growthStateTxt + "(产：" + cropVO.totalOutput + "剩：" + cropVO.remnantOutput + ")";
                    }
                    else {
                        if (cropVO.growthTime <= 120)
                            cropTip.phase.text = cropVO.growthStateTxt + "(" + cropVO.growthTimeTxt(true) + (cropVO.nextLevelText ? cropVO.nextLevelText : "") + ")";
                        else
                            cropTip.phase.text = cropVO.growthStateTxt + "(" + cropVO.growthTimeTxt(false) + (cropVO.nextLevelText ? cropVO.nextLevelText : "") + ")";
                        // cropTip.phase.text = cropVO.levelText+"("+cropVO.growthTime+cropVO.nextLevelText+")";
                    }
                    if (cropVO.growthRate)
                        cropTip.progress.value = cropVO.growthRate;
                    else
                        cropTip.progress.visible = false;
                    // console.log("作物状态计时器更新成功！！！");
                };
                /**
                 * 施肥
                 * @param paramObj: {"li":,"si":,"ti":}
                 */
                CropCtrl.prototype.request_actProp = function (paramObj) {
                    CropModel.callback = this.fertilizeOverFn;
                    CropModel.getInstance().request_actProp(paramObj);
                };
                CropCtrl.prototype.fertilizeOverFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (takeData["landId"] && takeData["seedId"]) {
                        TipLayerManager.tipLayer.showDrawBgTip("施肥成功！");
                        CropCtrl.instance.request_initCrop(takeData["landId"], takeData["seedId"]);
                    }
                };
                /**
                 * 除虫
                 * @param isFarmer 是否为茶农工作
                 * @param curCoordinate 茶农的坐标
                 */
                CropCtrl.prototype.request_actPesticide = function (cropVO, isFarmer, curCoordinate) {
                    if (isFarmer === void 0) { isFarmer = false; }
                    CropModel.callback = this.removeOneWormFn;
                    CropModel.getInstance().request_actPesticide(cropVO, isFarmer, curCoordinate);
                };
                CropCtrl.prototype.request_actFriendPesticide = function (cropVO) {
                    CropModel.callback = this.removeFriendOneWormFn;
                    CropModel.getInstance().request_actFriendPesticide(cropVO);
                };
                CropCtrl.prototype.removeOneWormFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        // 移除一个虫子
                        CropCtrl.instance.removeOneWormFromCropView(takeData["landId"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                CropCtrl.prototype.removeFriendOneWormFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        // 移除一个虫子
                        CropCtrl.instance.removeFriendOneWormFromCropView(takeData["landId"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                /**
                 * 除草
                 * @param isFarmer 是否为茶农工作
                 * @param curCoordinate 茶农的坐标
                 */
                CropCtrl.prototype.request_actWipeGrass = function (cropVO, isFarmer, curCoordinate) {
                    if (isFarmer === void 0) { isFarmer = false; }
                    CropModel.callback = this.removeOneGrassFn;
                    CropModel.getInstance().request_actWipeGrass(cropVO, isFarmer, curCoordinate);
                };
                CropCtrl.prototype.request_actFriendWipeGrass = function (cropVO) {
                    CropModel.callback = this.removeFriendOneGrassFn;
                    CropModel.getInstance().request_actFriendWipeGrass(cropVO);
                };
                CropCtrl.prototype.removeOneGrassFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        CropCtrl.instance.removeOneGrassFromCropView(takeData["landId"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                CropCtrl.prototype.removeFriendOneGrassFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        CropCtrl.instance.removeFriendOneGrassFromCropView(takeData["landId"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                /**
                 * 浇水
                 * @param isFarmer 是否为茶农工作
                 * @param curCoordinate 茶农的坐标
                 */
                CropCtrl.prototype.request_actWater = function (cropVO, isFarmer, curCoordinate) {
                    if (isFarmer === void 0) { isFarmer = false; }
                    CropModel.callback = this.waterOverFn;
                    CropModel.getInstance().request_actWater(cropVO, isFarmer, curCoordinate);
                };
                CropCtrl.prototype.request_actFriendWater = function (cropVO) {
                    CropModel.callback = this.waterFriendOverFn;
                    CropModel.getInstance().request_actFriendWater(cropVO);
                };
                CropCtrl.prototype.waterOverFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        // 地块解除干旱
                        CropCtrl.instance.removeDryStateFromCropView(takeData["landId"], takeData["newStatus"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                CropCtrl.prototype.waterFriendOverFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        // 地块解除干旱
                        CropCtrl.instance.removeFriendDryStateFromCropView(takeData["landId"], takeData["newStatus"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                /**
                 * 放草
                 */
                CropCtrl.prototype.request_putGrass = function (cropVO) {
                    CropModel.callback = this.putOneGrassFn;
                    CropModel.getInstance().request_putGrass(cropVO);
                };
                CropCtrl.prototype.putOneGrassFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        CropCtrl.instance.addOneGrassToCropView(takeData["landId"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                /**
                 * 放虫
                 */
                CropCtrl.prototype.request_putWorm = function (cropVO) {
                    CropModel.callback = this.putOneWormFn;
                    CropModel.getInstance().request_putWorm(cropVO);
                };
                CropCtrl.prototype.putOneWormFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        CropCtrl.instance.addOneWormToCropView(takeData["land"]);
                    }
                    CropCtrl.callback && CropCtrl.callback();
                };
                /**
                 * 收获单个作物
                 */
                CropCtrl.prototype.request_actCollect = function (landId, seedId) {
                    CropModel.callback = this.harvestCropOverFn;
                    CropModel.getInstance().request_actCollect(landId, seedId);
                };
                CropCtrl.prototype.harvestCropOverFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        CropCtrl.instance.request_initCrop(takeData["landId"], takeData["seedId"]);
                    }
                };
                /** 一键收获 */
                CropCtrl.prototype.request_actAllCollect = function () {
                    CropModel.callback = CropCtrl.instance.harvestAllCropOver;
                    CropModel.getInstance().request_actAllCollect();
                };
                /** 偷茶 */
                CropCtrl.prototype.request_actFriendAllCollect = function () {
                    CropModel.callback = CropCtrl.instance.harvestFriendAllCropOver;
                    CropModel.getInstance().request_actFriendAllCollect();
                };
                CropCtrl.prototype.harvestAllCropOver = function (takeData) {
                    if (takeData["errMsg"]) {
                        TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
                    }
                    else {
                        // 包含 {"landId": , "seedId": } 样式对象的数组
                        CropCtrl.instance.cropObjArr = takeData["cropObjArr"];
                        var obj = void 0;
                        // 注意：多个连续请求会有问题！
                        // while(this.cropObjArr.length>0)
                        // {
                        obj = CropCtrl.instance.cropObjArr.splice(0, 1)[0];
                        CropCtrl.instance.resultHandler(obj);
                        CropCtrl.instance.request_initCrop(obj["landId"], obj["seedId"]);
                        // }
                    }
                };
                CropCtrl.prototype.harvestFriendAllCropOver = function (takeData) {
                    if (takeData["errMsg"]) {
                        TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
                    }
                    else {
                        TipLayerManager.tipLayer.showDrawBgTip("摘完了，摘完了，快走吧！");
                        // 包含 {"landId": , "seedId": } 样式对象的数组
                        CropCtrl.instance.cropObjArr = takeData["friendCropObjArr"];
                        var obj = void 0;
                        // 注意：多个连续请求会有问题！
                        // while(this.cropObjArr.length>0)
                        // {
                        obj = CropCtrl.instance.cropObjArr.splice(0, 1)[0];
                        CropCtrl.instance.resultHandler(obj);
                        CropCtrl.instance.request_initFriendCrop(obj["landId"], obj["seedId"]);
                        // }
                    }
                };
                /**
                 * 铲除作物
                 */
                CropCtrl.prototype.request_deleteCrop = function (landId, seedId) {
                    CropModel.callback = this.deleteCropOverFn;
                    CropModel.getInstance().request_deleteCrop(landId, seedId);
                };
                CropCtrl.prototype.deleteCropOverFn = function (takeData) {
                    CropCtrl.instance.resultHandler(takeData);
                    if (!takeData["errMsg"]) {
                        // 移除作物
                        LandCtrl.getInstance().removeCropViewByLandId(takeData["landId"]);
                    }
                };
                /**
                 * 添加作物至某地块
                 */
                CropCtrl.prototype.addCropToLandGrid = function (cropVO) {
                    if (!cropVO)
                        return;
                    var cropView = new views.teaRoom.crop.CropView();
                    cropView.name = cropVO.id + ""; // 以 种子id 为作物命名！
                    cropView.updateCropState = CropCtrl.instance.initCropOver; // 更新状态回调
                    cropView.init(cropVO);
                    // this.cropViewArr.push(cropView);
                };
                /**
                 * 添加作物至某地块
                 */
                CropCtrl.prototype.addFriendCropToLandGrid = function (cropVO) {
                    if (!cropVO)
                        return;
                    var cropView = new views.friendList.FriendCropView();
                    cropView.name = cropVO.id + ""; // 以 种子id 为作物命名！
                    cropView.updateCropState = CropCtrl.instance.initFriendCropOver; // 更新状态回调
                    cropView.init(cropVO);
                    this.friendCropViewArr.push(cropView);
                };
                /**
                 * 从作物中移除一个虫子
                 */
                CropCtrl.prototype.removeOneWormFromCropView = function (landId) {
                    var landGrid = LandCtrl.landView.getLandGridById(landId);
                    if (!landGrid || !landGrid.cropView)
                        return;
                    if (landGrid.cropView.wormHBox.numChildren > 0)
                        landGrid.cropView.wormHBox.removeChildAt(0);
                };
                CropCtrl.prototype.removeFriendOneWormFromCropView = function (landId) {
                    var landGrid = LandCtrl.friendLandView.getLandGridById(landId);
                    if (!landGrid || !landGrid.cropView)
                        return;
                    if (landGrid.cropView.wormHBox.numChildren > 0)
                        landGrid.cropView.wormHBox.removeChildAt(0);
                };
                /**
                 * 从作物中移除一颗草
                 */
                CropCtrl.prototype.removeOneGrassFromCropView = function (landId) {
                    var landGrid = LandCtrl.landView.getLandGridById(landId);
                    if (!landGrid || !landGrid.cropView)
                        return;
                    if (landGrid.cropView.grassHBox.numChildren > 0)
                        landGrid.cropView.grassHBox.removeChildAt(0);
                };
                CropCtrl.prototype.removeFriendOneGrassFromCropView = function (landId) {
                    var landGrid = LandCtrl.friendLandView.getLandGridById(landId);
                    if (!landGrid || !landGrid.cropView)
                        return;
                    if (landGrid.cropView.grassHBox.numChildren > 0)
                        landGrid.cropView.grassHBox.removeChildAt(0);
                };
                /**
                 * 添加一棵草至作物中
                 */
                CropCtrl.prototype.addOneGrassToCropView = function (landId) {
                    var landGrid = LandCtrl.friendLandView.getLandGridById(landId);
                    if (!landGrid || !landGrid.cropView)
                        return;
                    landGrid.cropView.addGrass();
                    // CropCtrl.friendCropView.addGrass();
                    // landGrid.cropView.grassHBox
                };
                /**
                 * 添加一条虫至作物中
                 */
                CropCtrl.prototype.addOneWormToCropView = function (cropVO) {
                    var landGrid = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
                    if (!landGrid || !landGrid.cropView)
                        return;
                    // if(landGrid.cropView.grassHBox.numChildren<=0)
                    // 	landGrid.cropView.grassHBox.removeChildAt(0);
                    CropCtrl.friendCropView.addWorm();
                };
                /**
                 * 地块解除干旱状态
                 */
                CropCtrl.prototype.removeDryStateFromCropView = function (landId, newStatus) {
                    var curLandVO = models.teaRoom.LandModel.getLandVOByLandId(landId);
                    if (!curLandVO)
                        return;
                    curLandVO.status = newStatus;
                    LandCtrl.landView.updateLandGridState(landId, curLandVO);
                };
                /**
                 * 好友地块解除干旱状态
                 */
                CropCtrl.prototype.removeFriendDryStateFromCropView = function (landId, newStatus) {
                    var curLandVO = models.teaRoom.LandModel.getFriendLandVOByLandId(landId);
                    if (!curLandVO)
                        return;
                    curLandVO.status = newStatus;
                    LandCtrl.friendLandView.updateLandGridState(landId, curLandVO);
                };
                /**
                 * 根据作物id排序
                 */
                CropCtrl.prototype.sortCropViewArrById = function (view1, view2) {
                    var id1 = parseInt(view1.name);
                    var id2 = parseInt(view2.name);
                    if (id1 > id2)
                        return 1;
                    else if (id1 < id2)
                        return -1;
                    else
                        return 0;
                };
                /**
                 * 根据作物id排序(好友)
                 */
                CropCtrl.prototype.sortFriendCropViewArrById = function (view1, view2) {
                    var id1 = parseInt(view1.name);
                    var id2 = parseInt(view2.name);
                    if (id1 > id2)
                        return 1;
                    else if (id1 < id2)
                        return -1;
                    else
                        return 0;
                };
                /** 施肥 */
                CropCtrl.FERTILIZE = "fertilize";
                /** 单个收获标识 */
                CropCtrl.HARVEST_ONE = "harvestOne";
                /** 全部收获标识 */
                CropCtrl.HARVEST_ALL = "harvestAll";
                return CropCtrl;
            }());
            crop.CropCtrl = CropCtrl;
        })(crop = teaRoom.crop || (teaRoom.crop = {}));
    })(teaRoom = controllers.teaRoom || (controllers.teaRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=CropCtrl.js.map
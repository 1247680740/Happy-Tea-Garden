var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var PlayerInfoModel = models.player.PlayerInfoModel;
            var FriedTeaDialogModel = models.friedRoom.pot.FriedTeaDialogModel;
            var Event = laya.events.Event;
            /**
            * 炒茶相关控制器
            */
            var FriedTeaDialogCtrl = /** @class */ (function () {
                function FriedTeaDialogCtrl() {
                    if (!FriedTeaDialogCtrl.model)
                        FriedTeaDialogCtrl.model = FriedTeaDialogModel.getInstance();
                    if (!FriedTeaDialogCtrl.view)
                        FriedTeaDialogCtrl.view = new views.friedRoom.pot.FriedTeaDialogView();
                    FriedTeaDialogCtrl.view.tab1.on(Event.CLICK, this, this.request_getAllTea);
                    FriedTeaDialogCtrl.view.tab2.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("green");
                    });
                    FriedTeaDialogCtrl.view.tab3.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("red");
                    });
                    FriedTeaDialogCtrl.view.tab4.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("uron");
                    });
                    FriedTeaDialogCtrl.view.tab5.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("white");
                    });
                    FriedTeaDialogCtrl.view.tab6.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("yellow");
                    });
                    FriedTeaDialogCtrl.view.tab7.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("black");
                    });
                    FriedTeaDialogCtrl.view.tab8.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("flower");
                    });
                    FriedTeaDialogCtrl.view.tab9.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.request_getClassify("ginseng");
                    });
                    FriedTeaDialogCtrl.view.btn_affirm.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.friedTeaFn(); // FriedTeaDialogCtrl.view.curBuyTeaArr	// hsx
                    });
                    FriedTeaDialogCtrl.view.btn_buy1.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.showBuyDataTip(FriedTeaDialogCtrl.view.curBuyTeaArr); // FriedTeaDialogCtrl.view.curBuyTeaArr // hsx
                    });
                    FriedTeaDialogCtrl.view.btn_buy2.on(Event.CLICK, this, function () {
                        FriedTeaDialogCtrl.instance.showBuyDataTip(FriedTeaDialogCtrl.view.curBuyBookArr);
                    });
                }
                FriedTeaDialogCtrl.getInstance = function () {
                    if (!FriedTeaDialogCtrl.instance)
                        FriedTeaDialogCtrl.instance = new FriedTeaDialogCtrl();
                    return FriedTeaDialogCtrl.instance;
                };
                /**
                 * 炒茶操作
                 */
                FriedTeaDialogCtrl.prototype.friedTeaFn = function () {
                    if (FriedTeaDialogCtrl.view.potLvlNotEnough.visible) {
                        TipLayerManager.tipLayer.showDrawBgTip("炒锅等级不足，快去升级炒锅吧！");
                        return;
                    }
                    var teaId = FriedTeaDialogCtrl.view.curPotVO.teaId;
                    var potId = FriedTeaDialogCtrl.view.curPotVO.id;
                    var potStatus = FriedTeaDialogCtrl.view.curPotVO.status;
                    var teaNums = parseInt(FriedTeaDialogCtrl.view.teaNums.text);
                    FriedTeaDialogCtrl.instance.startFriedTea(teaId, potId, teaNums, potStatus);
                };
                /**
                 * 开始炒茶
                 */
                FriedTeaDialogCtrl.prototype.startFriedTea = function (teaid, potid, teaNums, potStatus) {
                    FriedTeaDialogModel.callback = this.startFriedTeaFn;
                    FriedTeaDialogCtrl.model.request_startFriedTea(teaid, potid, teaNums, potStatus);
                };
                FriedTeaDialogCtrl.prototype.startFriedTeaFn = function (vo) {
                    FriedTeaDialogCtrl.view.startFriedTea(vo);
                };
                /**
                 * 点击炒锅显示炒茶界面
                 */
                FriedTeaDialogCtrl.prototype.showFriedTeaDialog = function (potVO) {
                    // FriedTeaDialogCtrl.view.popup();
                    UILayerManager.friedTeaLayer.addChild(FriedTeaDialogCtrl.view.bgUI);
                    // FriedTeaDialogCtrl.view.visible = true;
                    FriedTeaDialogCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriedTeaDialogCtrl.view.bgUI.width >> 1;
                    FriedTeaDialogCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriedTeaDialogCtrl.view.bgUI.height >> 1;
                    FriedTeaDialogCtrl.view.curPotVO = potVO;
                    //获取全部茶叶种类
                    this.request_getAllTea();
                };
                /**
                 * 获取全部茶叶
                 */
                FriedTeaDialogCtrl.prototype.request_getAllTea = function () {
                    FriedTeaDialogModel.callback = this.getTeaOverFn;
                    FriedTeaDialogCtrl.model.request_getAllTea();
                };
                FriedTeaDialogCtrl.prototype.getTeaOverFn = function () {
                    FriedTeaDialogCtrl.view.addStorageGrids(FriedTeaDialogModel.getInstance().allTeaVOArr);
                };
                /**
                 * 获取分类茶叶
                 */
                FriedTeaDialogCtrl.prototype.request_getClassify = function (type) {
                    FriedTeaDialogModel.callback = this.getTeaOverFn;
                    FriedTeaDialogCtrl.model.request_getClassify(type);
                };
                /**
                 * 请求右侧茶叶详情信息
                 */
                FriedTeaDialogCtrl.prototype.itemClkedFn = function (seedVO) {
                    FriedTeaDialogModel.callback = this.getRrightContent;
                    FriedTeaDialogCtrl.model.request_getDepotRightContentData(seedVO.id);
                };
                FriedTeaDialogCtrl.prototype.getRrightContent = function (takeData) {
                    FriedTeaDialogCtrl.view.updateRightContent(FriedTeaDialogModel.getInstance().teaShowVOArr, takeData["teaId"]);
                };
                /**
                 * 请求右侧炒茶所需配方
                 */
                FriedTeaDialogCtrl.prototype.itemClkedMaterial = function (teaId) {
                    FriedTeaDialogModel.callback = this.getRightMaterContent;
                    FriedTeaDialogCtrl.model.request_getMaterRightContentData(teaId);
                };
                FriedTeaDialogCtrl.prototype.getRightMaterContent = function (takeData) {
                    FriedTeaDialogCtrl.view.curPotVO.teaId = takeData["teaId"];
                    FriedTeaDialogCtrl.view.loadFriedTeaSecret(FriedTeaDialogModel.getInstance().teaShowVOArr);
                };
                /**
                 * 购买炒茶所需材料
                 *
                 * 数组依次包含： type price id name lockNums
                 */
                FriedTeaDialogCtrl.prototype.request_getFriedTeaData = function (curBuyArr) {
                    FriedTeaDialogModel.callback = this.getRightMaterContent;
                    FriedTeaDialogCtrl.model.request_buySingleGoods(curBuyArr[0], curBuyArr[2], curBuyArr[4]);
                };
                // 显示购买材料对话框
                FriedTeaDialogCtrl.prototype.showBuyDataTip = function (toolArrVO) {
                    console.log("改版后的数据：" + JSON.stringify(toolArrVO));
                    if (!toolArrVO || toolArrVO.length == 0)
                        return;
                    var info;
                    var canSubmit = true;
                    // type price id name lockNums
                    if (toolArrVO[0] == "teafruit") {
                        info = "你确定要花费1钻石购买" + toolArrVO[4] + "份" + toolArrVO[3] + "吗？";
                        if (PlayerInfoModel.playerInfo.diamond < 1) {
                            canSubmit = false;
                            info += "\n当前等级不足或金币、钻石不足，无法购买鲜叶！";
                        }
                    }
                    else if (toolArrVO[0] == "book") {
                        // type price id name lockNums
                        info = "你确定要花费" + toolArrVO[1] + "金币购买一本" + toolArrVO[3] + "吗？";
                        if (PlayerInfoModel.playerInfo.money < toolArrVO[1]) {
                            canSubmit = false;
                            info += "\n当前金币、钻石不足，无法购买工艺书！";
                        }
                    }
                    // }
                    TipLayerManager.tipLayer.showYesNoTip(info, function () {
                        FriedTeaDialogCtrl.getInstance().request_getFriedTeaData(toolArrVO);
                    }, null, canSubmit);
                };
                return FriedTeaDialogCtrl;
            }());
            pot.FriedTeaDialogCtrl = FriedTeaDialogCtrl;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=FriedTeaDialogCtrl.js.map
var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var UpGradePotModel = models.friedRoom.pot.UpGradePotModel;
            var Event = laya.events.Event;
            /**
            * 炒茶相关控制器
            */
            var UpGradePotCtrl = /** @class */ (function () {
                function UpGradePotCtrl() {
                    if (!UpGradePotCtrl.model)
                        UpGradePotCtrl.model = UpGradePotModel.getInstance();
                    if (!UpGradePotCtrl.upGradeview)
                        UpGradePotCtrl.upGradeview = new views.friedRoom.pot.UpGradePotView();
                    UpGradePotCtrl.upGradeview.name = "upGradeview";
                    UpGradePotCtrl.dataView = new ui.gameUI.tips.BuyUpDataTipUI();
                    UpGradePotCtrl.dataView.cacheAs = "bitmap";
                    // UpGradePotCtrl.upGradeview.upgrade.on(Event.CLICK,this,this.request_getUPDate);
                    UpGradePotCtrl.upGradeview.bgUI.closeBtn.on(Event.CLICK, this, this.closeBtnFn);
                    UpGradePotCtrl.upGradeview.metal.on(Event.CLICK, this, this.request_getUPDate);
                    UpGradePotCtrl.upGradeview.wood.on(Event.CLICK, this, this.request_getUPDate);
                    UpGradePotCtrl.upGradeview.water.on(Event.CLICK, this, this.request_getUPDate);
                    UpGradePotCtrl.upGradeview.fire.on(Event.CLICK, this, this.request_getUPDate);
                    UpGradePotCtrl.upGradeview.earth.on(Event.CLICK, this, this.request_getUPDate);
                    UpGradePotCtrl.upGradeview.way.on(Event.CLICK, this, this.request_getUPDate);
                }
                UpGradePotCtrl.getInstance = function () {
                    if (!UpGradePotCtrl.instance)
                        UpGradePotCtrl.instance = new UpGradePotCtrl();
                    return UpGradePotCtrl.instance;
                };
                //显示炒锅升级弹窗
                UpGradePotCtrl.prototype.showUpGradeDialog = function () {
                    if (!UILayerManager.friedTeaLayer.getChildByName("upGradeview")) {
                        UpGradePotCtrl.upGradeview.bgUI.name = "upGradeview";
                        UILayerManager.friedTeaLayer.addChild(UpGradePotCtrl.upGradeview.bgUI);
                    }
                    UpGradePotCtrl.upGradeview.bgUI.visible = true;
                    UpGradePotCtrl.upGradeview.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - UpGradePotCtrl.upGradeview.bgUI.width >> 1;
                    UpGradePotCtrl.upGradeview.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - UpGradePotCtrl.upGradeview.bgUI.height >> 1;
                    this.request_getUPDate();
                };
                UpGradePotCtrl.prototype.closeBtnFn = function () {
                    // 原写法
                    // UpGradePotCtrl.upGradeview.removeSelf();
                    // UpGradePotCtrl.upGradeview.destroy(false);
                    // UpGradePotCtrl.upGradeview = null;
                    UpGradePotCtrl.upGradeview.bgUI.visible = false;
                };
                /** 初始化请求炒锅数据并返回数据请求的操作 */
                UpGradePotCtrl.prototype.request_getUPDate = function () {
                    UpGradePotModel.callback = UpGradePotCtrl.instance.getUpDateOver;
                    UpGradePotCtrl.model.request_getFarmPot();
                };
                UpGradePotCtrl.prototype.getUpDateOver = function () {
                    UpGradePotCtrl.upGradeview.fillUpData(UpGradePotModel.potArr);
                };
                /** 请求获取炒锅升级成功后的状态变化数据 */
                UpGradePotCtrl.prototype.request_FinishData = function (id) {
                    UpGradePotModel.callback = UpGradePotCtrl.instance.getFinishData;
                    UpGradePotCtrl.model.request_UpGrade(id);
                };
                UpGradePotCtrl.prototype.getFinishData = function (takeData) {
                    UpGradePotCtrl.upGradeview.finishUpGrade(takeData); // UpGradePotModel.getInstance().potVOArr
                };
                /** 请求获取中部材料数量并加载 */
                UpGradePotCtrl.prototype.request_needUpData = function (id, level) {
                    UpGradePotModel.callback = UpGradePotCtrl.instance.fillMidData;
                    UpGradePotCtrl.model.request_UPDate(id, level);
                };
                UpGradePotCtrl.prototype.fillMidData = function (takeData) {
                    UpGradePotCtrl.upGradeview.addUpDate(UpGradePotModel.getInstance().potVOArr, takeData);
                };
                UpGradePotCtrl.prototype.willBuyDataOver = function (potsArr, curBuyName) {
                    TipLayerManager.tipLayer.showPotDataTip(potsArr, curBuyName);
                };
                /** 确认购买升级材料 */
                UpGradePotCtrl.prototype.request_confirmBuy = function (potVO) {
                    UpGradePotModel.callback = UpGradePotCtrl.instance.buyOver;
                    UpGradePotCtrl.model.request_ConfirmBuy(potVO);
                };
                /**
                 * 材料购买后更新显示
                 */
                UpGradePotCtrl.prototype.buyOver = function (takeData) {
                    UpGradePotCtrl.model.updatePotVOArr(takeData["toolId"]);
                    if (UpGradePotCtrl.model.takeData) {
                        var obj = UpGradePotCtrl.model.takeData;
                        if (!obj)
                            return;
                        if (obj["hi"] && obj["hl"]) {
                            UpGradePotCtrl.upGradeview.showData(UpGradePotCtrl.model.potVOArr, obj["hi"], obj["hl"]);
                        }
                    }
                };
                /** 取消购买，升级 */
                UpGradePotCtrl.prototype.cancelBtnClkFn = function () {
                    UpGradePotCtrl.upGradeview.removeChild(UpGradePotCtrl.dataView);
                    UpGradePotCtrl.dataView = null;
                };
                return UpGradePotCtrl;
            }());
            pot.UpGradePotCtrl = UpGradePotCtrl;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=UpGradePotCtrl.js.map
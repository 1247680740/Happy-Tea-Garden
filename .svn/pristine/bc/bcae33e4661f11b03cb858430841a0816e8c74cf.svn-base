var controllers;
(function (controllers) {
    var teaRoom;
    (function (teaRoom) {
        var bag;
        (function (bag) {
            var BagModel = models.teaRoom.bag.BagModel;
            var Event = laya.events.Event;
            /**
            * 背包相关控制器
            */
            var BagCtrl = /** @class */ (function () {
                function BagCtrl() {
                    BagCtrl.init();
                }
                BagCtrl.getInstance = function () {
                    if (!BagCtrl.instance)
                        BagCtrl.instance = new BagCtrl();
                    else
                        BagCtrl.init();
                    return BagCtrl.instance;
                };
                BagCtrl.init = function () {
                    if (!BagCtrl.bagModel)
                        BagCtrl.bagModel = BagModel.getInstance();
                    BagCtrl.bagDialogView = new views.teaRoom.bag.BagDialogView();
                    BagCtrl.bagDialogView.seedTab.on(Event.CLICK, this, this.request_getBagSeed);
                    BagCtrl.bagDialogView.toolTab.on(Event.CLICK, this, this.request_getBagTool);
                };
                /**
                 * 点击工具栏背包图标显示背包面板
                 */
                BagCtrl.prototype.showBagDialog = function () {
                    if (!UILayerManager.uiLayer.getChildByName("bagDialogView")) {
                        BagCtrl.bagDialogView.name = "bagDialogView";
                        UILayerManager.uiLayer.addChild(BagCtrl.bagDialogView);
                    }
                    BagCtrl.bagDialogView.x = configs.GameConfig.GAME_WINDOW_WIDTH - BagCtrl.bagDialogView.width >> 1;
                    BagCtrl.bagDialogView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - BagCtrl.bagDialogView.height >> 1;
                    BagCtrl.request_getBagSeed();
                };
                /**
                 * 请求背包中种子的数据
                 */
                BagCtrl.request_getBagSeed = function () {
                    BagModel.callback = BagCtrl.instance.getBagSeedOver;
                    BagCtrl.bagModel.request_getBagSeed();
                };
                BagCtrl.prototype.getBagSeedOver = function (takeData) {
                    BagCtrl.bagDialogView.addBagGrid(BagCtrl.bagModel.seedVOArr);
                };
                /**
                 * 请求背包中道具数据
                 */
                BagCtrl.request_getBagTool = function () {
                    BagModel.callback = BagCtrl.instance.getBagToolOver;
                    BagCtrl.bagModel.request_getBagProp();
                };
                BagCtrl.prototype.getBagToolOver = function (takeData) {
                    BagCtrl.bagDialogView.addBagGrid(BagCtrl.bagModel.toolVOArr);
                };
                return BagCtrl;
            }());
            bag.BagCtrl = BagCtrl;
        })(bag = teaRoom.bag || (teaRoom.bag = {}));
    })(teaRoom = controllers.teaRoom || (controllers.teaRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=BagCtrl.js.map
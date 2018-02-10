var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var bag;
        (function (bag) {
            var FireTeaBagModel = models.friedRoom.bag.FireTeaBagModel;
            var Event = laya.events.Event;
            /**
            * 炒茶背包控制器
            */
            var FireTeaBagCtrl = /** @class */ (function () {
                function FireTeaBagCtrl() {
                    FireTeaBagCtrl.init();
                }
                FireTeaBagCtrl.getInstance = function () {
                    if (!FireTeaBagCtrl.instance)
                        FireTeaBagCtrl.instance = new FireTeaBagCtrl();
                    else
                        FireTeaBagCtrl.init();
                    return FireTeaBagCtrl.instance;
                };
                FireTeaBagCtrl.init = function () {
                    if (!FireTeaBagCtrl.model)
                        FireTeaBagCtrl.model = FireTeaBagModel.getInstance();
                    FireTeaBagCtrl.view = new views.friedRoom.bag.FireTeaBagDialogView();
                    FireTeaBagCtrl.view.toolTab.on(Event.CLICK, this, this.request_getBag);
                };
                /**
                 * 点击工具栏背包图标显示背包面板
                 */
                FireTeaBagCtrl.prototype.showFireTeaBagDialog = function () {
                    if (!UILayerManager.uiLayer.getChildByName("fireTeaBagDialogView")) {
                        FireTeaBagCtrl.view.name = "fireTeaBagDialogView";
                        UILayerManager.uiLayer.addChild(FireTeaBagCtrl.view);
                    }
                    FireTeaBagCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - FireTeaBagCtrl.view.width >> 1;
                    FireTeaBagCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FireTeaBagCtrl.view.height >> 1;
                    FireTeaBagCtrl.request_getBag();
                };
                /**
                 * 请求背包中道具数据接口
                 */
                FireTeaBagCtrl.request_getBag = function () {
                    FireTeaBagModel.callback = FireTeaBagCtrl.instance.getBagToolOver;
                    FireTeaBagCtrl.model.request_getBag();
                };
                FireTeaBagCtrl.prototype.getBagToolOver = function () {
                    FireTeaBagCtrl.view.addBagGrid(FireTeaBagCtrl.model.toolVOArr);
                };
                return FireTeaBagCtrl;
            }());
            bag.FireTeaBagCtrl = FireTeaBagCtrl;
        })(bag = friedRoom.bag || (friedRoom.bag = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=FireTeaBagCtrl.js.map
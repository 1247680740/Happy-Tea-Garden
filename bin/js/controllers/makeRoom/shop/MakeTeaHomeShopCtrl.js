var controllers;
(function (controllers) {
    var makeRoom;
    (function (makeRoom) {
        var shop;
        (function (shop) {
            var Event = laya.events.Event;
            var makeTeaHomeShopModel = models.makeRoom.shop.MakeTeaHomeShopModel;
            /**
             * 泡茶室商店相关控制器
             */
            var MakeTeaHomeShopCtrl = /** @class */ (function () {
                function MakeTeaHomeShopCtrl() {
                    /** 底部工具栏的高度 */
                    this.toolBarH = 30;
                    if (!MakeTeaHomeShopCtrl.model)
                        MakeTeaHomeShopCtrl.model = makeTeaHomeShopModel.instance;
                    if (!MakeTeaHomeShopCtrl.view)
                        MakeTeaHomeShopCtrl.view = new views.makeRoom.shop.MakeTeaShopDialogView();
                    MakeTeaHomeShopCtrl.view.seedTab.on(Event.CLICK, this, this.request_getChaoMaterial);
                    MakeTeaHomeShopCtrl.view.toolTab.on(Event.CLICK, this, this.request_getShopScroll);
                    MakeTeaHomeShopCtrl.view.rightContent.buyBtn.on(Event.CLICK, this, this.request_buySingleGoods);
                }
                MakeTeaHomeShopCtrl.getInstance = function () {
                    if (!MakeTeaHomeShopCtrl._instance)
                        MakeTeaHomeShopCtrl._instance = new MakeTeaHomeShopCtrl();
                    return MakeTeaHomeShopCtrl._instance;
                };
                /**
                 * 点击工具栏商店图标显示商店面板
                 */
                MakeTeaHomeShopCtrl.prototype.showShopDialog = function () {
                    UILayerManager.uiLayer.addChild(MakeTeaHomeShopCtrl.view);
                    MakeTeaHomeShopCtrl.view.visible = true;
                    MakeTeaHomeShopCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - MakeTeaHomeShopCtrl.view.width >> 1;
                    MakeTeaHomeShopCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - MakeTeaHomeShopCtrl.view.height - this.toolBarH * 2;
                    this.request_getChaoMaterial();
                };
                /**
                 * 泡茶原料选项卡
                 */
                MakeTeaHomeShopCtrl.prototype.request_getChaoMaterial = function () {
                    makeTeaHomeShopModel.callback = this.getChaoMaterialOver;
                    MakeTeaHomeShopCtrl.model.request_getChaoMaterial();
                };
                MakeTeaHomeShopCtrl.prototype.getChaoMaterialOver = function (seedObjArr) {
                    MakeTeaHomeShopCtrl.view.addTabGrids(seedObjArr);
                };
                /**
                 * 道具选项卡
                 */
                MakeTeaHomeShopCtrl.prototype.request_getShopScroll = function () {
                    makeTeaHomeShopModel.callback = this.getShopScrollOver;
                    MakeTeaHomeShopCtrl.model.request_getShopScroll();
                };
                MakeTeaHomeShopCtrl.prototype.getShopScrollOver = function (toolObjArr) {
                    MakeTeaHomeShopCtrl.view.addTabGrids(toolObjArr);
                };
                /**
                 * 购买物品
                 */
                MakeTeaHomeShopCtrl.prototype.request_buySingleGoods = function () {
                    MakeTeaHomeShopCtrl.model.request_buySingleGoods(MakeTeaHomeShopCtrl.view.curBuyObj);
                };
                return MakeTeaHomeShopCtrl;
            }());
            shop.MakeTeaHomeShopCtrl = MakeTeaHomeShopCtrl;
        })(shop = makeRoom.shop || (makeRoom.shop = {}));
    })(makeRoom = controllers.makeRoom || (controllers.makeRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=MakeTeaHomeShopCtrl.js.map
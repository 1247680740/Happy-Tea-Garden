var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var friendList;
    (function (friendList) {
        var Event = laya.events.Event;
        var TweenUtil = utils.TweenUtil;
        var MovieClip = laya.ani.swf.MovieClip;
        /**
         * 好友茶园场景除土地外的其它视图，如：狗、狗窝、狗盆、茶农等
         * @author hsx
         */
        var FriendTeaGardenView = /** @class */ (function (_super) {
            __extends(FriendTeaGardenView, _super);
            function FriendTeaGardenView() {
                var _this = _super.call(this) || this;
                FriendTeaGardenView.instance = _this;
                _this.mouseThrough = true;
                _this.dog = new MovieClip(); //this.getMC(swfUrl);
                _this.dog.name = "dog";
                _this.farmer = new MovieClip();
                _this.farmer.name = "farmer";
                _this.pos(500, 200);
                return _this;
            }
            FriendTeaGardenView.prototype.addDog = function (swfUrl) {
                // this.dog.url = swfUrl;
                this.dog.load(swfUrl);
                if (!this.getChildByName("dog")) {
                    this.addChild(this.dog);
                    // this.pos(500,200);
                }
            };
            FriendTeaGardenView.prototype.addFarmer = function () {
                if (!this.getChildByName(this.farmer.name)) {
                    this.farmer.size(65, 120);
                    this.farmer.pos(470, 100);
                    this.farmer.on(Event.MOUSE_OVER, this, this.showFarmerTip);
                    this.addChild(this.farmer);
                }
            };
            FriendTeaGardenView.prototype.showFarmerTip = function (event) {
                var farmerMC = event.target;
                if (farmerMC && farmerMC.name == "farmer") {
                    TipLayerManager.tipLayer.showDrawBgTip("工作剩余时间：" + models.teaRoom.TeaGardenModel.friendTeaGardenVO.validTime, new Laya.Point(720, 150));
                }
            };
            /**
             * 添加平常状态的茶农
             * 注意：此处的动画已分为 平常(farmer_13.swf)、浇水(farmer_13_water.swf)、除虫/除草(farmer_13_kill.swf) 三个动画！！！
             */
            FriendTeaGardenView.prototype.addCommonFarmer = function (url) {
                this.farmer.load(url);
                // this.farmer.url = url;
                // this.farmer.gotoAndStop(1);
                console.log("===========>" + this.farmer.url);
                this.addFarmer();
            };
            /**
             * 添加除草或除虫的茶农
             */
            FriendTeaGardenView.prototype.addRemoveGrassWormFarmer = function (url, debuffType, moveTo) {
                var _url = url.substring(0, url.lastIndexOf("."));
                _url += "_kill.swf";
                // 除草动画
                if (debuffType == "removeGrass") {
                    TweenUtil.tweenToLandGrid(views.common.CommonDisplay.getRemoveGrassImg(), moveTo);
                }
                // 杀虫动画
                if (debuffType == "killWorm") {
                    TweenUtil.tweenToLandGrid(views.common.CommonDisplay.getKillWormImg(), moveTo);
                }
                this.farmer.url = _url;
                this.addFarmer();
            };
            /**
             * 添加浇水的茶农
             */
            FriendTeaGardenView.prototype.addWaterFarmer = function (url, debuffType, moveTo) {
                if (debuffType != "water")
                    return;
                var _url = url.substring(0, url.lastIndexOf("."));
                _url += "_water.swf";
                // =========================== 待完善 ！！！===========================
                // TweenUtil.tweenToLandGrid(views.common.CommonDisplay.get ,moveTo);
                this.farmer.url = _url;
                this.addFarmer();
            };
            FriendTeaGardenView.prototype.getMC = function (url, useAtlas) {
                if (useAtlas === void 0) { useAtlas = false; }
                var mc = new MovieClip();
                // mc.on(Event.LOADED,this,this.mcLoaded);
                if (useAtlas)
                    mc.load(url, true);
                else
                    mc.url = url;
                return mc;
            };
            return FriendTeaGardenView;
        }(laya.ui.View));
        friendList.FriendTeaGardenView = FriendTeaGardenView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendTeaGardenView.js.map
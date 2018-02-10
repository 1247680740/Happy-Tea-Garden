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
        var CropCtrl = controllers.teaRoom.crop.CropCtrl;
        var CropModel = models.teaRoom.crop.CropModel;
        var Event = laya.events.Event;
        var GameConfig = configs.GameConfig;
        var GlowFilter = laya.filters.GlowFilter;
        var ColorFilter = laya.filters.ColorFilter;
        /**
         * 好友土地格子视图
         */
        var FriendLandGridView = /** @class */ (function (_super) {
            __extends(FriendLandGridView, _super);
            function FriendLandGridView() {
                var _this = _super.call(this) || this;
                _this.cacheAs = "bitmap"; // 可能对 DraCall/Canvas 影响较大
                _this.glowFilter = new GlowFilter("#FFE553", 10, 0, 0);
                _this.colorFilter = new ColorFilter([
                    0.5, 0.5, 0.56, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0,
                ]);
                _this.toolTip = "tip info"; // or  Handler().
                _this.resetShowState();
                _this.on(Event.MOUSE_OVER, _this, _this.landGridMouseOverFn);
                _this.on(Event.MOUSE_OUT, _this, _this.landGridMouseOutFn);
                _this.on(Event.CLICK, _this, _this.friendGridClkedFn);
                return _this;
            }
            /** 状态复位：所有状态均隐藏 */
            FriendLandGridView.prototype.resetShowState = function () {
                this.commonLand.visible = false;
                this.blackLand.visible = false;
                this.redLand.visible = false;
                this.dryCommonLand.visible = false;
                this.dryBlackLand.visible = false;
                this.dryRedLand.visible = false;
                this.disableLand.visible = false;
                this.disableTip.visible = false;
            };
            FriendLandGridView.prototype.landGridMouseOverFn = function (event) {
                this.filters = [this.glowFilter]; // ,this.colorFilter
                // 作物信息提示
                if (!this._friendCropView)
                    return;
                this._friendCropView.cropViewMouseOverFn();
            };
            FriendLandGridView.prototype.landGridMouseOutFn = function (event) {
                this.filters = [];
                if (!this.cropView)
                    return;
                this.cropView.cropViewMouseOutFn();
            };
            /**
             * 地块被点击后
             */
            FriendLandGridView.prototype.friendGridClkedFn = function (event) {
                var curLandId = parseInt(this.name);
                // 未开垦
                if (this.disableLand.visible) {
                    if (GameConfig.curOperateType == "landUpgrade")
                        TipLayerManager.tipLayer.showDrawBgTip("这块土地啥都没有哦！");
                }
                else {
                    // 已有作物
                    if (models.teaRoom.crop.CropModel.isHasFriendCropInLandGrid(curLandId)) {
                        var cropVO = CropModel.getFriendCropVOByLandId(curLandId);
                        // 普通鼠标
                        if (GameConfig.curOperateType == "commonMouse") {
                        } // 除虫
                        else if (GameConfig.curOperateType == "killWorm") {
                            if (!cropVO)
                                return;
                            CropCtrl.getInstance().request_actFriendPesticide(cropVO);
                        } // 除草
                        else if (GameConfig.curOperateType == "removeGrass") {
                            if (!cropVO)
                                return;
                            CropCtrl.getInstance().request_actFriendWipeGrass(cropVO);
                        } // 浇水
                        else if (GameConfig.curOperateType == "water") {
                            if (!cropVO)
                                return;
                            CropCtrl.getInstance().request_actFriendWater(cropVO);
                        } //放草
                        else if (GameConfig.curOperateType == "grass") {
                            if (!cropVO)
                                return;
                            if (cropVO.remnantOutput > 0) {
                                TipLayerManager.tipLayer.showDrawBgTip("这个阶段不能放杂草！");
                            }
                            else {
                                CropCtrl.getInstance().request_putGrass(cropVO);
                            }
                        } //放虫
                        else if (GameConfig.curOperateType == "worm") {
                            if (!cropVO)
                                return;
                            if (cropVO.remnantOutput > 0) {
                                TipLayerManager.tipLayer.showDrawBgTip("这个阶段不能放虫子！");
                            }
                            else {
                                CropCtrl.getInstance().request_putWorm(cropVO);
                            }
                        } // 全部收获
                        else if (GameConfig.curOperateType == "harvestAll") {
                            CropCtrl.callback = CropCtrl.getInstance().FriendCallbackFn;
                            CropCtrl.getInstance().setRunKey = { "key": CropCtrl.HARVEST_ALL };
                        }
                    }
                    else {
                        TipLayerManager.tipLayer.showDrawBgTip("这块土地啥都没种,不能操作哦！");
                    }
                }
            };
            Object.defineProperty(FriendLandGridView.prototype, "cropView", {
                get: function () {
                    return this._friendCropView;
                },
                /**
                 * 为地块添加作物
                 */
                set: function (cropView) {
                    this._friendCropView = cropView;
                    if (this._friendCropView) {
                        if (!this.getChildByName(this._friendCropView.name)) {
                            this.addChild(this._friendCropView);
                        }
                        this._friendCropView.autoSize = true;
                        // this._cropView.pos(this.width-this._cropView.width>>1,-35);	// 2017-06-26 hsx
                        this._friendCropView.pos(this.width - this._friendCropView.width >> 1, -this._friendCropView.height >> 1);
                        // 2017-06-26 hsx
                        this.cropView.grassHBox.scale(0.5, 0.5);
                        // 问题：wormHBox、grassHBox 的宽、高均为 0 ！
                        this.addChild(this.cropView.wormHBox);
                        this.addChild(this.cropView.grassHBox);
                        this.cropView.wormHBox.autoSize = true;
                        this.cropView.grassHBox.autoSize = true;
                        this.cropView.wormHBox.pos(20, this.height >> 1);
                        this.cropView.grassHBox.pos(this.cropView.wormHBox.x + 35, this.cropView.wormHBox.y + 20);
                    }
                },
                enumerable: true,
                configurable: true
            });
            return FriendLandGridView;
        }(ui.gameUI.land.LandGridUI));
        friendList.FriendLandGridView = FriendLandGridView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendLandGridView.js.map
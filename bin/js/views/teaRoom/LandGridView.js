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
    var teaRoom;
    (function (teaRoom) {
        var CropCtrl = controllers.teaRoom.crop.CropCtrl;
        var LandCtrl = controllers.teaRoom.LandCtrl;
        var CropModel = models.teaRoom.crop.CropModel;
        var Event = laya.events.Event;
        var GameConfig = configs.GameConfig;
        var GlowFilter = laya.filters.GlowFilter;
        var ColorFilter = laya.filters.ColorFilter;
        /**
         * 土地格子视图
         */
        var LandGridView = /** @class */ (function (_super) {
            __extends(LandGridView, _super);
            function LandGridView() {
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
                _this.on(Event.CLICK, _this, _this.gridClkedFn);
                return _this;
            }
            /** 状态复位：所有状态均隐藏 */
            LandGridView.prototype.resetShowState = function () {
                this.commonLand.visible = false;
                this.blackLand.visible = false;
                this.redLand.visible = false;
                this.dryCommonLand.visible = false;
                this.dryBlackLand.visible = false;
                this.dryRedLand.visible = false;
                this.disableLand.visible = false;
                this.disableTip.visible = false;
            };
            LandGridView.prototype.landGridMouseOverFn = function (event) {
                this.filters = [this.glowFilter]; // ,this.colorFilter
                // 作物信息提示
                if (!this.cropView)
                    return;
                this.cropView.cropViewMouseOverFn();
            };
            LandGridView.prototype.landGridMouseOutFn = function (event) {
                this.filters = [];
                if (!this.cropView)
                    return;
                this.cropView.cropViewMouseOutFn();
            };
            /**
             * 地块被点击后
             */
            LandGridView.prototype.gridClkedFn = function (event) {
                var curLandId = parseInt(this.name);
                // 未开垦
                if (this.disableLand.visible) {
                    if (GameConfig.curOperateType == "landUpgrade")
                        TipLayerManager.tipLayer.showDrawBgTip("未开垦的土地无法升级哦！");
                    else if (this.disableTip.visible)
                        LandCtrl.landView.event(teaRoom.LandView.WILL_ASSART_EVENT, parseInt(this.name)); // this.name==landId
                }
                else {
                    // 已有作物
                    if (models.teaRoom.crop.CropModel.isHasCropInLandGrid(curLandId)) {
                        var cropVO_1 = CropModel.getCropVOByLandId(curLandId);
                        // 普通鼠标
                        if (GameConfig.curOperateType == "commonMouse") {
                        } // 种植状态则取消
                        else if (GameConfig.curOperateType == "plant") {
                            TipLayerManager.tipLayer.showDrawBgTip("该地块已有作物！");
                        } // 施肥
                        else if (GameConfig.curOperateType == "fertilize") {
                            if (!cropVO_1)
                                return;
                            // 对成熟或枯萎状态的作物施肥，则弹出气泡：该阶段不能施肥
                            if (cropVO_1.remnantOutput > 0 || cropVO_1.isDeath) {
                                TipLayerManager.tipLayer.showDrawBgTip("该阶段不能施肥！");
                            }
                            else {
                                var paramObj = {};
                                paramObj["landId"] = curLandId;
                                paramObj["seedId"] = cropVO_1.id;
                                paramObj["toolId"] = parseInt(views.teaRoom.toolBar.DownToolBarView.curShowCursor.name);
                                CropCtrl.callback = CropCtrl.getInstance().callbackFn;
                                CropCtrl.getInstance().setRunKey = { "key": CropCtrl.FERTILIZE, "value": paramObj };
                            }
                        } // 除虫
                        else if (GameConfig.curOperateType == "killWorm") {
                            if (!cropVO_1)
                                return;
                            CropCtrl.getInstance().request_actPesticide(cropVO_1);
                        } // 除草
                        else if (GameConfig.curOperateType == "removeGrass") {
                            if (!cropVO_1)
                                return;
                            CropCtrl.getInstance().request_actWipeGrass(cropVO_1);
                        } // 浇水
                        else if (GameConfig.curOperateType == "water") {
                            if (!cropVO_1)
                                return;
                            CropCtrl.getInstance().request_actWater(cropVO_1);
                        } // 单个收获
                        else if (GameConfig.curOperateType == "harvestOne") {
                            // 请求接口
                            CropCtrl.callback = CropCtrl.getInstance().callbackFn;
                            CropCtrl.getInstance().setRunKey = { "key": CropCtrl.HARVEST_ONE, "value": curLandId };
                        } // 全部收获
                        else if (GameConfig.curOperateType == "harvestAll") {
                            CropCtrl.callback = CropCtrl.getInstance().callbackFn;
                            CropCtrl.getInstance().setRunKey = { "key": CropCtrl.HARVEST_ALL };
                        } // 铲除作物
                        else if (GameConfig.curOperateType == "removeCrop") {
                            if (!cropVO_1)
                                return;
                            if (cropVO_1.isDeath) {
                                CropCtrl.getInstance().request_deleteCrop(curLandId, cropVO_1.id);
                            }
                            else {
                                var info = "该土地上的作物还没收获，是否要铲除掉？";
                                TipLayerManager.tipLayer.showYesNoTip(info, function () {
                                    CropCtrl.getInstance().request_deleteCrop(curLandId, cropVO_1.id);
                                });
                            }
                        }
                        else if (GameConfig.curOperateType == "landUpgrade") {
                            TipLayerManager.tipLayer.showDrawBgTip("有作物的土地不能升级哦！");
                        }
                    }
                    else {
                        // 开始种植
                        if (GameConfig.curOperateType == "plant") {
                            var landVO = models.teaRoom.LandModel.getLandVOByLandId(curLandId);
                            if (landVO && landVO.status != 0)
                                LandCtrl.landView.event(teaRoom.LandView.GROWTH_EVENT, curLandId);
                        }
                        else if (GameConfig.curOperateType == "fertilize") {
                            TipLayerManager.tipLayer.showDrawBgTip("该地块没有作物！");
                        } // 土地升级
                        else if (GameConfig.curOperateType == "landUpgrade") {
                            LandCtrl.getInstance().request_getLandLevelUpInfo(curLandId);
                        }
                    }
                }
            };
            Object.defineProperty(LandGridView.prototype, "cropView", {
                get: function () {
                    return this._cropView;
                },
                /**
                 * 为地块添加作物
                 */
                set: function (cropView) {
                    this._cropView = cropView;
                    if (this._cropView) {
                        if (!this.getChildByName(this._cropView.name)) {
                            this.addChild(this._cropView);
                        }
                        this._cropView.autoSize = true;
                        // this._cropView.pos(this.width-this._cropView.width>>1,-35);	// 2017-06-26 hsx
                        this._cropView.pos(this.width - this._cropView.width >> 1, -this._cropView.height >> 1);
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
            return LandGridView;
        }(ui.gameUI.land.LandGridUI));
        teaRoom.LandGridView = LandGridView;
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=LandGridView.js.map
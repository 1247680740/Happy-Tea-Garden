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
    var layers;
    (function (layers) {
        var BaseView = views.base.BaseView;
        var GameConfig = configs.GameConfig;
        var UpGradePotCtrl = controllers.friedRoom.pot.UpGradePotCtrl;
        var IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;
        var Event = Laya.Event;
        /**
        * 游戏弹出层
        * 弹出UI层，不会隐藏，嵌入 TipManager 中，将弹出框添加至 TipLayer 后进行显示
        */
        var TipLayer = /** @class */ (function (_super) {
            __extends(TipLayer, _super);
            function TipLayer() {
                var _this = _super.call(this) || this;
                _this.name = "TipLayer";
                _this.isCheck = true;
                _this.updateZOrder();
                _this.on(Laya.Event.ADDED, _this, _this.addedFn);
                _this.on(Laya.Event.COMPONENT_ADDED, _this, _this.compAddedFn);
                return _this;
            }
            TipLayer.prototype.addedFn = function () {
                console.log("==== TipLayer,addedFn() ");
            };
            TipLayer.prototype.compAddedFn = function () {
                console.log("==== TipLayer,compAddedFn() ");
            };
            TipLayer.getInstance = function () {
                if (!TipLayer.instance)
                    TipLayer.instance = new TipLayer();
                return TipLayer.instance;
            };
            /**
             * 带有确定、取消按钮的提示框
             * @info 提示信息
             * @myCallBack 确定后的回调
             * @takeData 携带的数据
             * @canSubmit 确定按钮是否可用
             */
            TipLayer.prototype.showYesNoTip = function (info, myCallBack, takeData, canSubmit) {
                if (canSubmit === void 0) { canSubmit = true; }
                if (!this.yesOrNoTip) {
                    this.yesOrNoTip = new views.common.ConfirmCancelTipView();
                    this.addChild(this.yesOrNoTip);
                }
                this.yesOrNoTip.visible = true;
                this.yesOrNoTip.callback = myCallBack;
                this.yesOrNoTip.takeData = takeData;
                // Laya.HTMLDivElement: 图文混排
                this.yesOrNoTip.contentTxt.text = info;
                this.yesOrNoTip.confirmBtn.disabled = !canSubmit;
                this.yesOrNoTip.x = GameConfig.GAME_WINDOW_WIDTH - this.yesOrNoTip.width >> 1;
                this.yesOrNoTip.y = GameConfig.GAME_WINDOW_HEIGHT - this.yesOrNoTip.height >> 1;
            };
            /**
             * 显示带有不同背景的信息提示
             */
            TipLayer.prototype.showDrawBgTip = function (info, pos) {
                if (!info)
                    return;
                var tip = views.common.DrawBgTip.instance;
                tip.cacheAs = "bitmap";
                if (!this.getChildByName("drawBgTip")) {
                    tip.name = "drawBgTip";
                    this.addChild(tip);
                }
                tip.visible = true;
                tip.showTip(info);
                if (pos) {
                    tip.x = pos.x;
                    tip.y = pos.y;
                }
                else {
                    tip.x = GameConfig.GAME_WINDOW_WIDTH - tip.width >> 1;
                    tip.y = GameConfig.GAME_WINDOW_HEIGHT - tip.height >> 1;
                }
            };
            /** 弹出激活炒锅条件 */
            TipLayer.prototype.showEnableTip = function (needMoney) {
                var assartPotTip = views.friedRoom.pot.AssartPotTipView.instance;
                assartPotTip.name = "assartPotTip";
                assartPotTip.needMoney.text = needMoney + "";
                // assartPotTip.x = GameConfig.GAME_WINDOW_HEIGHT - assartPotTip.width + 50;
                // assartPotTip.y = GameConfig.GAME_WINDOW_HEIGHT - assartPotTip.height >> 1;
                // this.addChild(assartPotTip);
                this.addChild(assartPotTip.bgUI);
                // UILayerManager.friedTeaLayer.addChild(assartPotTip);
                assartPotTip.bgUI.x = GameConfig.GAME_WINDOW_WIDTH - assartPotTip.bgUI.width >> 1;
                assartPotTip.bgUI.y = GameConfig.GAME_WINDOW_HEIGHT - assartPotTip.bgUI.height >> 1;
                assartPotTip.once(views.friedRoom.pot.AssartPotTipView.ASSART_POT_EVENT, this, this.assartPotFn);
            };
            // 激活炒锅事件
            TipLayer.prototype.assartPotFn = function () {
                controllers.friedRoom.pot.PotCtrl.getInstance().request_actAssartPot();
            };
            /**
             * 购买升级提示
             */
            TipLayer.prototype.buyUpDataTipUI = function (buyUpDataTipUI, potVO, txtMsg) {
                if (parseInt(potVO.lockToolNums) > 0) {
                    buyUpDataTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
                    buyUpDataTipUI.buyNums.text = potVO.lockToolNums;
                    buyUpDataTipUI.needData.text = txtMsg;
                }
                else {
                    buyUpDataTipUI.visible = false;
                    return;
                }
                if (!this.getChildByName(buyUpDataTipUI.name))
                    this.addChild(buyUpDataTipUI);
                buyUpDataTipUI.visible = true;
                buyUpDataTipUI.x = GameConfig.GAME_WINDOW_WIDTH - buyUpDataTipUI.width >> 1;
                buyUpDataTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - buyUpDataTipUI.height >> 1;
                buyUpDataTipUI.okBtn.on(Event.CLICK, this, function () {
                    UpGradePotCtrl.getInstance().request_confirmBuy(potVO);
                    this.removeChild(buyUpDataTipUI);
                });
                buyUpDataTipUI.cancelBtn.on(Event.CLICK, this, function () {
                    this.removeChild(buyUpDataTipUI);
                });
                buyUpDataTipUI.closeBtn.on(Event.CLICK, this, function () {
                    this.removeChild(buyUpDataTipUI);
                });
            };
            /** 弹出购买炒锅升级材料的弹窗 */
            TipLayer.prototype.showPotDataTip = function (infoObjArr, name) {
                var potVO;
                var len = infoObjArr.length;
                var i;
                var buyUpDataTipUI = new ui.gameUI.tips.BuyUpDataTipUI();
                buyUpDataTipUI.name = "buyUpDataTipUI";
                buyUpDataTipUI.cacheAs = "bitmap";
                if (name == "btn_buy2") {
                    potVO = infoObjArr[1];
                    if (!potVO || potVO == undefined)
                        return;
                    if (potVO.toolId == 51001) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "强化工艺书");
                    }
                }
                else if (name == "btn_buy3") {
                    potVO = infoObjArr[2];
                    console.log("potVO的数据类型为：" + typeof (potVO));
                    if (!potVO || potVO == undefined)
                        return;
                    if (potVO.toolId == 51003) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "铜矿石");
                    }
                    if (potVO.toolId == 51004) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "精钢矿石");
                    }
                    if (potVO.toolId == 51005) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "玄铁矿石");
                    }
                    if (potVO.toolId == 51013) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "寒铁矿石");
                    }
                }
                else if (name == "btn_buy4") {
                    potVO = infoObjArr[3];
                    if (!potVO || potVO == undefined)
                        return;
                    if (potVO.toolId == 51010) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "红宝石");
                    }
                    if (potVO.toolId == 51011) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "绿松石");
                    }
                    if (potVO.toolId == 51012) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "祖母绿");
                    }
                    if (potVO.toolId == 51007) {
                        this.buyUpDataTipUI(buyUpDataTipUI, potVO, "玛瑙石");
                    }
                }
            };
            /**
             * 显示购买炒锅强化的弹窗
             */
            TipLayer.prototype.showIntensifyPotTip = function (infoObjArr, name) {
                var potVO;
                var len = infoObjArr.length;
                var i;
                if (name == "btn_buy2") {
                    var strengthPotTipUI = new ui.gameUI.tips.BuyUpDataTipUI();
                    strengthPotTipUI.cacheAs = "bitmap";
                    potVO = infoObjArr[2];
                    if (!potVO || potVO == undefined)
                        return;
                    if (potVO.toolId == 51002) {
                        if (parseInt(potVO.lockToolNums) > 0) {
                            strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
                            strengthPotTipUI.buyNums.text = potVO.lockToolNums;
                            strengthPotTipUI.needData.text = "生铁矿石";
                        }
                        this.addChild(strengthPotTipUI);
                        strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
                        strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
                        strengthPotTipUI.okBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.closeBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                    }
                    if (potVO.toolId == 51004) {
                        if (parseInt(potVO.lockToolNums) > 0) {
                            strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
                            strengthPotTipUI.buyNums.text = potVO.lockToolNums;
                            strengthPotTipUI.needData.text = "金矿石";
                        }
                        this.addChild(strengthPotTipUI);
                        strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
                        strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
                        strengthPotTipUI.okBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.closeBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                    }
                    if (potVO.toolId == 51005) {
                        if (parseInt(potVO.lockToolNums) > 0) {
                            strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
                            strengthPotTipUI.buyNums.text = potVO.lockToolNums;
                            strengthPotTipUI.needData.text = "玄铁矿石";
                        }
                        this.addChild(strengthPotTipUI);
                        strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
                        strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
                        strengthPotTipUI.okBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.closeBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                    }
                }
                else if (name == "btn_buy3") {
                    var strengthPotTipUI = new ui.gameUI.tips.BuyUpDataTipUI();
                    strengthPotTipUI.cacheAs = "bitmap";
                    potVO = infoObjArr[1];
                    if (!potVO || potVO == undefined)
                        return;
                    if (potVO.toolId == 51001) {
                        if (parseInt(potVO.lockToolNums) > 0) {
                            strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 3).toString();
                            strengthPotTipUI.buyNums.text = potVO.lockToolNums;
                            strengthPotTipUI.needData.text = "强化工艺书";
                        }
                        this.addChild(strengthPotTipUI);
                        strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
                        strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
                        strengthPotTipUI.okBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                        strengthPotTipUI.closeBtn.on(Event.CLICK, this, function () {
                            IntensifyPotCtrl.getInstance().cancelBtnClkFn();
                        });
                    }
                }
            };
            /**
             * 清理炒锅中的茶叶（刷锅）
             */
            TipLayer.prototype.showClearPot = function (potVO) {
                if (!potVO || potVO.status == 0)
                    return;
                var tipView = new ui.gameUI.tips.ConfirmCancelTipUI();
                tipView.cacheAs = "bitmap";
                tipView.contentTxt.text = "是否要清理掉茶叶？";
                this.addChild(tipView);
                tipView.x = GameConfig.GAME_WINDOW_WIDTH - tipView.width >> 1;
                tipView.y = GameConfig.GAME_WINDOW_HEIGHT - tipView.height >> 1;
                tipView.confirmBtn.on(Event.CLICK, this, function () {
                    controllers.friedRoom.pot.PotCtrl.callback = views.friedRoom.pot.PotGridView.instance.brushPotOver;
                    controllers.friedRoom.pot.PotCtrl.getInstance().request_brushPot(potVO);
                    this.removeChild(tipView);
                });
                tipView.closeBtn.on(Event.CLICK, this, function () {
                    this.removeChild(tipView);
                });
                tipView.cancelBtn.on(Event.CLICK, this, function () {
                    this.removeChild(tipView);
                });
            };
            /**
             * 显示茶园光标
             */
            TipLayer.prototype.showMainSceneCursor = function () {
                // 光标复位
                UILayerManager.teaGardenUI.resetCursorState();
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.name = "sceneCursor";
                if (!this.getChildByName("sceneCursor"))
                    this.addChild(views.teaRoom.toolBar.DownToolBarView.curShowCursor);
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = true;
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.zOrder = 9999;
                if (views.friendList.FriendList_DownToolBarView) {
                    if (views.friendList.FriendList_DownToolBarView.curShowCursor)
                        views.friendList.FriendList_DownToolBarView.curShowCursor.visible = false;
                }
                if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView) {
                    if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor)
                        views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = false;
                }
                if (views.makeRoom.toolBar.MakeTeaHome_DownToolBarView) {
                    if (views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor)
                        views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = false;
                }
            };
            /**
             * 显示好友茶园光标
             */
            TipLayer.prototype.showFriendSceneCursor = function () {
                // 光标复位
                UILayerManager.friendUILayer.resetCursorState();
                views.friendList.FriendList_DownToolBarView.curShowCursor.name = "friendSceneCursor";
                if (!this.getChildByName("friendSceneCursor"))
                    this.addChild(views.friendList.FriendList_DownToolBarView.curShowCursor);
                views.friendList.FriendList_DownToolBarView.curShowCursor.visible = true;
                views.friendList.FriendList_DownToolBarView.curShowCursor.zOrder = 9999;
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
                if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView) {
                    if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor)
                        views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = false;
                }
                if (views.makeRoom.toolBar.MakeTeaHome_DownToolBarView) {
                    if (views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor)
                        views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = false;
                }
            };
            /**
             * 显示炒茶室光标
             */
            TipLayer.prototype.showFriedTeaCursor = function () {
                // 光标复位
                UILayerManager.friedTeaLayer.resetCursorState();
                views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.name = "fireTeaCursor";
                if (!this.getChildByName("fireTeaCursor"))
                    this.addChild(views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor);
                views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = true;
                views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.zOrder = 9999;
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
                if (views.makeRoom.toolBar.MakeTeaHome_DownToolBarView) {
                    if (views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor)
                        views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = false;
                }
                if (views.friendList.FriendList_DownToolBarView) {
                    if (views.friendList.FriendList_DownToolBarView.curShowCursor)
                        views.friendList.FriendList_DownToolBarView.curShowCursor.visible = false;
                }
            };
            /**
             * 显示泡茶室光标
             */
            TipLayer.prototype.showMakeTeaCursor = function () {
                // 光标复位
                UILayerManager.makeTealayer.resetCursorState();
                views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.name = "makeTeaCursor";
                if (!this.getChildByName("makeTeaCursor"))
                    this.addChild(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor);
                views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = true;
                views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.zOrder = 9999;
                views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
                // if(views.teaRoom.toolBar.DownToolBarView)
                // {
                // 	if(views.teaRoom.toolBar.DownToolBarView.curShowCursor)
                // 		views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
                // }
                if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView) {
                    if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor)
                        views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = false;
                }
                if (views.friendList.FriendList_DownToolBarView) {
                    if (views.friendList.FriendList_DownToolBarView.curShowCursor)
                        views.friendList.FriendList_DownToolBarView.curShowCursor.visible = false;
                }
            };
            return TipLayer;
        }(BaseView));
        layers.TipLayer = TipLayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=TipLayer.js.map
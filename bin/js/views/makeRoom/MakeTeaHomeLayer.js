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
    var makeRoom;
    (function (makeRoom) {
        var BaseView = views.base.BaseView;
        var MakeTeaDialogCtrl = controllers.makeRoom.MakeTeaDialogCtrl;
        var MakeTeaHomeModel = models.makeRoom.MakeTeaHomeModel;
        var MakeTeaDialogModel = models.makeRoom.MakeTeaDialogModel;
        var Animation = laya.display.Animation;
        var MovieClip = laya.ani.swf.MovieClip;
        var Point = laya.maths.Point;
        /**
         * 泡茶室场景
         */
        var MakeTeaHomeLayer = /** @class */ (function (_super) {
            __extends(MakeTeaHomeLayer, _super);
            function MakeTeaHomeLayer() {
                var _this = _super.call(this) || this;
                _this.bgUrl = "res/gameAssets/imgs/";
                // 地图尺寸：1000*600,分成4*3的尺寸为250*200的小图
                /**
                 * 小地图块宽
                 */
                _this.pieceW = 250;
                /**
                 * 小地图块高
                 */
                _this.pieceH = 200;
                _this.SISTER = "sister";
                _this.ELDERS_SISTER = "eldersSister";
                _this.HEAT_UP_WATER = "heatUP";
                _this.WATER_BOILING = "waterBoiling";
                _this.POUR_WATER = "pourWater";
                _this.POUR_WATER_OVER = "pourWaterOver";
                _this.POUR_WASTE_WATER = "pourWasteWater";
                _this.MAKE_TEA_BTN = "makeTeaBtn";
                _this.MAKE_TEA = "makeTea";
                _this.MAKE_TEA_OVER = "makeTeaOver";
                _this.GLASS_POT = "glassPot";
                _this.GLASS_CUP = "glassCup";
                _this.RED_POT = "redPot";
                _this.RED_CUP = "redCup";
                _this.REDFLOWER_POT = "redFlowerPot";
                _this.REDFLOWER_CUP = "redFlowerCup";
                _this.TEMP = "temp";
                /** 是否开始倒水 */
                _this.isStartDropWater = false;
                _this.cupPotIndex = 1;
                _this.cutPotType = "";
                _this.name = "makeTeaHome";
                MakeTeaHomeLayer.instance = _this;
                _this.mouseThrough = true;
                return _this;
                // this.loadBg();
                // this.tipView=new ui.gameUI.tips.ConfirmCancelTipUI;
            }
            MakeTeaHomeLayer.prototype.pauseTemp = function (event) {
                this.tempAni.gotoAndStop(MakeTeaHomeLayer.index);
                Laya.timer.clearAll(this);
                // MakeTeaHomeLayer.temperature=MakeTeaHomeLayer.index*4+20;
                MakeTeaHomeLayer.temperature = MakeTeaHomeLayer.index * 4;
                console.log("当前温度为：" + MakeTeaHomeLayer.temperature);
                MakeTeaDialogCtrl.getInstance().stopFriedWater(MakeTeaHomeLayer.temperature);
            };
            MakeTeaHomeLayer.prototype.initStopFriedWaterData = function () {
                var powerVO = MakeTeaHomeModel.makeTeaPowerVOArr[0];
                if (powerVO.name == "askDunk" || powerVO.name == "hotUpWater") {
                    var powerVO_1 = MakeTeaHomeModel.makeTeaPowerVOArr[0];
                    if (powerVO_1.temperature < powerVO_1.tempBottom || powerVO_1.temperature > powerVO_1.tempTop) {
                        this.tipContent = "你壶里面的水不满足泡茶的基本要求！这会严重影响茶水的品质！是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
                        this.showCancleBtn(this.tipContent);
                    }
                    else {
                        this.tipContent = "目前水温:" + powerVO_1.temperature + "度;预计茶水评分：" + powerVO_1.quality + "分；是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
                        this.showCancleBtn(this.tipContent);
                    }
                }
                else {
                    var scoreVO = MakeTeaHomeModel.firedWaterVOArr[0];
                    MakeTeaHomeLayer.score = scoreVO.quality;
                    var friedWaterVO = MakeTeaDialogModel.friedWaterVOArr[0];
                    if (friedWaterVO.name == "hotUpWater") {
                        if (MakeTeaHomeLayer.temperature < friedWaterVO.tempBottom || MakeTeaHomeLayer.temperature > friedWaterVO.tempTop) {
                            this.tipContent = "你壶里面的水不满足泡茶的基本要求！这会严重影响茶水的品质！是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
                            this.showCancleBtn(this.tipContent);
                        }
                        else {
                            this.tipContent = "目前水温:" + MakeTeaHomeLayer.temperature + "度;预计茶水评分：" + MakeTeaHomeLayer.score + "分；是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
                            this.showCancleBtn(this.tipContent);
                        }
                    }
                }
            };
            MakeTeaHomeLayer.prototype.showCancleBtn = function (content) {
                var makeTeaTipView = new ui.gameUI.tips.ConfirmCancelTipUI();
                makeTeaTipView.contentTxt.text = content;
                makeTeaTipView.x = configs.GameConfig.GAME_WINDOW_WIDTH - makeTeaTipView.width >> 1;
                makeTeaTipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - makeTeaTipView.height >> 1;
                makeTeaTipView.visible = true;
                this.addChild(makeTeaTipView);
                this.heatWaterAni.visible = false;
                this.heatWaterImg.visible = true;
                this.addChild(this.heatWaterImg);
                makeTeaTipView.confirmBtn.on(Laya.Event.CLICK, this, function () {
                    MakeTeaDialogCtrl.getInstance().startMakeTea();
                    this.isStartDropWater = true;
                    this.potMc.gotoAndStop(0);
                    this.potMc.play();
                    if (this.cutPotType == "glass") {
                        this.potMc.on(Laya.Event.FRAME, this, function () {
                            if (this.potMc.index == 100) {
                                this.stopFrame();
                            }
                        });
                    }
                    else if (this.cutPotType == "zihua") {
                        this.potMc.on(Laya.Event.FRAME, this, function () {
                            if (this.potMc.index == 66) {
                                this.stopFrame();
                            }
                        });
                    }
                    else {
                        this.potMc.on(Laya.Event.FRAME, this, function () {
                            if (this.potMc.index == 60) {
                                this.stopFrame();
                            }
                        });
                    }
                    this.cupMc.on(Laya.Event.LOADED, this, function () {
                        this.cupMc.stop();
                    });
                    this.cupMc.on(Laya.Event.COMPLETE, this, function () {
                        this.potMc.visible = true;
                        this.cupMc.gotoAndStop(0);
                        this.isStartDropWater = false;
                        TipLayerManager.tipLayer.showDrawBgTip("点击左侧小妹开始出售茶叶吧！");
                    });
                    this.removeChild(this.tempAni.parent);
                    this.removeChild(this.makeTeaBtnAni);
                    makeTeaTipView.removeSelf();
                });
                makeTeaTipView.cancelBtn.on(Laya.Event.CLICK, this, function () {
                    MakeTeaDialogCtrl.getInstance().dropWater();
                    this.isStartDropWater == false;
                    this.removeChild(this.potMc);
                    this.removeChild(this.cupMc);
                    this.removeChild(this.makeTeaBtnAni);
                    this.removeChild(this.tempAni.parent);
                    this.pourWasteWater();
                    this.removeChild(makeTeaTipView);
                    makeTeaTipView.removeSelf();
                });
                makeTeaTipView.closeBtn.on(Laya.Event.CLICK, this, function () {
                    this.isStartDropWater == false;
                    this.heatWaterAni.visible = true;
                    this.heatWaterImg.visible = false;
                    makeTeaTipView.removeSelf();
                });
            };
            MakeTeaHomeLayer.prototype.loadBg = function () {
                var imgsArr = [];
                var index;
                for (index = 1; index <= 12; index++) {
                    imgsArr[index - 1] = this.bgUrl + "makeRoom/bg_" + index + ".png";
                }
                for (index = 0; index < imgsArr.length; index++) {
                    var m = Math.floor(index / 4);
                    var n = index % 4;
                    this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
                }
                this.request_MakeTeaPower(); //初始化泡茶室获取泡茶权限
                this.myInit();
                this.heatWaterImg = new Laya.Image();
                this.heatWaterImg.skin = "res/gameAssets/ani/heatUpWater/stopState.png";
                this.heatWaterImg.scale(0.8, 0.8);
                this.heatWaterImg.pos(755, 340);
            };
            MakeTeaHomeLayer.prototype.stopFrame = function () {
                this.potMc.stop();
                this.potMc.visible = false;
                this.heatWaterImg.visible = false;
                this.heatWaterAni.visible = true;
                this.heatWaterAni.stop();
                this.cupMc.play();
            };
            MakeTeaHomeLayer.prototype.request_MakeTeaPower = function () {
                MakeTeaDialogCtrl.getInstance().request_MakeTeaPower();
            };
            /** 出售茶叶 */
            MakeTeaHomeLayer.prototype.saleTea = function (event) {
                var i;
                var powerLen = MakeTeaHomeModel.makeTeaPowerVOArr.length;
                var len = MakeTeaHomeModel.startMakeTeaVOArr.length;
                var powerVO;
                var startMakeTeaVO;
                for (i = 0; i < powerLen; i++) {
                    powerVO = MakeTeaHomeModel.makeTeaPowerVOArr[i];
                    if (powerVO.name == "finishDunkTea" || len > 0) {
                        if (MakeTeaHomeModel.startMakeTeaVOArr.length > 0) {
                            startMakeTeaVO = MakeTeaHomeModel.startMakeTeaVOArr[0];
                            this.tipContent = "泡好的茶水卖给我，你会得到" + startMakeTeaVO.teaPrice + "金币，确定要卖出吗？";
                            this.showSaleTeaTip(this.tipContent);
                        }
                        else {
                            this.tipContent = "泡好的茶水卖给我，你会得到" + powerVO.teaPrice + "金币，确定要卖出吗？";
                            this.showSaleTeaTip(this.tipContent);
                        }
                    }
                    else {
                        TipLayerManager.tipLayer.showDrawBgTip("你当前还没有现成的茶叶，请先泡茶！");
                    }
                }
                // if(powerLen==0 || len==0)
                // 	TipLayerManager.tipLayer.showCommonTip("你当前还没有现成的茶叶，请先泡茶！");
            };
            MakeTeaHomeLayer.prototype.showSaleTeaTip = function (tipContent) {
                var saleTeaTipView = new ui.gameUI.tips.ConfirmCancelTipUI();
                saleTeaTipView.contentTxt.text = tipContent;
                console.log("1============ saleTeaTipView, w:" + saleTeaTipView.width);
                saleTeaTipView.x = configs.GameConfig.GAME_WINDOW_WIDTH - saleTeaTipView.width >> 1;
                saleTeaTipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - saleTeaTipView.height >> 1;
                saleTeaTipView.visible = true;
                this.addChild(saleTeaTipView);
                saleTeaTipView.confirmBtn.on(Laya.Event.CLICK, this, function () {
                    MakeTeaDialogCtrl.getInstance().saleTea();
                    this.removeChild(this.potMc);
                    this.removeChild(this.cupMc);
                    this.cupMc.destroy();
                    this.potMc.destroy();
                    this.heatWaterAni.gotoAndStop(0);
                    saleTeaTipView.removeSelf();
                });
                saleTeaTipView.cancelBtn.on(Laya.Event.CLICK, this, function () {
                    saleTeaTipView.removeSelf();
                });
                saleTeaTipView.closeBtn.on(Laya.Event.CLICK, this, function () {
                    saleTeaTipView.removeSelf();
                });
            };
            MakeTeaHomeLayer.prototype.initMakeTeaHome = function (powerVOArr) {
                if (!powerVOArr)
                    return;
                var i;
                var len = powerVOArr.length;
                var powerVO;
                for (i = 0; i < len; i++) {
                    powerVO = powerVOArr[i];
                    if (powerVO.name == "") {
                        // this.heatWaterAni=this.heatUpWater();
                        // // ========================== 新加，动画在此时可能已加载完成，故需监听 COMPLETE; 共调用了4次 heatUpWater(),要注意动画加载顺序！
                        // this.heatWaterAni.on(Laya.Event.LOADED,this,function():void{
                        // 	this.heatWaterAni.gotoAndStop(0);
                        // });
                    }
                    else {
                        this.initTypeAnimation(powerVO.teaSet, powerVO.name);
                    }
                }
            };
            MakeTeaHomeLayer.prototype.initTypeAnimation = function (teaSet, statusName) {
                switch (teaSet) {
                    case "glass":
                        this.potMcPath = "res/gameAssets/ani/glassPot.swf";
                        this.cupMcPath = "res/gameAssets/ani/glassCup.swf";
                        this.initHomeAni(statusName);
                        break;
                    case "zisha":
                        this.potMcPath = "res/gameAssets/ani/redPot.swf";
                        this.cupMcPath = "res/gameAssets/ani/redCup.swf";
                        this.initHomeAni(statusName);
                        break;
                    case "zihua":
                        this.potMcPath = "res/gameAssets/ani/redFlowerPot.swf";
                        this.cupMcPath = "res/gameAssets/ani/redFlowerCup.swf";
                        this.initHomeAni(statusName);
                        break;
                }
            };
            MakeTeaHomeLayer.prototype.teaSetShow = function () {
                var potName = "potMc";
                this.potMc = this.commonMc(this.potMcPath, potName);
                var cupName = "cupName";
                this.cupMc = this.commonMc(this.cupMcPath, cupName);
                this.cupMc.on(Laya.Event.COMPLETE, this, function () {
                    this.potMc.gotoAndStop(0);
                    this.cupPotIndex = 3;
                });
                this.potMc.on(Laya.Event.LOADED, this, function () {
                    this.potMc.gotoAndStop(0);
                });
                this.cupMc.on(Laya.Event.LOADED, this, function () {
                    this.cupMc.gotoAndStop(0);
                    this.cupPotIndex = 2;
                });
                if (this.cupPotIndex == 1) {
                    this.potMc.gotoAndStop(0);
                    this.cupMc.gotoAndStop(0);
                }
            };
            MakeTeaHomeLayer.prototype.initHomeAni = function (statusName) {
                if (statusName == "hotUpWater") {
                    this.teaSetShow();
                    this.heatWaterAni.play();
                    this.makeTeaBtnAni = this.makeTeaBtn();
                    this.tempAni = this.temp();
                }
                else if (statusName == "finishDunkTea") {
                    this.finishDukeTeaAni();
                }
                else if (statusName == "askDunk") {
                    this.teaSetShow();
                    this.heatWaterAni.play();
                    this.makeTeaBtnAni = this.makeTeaBtn();
                    this.tempAni = this.temp();
                    this.tempAni.on(Laya.Event.LOADED, this, function () {
                        var i;
                        var len = MakeTeaHomeModel.makeTeaPowerVOArr.length;
                        var powerVO;
                        for (i = 0; i < len; i++) {
                            powerVO = MakeTeaHomeModel.makeTeaPowerVOArr[i];
                            var index = Math.ceil((powerVO.temperature) / 4);
                            this.tempAni.gotoAndStop(index);
                            this.tempAni.stop();
                            break;
                        }
                    });
                    this.initStopFriedWaterData();
                }
            };
            MakeTeaHomeLayer.prototype.finishDukeTeaAni = function () {
                this.teaSetShow();
                this.heatWaterAni.on(Laya.Event.LOADED, this, function () {
                    this.heatWaterAni.gotoAndStop(0);
                });
                this.heatWaterAni.stop();
                this.potMc.on(Laya.Event.LOADED, this, function () {
                    this.potMc.gotoAndStop(this.cupMc.count - 1);
                });
                this.cupMc.on(Laya.Event.LOADED, this, function () {
                    this.cupMc.gotoAndStop(this.cupMc.count - 1);
                });
            };
            MakeTeaHomeLayer.prototype.startMakeTea = function (friedWaterVOArr) {
                if (!friedWaterVOArr)
                    return;
                var len = friedWaterVOArr.length;
                var i;
                if (len <= 0) {
                    this.initMakeTeaHome(MakeTeaHomeModel.makeTeaPowerVOArr);
                }
                else {
                    this.tempAni = this.temp(); //温度计动画
                    this.tempAni.gotoAndStop(0);
                    MakeTeaHomeLayer.index = 0;
                    this.tempAni.play();
                    this.makeTeaBtnAni = this.makeTeaBtn(); //点我泡茶按钮
                    this.heatWaterAni.play();
                    var i_1;
                    var len_1 = MakeTeaDialogModel.friedWaterVOArr.length;
                    var friedWaterVO = void 0;
                    for (i_1 = 0; i_1 < len_1; i_1++) {
                        friedWaterVO = MakeTeaDialogModel.friedWaterVOArr[i_1];
                        switch (friedWaterVO.teaSet) {
                            case "glass":
                                this.cutPotType = "glass";
                                this.potMcPath = "res/gameAssets/ani/glassPot.swf";
                                this.cupMcPath = "res/gameAssets/ani/glassCup.swf";
                                this.teaSetShow();
                                break;
                            case "zisha":
                                this.cutPotType = "zisha";
                                this.potMcPath = "res/gameAssets/ani/redPot.swf";
                                this.cupMcPath = "res/gameAssets/ani/redCup.swf";
                                this.teaSetShow();
                                break;
                            case "zihua":
                                this.cutPotType = "zihua";
                                this.potMcPath = "res/gameAssets/ani/redFlowerPot.swf";
                                this.cupMcPath = "res/gameAssets/ani/redFlowerCup.swf";
                                this.teaSetShow();
                                break;
                        }
                    }
                }
            };
            MakeTeaHomeLayer.prototype.myInit = function () {
                // 还差动画：白瓷茶杯/茶壶、紫砂茶杯/茶壶
                this.sisterUrlArr = this.getAniUrlArr("res/gameAssets/ani/sister/", 2);
                this.elderSisterUrlArr = this.getAniUrlArr("res/gameAssets/ani/elderSister/", 2);
                this.heatUpWaterArr = this.getAniUrlArr("res/gameAssets/ani/heatUpWater/", 2);
                this.waterBoilingArr = this.getAniUrlArr("res/gameAssets/ani/waterBoiling/", 2);
                this.pourWaterArr = this.getAniUrlArr("res/gameAssets/ani/pourWater/", 5);
                this.pourWaterOverArr = this.getAniUrlArr("res/gameAssets/ani/pourWaterOver/", 4);
                this.pourWasteWaterArr = this.getAniUrlArr("res/gameAssets/ani/pourWasteWater/", 12);
                this.makeTeaBtnArr = this.getAniUrlArr("res/gameAssets/ani/makeTeaBtn/", 4);
                this.makeTeaArr = this.getAniUrlArr("res/gameAssets/ani/makeTea/", 5);
                this.makeTeaOverArr = this.getAniUrlArr("res/gameAssets/ani/makeTeaOver/", 4);
                this.glassPotArr = this.getAniUrlArr("res/gameAssets/ani/glassPot/", 33);
                this.glassCupArr = this.getAniUrlArr("res/gameAssets/ani/glassCup/", 30);
                this.redFlowerPotArr = this.getAniUrlArr("res/gameAssets/ani/redFlowerPot/", 33);
                this.redFlowerCupArr = this.getAniUrlArr("res/gameAssets/ani/redFlowerCup/", 30);
                this.tempArr = this.getAniUrlArr("res/gameAssets/ani/temp/", 20);
                this.sisterLoaded();
                this.elderSisterLoaded();
                this.addXTF();
                this.heatWaterAni = this.heatUpWater();
                // ========================== 新加，动画在此时可能已加载完成，故需监听 COMPLETE; 共调用了4次 heatUpWater(),要注意动画加载顺序！
                this.heatWaterAni.on(Laya.Event.LOADED, this, function () {
                    this.heatWaterAni.gotoAndStop(0);
                });
            };
            /**
             * 妹妹
             */
            MakeTeaHomeLayer.prototype.sisterLoaded = function () {
                var sister = this.addAnimation(this.sisterUrlArr, this.SISTER, 800, new Point(390, 110));
                var sRect = new Laya.Rectangle(0, 0, 105, 180);
                sister.hitArea = sRect;
                sister.on(Laya.Event.CLICK, this, this.saleTea);
            };
            /**
             * 姐姐
             */
            MakeTeaHomeLayer.prototype.elderSisterLoaded = function () {
                var ani = new Animation();
                ani.interval = 900;
                ani.loadImages(this.elderSisterUrlArr);
                ani.play();
                this.addChild(ani);
                ani.pos(560, 90);
            };
            MakeTeaHomeLayer.prototype.huLoaded = function () {
                var mc = new MovieClip();
                mc.url = "res/gameAssets/ani/stove.swf";
                mc.once(Laya.Event.LOADED, this, function () {
                    // mc.gotoAndStop(1);
                });
                this.addChild(mc);
                mc.pos(200, 0);
            };
            /**
             * 添加玄天符动画
             */
            MakeTeaHomeLayer.prototype.addXTF = function () {
                if (MakeTeaHomeLayer.xtfStatus == 0) {
                    var mc = new MovieClip();
                    mc.url = "res/gameAssets/ani/XuanTianFu.swf";
                    mc.on(Laya.Event.LOADED, this, function () {
                        console.log("-- XuanTianFu end...");
                    });
                    this.addChild(mc);
                    mc.pos(70, 420);
                    MakeTeaHomeLayer.xtfStatus = 1;
                }
            };
            /**
             * 烧水
             */
            MakeTeaHomeLayer.prototype.heatUpWater = function () {
                var heatUp = this.addAnimation(this.heatUpWaterArr, this.HEAT_UP_WATER, 600, new Point(0, 150)); //750, 300
                heatUp.scale(0.7, 0.7, true);
                heatUp.pos(765, 345);
                return heatUp;
            };
            /**
             * 水烧好（水沸）
             */
            MakeTeaHomeLayer.prototype.waterBoiling = function () {
                var waterBoiling = this.addAnimation(this.waterBoilingArr, this.WATER_BOILING, 200, new Point(765, 210)); //100, 150  750, 300
                this.addChild(waterBoiling);
                waterBoiling.scale(0.7, 0.7, true);
                // waterBoiling.pos(765,345);
                return waterBoiling;
            };
            /**
             * 倒水
             */
            MakeTeaHomeLayer.prototype.pourWater = function () {
                var pourWater = this.addAnimation(this.pourWaterArr, this.POUR_WATER, 200, new Point(200, 150));
                pourWater.on(Laya.Event.COMPLETE, this, function () {
                    pourWater.stop();
                });
                return pourWater;
            };
            /**
             * 倒水完毕
             */
            MakeTeaHomeLayer.prototype.pourWaterOver = function () {
                var pourWaterOver = this.addAnimation(this.pourWaterOverArr, this.POUR_WATER_OVER, 150, new Point(400, 150));
                pourWaterOver.on(Laya.Event.COMPLETE, this, function () {
                    console.log("-- pour water over end");
                    pourWaterOver.gotoAndStop(pourWaterOver.frames.length - 1);
                });
            };
            /**
             * 倒废水
             */
            MakeTeaHomeLayer.prototype.pourWasteWater = function () {
                var pourWasteWater = this.addAnimation(this.pourWasteWaterArr, this.POUR_WASTE_WATER, 200, new Point(100, 250));
                pourWasteWater.scale(0.7, 0.7, true);
                pourWasteWater.on(Laya.Event.COMPLETE, this, function () {
                    pourWasteWater.stop();
                    pourWasteWater.visible = false;
                    this.heatWaterAni.visible = true;
                    this.heatWaterImg.visible = false;
                });
                return pourWasteWater;
            };
            /**
             * 点我泡茶 按钮
             */
            MakeTeaHomeLayer.prototype.makeTeaBtn = function () {
                var makeTeaBtn = this.addAnimation(this.makeTeaBtnArr, this.MAKE_TEA_BTN, 150, new Point(875, 410)); //875,410
                makeTeaBtn.scale(0.7, 0.7, true);
                var mRect = new Laya.Rectangle(0, 0, 250, 100);
                makeTeaBtn.hitArea = mRect;
                makeTeaBtn.on(Laya.Event.CLICK, this, this.pauseTemp);
                return makeTeaBtn;
            };
            /**
             * 泡茶
             */
            MakeTeaHomeLayer.prototype.makeTea = function () {
                var makeTea = this.addAnimation(this.makeTeaArr, this.MAKE_TEA, 200, new Point(600, 0));
                makeTea.on(Laya.Event.COMPLETE, this, function () {
                    makeTea.gotoAndStop(makeTea.frames.length - 1);
                });
            };
            /**
             * 泡茶完成
             */
            MakeTeaHomeLayer.prototype.makeTeaOver = function () {
                var makeTeaOver = this.addAnimation(this.makeTeaOverArr, this.MAKE_TEA_OVER, 200, new Point(800, 0));
                makeTeaOver.on(Laya.Event.COMPLETE, this, function () {
                    makeTeaOver.gotoAndStop(makeTeaOver.frames.length - 1);
                });
            };
            /**
             * 玻璃茶壶
             */
            MakeTeaHomeLayer.prototype.glassPot = function () {
                var glassPot = this.addAnimation(this.glassPotArr, this.GLASS_POT, 200, new Point(600, 150));
                glassPot.on(Laya.Event.COMPLETE, this, function () {
                    glassPot.gotoAndStop(glassPot.frames.length - 1);
                });
                return glassPot;
            };
            /**
             * 玻璃杯
             */
            MakeTeaHomeLayer.prototype.glassCup = function () {
                var glassCup = this.addAnimation(this.glassCupArr, this.GLASS_CUP, 250, new Point(800, 150));
                glassCup.on(Laya.Event.COMPLETE, this, function () {
                    glassCup.gotoAndStop(glassCup.frames.length - 1);
                });
                return glassCup;
            };
            /**
             *  紫砂茶壶
             */
            MakeTeaHomeLayer.prototype.redPot = function () {
                var redPot = this.addAnimation(this.redPotArr, this.RED_POT, 200, new Point(600, 150));
                redPot.on(Laya.Event.COMPLETE, this, function () {
                    redPot.gotoAndStop(redPot.frames.length - 1);
                });
            };
            /**
             * 紫砂茶杯
             */
            MakeTeaHomeLayer.prototype.redCup = function () {
                var redCup = this.addAnimation(this.redCupArr, this.RED_CUP, 250, new Point(800, 150));
                redCup.on(Laya.Event.COMPLETE, this, function () {
                    redCup.gotoAndStop(redCup.frames.length - 1);
                });
            };
            MakeTeaHomeLayer.prototype.commonMc = function (url, teasetName) {
                this.cupPotIndex = 1;
                if (this.getChildByName(teasetName)) {
                    return this.getChildByName(teasetName);
                }
                else {
                    var mc_1 = new MovieClip();
                    mc_1.url = url;
                    mc_1.name = teasetName;
                    mc_1.once(Laya.Event.LOADED, this, function () {
                        mc_1.gotoAndStop(0);
                    });
                    this.addChild(mc_1);
                    mc_1.scale(0.8, 0.8);
                    if (teasetName == "potMc") {
                        mc_1.pos(400, 110);
                    }
                    else {
                        mc_1.pos(210, 280);
                    }
                    return mc_1;
                }
            };
            /**
             * 白瓷茶壶
             */
            MakeTeaHomeLayer.prototype.redFlowerPot = function () {
                var redFlowerPot = this.addAnimation(this.redFlowerPotArr, this.REDFLOWER_POT, 200, new Point(600, 150));
                redFlowerPot.on(Laya.Event.COMPLETE, this, function () {
                    redFlowerPot.gotoAndStop(redFlowerPot.frames.length - 1);
                });
            };
            /**
             * 白瓷茶杯
             */
            MakeTeaHomeLayer.prototype.redFlowerCup = function () {
                var redFlowerCup = this.addAnimation(this.redFlowerCupArr, this.REDFLOWER_CUP, 250, new Point(800, 150));
                redFlowerCup.on(Laya.Event.COMPLETE, this, function () {
                    redFlowerCup.gotoAndStop(redFlowerCup.frames.length - 1);
                });
            };
            /**
             * 温度计
             */
            MakeTeaHomeLayer.prototype.temp = function () {
                // 水银柱
                var temp = new Animation();
                temp.loadImages(this.tempArr, this.TEMP);
                temp.on(Laya.Event.COMPLETE, this, function () {
                    temp.gotoAndStop(temp.frames.length - 1);
                });
                temp.interval = 100;
                // temp.play();
                temp.pos(15, 20);
                // 数字刻度
                var numTip = new Laya.Image();
                numTip.skin = "res/gameAssets/ani/temp/numTip.png";
                numTip.pos(65, 10);
                // 相关容器
                var bg = new Laya.Image();
                var count = temp.frames.length - 1;
                bg.skin = "res/gameAssets/ani/temp/bg.png";
                bg.addChild(temp);
                bg.addChild(numTip);
                this.addChild(bg);
                bg.pos(920, 230);
                bg.scale(0.7, 0.7, true);
                temp.timerLoop(1000, this, this.timeOut, [count, temp]);
                if (this.cupPotIndex == 1) {
                    temp.gotoAndStop(5);
                    temp.play();
                }
                return temp;
            };
            MakeTeaHomeLayer.prototype.timeOut = function (count, temp) {
                temp.mouseEnabled = false;
                MakeTeaHomeLayer.index++;
                temp.gotoAndStop(MakeTeaHomeLayer.index);
                if (MakeTeaHomeLayer.index == count) {
                    Laya.timer.clearAll(this);
                    temp.timerOnce(4000, this, function () {
                        temp.mouseEnabled = true;
                        temp.timerLoop(1000, this, function () {
                            MakeTeaHomeLayer.index--;
                            temp.gotoAndStop(MakeTeaHomeLayer.index);
                            if (MakeTeaHomeLayer.index == 0) {
                                Laya.timer.clearAll(this);
                                return;
                            }
                        });
                    });
                }
            };
            /**
             * 添加并播放动画
             * @param aniArr 动画图集
             * @param aniCacheName 动画模板
             * @param interval 帧间隔(毫秒)
             * @param pos 动画位置
             */
            MakeTeaHomeLayer.prototype.addAnimation = function (aniArr, aniCacheName, interval, pos) {
                if (this.getChildByName(aniCacheName)) {
                    return this.getChildByName(aniCacheName);
                }
                else {
                    var ani = new Animation();
                    ani.loadImages(aniArr, aniCacheName);
                    // ani.on(Laya.Event.COMPLETE,this,function():void{
                    // });
                    ani.interval = interval;
                    ani.play();
                    this.addChild(ani);
                    ani.pos(pos.x, pos.y);
                    return ani;
                }
            };
            /**
             * 填充并返回动画图集数组
             * @param prefix 图集前缀
             * @param urlRange 图集数量范围
             */
            MakeTeaHomeLayer.prototype.getAniUrlArr = function (prefix, urlRange) {
                var arr = new Array();
                var i;
                for (i = 1; i <= urlRange; i++) {
                    arr.push(prefix + i + ".png");
                    // console.log(prefix+i+".png");
                }
                return arr;
            };
            /** 温度计动画起始帧数 */
            MakeTeaHomeLayer.index = 0;
            /** 玄天符状态 */
            MakeTeaHomeLayer.xtfStatus = 0;
            return MakeTeaHomeLayer;
        }(BaseView));
        makeRoom.MakeTeaHomeLayer = MakeTeaHomeLayer;
    })(makeRoom = views.makeRoom || (views.makeRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=MakeTeaHomeLayer.js.map
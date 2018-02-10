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
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;
            var Event = laya.events.Event;
            var GlowFilter = laya.filters.GlowFilter;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var PotIntensifyDialogUI = ui.gameUI.pot.PotIntensifyDialogUI;
            /**
             * 炒锅强化
             */
            var IntensifyPotView = /** @class */ (function (_super) {
                __extends(IntensifyPotView, _super);
                function IntensifyPotView() {
                    var _this = _super.call(this) || this;
                    /** 当前选中的 Tab 选项卡的名称 */
                    _this.curSelectedTabName = "metal";
                    // 图片路径
                    _this.imgPath = "gameUI/pot/";
                    //图片后缀名
                    _this.imgSuffix = ".png";
                    _this.cacheAs = "bitmap";
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.glowFilter = new GlowFilter("#FFE553", 10, 0, 0);
                    ////////// =>
                    _this.bgUI = new BaseBorderUI();
                    _this.bgUI.bgImg.size(700, 500);
                    _this.bgUI.size(700, 500);
                    _this.bgUI.addChild(_this);
                    _this.y = 10;
                    _this.bgUI.titleImg.skin = "gameUI/common/icon/potIntensifyName.png";
                    _this.bgUI.titleImg.x = _this.width - _this.bgUI.titleImg.width >> 1;
                    _this.bgUI.titleImg.y += 3;
                    _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (700 - 600) / 600;
                    var hRate = (500 - 400) / 400;
                    _this.bgUI.closeBtn.x += _this.bgUI.closeBtn.x * wRate;
                    _this.bgUI.closeBtn.y += _this.bgUI.closeBtn.y * hRate;
                    _this.bgUI.closeBtn.scale(1.5, 1.5);
                    // this.bgUI.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
                    ////////// <=
                    _this.showMetal();
                    _this.strength.on(Event.CLICK, _this, _this.showUpGrade);
                    _this.strength.on(Event.MOUSE_OVER, _this, _this.setGlowFilter);
                    _this.strength.on(Event.MOUSE_OUT, _this, _this.resetFilter);
                    _this.metal.on(Event.CLICK, _this, _this.showMetal);
                    _this.wood.on(Event.CLICK, _this, _this.showWood);
                    _this.water.on(Event.CLICK, _this, _this.showWater);
                    _this.fire.on(Event.CLICK, _this, _this.showFire);
                    _this.earth.on(Event.CLICK, _this, _this.showEarth);
                    _this.way.on(Event.CLICK, _this, _this.showWay);
                    return _this;
                }
                IntensifyPotView.prototype.showUpGrade = function () {
                    this.curOverTabName = "upgrade";
                    IntensifyPotCtrl.getInstance().request_getUPDate();
                };
                IntensifyPotView.prototype.showMetal = function () {
                    this.curSelectedTabName = "metal";
                    this.setSelectState(this.metal);
                };
                IntensifyPotView.prototype.showWood = function () {
                    this.curSelectedTabName = "wood";
                    this.setSelectState(this.wood);
                };
                IntensifyPotView.prototype.showWater = function () {
                    this.curSelectedTabName = "water";
                    this.setSelectState(this.water);
                };
                IntensifyPotView.prototype.showFire = function () {
                    this.curSelectedTabName = "fire";
                    this.setSelectState(this.fire);
                };
                IntensifyPotView.prototype.showEarth = function () {
                    this.curSelectedTabName = "earth";
                    this.setSelectState(this.earth);
                };
                IntensifyPotView.prototype.showWay = function () {
                    this.curSelectedTabName = "way";
                    this.setSelectState(this.way);
                };
                /**
                 * 设置当前所选锅位名称的状态
                 * @param curTitleImg 当前选择的锅位名称
                 */
                IntensifyPotView.prototype.setSelectState = function (curTitleImg) {
                    // 左侧偏移量
                    var leftNum = this.posBg.width - curTitleImg.width >> 1;
                    // 上部偏移量
                    var topNum = this.posBg.height - curTitleImg.height >> 1;
                    this.posBg.x = curTitleImg.x - leftNum;
                    this.posBg.y = curTitleImg.y - topNum;
                };
                IntensifyPotView.prototype.showBuy2 = function () {
                    this.curOverTabName = "btn_buy2";
                    IntensifyPotCtrl.getInstance().request_getUPDate();
                };
                IntensifyPotView.prototype.showBuy3 = function () {
                    this.curOverTabName = "btn_buy3";
                    IntensifyPotCtrl.getInstance().request_getUPDate();
                };
                /** 显示顶部导航栏文字 */
                IntensifyPotView.prototype.fillUpData = function (potArr) {
                    if (!potArr)
                        return;
                    var i;
                    var len = potArr.length; //显示炒锅的数量
                    var potGridVO; //每个炒锅对象
                    var potsArr = new Array();
                    switch (len) {
                        case 1:
                            this.metal.skin = this.imgPath + "font_1" + this.imgSuffix;
                            break;
                        case 2:
                            this.metal.skin = this.imgPath + "font_1" + this.imgSuffix;
                            this.wood.skin = this.imgPath + "font_2" + this.imgSuffix;
                            break;
                        case 3:
                            this.metal.skin = this.imgPath + "font_1" + this.imgSuffix;
                            this.wood.skin = this.imgPath + "font_2" + this.imgSuffix;
                            this.water.skin = this.imgPath + "font_3" + this.imgSuffix;
                            break;
                        case 4:
                            this.metal.skin = this.imgPath + "font_1" + this.imgSuffix;
                            this.wood.skin = this.imgPath + "font_2" + this.imgSuffix;
                            this.water.skin = this.imgPath + "font_3" + this.imgSuffix;
                            this.fire.skin = this.imgPath + "font_4" + this.imgSuffix;
                            break;
                        case 5:
                            this.metal.skin = this.imgPath + "font_1" + this.imgSuffix;
                            this.wood.skin = this.imgPath + "font_2" + this.imgSuffix;
                            this.water.skin = this.imgPath + "font_3" + this.imgSuffix;
                            this.fire.skin = this.imgPath + "font_4" + this.imgSuffix;
                            this.earth.skin = this.imgPath + "font_5" + this.imgSuffix;
                            break;
                        case 6:
                            this.metal.skin = this.imgPath + "font_1" + this.imgSuffix;
                            this.wood.skin = this.imgPath + "font_2" + this.imgSuffix;
                            this.water.skin = this.imgPath + "font_3" + this.imgSuffix;
                            this.fire.skin = this.imgPath + "font_4" + this.imgSuffix;
                            this.earth.skin = this.imgPath + "font_5" + this.imgSuffix;
                            this.way.skin = this.imgPath + "font_6" + this.imgSuffix;
                            break;
                    }
                    /** 显示锅的图片 */
                    // for (i = 0; i <=len; i++)
                    // {
                    if (this.curSelectedTabName == "metal") {
                        potGridVO = potArr[0];
                        this.showPotImg(potGridVO);
                    }
                    else if (this.curSelectedTabName == "wood") {
                        potGridVO = potArr[1];
                        this.showPotImg(potGridVO);
                    }
                    else if (this.curSelectedTabName == "water") {
                        potGridVO = potArr[2];
                        this.showPotImg(potGridVO);
                    }
                    else if (this.curSelectedTabName == "fire") {
                        potGridVO = potArr[3];
                        this.showPotImg(potGridVO);
                    }
                    else if (this.curSelectedTabName == "earth") {
                        potGridVO = potArr[4];
                        this.showPotImg(potGridVO);
                    }
                    else if (this.curSelectedTabName == "way") {
                        potGridVO = potArr[5];
                        this.showPotImg(potGridVO);
                    }
                    // }
                };
                /** 显示相应的锅和相应的锅的信息 */
                IntensifyPotView.prototype.showPotImg = function (potGridVO) {
                    if (!potGridVO)
                        return;
                    // 炒锅等级 >4 级才可强化
                    if (potGridVO.level > 4)
                        this.strength.disabled = false;
                    else
                        this.strength.disabled = true;
                    switch (potGridVO.level) {
                        case 1:
                            this.pot1.skin = this.imgPath + "pot_1" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_1" + this.imgSuffix;
                            this.potName1.text = "生铁锅";
                            this.potName2.text = "生铁锅";
                            this.potLevel1.text = potGridVO.needMoney + "";
                            this.potLevel2.text = potGridVO.needMoney + "";
                            this.showDetail(potGridVO);
                            IntensifyPotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 2:
                            this.pot1.skin = this.imgPath + "pot_2" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_2" + this.imgSuffix;
                            this.potName1.text = "铜锅";
                            this.potName2.text = "铜锅";
                            this.potLevel1.text = potGridVO.needMoney + "";
                            this.potLevel2.text = potGridVO.needMoney + "";
                            this.showDetail(potGridVO);
                            IntensifyPotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 3:
                            this.pot1.skin = this.imgPath + "pot_3" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_3" + this.imgSuffix;
                            this.potName1.text = "金锅";
                            this.potName2.text = "金锅";
                            this.potLevel1.text = potGridVO.needMoney + "";
                            this.potLevel2.text = potGridVO.needMoney + "";
                            this.showDetail(potGridVO);
                            IntensifyPotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 4:
                            this.pot1.skin = this.imgPath + "pot_4" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_4" + this.imgSuffix;
                            this.potName1.text = "玄铁锅";
                            this.potName2.text = "玄铁锅";
                            this.potLevel1.text = potGridVO.needMoney + "";
                            this.potLevel2.text = potGridVO.needMoney + 1 + "";
                            this.friedTeaTime1.text = "20%";
                            this.friedTeaTime2.text = "25%";
                            this.friedTeaLevel1.text = "三品茶叶,二品茶叶,一品茶叶,精品茶叶";
                            this.friedTeaLevel2.text = "三品茶叶,二品茶叶,一品茶叶,精品茶叶";
                            this.centerShow.text = "强化所需材料";
                            IntensifyPotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 5:
                            this.pot1.skin = this.imgPath + "pot_5" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_5" + this.imgSuffix;
                            this.potName1.text = "寒铁锅";
                            this.potName2.text = "寒铁锅";
                            this.potLevel1.text = potGridVO.needMoney + "";
                            this.potLevel2.text = potGridVO.needMoney + 1 + "";
                            this.friedTeaTime1.text = "0%";
                            this.friedTeaTime2.text = "10%";
                            this.friedTeaLevel1.text = "三品";
                            this.friedTeaLevel2.text = "三品茶叶,二品茶叶,一品茶叶";
                            this.centerShow.text = "强化所需材料";
                            IntensifyPotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                    }
                };
                IntensifyPotView.prototype.addUpDate = function (potsArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    var potVO = new models.base.PotVO();
                    potVO = potsArr[0];
                    var potId = potVO.potId;
                    var potLvl = potVO.potLvl;
                    console.log("强化部分获取的数据：" + JSON.stringify(potsArr));
                    if (!potsArr || !potsArr.length)
                        return;
                    // 点击相应的导航栏，显示相应的锅的信息
                    if (this.curSelectedTabName == "metal") {
                        this.showData(potsArr, potId, potLvl);
                        // 点击强化按钮之后的相应操作
                        if (this.curOverTabName == "strength") {
                            this.startUpGrade(potsArr, potId, potLvl);
                        }
                        // 点击购买材料之后的相应变化
                        if (this.curOverTabName == "btn_buy2") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "wood") {
                        this.showData(potsArr, potId, potLvl);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, potId, potLvl);
                        }
                        if (this.curOverTabName == "btn_buy2") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "water") {
                        this.showData(potsArr, potId, potLvl);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, potId, potLvl);
                        }
                        if (this.curOverTabName == "btn_buy2") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "fire") {
                        this.showData(potsArr, potId, potLvl);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, potId, potLvl);
                        }
                        if (this.curOverTabName == "btn_buy2") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "earth") {
                        this.showData(potsArr, potId, potLvl);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, potId, potLvl);
                        }
                        if (this.curOverTabName == "btn_buy2") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "way") {
                        this.showData(potsArr, potId, potLvl);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, potId, potLvl);
                        }
                        if (this.curOverTabName == "btn_buy2") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            IntensifyPotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                };
                // 判断升级材料需要或缺失按钮的显隐
                IntensifyPotView.prototype.showData = function (dataArr, id, level) {
                    var tipLimitUI = new ui.gameUI.tips.LimitTipUI();
                    if (level == 1 || level == 2 || level == 3) {
                        this.gridContainer.addChild(tipLimitUI);
                    }
                    else if (level == 4 || level == 5 || level == 6) {
                        this.showInitCenter(dataArr, id, level);
                    }
                };
                IntensifyPotView.prototype.setGlowFilter = function () {
                    this.strength.filters = [this.glowFilter];
                };
                IntensifyPotView.prototype.resetFilter = function () {
                    this.strength.filters = [];
                };
                /** 判断升级每个升级炒锅升级材料是否缺失 */
                IntensifyPotView.prototype.startUpGrade = function (potsArr, id, level) {
                    if (!potsArr || !potsArr.length)
                        return;
                    if (level < 4) {
                        TipLayerManager.tipLayer.showDrawBgTip("炒锅等级不足，请升级炒锅等级");
                    }
                    else {
                        if (parseInt(potsArr[0].lockMoney) > 0 || parseInt(potsArr[1].lockToolNums) > 0 || parseInt(potsArr[2].lockToolNums) > 0) {
                            TipLayerManager.tipLayer.showDrawBgTip("强化材料不足，请购买强化超过所需要的材料");
                            console.log("+++++++已经打印材料不足提示");
                        }
                        else if (parseInt(potsArr[0].lockMoney) <= 0 && parseInt(potsArr[1].lockToolNums) <= 0 && parseInt(potsArr[2].lockToolNums) <= 0) {
                            IntensifyPotCtrl.getInstance().request_FinishData(id);
                        }
                    }
                };
                /** 炒锅强化完成后的状态更新 */
                IntensifyPotView.prototype.finishUpGrade = function (potsArr) {
                    if (!potsArr || !potsArr.length)
                        return;
                    var potVO;
                    var len = potsArr.length;
                    var j;
                    for (j = 0; j < len; j++) {
                        potVO = potsArr[j];
                        if (!potVO || potVO == undefined)
                            return;
                        models.player.PlayerInfoModel.playerInfo.money += potVO.needMoney;
                    }
                };
                // 初始化炒锅强化需要材料的中部信息显隐
                IntensifyPotView.prototype.showInitCenter = function (potsArr, id, level) {
                    var potVO;
                    var len = potsArr.length;
                    var i;
                    var grideView = new ui.gameUI.pot.PotIntensifyGrideUI();
                    grideView.iron1.visible = true;
                    for (i = 0; i < len; i++) {
                        potVO = potsArr[i];
                        if (!potVO || potVO == undefined)
                            return;
                        if (potVO.needMoney)
                            grideView.need1.text = potVO.needMoney.toString();
                        if (potVO.lockMoney)
                            grideView.lock1.text = potVO.lockMoney;
                        if (parseInt(grideView.lock1.text) > 0) {
                            grideView.t_lock1.visible = true;
                            grideView.lock1.visible = true;
                        }
                        else {
                            grideView.t_lock1.visible = false;
                            grideView.lock1.visible = false;
                        }
                        if (potVO.toolId == 51001) {
                            grideView.need3.text = potVO.toolNums;
                            grideView.lock3.text = potVO.lockToolNums;
                            grideView.iron3.skin = this.imgPath + "book" + this.imgSuffix;
                            if (parseInt(grideView.lock3.text) > 0) {
                                grideView.t_lock3.visible = true;
                                grideView.lock3.visible = true;
                                grideView.btn_buy3.visible = true;
                            }
                            else {
                                grideView.t_lock3.visible = false;
                                grideView.lock3.visible = false;
                                grideView.btn_buy3.visible = false;
                            }
                        }
                        if (potVO.toolId == 51002) {
                            grideView.need2.text = potVO.toolNums;
                            grideView.lock2.text = potVO.lockToolNums;
                            if (parseInt(grideView.lock2.text) > 0) {
                                grideView.t_lock2.visible = true;
                                grideView.lock2.visible = true;
                                grideView.btn_buy2.visible = true;
                            }
                            else {
                                grideView.t_lock2.visible = false;
                                grideView.lock2.visible = false;
                                grideView.btn_buy2.visible = false;
                            }
                        }
                        if (potVO.toolId == 51003) {
                            grideView.need3.text = potVO.toolNums;
                            grideView.lock3.text = potVO.lockToolNums;
                            grideView.iron3.skin = this.imgPath + "copper" + this.imgSuffix;
                            if (parseInt(grideView.lock3.text) > 0) {
                                grideView.t_lock3.visible = true;
                                grideView.lock3.visible = true;
                                grideView.btn_buy3.visible = true;
                            }
                            else {
                                grideView.t_lock3.visible = false;
                                grideView.lock3.visible = false;
                                grideView.btn_buy3.visible = false;
                            }
                        }
                        if (potVO.toolId == 51004) {
                            grideView.need2.text = potVO.toolNums;
                            grideView.lock2.text = potVO.lockToolNums;
                            grideView.iron2.skin = this.imgPath + "glodIron" + this.imgSuffix;
                            if (parseInt(grideView.lock2.text) > 0) {
                                grideView.t_lock2.visible = true;
                                grideView.lock2.visible = true;
                                grideView.btn_buy2.visible = true;
                            }
                            else {
                                grideView.t_lock2.visible = false;
                                grideView.lock2.visible = false;
                                grideView.btn_buy2.visible = false;
                            }
                        }
                        if (potVO.toolId == 51005) {
                            grideView.need2.text = potVO.toolNums;
                            grideView.lock2.text = potVO.lockToolNums;
                            grideView.iron2.skin = this.imgPath + "mdash" + this.imgSuffix;
                            if (parseInt(grideView.lock2.text) > 0) {
                                grideView.t_lock2.visible = true;
                                grideView.lock2.visible = true;
                                grideView.btn_buy2.visible = true;
                            }
                            else {
                                grideView.t_lock2.visible = false;
                                grideView.lock2.visible = false;
                                grideView.btn_buy2.visible = false;
                            }
                        }
                    }
                    grideView.btn_buy2.on(Event.CLICK, this, this.showBuy2);
                    grideView.btn_buy3.on(Event.CLICK, this, this.showBuy3);
                    this.gridContainer.addChild(grideView);
                };
                IntensifyPotView.prototype.showDetail = function (potGridVO) {
                    if (potGridVO.level == 1 || potGridVO.level == 2 || potGridVO.level == 3) {
                        this.centerShow.text = "炒锅等级不足";
                        this.friedTeaTime1.text = "0%";
                        this.friedTeaTime2.text = "0%";
                        if (potGridVO.needMoney == 0) {
                            this.friedTeaLevel1.text = "三品";
                            this.friedTeaLevel2.text = "三品";
                        }
                        else if (potGridVO.needMoney == 1) {
                            this.friedTeaLevel1.text = "三品茶叶,二品茶叶,一品茶叶";
                            this.friedTeaLevel2.text = "三品茶叶,二品茶叶,一品茶叶";
                        }
                    }
                };
                return IntensifyPotView;
            }(PotIntensifyDialogUI));
            pot.IntensifyPotView = IntensifyPotView;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=IntensifyPotView.js.map
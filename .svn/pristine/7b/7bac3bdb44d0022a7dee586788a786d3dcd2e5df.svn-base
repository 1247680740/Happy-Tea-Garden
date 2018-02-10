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
            var UpGradePotCtrl = controllers.friedRoom.pot.UpGradePotCtrl;
            var Event = laya.events.Event;
            var GlowFilter = laya.filters.GlowFilter;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var UpGradePotDialogUI = ui.gameUI.pot.UpGradePotDialogUI;
            /**
             * 炒锅升级
             */
            var UpGradePotView = /** @class */ (function (_super) {
                __extends(UpGradePotView, _super);
                function UpGradePotView() {
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
                    _this.y = 5;
                    _this.bgUI.titleImg.skin = "gameUI/common/icon/potUpgradeName.png";
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
                    _this.upgrade.on(Event.CLICK, _this, _this.showUpGrade);
                    _this.upgrade.on(Event.MOUSE_OVER, _this, _this.setGlowFilter);
                    _this.upgrade.on(Event.MOUSE_OUT, _this, _this.resetFilter);
                    _this.metal.on(Event.CLICK, _this, _this.showMetal);
                    _this.wood.on(Event.CLICK, _this, _this.showWood);
                    _this.water.on(Event.CLICK, _this, _this.showWater);
                    _this.fire.on(Event.CLICK, _this, _this.showFire);
                    _this.earth.on(Event.CLICK, _this, _this.showEarth);
                    _this.way.on(Event.CLICK, _this, _this.showWay);
                    return _this;
                    // this.tipview.okBtn.on(Event.CLICK,this,this.showTip);
                }
                UpGradePotView.prototype.showUpGrade = function () {
                    this.curOverTabName = "upgrade";
                    UpGradePotCtrl.getInstance().request_getUPDate();
                    this.bgUI.removeSelf();
                };
                // showTip():void{
                //     this.curOverTabName="okBtn";
                // }
                UpGradePotView.prototype.showMetal = function () {
                    this.curSelectedTabName = "metal";
                    this.setSelectState(this.metal);
                };
                UpGradePotView.prototype.showWood = function () {
                    this.curSelectedTabName = "wood";
                    this.setSelectState(this.wood);
                };
                UpGradePotView.prototype.showWater = function () {
                    this.curSelectedTabName = "water";
                    this.setSelectState(this.water);
                };
                UpGradePotView.prototype.showFire = function () {
                    this.curSelectedTabName = "fire";
                    this.setSelectState(this.fire);
                };
                UpGradePotView.prototype.showEarth = function () {
                    this.curSelectedTabName = "earth";
                    this.setSelectState(this.earth);
                };
                UpGradePotView.prototype.showWay = function () {
                    this.curSelectedTabName = "way";
                    this.setSelectState(this.way);
                };
                /**
                 * 设置当前所选锅位名称的状态
                 * @param curTitleImg 当前选择的锅位名称
                 */
                UpGradePotView.prototype.setSelectState = function (curTitleImg) {
                    // 左侧偏移量
                    var leftNum = this.posBg.width - curTitleImg.width >> 1;
                    // 上部偏移量
                    var topNum = this.posBg.height - curTitleImg.height >> 1;
                    this.posBg.x = curTitleImg.x - leftNum;
                    this.posBg.y = curTitleImg.y - topNum;
                };
                UpGradePotView.prototype.showBuy2 = function () {
                    this.curOverTabName = "btn_buy2";
                    UpGradePotCtrl.getInstance().request_getUPDate();
                };
                UpGradePotView.prototype.showBuy3 = function () {
                    this.curOverTabName = "btn_buy3";
                    UpGradePotCtrl.getInstance().request_getUPDate();
                };
                UpGradePotView.prototype.showBuy4 = function () {
                    this.curOverTabName = "btn_buy4";
                    UpGradePotCtrl.getInstance().request_getUPDate();
                };
                UpGradePotView.prototype.fillUpData = function (potArr) {
                    if (!potArr)
                        return;
                    var i;
                    var len = potArr.length; //显示炒锅的数量
                    var potGridVO; //每个炒锅对象
                    var potsArr = new Array();
                    switch (len) {
                        case 1:
                            this.setPotPosName(true, false, false, false, false, false);
                            break;
                        case 2:
                            this.setPotPosName(true, false, true, false, false, false);
                            break;
                        case 3:
                            this.setPotPosName(true, true, true, false, false, false);
                            break;
                        case 4:
                            this.setPotPosName(true, true, true, true, false, false);
                            break;
                        case 5:
                            this.setPotPosName(true, true, true, true, true, false);
                            break;
                        case 6:
                            this.setPotPosName(true, true, true, true, true, true);
                            break;
                    }
                    for (i = 0; i <= len; i++) {
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
                    }
                };
                /**
                 * 设置炒锅位置的名称是否显示
                 */
                UpGradePotView.prototype.setPotPosName = function (f1, f2, f3, f4, f5, f6) {
                    this.metal.visible = f1;
                    this.wood.visible = f2;
                    this.water.visible = f3;
                    this.fire.visible = f4;
                    this.earth.visible = f5;
                    this.way.visible = f6;
                };
                UpGradePotView.prototype.showPotImg = function (potGridVO) {
                    switch (potGridVO.level) {
                        case 1:
                            this.pot1.skin = this.imgPath + "pot_1" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_2" + this.imgSuffix;
                            this.potName1.text = "生铁锅";
                            this.potName2.text = "铜锅";
                            this.potLevel1.text = "1";
                            this.potLevel2.text = "2";
                            this.friedTeaNums1.text = "5";
                            this.friedTeaNums2.text = "10";
                            this.friedTeaTopLevel1.text = "20";
                            this.friedTeaTopLevel2.text = "30";
                            UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 2:
                            this.pot1.skin = this.imgPath + "pot_2" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_3" + this.imgSuffix;
                            this.potName1.text = "铜锅";
                            this.potName2.text = "金锅";
                            this.potLevel1.text = "2";
                            this.potLevel2.text = "3";
                            this.friedTeaNums1.text = "10";
                            this.friedTeaNums2.text = "15";
                            this.friedTeaTopLevel1.text = "30";
                            this.friedTeaTopLevel2.text = "40";
                            UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 3:
                            this.pot1.skin = this.imgPath + "pot_3" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_4" + this.imgSuffix;
                            this.potName1.text = "金锅";
                            this.potName2.text = "玄铁锅";
                            this.potLevel1.text = "3";
                            this.potLevel2.text = "4";
                            this.friedTeaNums1.text = "15";
                            this.friedTeaNums2.text = "20";
                            this.friedTeaTopLevel1.text = "40";
                            this.friedTeaTopLevel2.text = "50";
                            UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 4:
                            this.pot1.skin = this.imgPath + "pot_4" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_5" + this.imgSuffix;
                            this.potName1.text = "玄铁锅";
                            this.potName2.text = "寒铁锅";
                            this.potLevel1.text = "4";
                            this.potLevel2.text = "5";
                            this.friedTeaNums1.text = "20";
                            this.friedTeaNums2.text = "25";
                            this.friedTeaTopLevel1.text = "50";
                            this.friedTeaTopLevel2.text = "60";
                            UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                        case 5:
                            this.pot1.skin = this.imgPath + "pot_5" + this.imgSuffix;
                            this.pot2.skin = this.imgPath + "pot_6" + this.imgSuffix;
                            this.potName1.text = "寒铁锅";
                            this.potName2.text = "精钢锅";
                            this.potLevel1.text = "5";
                            this.potLevel2.text = "6";
                            this.friedTeaNums1.text = "25";
                            this.friedTeaNums2.text = "30";
                            this.friedTeaTopLevel1.text = "60";
                            this.friedTeaTopLevel2.text = "70";
                            UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                            break;
                    }
                };
                UpGradePotView.prototype.addUpDate = function (potsArr, takeData) {
                    var id = takeData.hi;
                    var level = takeData.hl;
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!potsArr || !potsArr.length)
                        return;
                    if (this.curSelectedTabName == "metal") {
                        this.showData(potsArr, id, level);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, id);
                        }
                        if (this.curOverTabName == "btn_buy2") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy4") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "wood") {
                        this.showData(potsArr, id, level);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, id);
                        }
                        if (this.curOverTabName == "btn_buy1") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy2") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy4") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "water") {
                        this.showData(potsArr, id, level);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, id);
                        }
                        if (this.curOverTabName == "btn_buy1") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy2") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy4") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "fire") {
                        this.showData(potsArr, id, level);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, id);
                        }
                        if (this.curOverTabName == "btn_buy1") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy2") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy4") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "earth") {
                        this.showData(potsArr, id, level);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, id);
                        }
                        if (this.curOverTabName == "btn_buy1") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy2") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy4") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                    else if (this.curSelectedTabName == "way") {
                        this.showData(potsArr, id, level);
                        if (this.curOverTabName == "upgrade") {
                            this.startUpGrade(potsArr, id);
                        }
                        if (this.curOverTabName == "btn_buy1") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy2") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy3") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                        else if (this.curOverTabName == "btn_buy4") {
                            UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                        }
                    }
                };
                /**
                 * 判断升级材料需要或缺失按钮的显隐
                 */
                UpGradePotView.prototype.showData = function (dataArr, id, level) {
                    this.showInitCenter(dataArr, id, level);
                };
                UpGradePotView.prototype.setGlowFilter = function () {
                    this.upgrade.filters = [this.glowFilter];
                };
                UpGradePotView.prototype.resetFilter = function () {
                    this.upgrade.filters = [];
                };
                /** 判断升级每个升级炒锅升级材料是否缺失 */
                UpGradePotView.prototype.startUpGrade = function (potsArr, id) {
                    //  console.log("+++++++++++++++当前数据数组对象:"+JSON.stringify(potsArr));
                    if (!potsArr || !potsArr.length)
                        return;
                    if (parseInt(potsArr[0].lockMoney) > 0 || parseInt(potsArr[1].lockToolNums) > 0 || parseInt(potsArr[2].lockToolNums) > 0 || parseInt(potsArr[3].lockToolNums) > 0) {
                        TipLayerManager.tipLayer.showDrawBgTip("升级材料不足，请购买升级炒锅所需的材料（金币数量也要满足哦）");
                        console.log("+++++++已经打印材料不足提示");
                    }
                    else if (parseInt(potsArr[0].lockMoney) <= 0 && parseInt(potsArr[1].lockToolNums) <= 0 && parseInt(potsArr[2].lockToolNums) <= 0 && parseInt(potsArr[3].lockToolNums) <= 0) {
                        UpGradePotCtrl.getInstance().request_FinishData(id);
                    }
                };
                /**
                 * 炒锅升级成功后
                 */
                UpGradePotView.prototype.finishUpGrade = function (obj) {
                    if (!obj)
                        return;
                    var curPotVO = obj["potVO"];
                    controllers.friedRoom.pot.PotCtrl.friedPotView.updatePotGrid2(curPotVO);
                };
                /**
                 * 升级所需素材（中间显示部分）
                 */
                UpGradePotView.prototype.showInitCenter = function (potsArr, id, level) {
                    var potVO;
                    var len = potsArr.length;
                    var i;
                    var grideView = new ui.gameUI.pot.UpGradePotGrideUI();
                    grideView.money.visible = true;
                    grideView.book.visible = true;
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
                            grideView.need3.text = potVO.toolNums;
                            grideView.lock3.text = potVO.lockToolNums;
                            grideView.iron3.skin = this.imgPath + "mineral" + this.imgSuffix;
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
                        if (potVO.toolId == 51005) {
                            grideView.need3.text = potVO.toolNums;
                            grideView.lock3.text = potVO.lockToolNums;
                            grideView.iron3.skin = this.imgPath + "mdash" + this.imgSuffix;
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
                        if (potVO.toolId == 51007) {
                            grideView.need4.text = potVO.toolNums;
                            grideView.lock4.text = potVO.lockToolNums;
                            grideView.iron4.skin = this.imgPath + "agate" + this.imgSuffix;
                            if (parseInt(grideView.lock4.text) > 0) {
                                grideView.t_lock4.visible = true;
                                grideView.lock4.visible = true;
                                grideView.btn_buy4.visible = true;
                            }
                            else {
                                grideView.t_lock4.visible = false;
                                grideView.lock4.visible = false;
                                grideView.btn_buy4.visible = false;
                            }
                        }
                        if (potVO.toolId == 51010) {
                            grideView.need4.text = potVO.toolNums;
                            grideView.lock4.text = potVO.lockToolNums;
                            grideView.iron4.skin = this.imgPath + "redIron" + this.imgSuffix;
                            if (parseInt(grideView.lock4.text) > 0) {
                                grideView.t_lock4.visible = true;
                                grideView.lock4.visible = true;
                                grideView.btn_buy4.visible = true;
                            }
                            else {
                                grideView.t_lock4.visible = false;
                                grideView.lock4.visible = false;
                                grideView.btn_buy4.visible = false;
                            }
                        }
                        if (potVO.toolId == 51011) {
                            grideView.need4.text = potVO.toolNums;
                            grideView.lock4.text = potVO.lockToolNums;
                            grideView.iron4.skin = this.imgPath + "kallaite" + this.imgSuffix;
                            if (parseInt(grideView.lock4.text) > 0) {
                                grideView.t_lock4.visible = true;
                                grideView.lock4.visible = true;
                                grideView.btn_buy4.visible = true;
                            }
                            else {
                                grideView.t_lock4.visible = false;
                                grideView.lock4.visible = false;
                                grideView.btn_buy4.visible = false;
                            }
                        }
                        if (potVO.toolId == 51012) {
                            grideView.need4.text = potVO.toolNums;
                            grideView.lock4.text = potVO.lockToolNums;
                            grideView.iron4.skin = this.imgPath + "emerald" + this.imgSuffix;
                            if (parseInt(grideView.lock4.text) > 0) {
                                grideView.t_lock4.visible = true;
                                grideView.lock4.visible = true;
                                grideView.btn_buy4.visible = true;
                            }
                            else {
                                grideView.t_lock4.visible = false;
                                grideView.lock4.visible = false;
                                grideView.btn_buy4.visible = false;
                            }
                        }
                        if (potVO.toolId == 51013) {
                            grideView.need3.text = potVO.toolNums;
                            grideView.lock3.text = potVO.lockToolNums;
                            grideView.iron3.skin = this.imgPath + "coldIron" + this.imgSuffix;
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
                    }
                    grideView.btn_buy2.on(Event.CLICK, this, this.showBuy2);
                    grideView.btn_buy3.on(Event.CLICK, this, this.showBuy3);
                    grideView.btn_buy4.on(Event.CLICK, this, this.showBuy4);
                    this.gridContainer.addChild(grideView);
                };
                return UpGradePotView;
            }(UpGradePotDialogUI));
            pot.UpGradePotView = UpGradePotView;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=UpGradePotView.js.map
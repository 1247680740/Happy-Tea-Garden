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
            var Event = laya.events.Event;
            var FriedTeaDialogCtrl = controllers.friedRoom.pot.FriedTeaDialogCtrl;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var FriedTeaDialogUI = ui.gameUI.pot.FriedTeaDialogUI;
            var FriedDialogGridLeftUI = ui.gameUI.pot.FriedDialogGridLeftUI;
            /**
             * 炒茶面板
             */
            var FriedTeaDialogView = /** @class */ (function (_super) {
                __extends(FriedTeaDialogView, _super);
                function FriedTeaDialogView() {
                    var _this = _super.call(this) || this;
                    /**
                     * 左侧 Tab 栏的所有项
                     */
                    _this.tabArr = [_this.tab1, _this.tab2, _this.tab3, _this.tab4, _this.tab5, _this.tab6, _this.tab7, _this.tab8, _this.tab9];
                    /** 炒茶的总量 */
                    _this.yieldNums = 0;
                    /**
                     * 与 gridItemsArr 配合使用，默认为8）
                     */
                    _this.gridItemIndex = 8;
                    _this.cacheAs = "bitmap";
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.teaNums.restrict = "0-9";
                    _this.teaNums.text = "1"; //默认是1
                    ////////// =>
                    _this.bgUI = new BaseBorderUI();
                    _this.bgUI.bgImg.size(800, 500);
                    _this.bgUI.size(800, 500);
                    _this.bgUI.addChild(_this);
                    _this.y = 10;
                    _this.bgUI.titleImg.skin = "gameUI/common/icon/fireTeaName.png";
                    _this.bgUI.titleImg.x = _this.width - _this.bgUI.titleImg.width >> 1;
                    _this.bgUI.titleImg.y += 3;
                    _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (800 - 600) / 600;
                    var hRate = (500 - 400) / 400;
                    _this.bgUI.closeBtn.x += _this.bgUI.closeBtn.x * wRate;
                    _this.bgUI.closeBtn.y += _this.bgUI.closeBtn.y * hRate;
                    _this.bgUI.closeBtn.scale(1.5, 1.5);
                    _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    ////////// <=
                    _this.gridItemsArr = [];
                    _this.selectTab(_this.tab1);
                    for (var i = 1; i < 10; i++) {
                        _this.getChildByName("tab" + i).on(Event.CLICK, _this, _this.setStatus);
                    }
                    _this.numBtn_add.on(Event.CLICK, _this, _this.addOneBtnFn);
                    _this.numBtn_sub.on(Event.CLICK, _this, _this.reduceOneBtnFn);
                    _this.btn_direction_top.on(Event.CLICK, _this, _this.direction_top);
                    _this.btn_direction_down.on(Event.CLICK, _this, _this.direction_down);
                    _this.btn_affirm.on(Event.CLICK, _this, _this.closeBtnFn);
                    // this.btn_close.on(Event.CLICK,this,this.closeBtnFn);
                    _this.btn_cancel.on(Event.CLICK, _this, _this.closeBtnFn);
                    _this.teaNums.on(Event.INPUT, _this, _this.saleNumsInputOverFn);
                    _this.teaNums.on(Event.BLUR, _this, _this.saleNumsInputOverFn);
                    return _this;
                }
                /**
                 * 左侧选项卡的切换
                 */
                FriedTeaDialogView.prototype.setStatus = function (event) {
                    var i;
                    var len = this.tabArr.length;
                    var tempBox;
                    this.curSelectedTabName = event.target.name;
                    var eventBox = this.getChildByName(this.curSelectedTabName);
                    for (i = 0; i < len; i++) {
                        tempBox = this.tabArr[i];
                        if (eventBox == tempBox)
                            this.selectTab(eventBox);
                        else
                            this.unSelectTab(tempBox);
                    }
                    this.addStorageGrids([]);
                };
                FriedTeaDialogView.prototype.selectTab = function (tab) {
                    tab.getChildByName("whiteBg").visible = true;
                    tab.getChildByName("grayBg").visible = false;
                };
                FriedTeaDialogView.prototype.unSelectTab = function (tab) {
                    tab.getChildByName("whiteBg").visible = false;
                    tab.getChildByName("grayBg").visible = true;
                };
                /**
                 * 将原素材的 swf 格式转换成 png 格式
                 */
                FriedTeaDialogView.prototype.translateSwfTypeToPngType = function (swfUrl) {
                    var pngUrl;
                    if (!swfUrl)
                        return null;
                    pngUrl = swfUrl.substring(0, swfUrl.lastIndexOf("."));
                    pngUrl += ".png";
                    return pngUrl;
                };
                FriedTeaDialogView.prototype.itemClked = function (event) {
                    var gridItem;
                    var childNums = this.gridContainer.numChildren;
                    var i;
                    for (i = 0; i < childNums; i++) {
                        gridItem = this.gridContainer.getChildAt(i);
                        if (!gridItem)
                            continue;
                        gridItem.check.visible = false;
                    }
                    event.target.getChildByName("check").visible = true;
                };
                /**
                 * 填充茶叶种类格子（茶叶）
                 * @param potObj 当前所选的炒锅
                 */
                FriedTeaDialogView.prototype.addStorageGrids = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr || !voArr.length)
                        return;
                    this.initShowTea(voArr);
                };
                /** 点击左侧茶叶种类Tab后填充其下茶子项 */
                FriedTeaDialogView.prototype.initShowTea = function (voArr) {
                    var len = voArr.length;
                    var i;
                    var seedVO;
                    this.gridItemsArr = [];
                    for (i = 0; i < len; i++) {
                        seedVO = voArr[i];
                        var gridItem = new FriedDialogGridLeftUI();
                        gridItem.check.visible = false;
                        gridItem.name = (i + 1) + "";
                        // gridItem.name=seedVO.id+"";
                        gridItem.teaName.text = seedVO.Teaname + "";
                        gridItem.y = i * (gridItem.height + 5);
                        // 请求第一个茶叶的详细信息
                        if (i == 0) {
                            gridItem.check.visible = true;
                            FriedTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
                        }
                        // 最多显示8小项
                        if (i <= 7)
                            this.gridContainer.addChild(gridItem);
                        this.gridItemsArr.push(gridItem);
                        // 点击每一项请求获取详细信息
                        gridItem.on(Event.CLICK, this, this.itemClked);
                        gridItem.on(Event.CLICK, this, this.gridItemClked, [seedVO]);
                    }
                };
                FriedTeaDialogView.prototype.gridItemClked = function (seedVO) {
                    if (!seedVO)
                        return;
                    FriedTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
                };
                /**
                 * 加载右侧茶叶信息
                 * @param teaId 只获取 teaId 对应的数据
                 */
                FriedTeaDialogView.prototype.updateRightContent = function (voShowArr, teaId) {
                    if (!voShowArr || !teaId)
                        return;
                    // 当前茶叶等级，与炒锅所炒最大等级相较
                    var curTeaLvl;
                    var len = voShowArr.length;
                    var i;
                    var teaShowVO;
                    var tealeafObjArr = ResourceManager.tealeafObjArr;
                    var tempObj;
                    var len2 = tealeafObjArr.length;
                    for (i = 0; i < len2; i++) {
                        tempObj = tealeafObjArr[i];
                        if (teaId == parseInt(tempObj["id"])) {
                            curTeaLvl = parseInt(tempObj["level"]);
                            break;
                        }
                    }
                    for (i = 0; i < len; i++) {
                        teaShowVO = voShowArr[i];
                        if ((teaId == teaShowVO.id) && (teaShowVO.type == undefined)) {
                            // 炒锅等级不足图标
                            if (this.curPotVO.friedTeaMaxLvl < curTeaLvl)
                                this.potLvlNotEnough.visible = true;
                            else
                                this.potLvlNotEnough.visible = false;
                            // 小时
                            var hour = parseInt(((teaShowVO.friedTeaTime * teaShowVO.friedteanum) / (60 * 60)) + "");
                            var diff = (teaShowVO.friedTeaTime * teaShowVO.friedteanum) % (60 * 60);
                            // 分钟
                            var minute = parseInt(diff / 60 + "");
                            this.teaName_top.text = teaShowVO.Teaname + ""; //顶部茶叶名称
                            this.iconImg.skin = this.translateSwfTypeToPngType(teaShowVO.teaIcon); //茶叶图片
                            this.teaNums.text = teaShowVO.friedteanum + ""; //炒茶数量
                            this.yieldNums = teaShowVO.friedteanum;
                            this.friedTeaTime.text = hour + "小时" + minute + "分钟"; //炒茶所需时间
                            this.hireprice.text = 50 + ""; //雇用价格 默认50
                            this.costprice.text = (teaShowVO.friedteanum * teaShowVO.teaPrice + 50) + ""; //配料成本
                            this.yield.text = teaShowVO.friedteanum + ""; //加工产量
                            this.teaPirce.text = teaShowVO.teaPrice + ""; // 产品单价
                            // 获取炒茶所需材料
                            FriedTeaDialogCtrl.getInstance().itemClkedMaterial(teaShowVO.id);
                            break;
                        }
                    }
                };
                /**
                 * 加载炒茶的配置信息
                 */
                FriedTeaDialogView.prototype.loadFriedTeaSecret = function (teaShowVOArr) {
                    if (!teaShowVOArr || !teaShowVOArr.length)
                        return;
                    var len = teaShowVOArr.length;
                    var i;
                    var teaShowVO;
                    for (i = 0; i < len; i++) {
                        teaShowVO = teaShowVOArr[i];
                        switch (teaShowVO.type) {
                            case "teafruit":
                            case "othersfruit":
                                this.curBuyTeaArr = new Array();
                                this.data1.skin = this.translateSwfTypeToPngType(teaShowVO.icon);
                                this.input_teaName.text = teaShowVO.name;
                                this.input_teaNums.text = teaShowVO.seedNums + "";
                                this.input_teaLock.text = teaShowVO.lockNums + "";
                                this.curBuyTeaArr.push(teaShowVO.type);
                                this.curBuyTeaArr.push(teaShowVO.teaPrice);
                                this.curBuyTeaArr.push(teaShowVO.id);
                                this.curBuyTeaArr.push(teaShowVO.name);
                                this.curBuyTeaArr.push(teaShowVO.lockNums);
                                if (teaShowVO.lockNums > 0) {
                                    this.note.text = "当前材料不足,请凑齐后再来吧";
                                    this.btn_affirm.disabled = true;
                                    this.btn_buy1.visible = true;
                                }
                                else {
                                    this.note.text = "";
                                    this.btn_affirm.disabled = false;
                                    this.btn_buy1.visible = false;
                                }
                                break;
                            case "book":
                                this.curBuyBookArr = new Array();
                                this.data2.skin = this.translateSwfTypeToPngType(teaShowVO.icon);
                                this.input_bookName.text = teaShowVO.name;
                                this.input_bookNums.text = teaShowVO.storageNums + "";
                                this.input_bookLock.text = teaShowVO.lockNums + "";
                                this.curBuyBookArr.push(teaShowVO.type);
                                this.curBuyBookArr.push(teaShowVO.teaPrice);
                                this.curBuyBookArr.push(teaShowVO.id);
                                this.curBuyBookArr.push(teaShowVO.name);
                                this.curBuyBookArr.push(teaShowVO.lockNums);
                                if (teaShowVO.lockNums > 0) {
                                    this.note.text = "当前材料不足,请凑齐后再来吧";
                                    this.btn_affirm.disabled = true;
                                    this.btn_buy2.visible = true;
                                }
                                else {
                                    this.note.text = "";
                                    this.btn_affirm.disabled = false;
                                    this.btn_buy2.visible = false;
                                }
                                break;
                            default:
                                console.log("炒茶材料类型不正确！ -> teaShowVO.type:" + teaShowVO.type);
                                break;
                        }
                    }
                };
                /**
                 * 开始炒茶
                 */
                FriedTeaDialogView.prototype.startFriedTea = function (vo) {
                    if (!vo)
                        return;
                    if (FriedTeaDialogView.callback)
                        FriedTeaDialogView.callback(vo);
                };
                /**
                 * 输入框输入后
                 */
                FriedTeaDialogView.prototype.saleNumsInputOverFn = function (event) {
                    if (parseInt(this.teaNums.text) > 10)
                        this.yieldNums = 10;
                    else if (parseInt(this.teaNums.text) < 1)
                        this.yieldNums = 1;
                    else if (isNaN(parseInt(this.teaNums.text)))
                        this.yieldNums = 1;
                    else
                        this.yieldNums = parseInt(this.teaNums.text);
                    // 单价
                    // let _costPrice:number = (parseInt(this.costprice.text)-parseInt(this.hireprice.text)) / this.yieldNums;
                    var _costPrice = parseInt(this.teaPirce.text);
                    // // 炒茶总数
                    // this.teaNums.text = this.yieldNums+"";
                    // 加工产量
                    this.yield.text = this.yieldNums + "";
                    // 加工时间赋值
                    var hour = parseInt(((300 * this.yieldNums) / (60 * 60)) + "");
                    var diff = (300 * this.yieldNums) % (60 * 60);
                    // 分钟
                    var minute = parseInt(diff / 60 + "");
                    this.friedTeaTime.text = hour + "小时" + minute + "分钟";
                    // 配料成本赋值
                    this.costprice.text = (_costPrice * this.yieldNums + parseInt(this.hireprice.text)) + "";
                };
                /**
                 * 炒茶数量+1
                 */
                FriedTeaDialogView.prototype.addOneBtnFn = function (event) {
                    if (this.yieldNums > 10) {
                        return;
                    }
                    else if (isNaN(parseInt(this.teaNums.text))) {
                        this.yieldNums = 1;
                    }
                    else {
                        this.yieldNums = parseInt(this.teaNums.text);
                    }
                    // 单价
                    // let _costPrice:number = (parseInt(this.costprice.text)-parseInt(this.hireprice.text)) / this.yieldNums;
                    var _costPrice = parseInt(this.teaPirce.text);
                    this.yieldNums++;
                    // 炒茶总数
                    this.teaNums.text = this.yieldNums + "";
                    // 加工产量
                    this.yield.text = this.yieldNums + "";
                    // 加工时间赋值
                    var hour = parseInt(((300 * this.yieldNums) / (60 * 60)) + "");
                    var diff = (300 * this.yieldNums) % (60 * 60);
                    // 分钟
                    var minute = parseInt(diff / 60 + "");
                    this.friedTeaTime.text = hour + "小时" + minute + "分钟";
                    // 配料成本赋值
                    this.costprice.text = (_costPrice * this.yieldNums + parseInt(this.hireprice.text)) + "";
                    console.log("配料成本:" + this.costprice.text);
                    // this.teaPirce.text=teaShowVO.teaPrice+""; // 产品单价
                };
                /**
                 * 炒茶数量-1
                 */
                FriedTeaDialogView.prototype.reduceOneBtnFn = function (event) {
                    if (this.yieldNums == 1)
                        return;
                    // 单价
                    // let _costPrice:number = (parseInt(this.costprice.text)-parseInt(this.hireprice.text)) / this.yieldNums;
                    var _costPrice = parseInt(this.teaPirce.text);
                    this.yieldNums--;
                    // 炒茶总数
                    this.teaNums.text = this.yieldNums + "";
                    // 加工产量
                    this.yield.text = this.yieldNums + "";
                    // 加工时间赋值
                    var hour = parseInt(((300 * this.yieldNums) / (60 * 60)) + "");
                    var diff = (300 * this.yieldNums) % (60 * 60);
                    // 分钟
                    var minute = parseInt(diff / 60 + "");
                    this.friedTeaTime.text = hour + "小时" + minute + "分钟";
                    // 配料成本赋值
                    this.costprice.text = (_costPrice * this.yieldNums + parseInt(this.hireprice.text)) + "";
                };
                /**
                 * 上一个茶叶 Tab
                 */
                FriedTeaDialogView.prototype.direction_top = function () {
                    if (this.gridItemsArr.length <= this.gridItemIndex)
                        return;
                    if (this.gridItemIndex <= 8)
                        return;
                    this.gridContainer.removeChildByName(this.gridItemIndex + "");
                    this.gridItemIndex--;
                    var downNums = this.gridItemIndex - 8;
                    var i;
                    for (i = downNums + 2; i <= downNums + 8; i++) {
                        this.gridContainer.getChildByName(i + "").y += 42;
                    }
                    var curGrid = this.gridItemsArr[downNums];
                    curGrid.name = (downNums + 1) + "";
                    curGrid.y = 0;
                    this.gridContainer.addChild(curGrid);
                };
                /**
                 * 下一个茶叶 Tab
                 */
                FriedTeaDialogView.prototype.direction_down = function () {
                    if (this.gridItemsArr.length <= this.gridItemIndex)
                        return;
                    this.gridItemIndex++;
                    var upNums = this.gridItemIndex - 8;
                    var i;
                    for (i = 1; i <= upNums; i++) {
                        this.gridContainer.removeChildByName(i + "");
                    }
                    for (i = upNums + 1; i <= upNums + 7; i++) {
                        this.gridContainer.getChildByName(i + "").y -= 42;
                    }
                    var curGrid = this.gridItemsArr[this.gridItemIndex - 1];
                    curGrid.name = this.gridItemIndex + "";
                    curGrid.y = 294;
                    this.gridContainer.addChild(curGrid);
                };
                FriedTeaDialogView.prototype.closeBtnFn = function () {
                    // this.close();
                    this.bgUI.removeSelf();
                };
                return FriedTeaDialogView;
            }(FriedTeaDialogUI));
            pot.FriedTeaDialogView = FriedTeaDialogView;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=FriedTeaDialogView.js.map
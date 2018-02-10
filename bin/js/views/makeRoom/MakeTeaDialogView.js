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
        var Event = laya.events.Event;
        var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
        var MakeTeaDialogCtrl = controllers.makeRoom.MakeTeaDialogCtrl;
        var MakeTeaDialogModel = models.makeRoom.MakeTeaDialogModel;
        var FriedDialogGridLeftUI = ui.gameUI.pot.FriedDialogGridLeftUI;
        var PlayerInfoModel = models.player.PlayerInfoModel;
        /**
         * 泡茶面板
         */
        var MakeTeaDialogView = /** @class */ (function (_super) {
            __extends(MakeTeaDialogView, _super);
            function MakeTeaDialogView() {
                var _this = _super.call(this) || this;
                /** 左侧 Tab 栏的所有项 */
                _this.tabArr = [_this.tab1, _this.tab2, _this.tab3, _this.tab4, _this.tab5, _this.tab6, _this.tab7, _this.tab8, _this.tab9];
                /** 用水图片资源数据 */
                _this.waterImgArr = ["tabWater", "greenWater", "redWater"];
                /** 茶具图片资源数据 */
                _this.teaSetImgArr = ["reaWare", "glass", "ceramic"];
                /** 茶叶品级名称数组 */
                _this.teaNameArr = ["三品", "二品", "一品", "精品", "极品", "贡品"];
                /** 水源名称数组 */
                _this.waterNameArr = ["自来水", "天然矿泉水", "纯净水"];
                /** 茶具名称数据 */
                _this.teaSetNameArr = ["紫砂茶具", "玻璃茶具", "白瓷茶具"];
                /** 类型前缀 */
                _this.imgPath = "gameUI/makeTea/";
                /** 类型后缀 */
                _this.imgSuffix = ".png";
                /** 图片路径 */
                _this.path = "http://kaixin.maimaicha.com/static/";
                /** 泡茶的总量 */
                _this.yieldNums = 0;
                /** 与 gridItemsArr 配合使用，默认为8） */
                _this.gridItemIndex = 8;
                _this.dragArea = "0,0," + _this.width + ",60";
                _this.mc = new Laya.MovieClip();
                _this.teaNums.restrict = "0-9";
                _this.teaNums.text = "1"; //默认是1
                ////////// =>
                _this.bgUI = new BaseBorderUI();
                _this.bgUI.bgImg.size(768, 490);
                _this.bgUI.size(768, 490);
                _this.bgUI.addChild(_this);
                _this.y = 25;
                _this.bgUI.titleImg.skin = "gameUI/common/icon/makeTeaName.png";
                _this.bgUI.titleImg.x = _this.width - _this.bgUI.titleImg.width >> 1;
                _this.bgUI.titleImg.y += 3;
                _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                // 根据缩放率来动态调整标题、关闭按钮
                var wRate = (768 - 600) / 600;
                var hRate = (490 - 400) / 400;
                _this.bgUI.closeBtn.x += _this.bgUI.closeBtn.x * wRate;
                _this.bgUI.closeBtn.y += _this.bgUI.closeBtn.y * hRate;
                _this.bgUI.closeBtn.scale(1.5, 1.5);
                _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                ////////// <=
                _this.gridItemsArr = [];
                _this.tipView = new ui.gameUI.tips.ConfirmCancelTipUI;
                _this.selectTab(_this.tab1);
                _this.cb = _this.createCheckBox();
                for (var i = 1; i < 10; i++) {
                    _this.getChildByName("tab" + i).on(Event.CLICK, _this, _this.setStatus);
                }
                _this.numBtn_add.on(Event.CLICK, _this, _this.addOneBtnFn);
                _this.numBtn_sub.on(Event.CLICK, _this, _this.reduceOneBtnFn);
                _this.sub1.on(Event.CLICK, _this, _this.reduceTea);
                _this.add1.on(Event.CLICK, _this, _this.addTea);
                _this.sub2.on(Event.CLICK, _this, _this.reduceWater);
                _this.add2.on(Event.CLICK, _this, _this.addWater);
                _this.sub3.on(Event.CLICK, _this, _this.reduceTeaSet);
                _this.add3.on(Event.CLICK, _this, _this.addTeaSet);
                _this.btn_buy1.on(Event.CLICK, _this, _this.buyTeaLeaf); //MakeTeaDialogView.prototype
                _this.btn_buy2.on(Event.CLICK, _this, _this.buyWater);
                _this.btn_buy3.on(Event.CLICK, _this, _this.buyXTFTip);
                _this.btn_direction_top.on(Event.CLICK, _this, _this.direction_top);
                _this.btn_direction_down.on(Event.CLICK, _this, _this.direction_down);
                _this.btn_affirm.on(Event.CLICK, _this, _this.startMakeTea);
                // this.btn_close.on(Event.CLICK,this,this.closeBtnFn);
                _this.btn_cancel.on(Event.CLICK, _this, _this.closeBtnFn);
                _this.teaNums.on(Event.INPUT, _this, _this.saleNumsInputOverFn);
                _this.teaNums.on(Event.BLUR, _this, _this.saleNumsInputOverFn);
                _this.cb.on(Event.CLICK, _this, _this.selectXTF, [_this.cb]);
                var test1 = parseInt(_this.lock1.text);
                var test2 = parseInt(_this.lock2.text);
                if (test1 < 0 || test2 < 0) {
                    _this.btn_affirm.disabled = true;
                }
                else {
                    _this.btn_affirm.disabled = false;
                }
                return _this;
            }
            /**将原素材的 swf 格式转换成 png 格式 */
            MakeTeaDialogView.prototype.translateSwfTypeToPngType = function (swfUrl) {
                var pngUrl;
                if (!swfUrl)
                    return null;
                pngUrl = swfUrl.substring(0, swfUrl.lastIndexOf("."));
                pngUrl += ".png";
                return pngUrl;
            };
            /** 点击玄天符复选框后的事件 */
            MakeTeaDialogView.prototype.selectXTF = function (cb) {
                if (cb.selected == true) {
                    MakeTeaDialogView.useTool = 1;
                    if (MakeTeaDialogModel.waterVOArr[3].symbolNums <= 0) {
                        this.buyXTFTip();
                    }
                    else {
                        this.teaNums.text = 100 + "";
                        this.yieldNums = parseInt(this.teaNums.text);
                        this.initNumsData(this.yieldNums);
                    }
                }
                else {
                    MakeTeaDialogView.useTool = 0;
                    this.teaNums.text = 10 + "";
                    this.yieldNums = parseInt(this.teaNums.text);
                    this.initNumsData(this.yieldNums);
                }
            };
            /** 向左切换茶叶种类 */
            MakeTeaDialogView.prototype.reduceTea = function () {
                var len = this.teaNameArr.length;
                MakeTeaDialogView.curTeaIndex--;
                if (MakeTeaDialogView.curTeaIndex < 0) {
                    MakeTeaDialogView.curTeaIndex = len - 1;
                    this.data1Name.text = this.teaNameArr[MakeTeaDialogView.curTeaIndex];
                }
                else {
                    this.data1Name.text = this.teaNameArr[MakeTeaDialogView.curTeaIndex];
                }
                this.initTeaId();
                this.initTeaLockNums(parseInt(this.teaNums.text));
                this.getCurMakeTeaScore();
            };
            /** 向右切换茶叶种类 */
            MakeTeaDialogView.prototype.addTea = function () {
                var len = this.teaNameArr.length;
                MakeTeaDialogView.curTeaIndex++;
                var nums = MakeTeaDialogView.curTeaIndex;
                this.data1Name.text = this.teaNameArr[MakeTeaDialogView.curTeaIndex];
                if (nums == len) {
                    MakeTeaDialogView.curTeaIndex = 0;
                    this.data1Name.text = this.teaNameArr[MakeTeaDialogView.curTeaIndex];
                }
                this.initTeaId();
                this.initTeaLockNums(parseInt(this.teaNums.text));
                this.getCurMakeTeaScore();
            };
            /** 向左切换水源种类 */
            MakeTeaDialogView.prototype.reduceWater = function () {
                var len = this.waterNameArr.length;
                MakeTeaDialogView.curWaterindex--;
                if (MakeTeaDialogView.curWaterindex < 0) {
                    MakeTeaDialogView.curWaterindex = len - 1;
                    this.data2.skin = this.imgPath + this.waterImgArr[MakeTeaDialogView.curWaterindex] + this.imgSuffix;
                    this.data2Name.text = this.waterNameArr[MakeTeaDialogView.curWaterindex];
                }
                else {
                    this.data2.skin = this.imgPath + this.waterImgArr[MakeTeaDialogView.curWaterindex] + this.imgSuffix;
                    this.data2Name.text = this.waterNameArr[MakeTeaDialogView.curWaterindex];
                }
                this.initWaterId();
                this.initWaterLockNums(parseInt(this.teaNums.text));
                this.getCurMakeTeaScore();
            };
            /** 向右切换水源种类 */
            MakeTeaDialogView.prototype.addWater = function () {
                var len = this.waterNameArr.length;
                MakeTeaDialogView.curWaterindex++;
                var nums = MakeTeaDialogView.curWaterindex;
                this.data2.skin = this.imgPath + this.waterImgArr[MakeTeaDialogView.curWaterindex] + this.imgSuffix;
                this.data2Name.text = this.waterNameArr[MakeTeaDialogView.curWaterindex];
                if (nums == len) {
                    MakeTeaDialogView.curWaterindex = 0;
                    this.data2.skin = this.imgPath + this.waterImgArr[MakeTeaDialogView.curWaterindex] + this.imgSuffix;
                    this.data2Name.text = this.waterNameArr[MakeTeaDialogView.curWaterindex];
                }
                this.initWaterId();
                this.initWaterLockNums(parseInt(this.teaNums.text));
                this.getCurMakeTeaScore();
            };
            /** 向左切换茶具种类 */
            MakeTeaDialogView.prototype.reduceTeaSet = function () {
                var len = this.teaSetNameArr.length;
                MakeTeaDialogView.curTeaSetIndex--;
                if (MakeTeaDialogView.curTeaSetIndex < 0) {
                    MakeTeaDialogView.curTeaSetIndex = len - 1;
                    this.data3.skin = this.imgPath + this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex] + this.imgSuffix;
                    this.data3Name.text = this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
                }
                else {
                    this.data3.skin = this.imgPath + this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex] + this.imgSuffix;
                    this.data3Name.text = this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
                }
                this.initTeaSetId();
                this.getCurMakeTeaScore();
            };
            /** 向右切换茶具种类 */
            MakeTeaDialogView.prototype.addTeaSet = function () {
                var len = this.teaSetNameArr.length;
                MakeTeaDialogView.curTeaSetIndex++;
                var nums = MakeTeaDialogView.curTeaSetIndex;
                this.data3.skin = this.imgPath + this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex] + this.imgSuffix;
                this.data3Name.text = this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
                if (nums == len) {
                    MakeTeaDialogView.curTeaSetIndex = 0;
                    this.data3.skin = this.imgPath + this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex] + this.imgSuffix;
                    this.data3Name.text = this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
                }
                this.initTeaSetId();
                this.getCurMakeTeaScore();
            };
            /** 创建一个checkBox组件 */
            MakeTeaDialogView.prototype.createCheckBox = function () {
                var cbSkin = this.imgPath + "checkbox" + this.imgSuffix;
                var cb = new Laya.CheckBox(cbSkin);
                this.addChild(cb);
                cb.pos(445, 239);
                cb.label = "选用";
                cb.labelSize = 13;
                cb.size(16, 16);
                cb.selected = false;
                return cb;
            };
            /** 左侧选项卡的状态切换 */
            MakeTeaDialogView.prototype.setStatus = function (event) {
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
            MakeTeaDialogView.prototype.selectTab = function (tab) {
                tab.getChildByName("whiteBg").visible = true;
                tab.getChildByName("grayBg").visible = false;
            };
            MakeTeaDialogView.prototype.unSelectTab = function (tab) {
                tab.getChildByName("whiteBg").visible = false;
                tab.getChildByName("grayBg").visible = true;
            };
            MakeTeaDialogView.prototype.itemClked = function (event) {
                var gridItem;
                var childNums = this.gridContainer.numChildren;
                var i;
                this.resetCurId();
                for (i = 0; i < childNums; i++) {
                    gridItem = this.gridContainer.getChildAt(i);
                    if (!gridItem)
                        continue;
                    gridItem.check.visible = false;
                }
                event.target.getChildByName("check").visible = true;
            };
            /** 填充茶叶种类格子（茶叶） */
            MakeTeaDialogView.prototype.addStorageGrids = function (voArr) {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                if (!voArr || !voArr.length)
                    return;
                this.initShowTea(voArr);
            };
            /** 点击左侧茶叶种类Tab后填充其下茶子项 */
            MakeTeaDialogView.prototype.initShowTea = function (voArr) {
                var len = voArr.length;
                var i;
                var seedVO;
                this.gridItemsArr = [];
                this.gridItemIndex = 8;
                this.resetCurId();
                for (i = 0; i < len; i++) {
                    seedVO = voArr[i];
                    var gridItem = new FriedDialogGridLeftUI();
                    gridItem.check.visible = false;
                    gridItem.name = (i + 1) + "";
                    gridItem.teaName.text = seedVO.Teaname + "";
                    gridItem.y = i * (gridItem.height + 5);
                    // 请求第一个茶叶的详细信息
                    if (i == 0) {
                        gridItem.check.visible = true;
                        MakeTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
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
            MakeTeaDialogView.prototype.gridItemClked = function (seedVO) {
                if (!seedVO)
                    return;
                MakeTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
            };
            /** 加载右侧茶叶详细信息介绍 */
            MakeTeaDialogView.prototype.updateRightContent = function (voShowArr) {
                if (!voShowArr || !voShowArr.length)
                    return;
                var len = voShowArr.length;
                var i;
                var teaShowVO;
                var tealeafObjArr = ResourceManager.tealeafObjArr;
                var tempObj;
                var len2 = tealeafObjArr.length;
                var teaId = voShowArr[0].id;
                for (i = 0; i < len2; i++) {
                    tempObj = tealeafObjArr[i];
                    if (teaId == parseInt(tempObj["id"])) {
                        var newPath = HttpConfig.serverResUrl + tempObj["res"];
                        this.data1.skin = this.translateSwfTypeToPngType(newPath);
                        break;
                    }
                }
                for (i = 0; i < len; i++) {
                    teaShowVO = voShowArr[i];
                    this.teaName_top.text = teaShowVO.Teaname;
                    this.iconImg.skin = this.translateSwfTypeToPngType(teaShowVO.teaIcon);
                    this.cb.selected = false;
                    this.teaSet.text = teaShowVO.teaSet;
                    this.water.text = teaShowVO.water;
                    this.remtemp.text = teaShowVO.remtemp;
                    this.optimal.text = teaShowVO.optimal;
                    this.need1.text = parseInt(this.teaNums.text) * 3 + "";
                    this.need2.text = this.teaNums.text;
                    this.data1Name.text = this.teaNameArr[MakeTeaDialogView.curTeaIndex];
                    this.data2Name.text = this.waterNameArr[MakeTeaDialogView.curWaterindex];
                    this.data3Name.text = this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
                    this.data2.skin = this.imgPath + this.waterImgArr[0] + this.imgSuffix;
                    this.data3.skin = this.imgPath + this.teaSetImgArr[0] + this.imgSuffix;
                    // 获取泡茶所需茶叶材料
                    MakeTeaDialogCtrl.getInstance().itemClkedMaterial(teaShowVO.id);
                }
            };
            /** 加载泡茶所需茶叶信息 */
            MakeTeaDialogView.prototype.loadMakeTeaSecret = function (teaDataArr) {
                var teaNums = parseInt(this.teaNums.text);
                this.initTeaLockNums(teaNums);
                // 获取泡茶所需水源材料
                MakeTeaDialogCtrl.getInstance().itemClkedWater();
            };
            /** 加载泡茶所需用水资源 */
            MakeTeaDialogView.prototype.loadWaterData = function (waterArr) {
                if (!waterArr) {
                    return;
                }
                this.initWaterLockNums(parseInt(this.teaNums.text));
                // 获取泡茶所需茶具材料
                MakeTeaDialogCtrl.getInstance().itemClkedTeaSet();
            };
            /**加载当前泡茶组合分数 */
            MakeTeaDialogView.prototype.loadScore = function (score) {
                this.curTeam.text = score + "分";
            };
            /** 输入框输入后 */
            MakeTeaDialogView.prototype.saleNumsInputOverFn = function (event) {
                if (parseInt(this.teaNums.text) > 10)
                    this.yieldNums = 10;
                else if (parseInt(this.teaNums.text) < 1)
                    this.yieldNums = 1;
                else
                    this.yieldNums = parseInt(this.teaNums.text);
                this.initNumsData(this.yieldNums);
            };
            /** 泡茶数量+1 */
            MakeTeaDialogView.prototype.addOneBtnFn = function (event) {
                var yieldNums = parseInt(this.teaNums.text);
                if (isNaN(yieldNums)) {
                    yieldNums = 0;
                    yieldNums++;
                    // 泡茶总数
                    this.teaNums.text = yieldNums + "";
                    // 茶叶需要数量
                    this.need1.text = yieldNums * 3 + "";
                    // 茶水需要数量
                    this.need2.text = yieldNums + "";
                    this.initTeaLockNums(yieldNums);
                    this.initWaterLockNums(yieldNums);
                }
                else {
                    if (yieldNums > 10)
                        return;
                    yieldNums++;
                    // 泡茶总数
                    this.teaNums.text = yieldNums + "";
                    // 茶叶需要数量
                    this.need1.text = yieldNums * 3 + "";
                    // 茶水需要数量
                    this.need2.text = yieldNums + "";
                    this.initWaterLockNums(yieldNums);
                    this.initTeaLockNums(yieldNums);
                }
            };
            /** 泡茶数量-1 */
            MakeTeaDialogView.prototype.reduceOneBtnFn = function (event) {
                var yieldNums = parseInt(this.teaNums.text);
                if (isNaN(yieldNums)) {
                    yieldNums = 2;
                    yieldNums--;
                    // 泡茶总数
                    this.teaNums.text = yieldNums + "";
                    // 茶叶需要数量
                    this.need1.text = yieldNums * 3 + "";
                    // 茶水需要数量
                    this.need2.text = yieldNums + "";
                    this.initTeaLockNums(yieldNums);
                    this.initWaterLockNums(yieldNums);
                }
                else {
                    if (yieldNums == 1)
                        return;
                    yieldNums--;
                    // 泡茶总数
                    this.teaNums.text = yieldNums + "";
                    // 茶叶需要数量
                    this.need1.text = yieldNums * 3 + "";
                    // 茶水需要数量
                    this.need2.text = yieldNums + "";
                    this.initWaterLockNums(yieldNums);
                    this.initTeaLockNums(yieldNums);
                }
            };
            /** 上一个茶叶 Tab */
            MakeTeaDialogView.prototype.direction_top = function () {
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
            /** 下一个茶叶 Tab */
            MakeTeaDialogView.prototype.direction_down = function () {
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
            /** 初始化材料的数量 */
            MakeTeaDialogView.prototype.initNumsData = function (yieldNums) {
                if (isNaN(yieldNums)) {
                    yieldNums = 1;
                    // 茶叶需要数量
                    this.need1.text = yieldNums * 3 + "";
                    // 茶水需要数量
                    this.need2.text = yieldNums + "";
                    this.initTeaLockNums(yieldNums);
                    this.initWaterLockNums(yieldNums);
                }
                else {
                    //泡茶总量
                    this.teaNums.text = yieldNums + "";
                    // 茶叶需要数量
                    this.need1.text = yieldNums * 3 + "";
                    // 茶水需要数量
                    this.need2.text = yieldNums + "";
                    this.initTeaLockNums(yieldNums);
                    this.initWaterLockNums(yieldNums);
                }
            };
            /** 初始化泡茶用水缺少的数量 */
            MakeTeaDialogView.prototype.initWaterLockNums = function (teaNums) {
                this.tipView.visible = false;
                var i;
                var len = MakeTeaDialogModel.waterVOArr.length;
                var waterVO;
                waterVO = MakeTeaDialogModel.waterVOArr[MakeTeaDialogView.curWaterindex];
                if (waterVO.waterNums - teaNums >= 0) {
                    this.lock2.text = 0 + "";
                    this.btn_buy2.visible = false;
                    this.btn_buy2.mouseEnabled = false;
                }
                else {
                    var lockTeaNums = parseInt(this.lock1.text);
                    var lock2Nums = Math.abs(waterVO.waterNums - teaNums);
                    this.lock2.text = lock2Nums + "";
                    this.btn_buy2.visible = true;
                    this.btn_buy2.mouseEnabled = true;
                    if (lockTeaNums <= 0) {
                        this.note.text = "泡茶所需要的水不足";
                    }
                }
            };
            /** 初始化泡茶材料中茶叶的缺少数量 */
            MakeTeaDialogView.prototype.initTeaLockNums = function (teaNums) {
                this.tipView.visible = false;
                var status; //茶叶数据中茶叶的标识（1：三品；2：二品；3：一品；4：精品；5：极品；6：贡品）
                if (MakeTeaDialogModel.dataShowVOArr.length <= 0) {
                    this.lock1.text = teaNums * 3 + "";
                    this.note.text = "当前材料不足，请凑齐以后再来";
                    this.initBtnBuy1Status();
                }
                else {
                    this.note.text = "";
                    status = (MakeTeaDialogView.curTeaIndex + 1).toString();
                    this.initLockTeaStatus(status, teaNums);
                }
            };
            MakeTeaDialogView.prototype.initLockTeaStatus = function (status, teaNums) {
                var teaObj = MakeTeaDialogModel.dataShowVOArr[0];
                var key = status;
                if (teaObj.hasOwnProperty(key)) {
                    var lockNums = teaObj[key] - teaNums * 3;
                    if (lockNums >= 0) {
                        this.lock1.text = 0 + "";
                        this.btn_buy1.visible = false;
                        this.btn_buy1.mouseEnabled = false;
                        this.btn_affirm.disabled = false;
                    }
                    else {
                        this.btn_affirm.disabled = true;
                        this.lock1.text = Math.abs(lockNums) + "";
                        this.note.text = "当前材料不足，请凑齐以后再来";
                        this.initBtnBuy1Status();
                    }
                }
                else {
                    this.btn_affirm.disabled = true;
                    this.lock1.text = teaNums * 3 + "";
                    this.note.text = "当前材料不足，请凑齐以后再来";
                    this.initBtnBuy1Status();
                }
            };
            MakeTeaDialogView.prototype.initBtnBuy1Status = function () {
                if (MakeTeaDialogView.curTeaIndex == 0) {
                    this.btn_buy1.visible = true;
                    this.btn_buy1.mouseEnabled = true;
                }
                else {
                    this.btn_buy1.visible = false;
                    this.btn_buy1.mouseEnabled = false;
                }
            };
            /** 获取当前泡茶组合的得分 */
            MakeTeaDialogView.prototype.getCurMakeTeaScore = function () {
                var i;
                var len = MakeTeaDialogModel.teaShowVOArr.length;
                var seedVO;
                for (i = 0; i < len; i++) {
                    seedVO = MakeTeaDialogModel.teaShowVOArr[i];
                    MakeTeaDialogCtrl.getInstance().itemClkedScore(seedVO.id, MakeTeaDialogModel.waterVOArr[MakeTeaDialogView.curWaterindex].waterId, MakeTeaDialogModel.teaSetVOArr[MakeTeaDialogView.curTeaSetIndex].teaSetId); //55001,56001
                    break;
                }
            };
            /** 初始化当前茶叶材料Id */
            MakeTeaDialogView.prototype.initTeaId = function () {
                switch (this.data1Name.text) {
                    case "三品":
                        MakeTeaDialogView.curTeaIndex = 0;
                        break;
                    case "二品":
                        MakeTeaDialogView.curTeaIndex = 1;
                        break;
                    case "一品":
                        MakeTeaDialogView.curTeaIndex = 2;
                        break;
                    case "精品":
                        MakeTeaDialogView.curTeaIndex = 3;
                        break;
                    case "极品":
                        MakeTeaDialogView.curTeaIndex = 4;
                        break;
                    case "贡品":
                        MakeTeaDialogView.curTeaIndex = 5;
                        break;
                }
            };
            /** 初始化当前水源材料Id */
            MakeTeaDialogView.prototype.initWaterId = function () {
                MakeTeaDialogView.buyWaterNums = parseInt(this.lock2.text);
                switch (this.data2Name.text) {
                    case "自来水":
                        MakeTeaDialogView.curWaterindex = 0;
                        MakeTeaDialogView.waterId = 55001;
                        MakeTeaDialogView.buyWaterMoney = MakeTeaDialogView.buyWaterNums * 10;
                        break;
                    case "天然矿泉水":
                        MakeTeaDialogView.curWaterindex = 1;
                        MakeTeaDialogView.waterId = 55002;
                        MakeTeaDialogView.buyWaterMoney = MakeTeaDialogView.buyWaterNums * 30;
                        break;
                    case "纯净水":
                        MakeTeaDialogView.curWaterindex = 2;
                        MakeTeaDialogView.waterId = 55003;
                        MakeTeaDialogView.buyWaterMoney = MakeTeaDialogView.buyWaterNums * 40;
                        break;
                }
            };
            /** 初始化当前材料Id */
            MakeTeaDialogView.prototype.initTeaSetId = function () {
                switch (this.data3Name.text) {
                    case "紫砂茶具":
                        MakeTeaDialogView.curTeaSetIndex = 0;
                        MakeTeaDialogView.teaSetId = 56001;
                        break;
                    case "玻璃茶具":
                        MakeTeaDialogView.curTeaSetIndex = 1;
                        MakeTeaDialogView.teaSetId = 56002;
                        break;
                    case "白瓷茶具":
                        MakeTeaDialogView.curTeaSetIndex = 2;
                        MakeTeaDialogView.teaSetId = 56003;
                        break;
                }
            };
            /** 重置当前所选材料ID */
            MakeTeaDialogView.prototype.resetCurId = function () {
                this.teaNums.text = 1 + "";
                MakeTeaDialogView.curTeaIndex = 0;
                MakeTeaDialogView.curWaterindex = 0;
                MakeTeaDialogView.curTeaSetIndex = 0;
            };
            /** 初始化当前玄天符状态 */
            MakeTeaDialogView.prototype.initXTFStatus = function (waterArr) {
                this.tipView.visible = false;
                var waterVO;
                waterVO = waterArr[3];
                if (waterVO.symbolNums > 0) {
                    this.symbom.text = "";
                    this.cb.selected = true;
                    this.teaNums.text = 100 + "";
                    this.teaNums.restrict = "1-100";
                    this.yieldNums = parseInt(this.teaNums.text);
                    this.initNumsData(this.yieldNums);
                }
                else {
                    this.cb.selected = false;
                    this.symbom.text = "无此道具";
                }
            };
            /** 初始化弹出框 */
            MakeTeaDialogView.prototype.initTipView = function () {
                this.tipView.visible = true;
                this.addChild(this.tipView);
                this.tipView.x = configs.GameConfig.GAME_WINDOW_WIDTH - this.tipView.width >> 1;
                this.tipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - this.tipView.height >> 1;
                this.tipView.closeBtn.on(Event.CLICK, this, this.cancleBtnFn);
                this.tipView.cancelBtn.on(Event.CLICK, this, this.cancleBtnFn);
            };
            /** 购买玄天符页面 */
            MakeTeaDialogView.prototype.buyXTFTip = function () {
                this.tipView.contentTxt.text = "你确定要花费20钻石购买1挂玄天符吗？";
                this.initTipView();
                this.tipView.confirmBtn.on(Event.CLICK, this, function () {
                    var curSelectedName = "confirmBtn";
                    var diffNums = PlayerInfoModel.playerInfo.diamond - 20;
                    if (diffNums >= 0) {
                        MakeTeaDialogCtrl.getInstance().getBuyXTF("water", 55100, 1);
                    }
                    else {
                        // this.btn_buy3.disabled=true;
                        TipLayerManager.tipLayer.showDrawBgTip("你的钻石不够，请充值！");
                        this.tipView.removeSelf();
                    }
                });
            };
            /** 购买单一茶叶 */
            MakeTeaDialogView.prototype.buyTeaLeaf = function () {
                var tealeafObjArr = ResourceManager.tealeafObjArr;
                var i;
                var len = tealeafObjArr.length;
                var tempObj;
                var teaId = MakeTeaDialogModel.teaShowVOArr[0].id;
                var teaName = MakeTeaDialogModel.teaShowVOArr[0].Teaname;
                var lockNums = parseInt(this.lock1.text);
                var singleNums;
                var _loop_1 = function () {
                    tempObj = tealeafObjArr[i];
                    if (teaId == parseInt(tempObj["id"])) {
                        singleNums = parseInt(tempObj["yb"]);
                        var needMoney_1 = Math.ceil(lockNums / singleNums);
                        var buyNums_1 = needMoney_1 * singleNums;
                        this_1.tipView.contentTxt.text = "你确定要花费" + needMoney_1 + "钻石购买" + buyNums_1 + "份" + teaName + "吗？";
                        this_1.initTipView();
                        this_1.tipView.confirmBtn.on(Event.CLICK, this_1, function () {
                            var differNums = PlayerInfoModel.playerInfo.diamond - needMoney_1;
                            var curSelectedName = "confirmBtn";
                            if (differNums >= 0) {
                                MakeTeaDialogCtrl.getInstance().getBuyLeaf("leaf", teaId, needMoney_1, buyNums_1);
                            }
                            else {
                                TipLayerManager.tipLayer.showDrawBgTip("你的钻石不够，请充值！");
                                this.tipView.removeSelf();
                            }
                        });
                    }
                };
                var this_1 = this;
                for (i = 0; i < len; i++) {
                    _loop_1();
                }
            };
            /** 购买单一水源 */
            MakeTeaDialogView.prototype.buyWater = function () {
                var differMoney;
                this.initTipView();
                this.initWaterId();
                this.tipView.contentTxt.text = "你确定要花费" + MakeTeaDialogView.buyWaterMoney + "金币购买" + MakeTeaDialogView.buyWaterNums + "桶" + this.data2Name.text + "吗？";
                this.tipView.confirmBtn.on(Event.CLICK, this, function () {
                    differMoney = PlayerInfoModel.playerInfo.money - MakeTeaDialogView.buyWaterMoney;
                    if (differMoney >= 0) {
                        MakeTeaDialogCtrl.getInstance().getBuyWater("water", MakeTeaDialogView.waterId, MakeTeaDialogView.buyWaterNums);
                    }
                    else {
                        TipLayerManager.tipLayer.showDrawBgTip("你的金币不够，抓紧去赚些金币吧！");
                        this.tipView.removeSelf();
                    }
                });
            };
            /** 开始烧水 */
            MakeTeaDialogView.prototype.startMakeTea = function () {
                this.initWaterId();
                this.initTeaSetId();
                if (this.cb.selected == true)
                    MakeTeaDialogView.useTool = 1;
                else
                    MakeTeaDialogView.useTool = 0;
                var lockTeaNums = parseInt(this.lock1.text);
                var lockWaterNums = parseInt(this.lock2.text);
                if (lockTeaNums < 0 || lockWaterNums < 0) {
                    this.btn_affirm.disabled = true;
                }
                else {
                    var teaId = MakeTeaDialogModel.teaShowVOArr[0].id; //茶叶索引
                    var teaLvl = (MakeTeaDialogView.curTeaIndex + 1).toString(); //茶叶品质
                    var waterId = MakeTeaDialogView.waterId; //水源索引
                    var teaSetId = MakeTeaDialogView.teaSetId; //茶具索引
                    var makeTeaNums = parseInt(this.teaNums.text); //泡茶分数
                    var useToolFn = MakeTeaDialogView.useTool; //是否使用道具
                    console.log("烧水需要的参数：茶叶的索引：" + teaId + "；茶叶品质：" + teaLvl + "；水的索引：" + waterId + "；茶具索引：" + teaSetId + "；炒茶的数量：" + makeTeaNums + "；是否使用茶具：" + useToolFn);
                    MakeTeaDialogCtrl.getInstance().friedWater(teaId, teaLvl, waterId, teaSetId, makeTeaNums, useToolFn);
                    this.closeBtnFn();
                }
            };
            /** 取消购买 */
            MakeTeaDialogView.prototype.cancleBtnFn = function () {
                if (MakeTeaDialogModel.waterVOArr[3].symbolNums > 0)
                    this.cb.selected = true;
                else
                    this.cb.selected = false;
                this.tipView.visible = false;
            };
            MakeTeaDialogView.prototype.closeBtnFn = function () {
                this.resetCurId();
                this.bgUI.removeSelf();
            };
            /** 当前水源角标\id */
            MakeTeaDialogView.curWaterindex = 0;
            /** 当前茶叶角标 */
            MakeTeaDialogView.curTeaIndex = 0;
            /** 当前茶具角标 */
            MakeTeaDialogView.curTeaSetIndex = 0;
            return MakeTeaDialogView;
        }(ui.gameUI.makeTea.MakeTeaDialogUI));
        makeRoom.MakeTeaDialogView = MakeTeaDialogView;
    })(makeRoom = views.makeRoom || (views.makeRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=MakeTeaDialogView.js.map
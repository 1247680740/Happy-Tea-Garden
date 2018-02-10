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
    var ranklist;
    (function (ranklist) {
        var RankListUI = ui.gameUI.ranklist.RankListUI;
        var RowBarUI = ui.gameUI.ranklist.RowBarUI;
        var Label = laya.ui.Label;
        var Event = laya.events.Event;
        /**
         * 排行榜视图
         * @author hsx
         */
        var RankListView = /** @class */ (function (_super) {
            __extends(RankListView, _super);
            function RankListView() {
                var _this = _super.call(this) || this;
                /**
                 * 每列名称的数组
                 */
                _this.colTitleArr = ["玩家排行", "玩家头像", "玩家名字", "玩家等级", "玩家经验"];
                /**
                 * 当前页
                 */
                _this.curPage = 1;
                /**
                 * 每页几项
                 */
                _this.itemsPerPage = 6;
                /**
                 * 每项间隙
                 */
                _this.itemGap = 5;
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                _this.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                return _this;
            }
            /**
             * 初始化面板
             * 每行显示：排行 头像 名字 等级 经验（不显示：金币 钻石）
             */
            RankListView.prototype.initUI = function (dataObj) {
                if (!dataObj)
                    return;
                // 显示清空
                // this.dataRowsBox.removeChildren(0,this.dataRowsBox.numChildren);
                // this.pageBox.removeChildren(0,this.pageBox.numChildren);
                // if(this.getChildByName("myBox"))
                //     this.removeChildByName("myBox");
                // 玩家数据行
                var dataArr = dataObj["data"];
                if (!dataArr || !dataArr.length)
                    return;
                var i;
                var len = dataArr.length;
                for (i = 0; i < len; i++) {
                    var objArr = dataArr[i];
                    if (!objArr || !objArr.length)
                        continue;
                    // 更新排名
                    objArr[0] = (this.curPage - 1) * this.itemsPerPage + parseInt(objArr[0]) + "";
                    // ["玩家排行","玩家头像","玩家名字","玩家等级","玩家经验"]
                    var box = new RowBarUI();
                    if (objArr[0] == "1") {
                        box.rankIcon.visible = true;
                        box.rankIcon.skin = "gameUI/ranklist/no1.png";
                    }
                    if (objArr[0] == "2") {
                        box.rankIcon.visible = true;
                        box.rankIcon.skin = "gameUI/ranklist/no2.png";
                    }
                    if (objArr[0] == "3") {
                        box.rankIcon.visible = true;
                        box.rankIcon.skin = "gameUI/ranklist/no3.png";
                    }
                    box.rankOrder.text = objArr[0];
                    if (objArr[1])
                        box.headIcon.skin = objArr[1];
                    box.pName.text = objArr[2];
                    box.lvl.text = objArr[3];
                    box.exp.text = objArr[4];
                    box.y = i * (38 + this.itemGap);
                    this.dataRowsBox.addChild(box);
                }
                // 页码
                var pageNums = dataObj["page"];
                if (!pageNums || pageNums == 0)
                    return;
                var pageArr = new Array();
                for (i = 1; i <= pageNums; i++) {
                    pageArr.push(i + "");
                }
                this.addColumnsToRow(pageArr, this.pageBox, 10, false, true);
                // 自己的数据
                var selfObj = dataObj["selfData"];
                var myBox = new RowBarUI();
                myBox.name = "myBox";
                myBox.rankOrder.text = selfObj["rank"];
                myBox.headIcon.skin = controllers.player.PlayerInfoCtrl.playerInfoView.defaultIcon.skin;
                myBox.pName.text = controllers.player.PlayerInfoCtrl.playerInfoView.playerName.text;
                myBox.lvl.text = models.player.PlayerInfoModel.playerInfo.level + "";
                myBox.exp.text = selfObj["exp"];
                myBox.x = this.width - myBox.width >> 1;
                myBox.y = this.pageBox.y + this.pageBox.height;
                this.addChild(myBox);
            };
            /**
             * 将名称数组分别添加到一行当中的多个列中
             * @param colArr 每行含有的列的数据数组
             * @param fatherContainer 父容器
             * @param gap 每列的间隔
             * @param needIcon 行首是否需要添加图标
             * @param canClicked 是否可以点击
             */
            RankListView.prototype.addColumnsToRow = function (colArr, fatherContainer, gap, needIcon, canClicked) {
                if (gap === void 0) { gap = 30; }
                if (needIcon === void 0) { needIcon = false; }
                if (canClicked === void 0) { canClicked = false; }
                if (!colArr || !colArr.length || !fatherContainer)
                    return;
                var padding;
                var i;
                var len = colArr.length;
                var allW = 0;
                var curLabel;
                for (i = 0; i < len; i++) {
                    curLabel = fatherContainer.getChildByName("l" + i);
                    if (curLabel) {
                        curLabel.text = colArr[i];
                        allW += curLabel.width;
                    }
                    else {
                        var label = this.getLabelByIndex(i, colArr[i]);
                        fatherContainer.addChild(label);
                        allW += label.width;
                        if (canClicked) {
                            if (i == 0)
                                label.color = "#FF0000";
                            label.on(Event.CLICK, this, this.labelClicked);
                        }
                    }
                }
                // 左右两侧边距
                padding = (fatherContainer.width - allW - gap * (len - 1)) / 2;
                for (i = 0; i < len; i++) {
                    var l = fatherContainer.getChildByName("l" + i);
                    if (!l)
                        continue;
                    if (i == 0)
                        l.pos(padding, fatherContainer.height - l.height >> 1);
                    else
                        l.pos(i * (l.width + gap) + padding, fatherContainer.height - l.height >> 1);
                }
            };
            /**
             *
             * 效果：尺寸40*28，15号字体，加粗，微软雅黑
             */
            RankListView.prototype.getLabelByIndex = function (index, txt) {
                var label = new Label();
                label.name = "l" + index;
                label.font = "Microsoft YaHei";
                label.fontSize = 15;
                label.bold = true;
                label.text = txt;
                // label.centerX = 0;
                label.align = "center";
                label.size(30, 28); // 70,28
                return label;
            };
            /**
             * 改变颜色、换页并请求数据（只针对页码）
             */
            RankListView.prototype.labelClicked = function (event) {
                var curLabel = event.target;
                if (!curLabel)
                    return;
                var pageLabelNum = this.pageBox.numChildren;
                var i;
                var l;
                for (i = 0; i < pageLabelNum; i++) {
                    l = this.pageBox.getChildByName("l" + i);
                    if (!l)
                        continue;
                    l.color = "#000000";
                }
                curLabel.color = "#FF0000";
                this.curPage = parseInt(curLabel.text);
                if (this.curPage > 0) {
                    // delete children of dataRowsBox
                    this.dataRowsBox.removeChildren(0, this.dataRowsBox.numChildren);
                    var paraObj = { "page": this.curPage, "num": 6 };
                    controllers.ranklist.RankListCtrl.instance.request_getGradeRank(paraObj);
                }
            };
            RankListView.prototype.closeBtnFn = function () {
                this.removeSelf();
            };
            return RankListView;
        }(RankListUI));
        ranklist.RankListView = RankListView;
    })(ranklist = views.ranklist || (views.ranklist = {}));
})(views || (views = {}));
//# sourceMappingURL=RankListView.js.map
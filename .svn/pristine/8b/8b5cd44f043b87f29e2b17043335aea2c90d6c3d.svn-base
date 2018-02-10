var controllers;
(function (controllers) {
    var teaWiki;
    (function (teaWiki) {
        var FireTeaWikiModel = models.teaWiki.TeaWikiModel;
        var Event = laya.events.Event;
        /**
         * 茶百科控制器类
         */
        var TeaWikiCtrl = /** @class */ (function () {
            function TeaWikiCtrl() {
                /** 底部工具栏的高度 */
                this.toolBarH = 30;
                /** 当前选中项的名称 */
                this.curSelectItemName = "summarize";
                if (!TeaWikiCtrl.model)
                    TeaWikiCtrl.model = FireTeaWikiModel.getInstance();
                if (!TeaWikiCtrl.view)
                    TeaWikiCtrl.view = new views.teaWiki.TeaWikiView();
                for (var i = 1; i < 9; i++) {
                    TeaWikiCtrl.view.getChildByName("tab" + i).on(Event.CLICK, this, this.request_getItemList);
                }
                TeaWikiCtrl.view.pre.on(Event.CLICK, this, this.pageBtnFn);
                TeaWikiCtrl.view.next.on(Event.CLICK, this, this.pageBtnFn);
            }
            TeaWikiCtrl.getInstance = function () {
                if (!TeaWikiCtrl.instance)
                    TeaWikiCtrl.instance = new TeaWikiCtrl();
                return TeaWikiCtrl.instance;
            };
            /**
             * 点击工具栏茶百科图标显示茶百科面板
             */
            TeaWikiCtrl.prototype.showFireTeaWiki = function () {
                UILayerManager.uiLayer.addChildAt(TeaWikiCtrl.view, UILayerManager.uiLayer.numChildren - 1);
                TeaWikiCtrl.view.visible = true;
                TeaWikiCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - TeaWikiCtrl.view.width;
                TeaWikiCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - TeaWikiCtrl.view.height - this.toolBarH;
                this.request_getAll(this.curSelectItemName);
            };
            TeaWikiCtrl.prototype.request_getItemList = function (event) {
                switch (event.target.name) {
                    case "tab1":
                        this.curSelectItemName = "summarize";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab2":
                        this.curSelectItemName = "green";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab3":
                        this.curSelectItemName = "red";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab4":
                        this.curSelectItemName = "uron";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab5":
                        this.curSelectItemName = "white";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab6":
                        this.curSelectItemName = "yellow";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab7":
                        this.curSelectItemName = "black";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    case "tab8":
                        this.curSelectItemName = "flower";
                        this.request_getAll(this.curSelectItemName);
                        break;
                    default:
                        break;
                }
            };
            /**
             * 点击后请求右侧的列表项
             */
            TeaWikiCtrl.prototype.request_getAll = function (name) {
                FireTeaWikiModel.callback = this.getAllOverFn;
                TeaWikiCtrl.model.request_getDataByLeft(name);
            };
            TeaWikiCtrl.prototype.getAllOverFn = function (takeData) {
                TeaWikiCtrl.view.addFireTeaWikiGrids(takeData);
            };
            /**
             * 第一次请求详情页
             */
            TeaWikiCtrl.prototype.itemClkedFn = function (teaWikiInfoVO) {
                FireTeaWikiModel.callback = this.FireItemClkedFn;
                TeaWikiCtrl.model.request_getFirstInfo(teaWikiInfoVO);
            };
            /**
             * 点击每一项获取的数据
             */
            TeaWikiCtrl.prototype.itemTauchFn = function (id, teaWikiInfoVO) {
                FireTeaWikiModel.callback = this.FireItemClkedFn;
                TeaWikiCtrl.model.request_getTouchInfo(id, teaWikiInfoVO);
            };
            TeaWikiCtrl.prototype.FireItemClkedFn = function (takeData) {
                TeaWikiCtrl.view.addFireTeaWikiImgs(takeData);
            };
            /**
             * 翻页按钮的信息
             */
            TeaWikiCtrl.prototype.pageBtnFn = function (event) {
                var des = event.target.name;
                FireTeaWikiModel.callback = this.FireItemClkedFn;
                TeaWikiCtrl.model.request_getPageData(TeaWikiCtrl.model.teaVOArr, des);
            };
            return TeaWikiCtrl;
        }());
        teaWiki.TeaWikiCtrl = TeaWikiCtrl;
    })(teaWiki = controllers.teaWiki || (controllers.teaWiki = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=TeaWikiCtrl.js.map
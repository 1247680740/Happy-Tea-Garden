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
        var toolBar;
        (function (toolBar) {
            var DownToolBoxUI = ui.gameUI.toolBar.DownToolBoxUI;
            var Image = laya.ui.Image;
            var Event = laya.events.Event;
            /**
             * 下部工具条上的工具箱视图：存放 除虫、除草、浇水、草、虫 道具图标
             */
            var DownToolBoxView = /** @class */ (function (_super) {
                __extends(DownToolBoxView, _super);
                function DownToolBoxView() {
                    var _this = _super.call(this) || this;
                    _this.cacheAs = "bitmap";
                    _this.curIcon = new Image();
                    _this.addChild(_this.curIcon);
                    _this.drawBg();
                    _this.on(Event.CLICK, _this, _this.onClkedFn);
                    return _this;
                }
                DownToolBoxView.prototype.drawBg = function () {
                    this.graphics.clear();
                    this.graphics.drawRect(0, 0, this.width, this.height, "#FFFFFF");
                };
                DownToolBoxView.prototype.onClkedFn = function (event) {
                    console.log("当前选择的工具名称为:" + event.target.name);
                    switch (event.target.name) {
                        case "killWorm":// 除虫
                            // this.curIcon.graphics.clear();	// Image 的清除，可尝试先清理再切换 skin
                            toolBar.DownToolBarView.instance.setShowTypeAndState("killWorm", this.killWorm);
                            break;
                        case "removeGrass":// 除草
                            toolBar.DownToolBarView.instance.setShowTypeAndState("removeGrass", this.removeGrass);
                            break;
                        case "water":// 浇水
                            toolBar.DownToolBarView.instance.setShowTypeAndState("water", this.water);
                            break;
                        case "grass":// 种草
                            toolBar.DownToolBarView.instance.setShowTypeAndState("grass", this.grass);
                            break;
                        case "worm":// 放虫
                            toolBar.DownToolBarView.instance.setShowTypeAndState("worm", this.worm);
                            break;
                    }
                    this.visible = false;
                };
                return DownToolBoxView;
            }(DownToolBoxUI));
            toolBar.DownToolBoxView = DownToolBoxView;
        })(toolBar = teaRoom.toolBar || (teaRoom.toolBar = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=DownToolBoxView.js.map
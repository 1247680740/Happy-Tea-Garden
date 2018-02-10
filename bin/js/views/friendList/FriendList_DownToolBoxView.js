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
    var friendList;
    (function (friendList) {
        var DownToolBoxUI = ui.gameUI.toolBar.DownToolBoxUI;
        var Image = laya.ui.Image;
        var Event = laya.events.Event;
        /**
         * 下部工具条上的工具箱视图：存放 除虫、除草、浇水、草、虫 道具图标
         */
        var FriendList_DownToolBoxView = /** @class */ (function (_super) {
            __extends(FriendList_DownToolBoxView, _super);
            function FriendList_DownToolBoxView() {
                var _this = _super.call(this) || this;
                _this.cacheAs = "bitmap";
                _this.curIcon = new Image();
                _this.addChild(_this.curIcon);
                _this.width = 340;
                _this.drawBg();
                _this.on(Event.CLICK, _this, _this.onClkedFn);
                return _this;
            }
            FriendList_DownToolBoxView.prototype.drawBg = function () {
                this.graphics.clear();
                this.graphics.drawRect(0, 0, this.width, this.height, "#FFFFFF");
            };
            FriendList_DownToolBoxView.prototype.onClkedFn = function (event) {
                console.log("当前选择的工具名称为:" + event.target.name);
                switch (event.target.name) {
                    case "killWorm":// 除虫
                        // this.curIcon.graphics.clear();	// Image 的清除，可尝试先清理再切换 skin
                        friendList.FriendList_DownToolBarView.instance.setShowTypeAndState("killWorm", this.killWorm);
                        break;
                    case "removeGrass":// 除草
                        friendList.FriendList_DownToolBarView.instance.setShowTypeAndState("removeGrass", this.removeGrass);
                        break;
                    case "water":// 浇水
                        friendList.FriendList_DownToolBarView.instance.setShowTypeAndState("water", this.water);
                        break;
                    case "grass":// 种草
                        friendList.FriendList_DownToolBarView.instance.setShowTypeAndState("grass", this.grass);
                        break;
                    case "worm":// 放虫
                        friendList.FriendList_DownToolBarView.instance.setShowTypeAndState("worm", this.worm);
                        break;
                }
                this.visible = false;
            };
            return FriendList_DownToolBoxView;
        }(DownToolBoxUI));
        friendList.FriendList_DownToolBoxView = FriendList_DownToolBoxView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendList_DownToolBoxView.js.map
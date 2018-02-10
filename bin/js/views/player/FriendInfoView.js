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
    var player;
    (function (player) {
        var TeaGardenCtrl = controllers.teaRoom.TeaGardenCtrl;
        /**
         * 好友信息视图
         */
        var FriendInfoView = /** @class */ (function (_super) {
            __extends(FriendInfoView, _super);
            function FriendInfoView() {
                return _super.call(this) || this;
            }
            /** 填充好友数据 */
            FriendInfoView.prototype.initFriendUI = function (friendInfoVO) {
                if (!friendInfoVO)
                    return;
                this.playerName.text = friendInfoVO.userName;
                this.lvlProgress.value = friendInfoVO.exp / friendInfoVO.nextLevelExp;
                this.lvlProgressTxt.text = friendInfoVO.exp + "/" + friendInfoVO.nextLevelExp;
                this.money.text = friendInfoVO.money + "";
                this.diamond.text = friendInfoVO.userName + "的茶园";
                if (friendInfoVO.ico) {
                    this.defaultIcon.skin = friendInfoVO.ico;
                    this.defaultIcon.size(47, 47);
                }
                this.showLvl(friendInfoVO.level);
                TeaGardenCtrl.getInstance().reLoadBg();
            };
            /** 更新等级数 */
            FriendInfoView.prototype.showLvl = function (_lvl) {
                var data = {};
                var lvl = _lvl;
                var i;
                for (i = 1; i >= 0; i--) {
                    data["item" + i] = { index: Math.floor(lvl % 10) };
                    lvl /= 10;
                }
                this.lvl.dataSource = data;
            };
            return FriendInfoView;
        }(ui.gameUI.player.PlayerInfoUI));
        player.FriendInfoView = FriendInfoView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendInfoView.js.map
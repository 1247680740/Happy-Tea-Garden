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
        /**
         * 玩家信息视图
         */
        var PlayerInfoView = /** @class */ (function (_super) {
            __extends(PlayerInfoView, _super);
            function PlayerInfoView() {
                return _super.call(this) || this;
            }
            /**
             * 填充数据，初始化视图
             */
            PlayerInfoView.prototype.initUI = function (playerInfoVO) {
                if (!playerInfoVO)
                    return;
                this.playerName.text = playerInfoVO.userName;
                this.lvlProgress.value = playerInfoVO.exp / playerInfoVO.nextLevelExp;
                this.lvlProgressTxt.text = playerInfoVO.exp + "/" + playerInfoVO.nextLevelExp;
                this.money.text = playerInfoVO.money + "";
                this.diamond.text = playerInfoVO.diamond + "";
                if (playerInfoVO.ico) {
                    this.defaultIcon.skin = playerInfoVO.ico;
                    this.defaultIcon.size(47, 47);
                }
                this.showLvl(playerInfoVO.level);
            };
            /** 更新等级数 */
            PlayerInfoView.prototype.showLvl = function (_lvl) {
                var data = {};
                var lvl = _lvl;
                var i;
                for (i = 1; i >= 0; i--) {
                    data["item" + i] = { index: Math.floor(lvl % 10) };
                    lvl /= 10;
                }
                this.lvl.dataSource = data;
            };
            return PlayerInfoView;
        }(ui.gameUI.player.PlayerInfoUI));
        player.PlayerInfoView = PlayerInfoView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerInfoView.js.map
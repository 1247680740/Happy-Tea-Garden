var models;
(function (models) {
    var player;
    (function (player) {
        /** 好友用户信息数据 */
        var FriendInfoVO = /** @class */ (function () {
            function FriendInfoVO() {
                /** 用户昵称 */
                this.userName = "";
                /**
                 * 新浪版本是否加V  0:没有, 1：加V
                 */
                this.addV = 0;
            }
            return FriendInfoVO;
        }());
        player.FriendInfoVO = FriendInfoVO;
    })(player = models.player || (models.player = {}));
})(models || (models = {}));
//# sourceMappingURL=FriendInfoVO.js.map
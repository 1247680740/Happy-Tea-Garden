var models;
(function (models) {
    var player;
    (function (player) {
        var HttpServiceProxy = nets.HttpServiceProxy;
        var PlayerInfoModel = /** @class */ (function () {
            function PlayerInfoModel() {
                PlayerInfoModel.playerInfo = new player.PlayerInfoVO();
                PlayerInfoModel.friendInfo = new player.FriendInfoVO();
            }
            Object.defineProperty(PlayerInfoModel, "instance", {
                get: function () {
                    if (!PlayerInfoModel._instance)
                        PlayerInfoModel._instance = new PlayerInfoModel();
                    return PlayerInfoModel._instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 请求玩家信息数据
             */
            PlayerInfoModel.prototype.request_getUserInfo = function () {
                HttpServiceProxy.request("getUserInfo", { 'sf': IdentityConfig.uid }, this.getUserInfoOverFn, IdentityConfig.uid);
            };
            PlayerInfoModel.prototype.request_getFriendInfo = function (uid) {
                HttpServiceProxy.request("getUserInfo", { 'sf': uid }, this.getFriendInfoOverFn, { "uid": uid });
            };
            /**
             * 注意(this)：此回调函数的作用域已不再是 PlayerInfoModel 类本身，可能是 [object Window]
             */
            PlayerInfoModel.prototype.getUserInfoOverFn = function (receiveData, takeData) {
                if (receiveData)
                    PlayerInfoModel.receiveData = receiveData;
                if (takeData)
                    PlayerInfoModel.takeData = takeData;
                PlayerInfoModel.playerInfo.exp = receiveData["e"];
                PlayerInfoModel.playerInfo.teaExam = receiveData["grade"];
                PlayerInfoModel.playerInfo.level = parseInt(receiveData["l"]);
                PlayerInfoModel.playerInfo.money = parseInt(receiveData["m"]);
                PlayerInfoModel.playerInfo.isSign = receiveData["sign"]; //是否签到
                PlayerInfoModel.playerInfo.nextLevelExp = receiveData["ue"];
                PlayerInfoModel.playerInfo.userName = receiveData["un"];
                PlayerInfoModel.playerInfo.diamond = parseInt(receiveData["yb"]);
                PlayerInfoModel.playerInfo.ico = receiveData["i"];
                // PlayerInfoModel.playerInfo.cmd = receiveData["_cmd"];   // 待执行的命令
                if (PlayerInfoModel.callback)
                    PlayerInfoModel.callback();
            };
            /** 获取好友用户信息 */
            PlayerInfoModel.prototype.getFriendInfoOverFn = function (receiveData, takeData) {
                if (receiveData)
                    PlayerInfoModel.receiveData = receiveData;
                if (takeData)
                    PlayerInfoModel.takeData = takeData;
                PlayerInfoModel.friendInfo.exp = receiveData["e"];
                PlayerInfoModel.friendInfo.teaExam = receiveData["grade"];
                PlayerInfoModel.friendInfo.level = parseInt(receiveData["l"]);
                PlayerInfoModel.friendInfo.money = parseInt(receiveData["m"]);
                PlayerInfoModel.friendInfo.isSign = receiveData["sign"]; //是否签到
                PlayerInfoModel.friendInfo.nextLevelExp = receiveData["ue"];
                PlayerInfoModel.friendInfo.userName = receiveData["un"];
                PlayerInfoModel.friendInfo.diamond = parseInt(receiveData["yb"]);
                PlayerInfoModel.friendInfo.ico = receiveData["i"];
                PlayerInfoModel.friendInfo.userId = takeData["uid"];
                // PlayerInfoModel.playerInfo.cmd = receiveData["_cmd"];   // 待执行的命令
                if (PlayerInfoModel.callback)
                    PlayerInfoModel.callback();
            };
            PlayerInfoModel.dispose = function () {
                this.callback = null;
                this.receiveData = null;
                this.takeData = null;
            };
            return PlayerInfoModel;
        }());
        player.PlayerInfoModel = PlayerInfoModel;
    })(player = models.player || (models.player = {}));
})(models || (models = {}));
//# sourceMappingURL=PlayerInfoModel.js.map
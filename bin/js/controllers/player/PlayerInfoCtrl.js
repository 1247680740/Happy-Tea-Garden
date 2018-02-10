var controllers;
(function (controllers) {
    var player;
    (function (player) {
        var PlayerInfoModel = models.player.PlayerInfoModel;
        // import PlayerInfoView = views.player.PlayerInfoView;
        // import * as PlayerInfoUI from "ui.gameUI.PlayerInfoUI";
        var EventDispatcher = laya.events.EventDispatcher;
        /**
        * 玩家信息控制器
        */
        var PlayerInfoCtrl = /** @class */ (function () {
            function PlayerInfoCtrl() {
                /**
                 * 玩家信息是否初始化完成
                 */
                this.isPlayerInfoInited = false;
                if (!PlayerInfoCtrl.playerInfoView)
                    PlayerInfoCtrl.playerInfoView = new views.player.PlayerInfoView();
                if (!PlayerInfoCtrl.friendInfoView)
                    PlayerInfoCtrl.friendInfoView = new views.player.FriendInfoView();
            }
            Object.defineProperty(PlayerInfoCtrl, "instance", {
                get: function () {
                    if (!PlayerInfoCtrl._instance)
                        PlayerInfoCtrl._instance = new PlayerInfoCtrl();
                    return PlayerInfoCtrl._instance;
                },
                enumerable: true,
                configurable: true
            });
            /** 请求玩家信息数据 */
            PlayerInfoCtrl.prototype.request_getUserInfo = function () {
                PlayerInfoModel.callback = this.getUserInfoOver;
                PlayerInfoModel.instance.request_getUserInfo();
            };
            /** 请求好友信息数据 */
            PlayerInfoCtrl.prototype.request_getFriendInfo = function (uid) {
                PlayerInfoModel.callback = this.getFriendInfoOver;
                PlayerInfoModel.instance.request_getFriendInfo(uid);
            };
            /** 数据的填充，玩家信息的显示 */
            PlayerInfoCtrl.prototype.getUserInfoOver = function () {
                if (!PlayerInfoCtrl.playerInfoModel)
                    return;
                PlayerInfoCtrl._instance.showPlayerInfo();
                if (!this.isPlayerInfoInited) {
                    if (!PlayerInfoCtrl.eventDispatcher)
                        PlayerInfoCtrl.eventDispatcher = new EventDispatcher();
                    PlayerInfoCtrl.eventDispatcher.event(HttpConfig.SERVER_CONNECTED); // 登录成功 !
                }
                this.isPlayerInfoInited = true;
            };
            /** 好友玩家数据填充 */
            PlayerInfoCtrl.prototype.getFriendInfoOver = function () {
                /** 显示好友面板信息 */
                PlayerInfoCtrl._instance.showFriendInfo();
            };
            /**
             * 更新玩家的金币、钻石、经验，并重新渲染
             */
            PlayerInfoCtrl.prototype.updatePlayerDataAndRender = function (receiveData) {
                if (!receiveData)
                    return;
                if (receiveData["_g"])
                    PlayerInfoModel.playerInfo.money += parseInt(receiveData["_g"] + "");
                if (receiveData["_y"])
                    PlayerInfoModel.playerInfo.diamond += parseInt(receiveData["_y"] + "");
                if (receiveData["_e"])
                    PlayerInfoModel.playerInfo.exp += parseInt(receiveData["_e"] + "");
                if (receiveData["exp"])
                    PlayerInfoModel.playerInfo.exp += parseInt(receiveData["exp"] + "");
                if (PlayerInfoModel.playerInfo.exp > PlayerInfoModel.playerInfo.nextLevelExp) {
                    // this.request_getUserInfo();	// 暂屏蔽
                    PlayerInfoModel.playerInfo.exp -= PlayerInfoModel.playerInfo.nextLevelExp;
                    PlayerInfoModel.playerInfo.level++;
                    PlayerInfoCtrl.instance.showPlayerInfo();
                }
                else
                    PlayerInfoCtrl.instance.showPlayerInfo();
            };
            /**
             * 更新玩家显示数据
             */
            PlayerInfoCtrl.prototype.showPlayerInfo = function () {
                PlayerInfoCtrl.playerInfoView.initUI(PlayerInfoModel.playerInfo);
            };
            /** 更新好友玩家显示数据 */
            PlayerInfoCtrl.prototype.showFriendInfo = function () {
                PlayerInfoCtrl.friendInfoView.initFriendUI(PlayerInfoModel.friendInfo);
            };
            /** model 数据的清理 */
            PlayerInfoCtrl.disposeModel = function () {
                PlayerInfoModel.dispose();
            };
            /** view 的移除及清理 */
            PlayerInfoCtrl.disposeUI = function () {
                this.playerInfoView.removeChildren();
                this.playerInfoView.removeSelf();
            };
            PlayerInfoCtrl.playerInfoModel = PlayerInfoModel.instance;
            PlayerInfoCtrl.eventDispatcher = new EventDispatcher();
            return PlayerInfoCtrl;
        }());
        player.PlayerInfoCtrl = PlayerInfoCtrl;
    })(player = controllers.player || (controllers.player = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=PlayerInfoCtrl.js.map
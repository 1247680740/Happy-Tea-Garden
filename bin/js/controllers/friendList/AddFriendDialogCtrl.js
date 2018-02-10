var controllers;
(function (controllers) {
    var friendList;
    (function (friendList) {
        /**
         * 好友搜索添加相关的控制器
         */
        var AddFriendDialogCtrl = /** @class */ (function () {
            function AddFriendDialogCtrl() {
                /** 底部工具栏的高度 */
                this.toolBarH = 30;
                if (!AddFriendDialogCtrl.addFriendDialogModel)
                    AddFriendDialogCtrl.addFriendDialogModel = models.friendList.AddFriendDialogModel.getInstance();
                if (!AddFriendDialogCtrl.friendListView)
                    AddFriendDialogCtrl.friendListView = new views.friendList.FriendListView();
                if (!AddFriendDialogCtrl.addFriendView)
                    AddFriendDialogCtrl.addFriendView = new views.friendList.AddFriendDialogView();
                if (!AddFriendDialogCtrl.recommonPalDialogView)
                    AddFriendDialogCtrl.recommonPalDialogView = new views.friendList.RecomPalsDialogView();
                if (!AddFriendDialogCtrl.applyListView)
                    AddFriendDialogCtrl.applyListView = new views.friendList.ApplyPalsDialogView();
            }
            AddFriendDialogCtrl.getInstance = function () {
                if (!AddFriendDialogCtrl._instance)
                    AddFriendDialogCtrl._instance = new AddFriendDialogCtrl();
                return AddFriendDialogCtrl._instance;
            };
            /** 开始添加好友 */
            AddFriendDialogCtrl.prototype.request_startAddPals = function (id) {
                models.friendList.AddFriendDialogModel.callback = this.resetUserList;
                AddFriendDialogCtrl.addFriendDialogModel.requset_addPals(id);
            };
            AddFriendDialogCtrl.prototype.resetUserList = function (takeData) {
                AddFriendDialogCtrl.friendListView.addManageUser(takeData);
            };
            /** 获取推荐好友名额 */
            AddFriendDialogCtrl.prototype.request_getRecommonList = function () {
                models.friendList.AddFriendDialogModel.callback = this.showRecommonView;
                AddFriendDialogCtrl.addFriendDialogModel.request_getReCommon();
            };
            AddFriendDialogCtrl.prototype.showRecommonView = function (takeData) {
                UILayerManager.uiLayer.addChild(AddFriendDialogCtrl.recommonPalDialogView);
                AddFriendDialogCtrl.recommonPalDialogView.visible = true;
                AddFriendDialogCtrl.recommonPalDialogView.x = configs.GameConfig.GAME_WINDOW_WIDTH - AddFriendDialogCtrl.recommonPalDialogView.width >> 1;
                AddFriendDialogCtrl.recommonPalDialogView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - AddFriendDialogCtrl.recommonPalDialogView.height >> 1;
                // 显示获取到的用户信息
                AddFriendDialogCtrl.recommonPalDialogView.addNewPalInfo(takeData);
            };
            AddFriendDialogCtrl.prototype.request_sendApplyInfo = function (userId) {
                AddFriendDialogCtrl.addFriendDialogModel.request_setApplyInfo(userId);
            };
            AddFriendDialogCtrl.prototype.request_agreeApply = function (id, agree) {
                models.friendList.AddFriendDialogModel.callback = this.resetApplyList;
                AddFriendDialogCtrl.addFriendDialogModel.request_getAgreeApplyInfo(id, agree);
            };
            AddFriendDialogCtrl.prototype.resetApplyList = function (takeData) {
                AddFriendDialogCtrl.applyListView.addNewPalInfo(takeData);
            };
            return AddFriendDialogCtrl;
        }());
        friendList.AddFriendDialogCtrl = AddFriendDialogCtrl;
    })(friendList = controllers.friendList || (controllers.friendList = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=AddFriendDialogCtrl.js.map
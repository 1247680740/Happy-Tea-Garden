var controllers;
(function (controllers) {
    var friendList;
    (function (friendList) {
        var Event = laya.events.Event;
        /**
         * 好友列表相关的控制器
         */
        var FriendListCtrl = /** @class */ (function () {
            function FriendListCtrl() {
                /** 底部工具栏的高度 */
                this.toolBarH = 30;
                if (!FriendListCtrl.friendListModel)
                    FriendListCtrl.friendListModel = models.friendList.FriendListModel.getInstance();
                if (!FriendListCtrl.friendListView)
                    FriendListCtrl.friendListView = new views.friendList.FriendListView();
                if (!FriendListCtrl.addFriendView)
                    FriendListCtrl.addFriendView = new views.friendList.AddFriendDialogView();
                if (!FriendListCtrl.applyListView)
                    FriendListCtrl.applyListView = new views.friendList.ApplyPalsDialogView();
                FriendListCtrl.friendListView.personList.on(Event.CLICK, this, this.request_getUserInfo);
                FriendListCtrl.friendListView.personManage.on(Event.CLICK, this, this.request_ManageUser);
            }
            FriendListCtrl.getInstance = function () {
                if (!FriendListCtrl._instance)
                    FriendListCtrl._instance = new FriendListCtrl();
                return FriendListCtrl._instance;
            };
            /**
             * 显示好友列表面板
             */
            FriendListCtrl.prototype.showFriendList = function () {
                UILayerManager.uiLayer.addChild(FriendListCtrl.friendListView);
                FriendListCtrl.friendListView.visible = true;
                FriendListCtrl.friendListView.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriendListCtrl.friendListView.width / 2;
                FriendListCtrl.friendListView.y = this.toolBarH;
                // 获取好友页数信息
                this.request_getUserInfo();
            };
            /** 获取好友列表页数信息 */
            FriendListCtrl.prototype.request_getUserInfo = function () {
                models.friendList.FriendListModel.callback = this.setPageInfo;
                FriendListCtrl.friendListModel.request_getUserPage(null);
            };
            FriendListCtrl.prototype.setPageInfo = function (takeData) {
                FriendListCtrl.friendListView.setPageInfo(takeData);
            };
            /**  获取好友列表用户具体信息 */
            FriendListCtrl.prototype.request_getUserList = function (pg, odb, sr) {
                models.friendList.FriendListModel.callback = this.addPerson;
                FriendListCtrl.friendListModel.request_getUserInfo(pg, odb, sr);
            };
            FriendListCtrl.prototype.addPerson = function (takeData) {
                FriendListCtrl.friendListView.addPerson(takeData);
            };
            /** 获取好友管理用户信息 */
            FriendListCtrl.prototype.request_ManageUser = function () {
                var pageNum = parseInt(FriendListCtrl.friendListView.firstPage.text);
                models.friendList.FriendListModel.callback = this.addManageUser;
                FriendListCtrl.friendListModel.requset_getManageUser(pageNum);
            };
            FriendListCtrl.prototype.addManageUser = function (takeData) {
                FriendListCtrl.friendListView.addManageUser(takeData);
            };
            /** 刷新好友管理列表 */
            FriendListCtrl.prototype.request_freshManageList = function () {
                models.friendList.FriendListModel.callback = this.addManageUser;
                FriendListCtrl.friendListModel.requset_getManageUser(1);
            };
            /** 获取想要添加的好友信息 */
            FriendListCtrl.prototype.request_addFriend = function (palName, pg) {
                models.friendList.FriendListModel.callback = this.showNewPalView;
                FriendListCtrl.friendListModel.requset_addPals(palName, pg);
            };
            FriendListCtrl.prototype.showNewPalView = function (takeData) {
                UILayerManager.uiLayer.addChild(FriendListCtrl.addFriendView);
                FriendListCtrl.addFriendView.visible = true;
                FriendListCtrl.addFriendView.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriendListCtrl.addFriendView.width >> 1;
                FriendListCtrl.addFriendView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriendListCtrl.addFriendView.height >> 1;
                // 显示获取到的用户信息
                FriendListCtrl.addFriendView.addNewPalInfo(takeData);
            };
            /** 删除好友 */
            FriendListCtrl.prototype.request_deletePal = function (userId) {
                models.friendList.FriendListModel.callback = this.resetManageUser;
                FriendListCtrl.friendListModel.request_deleteFriend(userId);
            };
            FriendListCtrl.prototype.resetManageUser = function (takeData) {
                FriendListCtrl.friendListView.addManageUser(takeData);
            };
            /** 翻页请求获取搜索到的好友信息 */
            FriendListCtrl.prototype.request_getPagePals = function (palName, pg) {
                models.friendList.FriendListModel.callback = this.showPagePals;
                FriendListCtrl.friendListModel.requset_addPals(palName, pg);
            };
            FriendListCtrl.prototype.showPagePals = function (takeData) {
                FriendListCtrl.addFriendView.addNewPalInfo(takeData);
            };
            /**  获取好友请求列表 */
            FriendListCtrl.prototype.request_getPalsApply = function (pg) {
                models.friendList.FriendListModel.callback = this.showApllyList;
                FriendListCtrl.friendListModel.request_getApplyPals(pg);
            };
            FriendListCtrl.prototype.showApllyList = function (takeData) {
                UILayerManager.uiLayer.addChild(FriendListCtrl.applyListView);
                FriendListCtrl.applyListView.visible = true;
                FriendListCtrl.applyListView.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriendListCtrl.applyListView.width >> 1;
                FriendListCtrl.applyListView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriendListCtrl.applyListView.height >> 1;
                // 显示获取到的用户信息
                FriendListCtrl.applyListView.addNewPalInfo(takeData);
            };
            return FriendListCtrl;
        }());
        friendList.FriendListCtrl = FriendListCtrl;
    })(friendList = controllers.friendList || (controllers.friendList = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=FriendListCtrl.js.map
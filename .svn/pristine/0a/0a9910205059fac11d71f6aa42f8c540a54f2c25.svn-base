namespace controllers.friendList
{
	import Event = laya.events.Event;

	/**
	 * 好友搜索添加相关的控制器
	 */
	export class AddFriendDialogCtrl
	{
		/** 底部工具栏的高度 */
		private toolBarH: number = 30;
		private static _instance:AddFriendDialogCtrl;
		/** 好友列表视图 */
		private static friendListView:views.friendList.FriendListView;
		/** 添加好友视图 */
		private static addFriendView:views.friendList.AddFriendDialogView;
		/** 好友请求视图 */
		private static applyListView:views.friendList.ApplyPalsDialogView;
		/** 好友推荐视图 */
		private static recommonPalDialogView:views.friendList.RecomPalsDialogView;
        private static addFriendDialogModel:models.friendList.AddFriendDialogModel;
		constructor()
		{
			if(!AddFriendDialogCtrl.addFriendDialogModel)
                AddFriendDialogCtrl.addFriendDialogModel = models.friendList.AddFriendDialogModel.getInstance()
			if(!AddFriendDialogCtrl.friendListView)
                AddFriendDialogCtrl.friendListView = new views.friendList.FriendListView();
			if(!AddFriendDialogCtrl.addFriendView)
				AddFriendDialogCtrl.addFriendView = new views.friendList.AddFriendDialogView();
			if(!AddFriendDialogCtrl.recommonPalDialogView)
				AddFriendDialogCtrl.recommonPalDialogView = new views.friendList.RecomPalsDialogView();
			if(!AddFriendDialogCtrl.applyListView)
				AddFriendDialogCtrl.applyListView = new views.friendList.ApplyPalsDialogView();
		}

		static getInstance():AddFriendDialogCtrl
		{
			if(!AddFriendDialogCtrl._instance)
                AddFriendDialogCtrl._instance = new AddFriendDialogCtrl();
			    return AddFriendDialogCtrl._instance;
		}


		/** 开始添加好友 */
		request_startAddPals(id:string):void{
            models.friendList.AddFriendDialogModel.callback=this.resetUserList;
            AddFriendDialogCtrl.addFriendDialogModel.requset_addPals(id);
        }

        resetUserList(takeData?:any):void{
            AddFriendDialogCtrl.friendListView.addManageUser(takeData);
		}

		/** 获取推荐好友名额 */
		request_getRecommonList():void{
			models.friendList.AddFriendDialogModel.callback=this.showRecommonView;
			AddFriendDialogCtrl.addFriendDialogModel.request_getReCommon();
		}

		showRecommonView(takeData?:any):void{
			UILayerManager.uiLayer.addChild(AddFriendDialogCtrl.recommonPalDialogView);
			AddFriendDialogCtrl.recommonPalDialogView.visible = true;
			AddFriendDialogCtrl.recommonPalDialogView.x = configs.GameConfig.GAME_WINDOW_WIDTH - AddFriendDialogCtrl.recommonPalDialogView.width >> 1;
			AddFriendDialogCtrl.recommonPalDialogView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - AddFriendDialogCtrl.recommonPalDialogView.height >> 1;
			// 显示获取到的用户信息
            AddFriendDialogCtrl.recommonPalDialogView.addNewPalInfo(takeData);
		}

		request_sendApplyInfo(userId:string):void{
			AddFriendDialogCtrl.addFriendDialogModel.request_setApplyInfo(userId);
		}

		request_agreeApply(id:string,agree:number):void{
			models.friendList.AddFriendDialogModel.callback=this.resetApplyList;
			AddFriendDialogCtrl.addFriendDialogModel.request_getAgreeApplyInfo(id,agree);
		}

		resetApplyList(takeData?:any):void{
			AddFriendDialogCtrl.applyListView.addNewPalInfo(takeData);
		}


	}
}
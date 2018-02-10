namespace controllers.friendList
{
	import Event = laya.events.Event;

	/**
	 * 好友列表相关的控制器
	 */
	export class FriendListCtrl
	{
		/** 底部工具栏的高度 */
		private toolBarH: number = 30;
		private static _instance:FriendListCtrl;
		private static friendListView:views.friendList.FriendListView;
		private static addFriendView:views.friendList.AddFriendDialogView;
		private static applyListView:views.friendList.ApplyPalsDialogView;
        private static friendListModel:models.friendList.FriendListModel;
		constructor()
		{
			if(!FriendListCtrl.friendListModel)
				FriendListCtrl.friendListModel = models.friendList.FriendListModel.getInstance()
			if(!FriendListCtrl.friendListView)
				FriendListCtrl.friendListView = new views.friendList.FriendListView();
			if(!FriendListCtrl.addFriendView)
				FriendListCtrl.addFriendView = new views.friendList.AddFriendDialogView();
			if(!FriendListCtrl.applyListView)
				FriendListCtrl.applyListView = new views.friendList.ApplyPalsDialogView();
			FriendListCtrl.friendListView.personList.on(Event.CLICK,this,this.request_getUserInfo);
			FriendListCtrl.friendListView.personManage.on(Event.CLICK,this,this.request_ManageUser);
		}

		static getInstance():FriendListCtrl
		{
			if(!FriendListCtrl._instance)
				FriendListCtrl._instance = new FriendListCtrl();
			    return FriendListCtrl._instance;
		}

		/**
		 * 显示好友列表面板
		 */
		showFriendList(): void
		{
			UILayerManager.uiLayer.addChild(FriendListCtrl.friendListView);
			FriendListCtrl.friendListView.visible = true;
			FriendListCtrl.friendListView.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriendListCtrl.friendListView.width/2;
			FriendListCtrl.friendListView.y = this.toolBarH;
			// 获取好友页数信息
            this.request_getUserInfo();
		}

		/** 获取好友列表页数信息 */
		request_getUserInfo():void{
            models.friendList.FriendListModel.callback=this.setPageInfo;
            FriendListCtrl.friendListModel.request_getUserPage(null);
        }

        setPageInfo(takeData?:any):void{
			FriendListCtrl.friendListView.setPageInfo(takeData);
        }

		/**  获取好友列表用户具体信息 */
		request_getUserList(pg:number,odb:string,sr:number):void{
			models.friendList.FriendListModel.callback=this.addPerson;
			FriendListCtrl.friendListModel.request_getUserInfo(pg,odb,sr);
		}

		addPerson(takeData?:any):void{
			FriendListCtrl.friendListView.addPerson(takeData);
		}

		/** 获取好友管理用户信息 */
		request_ManageUser():void{
			let pageNum:number=parseInt(FriendListCtrl.friendListView.firstPage.text);
			models.friendList.FriendListModel.callback=this.addManageUser;
			FriendListCtrl.friendListModel.requset_getManageUser(pageNum);
		}

		addManageUser(takeData?:any):void{
			FriendListCtrl.friendListView.addManageUser(takeData);
		}

		/** 刷新好友管理列表 */
		request_freshManageList():void{
			models.friendList.FriendListModel.callback=this.addManageUser;
			FriendListCtrl.friendListModel.requset_getManageUser(1);
		}

		/** 获取想要添加的好友信息 */
		request_addFriend(palName:string,pg:number):void{
			models.friendList.FriendListModel.callback=this.showNewPalView;
			FriendListCtrl.friendListModel.requset_addPals(palName,pg);
		}

		showNewPalView(takeData?:any):void{
			UILayerManager.uiLayer.addChild(FriendListCtrl.addFriendView);
			FriendListCtrl.addFriendView.visible = true;
			FriendListCtrl.addFriendView.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriendListCtrl.addFriendView.width >> 1;
			FriendListCtrl.addFriendView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriendListCtrl.addFriendView.height >> 1;
			// 显示获取到的用户信息
            FriendListCtrl.addFriendView.addNewPalInfo(takeData);
		}
		/** 删除好友 */
		request_deletePal(userId:string):void{
			models.friendList.FriendListModel.callback=this.resetManageUser;
			FriendListCtrl.friendListModel.request_deleteFriend(userId);
		}

		resetManageUser(takeData?:any):void{
			FriendListCtrl.friendListView.addManageUser(takeData);
		}


		/** 翻页请求获取搜索到的好友信息 */
		request_getPagePals(palName:string,pg:number):void{
			models.friendList.FriendListModel.callback=this.showPagePals;
			FriendListCtrl.friendListModel.requset_addPals(palName,pg);
		}

		showPagePals(takeData?:any):void{
            FriendListCtrl.addFriendView.addNewPalInfo(takeData);
		}

		/**  获取好友请求列表 */
		request_getPalsApply(pg:number):void{
			models.friendList.FriendListModel.callback=this.showApllyList;
			FriendListCtrl.friendListModel.request_getApplyPals(pg);
		}

		showApllyList(takeData?:any):void{
			UILayerManager.uiLayer.addChild(FriendListCtrl.applyListView);
			FriendListCtrl.applyListView.visible = true;
			FriendListCtrl.applyListView.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriendListCtrl.applyListView.width >> 1;
			FriendListCtrl.applyListView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriendListCtrl.applyListView.height >> 1;
			// 显示获取到的用户信息
			FriendListCtrl.applyListView.addNewPalInfo(takeData);
		}
	}


}
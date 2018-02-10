namespace controllers.player
{
	import PlayerInfoModel = models.player.PlayerInfoModel;
	// import PlayerInfoView = views.player.PlayerInfoView;
	// import * as PlayerInfoUI from "ui.gameUI.PlayerInfoUI";
	import EventDispatcher = laya.events.EventDispatcher;
	import TeaGardenCtrl = controllers.teaRoom.TeaGardenCtrl;
	/**
	* 玩家信息控制器
	*/
	export class PlayerInfoCtrl
	{
		static playerInfoModel: PlayerInfoModel = PlayerInfoModel.instance;
		static playerInfoView: views.player.PlayerInfoView;
		static friendInfoView: views.player.FriendInfoView;
		static eventDispatcher: EventDispatcher = new EventDispatcher();

		private static _instance: PlayerInfoCtrl;

		/**
		 * 玩家信息是否初始化完成
		 */
		isPlayerInfoInited:boolean = false;

		constructor()
		{
			if (!PlayerInfoCtrl.playerInfoView)
				PlayerInfoCtrl.playerInfoView = new views.player.PlayerInfoView();
			if (!PlayerInfoCtrl.friendInfoView)
				PlayerInfoCtrl.friendInfoView = new views.player.FriendInfoView();
		}

		static get instance(): PlayerInfoCtrl
		{
			if (!PlayerInfoCtrl._instance)
				PlayerInfoCtrl._instance = new PlayerInfoCtrl();
			return PlayerInfoCtrl._instance;
		}

		/** 请求玩家信息数据 */
		request_getUserInfo(): void
		{
			PlayerInfoModel.callback = this.getUserInfoOver;
			PlayerInfoModel.instance.request_getUserInfo();
		}

		/** 请求好友信息数据 */
		request_getFriendInfo(uid:string): void
		{
			PlayerInfoModel.callback = this.getFriendInfoOver;
			PlayerInfoModel.instance.request_getFriendInfo(uid);
		}

		/** 数据的填充，玩家信息的显示 */
		getUserInfoOver(): void
		{
			if (!PlayerInfoCtrl.playerInfoModel)
				return;

			PlayerInfoCtrl._instance.showPlayerInfo();

			if(!this.isPlayerInfoInited)
			{
				if (!PlayerInfoCtrl.eventDispatcher)
					PlayerInfoCtrl.eventDispatcher = new EventDispatcher();
				PlayerInfoCtrl.eventDispatcher.event(HttpConfig.SERVER_CONNECTED);	// 登录成功 !
			}
			this.isPlayerInfoInited = true;
		}


		/** 好友玩家数据填充 */
		getFriendInfoOver(): void
		{
			/** 显示好友面板信息 */
			PlayerInfoCtrl._instance.showFriendInfo();
		}

		/**
		 * 更新玩家的金币、钻石、经验，并重新渲染
		 */
		updatePlayerDataAndRender(receiveData:Object):void
		{
			if(!receiveData)
				return;

			if(receiveData["_g"])	// 金币
				PlayerInfoModel.playerInfo.money += parseInt(receiveData["_g"]+"");
			if(receiveData["_y"])	// 钻石
				PlayerInfoModel.playerInfo.diamond += parseInt(receiveData["_y"]+"");
			if(receiveData["_e"])   // 经验
				PlayerInfoModel.playerInfo.exp += parseInt(receiveData["_e"]+"");
			if(receiveData["exp"])  // 经验
				PlayerInfoModel.playerInfo.exp += parseInt(receiveData["exp"]+"");

			if(PlayerInfoModel.playerInfo.exp > PlayerInfoModel.playerInfo.nextLevelExp)
			{
				// this.request_getUserInfo();	// 暂屏蔽
				PlayerInfoModel.playerInfo.exp -= PlayerInfoModel.playerInfo.nextLevelExp;
				PlayerInfoModel.playerInfo.level++;
				PlayerInfoCtrl.instance.showPlayerInfo();
			}
			else
				PlayerInfoCtrl.instance.showPlayerInfo();
		}

		/**
		 * 更新玩家显示数据
		 */
		private showPlayerInfo():void
		{
			PlayerInfoCtrl.playerInfoView.initUI(PlayerInfoModel.playerInfo);
		}

		/** 更新好友玩家显示数据 */
		private showFriendInfo():void{
			PlayerInfoCtrl.friendInfoView.initFriendUI(PlayerInfoModel.friendInfo);
		}

		/** model 数据的清理 */
		static disposeModel(): void
		{
			PlayerInfoModel.dispose();

		}
		/** view 的移除及清理 */
		static disposeUI(): void
		{
			this.playerInfoView.removeChildren();
			this.playerInfoView.removeSelf();

		}


	}
}
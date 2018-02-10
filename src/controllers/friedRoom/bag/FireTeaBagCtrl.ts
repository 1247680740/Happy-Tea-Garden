namespace controllers.friedRoom.bag
{
	import FireTeaBagModel = models.friedRoom.bag.FireTeaBagModel;
	import Event = laya.events.Event;

	/**
	* 炒茶背包控制器
	*/
	export class FireTeaBagCtrl
	{
		static model: FireTeaBagModel;
		static view: views.friedRoom.bag.FireTeaBagDialogView;

		private static instance: FireTeaBagCtrl;

		constructor()
		{
			FireTeaBagCtrl.init();

		}

		static getInstance(): FireTeaBagCtrl
		{
			if (!FireTeaBagCtrl.instance)
				FireTeaBagCtrl.instance = new FireTeaBagCtrl();
			else
				FireTeaBagCtrl.init();

			return FireTeaBagCtrl.instance;
		}

		private static init():void
		{
			if (!FireTeaBagCtrl.model)
				FireTeaBagCtrl.model = FireTeaBagModel.getInstance();

			FireTeaBagCtrl.view = new views.friedRoom.bag.FireTeaBagDialogView();
			FireTeaBagCtrl.view.toolTab.on(Event.CLICK,this,this.request_getBag);
		}

		/**
		 * 点击工具栏背包图标显示背包面板
		 */
		showFireTeaBagDialog(): void
		{
			if(!UILayerManager.uiLayer.getChildByName("fireTeaBagDialogView"))
			{
				FireTeaBagCtrl.view.name = "fireTeaBagDialogView";
				UILayerManager.uiLayer.addChild(FireTeaBagCtrl.view);
			}

			FireTeaBagCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - FireTeaBagCtrl.view.width >> 1;
			FireTeaBagCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FireTeaBagCtrl.view.height >> 1;

			FireTeaBagCtrl.request_getBag();
		}

		/**
		 * 请求背包中道具数据接口
		 */
		static request_getBag(): void
		{
			FireTeaBagModel.callback = FireTeaBagCtrl.instance.getBagToolOver;
			FireTeaBagCtrl.model.request_getBag();
		}

		private getBagToolOver(): void
		{
			FireTeaBagCtrl.view.addBagGrid(FireTeaBagCtrl.model.toolVOArr);

		}

	}
}
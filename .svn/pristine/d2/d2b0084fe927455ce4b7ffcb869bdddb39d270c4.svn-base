namespace controllers.teaRoom.bag
{
	import BagModel = models.teaRoom.bag.BagModel;
	import Event = laya.events.Event;

	/**
	* 背包相关控制器
	*/
	export class BagCtrl
	{
		static bagModel: BagModel;
		// 与 LandView 产生关联
		static bagDialogView: views.teaRoom.bag.BagDialogView;

		private static instance: BagCtrl;

		constructor()
		{
			BagCtrl.init();

		}

		static getInstance(): BagCtrl
		{
			if (!BagCtrl.instance)
				BagCtrl.instance = new BagCtrl();
			else
				BagCtrl.init();

			return BagCtrl.instance;
		}

		private static init():void
		{
			if (!BagCtrl.bagModel)
				BagCtrl.bagModel = BagModel.getInstance();

			BagCtrl.bagDialogView = new views.teaRoom.bag.BagDialogView();
			BagCtrl.bagDialogView.seedTab.on(Event.CLICK,this,this.request_getBagSeed);
			BagCtrl.bagDialogView.toolTab.on(Event.CLICK,this,this.request_getBagTool);
		}

		/**
		 * 点击工具栏背包图标显示背包面板
		 */
		showBagDialog(): void
		{
			if(!UILayerManager.uiLayer.getChildByName("bagDialogView"))
			{
				BagCtrl.bagDialogView.name = "bagDialogView";
				UILayerManager.uiLayer.addChild(BagCtrl.bagDialogView);
			}

			BagCtrl.bagDialogView.x = configs.GameConfig.GAME_WINDOW_WIDTH - BagCtrl.bagDialogView.width >> 1;
			BagCtrl.bagDialogView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - BagCtrl.bagDialogView.height >> 1;
			BagCtrl.request_getBagSeed();
		}

		/**
		 * 请求背包中种子的数据
		 */
		static request_getBagSeed(): void
		{
			BagModel.callback = BagCtrl.instance.getBagSeedOver;
			BagCtrl.bagModel.request_getBagSeed();
		}

		getBagSeedOver(takeData?: any): void
		{
			BagCtrl.bagDialogView.addBagGrid(BagCtrl.bagModel.seedVOArr);
		}

		/**
		 * 请求背包中道具数据
		 */
		static request_getBagTool(): void
		{
			BagModel.callback = BagCtrl.instance.getBagToolOver;
			BagCtrl.bagModel.request_getBagProp();
		}

		getBagToolOver(takeData?: any): void
		{
			BagCtrl.bagDialogView.addBagGrid(BagCtrl.bagModel.toolVOArr);

		}

	}
}
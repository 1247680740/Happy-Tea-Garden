namespace controllers.friedRoom.shop
{
	import Event = laya.events.Event;
	import FriedTeaHomeShopModel = models.friedRoom.shop.FriedTeaHomeShopModel;

	/**
	 * 炒茶室商店相关控制器
	 */
	export class FriedTeaHomeShopCtrl
	{
		static model:FriedTeaHomeShopModel;
		static view:views.friedRoom.shop.FriedTeaShopDialogView;

		/** 底部工具栏的高度 */
		private toolBarH: number = 30;

		private static _instance:FriedTeaHomeShopCtrl;

		constructor()
		{
			if(!FriedTeaHomeShopCtrl.model)
				FriedTeaHomeShopCtrl.model = FriedTeaHomeShopModel.instance;
			if(!FriedTeaHomeShopCtrl.view)
				FriedTeaHomeShopCtrl.view = new views.friedRoom.shop.FriedTeaShopDialogView();

			FriedTeaHomeShopCtrl.view.seedTab.on(Event.CLICK,this,this.request_getChaoMaterial);
			FriedTeaHomeShopCtrl.view.toolTab.on(Event.CLICK,this,this.request_getShopScroll);
			FriedTeaHomeShopCtrl.view.rightContent.buyBtn.on(Event.CLICK,this,this.request_buySingleGoods);
		}

		static getInstance():FriedTeaHomeShopCtrl
		{
			if(!FriedTeaHomeShopCtrl._instance)
				FriedTeaHomeShopCtrl._instance = new FriedTeaHomeShopCtrl();
			return FriedTeaHomeShopCtrl._instance;
		}

		/**
		 * 点击工具栏商店图标显示商店面板
		 */
		showShopDialog(): void
		{
			UILayerManager.uiLayer.addChild(FriedTeaHomeShopCtrl.view);
			FriedTeaHomeShopCtrl.view.visible = true;
			FriedTeaHomeShopCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriedTeaHomeShopCtrl.view.width >> 1;
			FriedTeaHomeShopCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriedTeaHomeShopCtrl.view.height - this.toolBarH * 2;

			this.request_getChaoMaterial();
		}

		/**
		 * 炒茶原料选项卡
		 */
		request_getChaoMaterial():void
		{
			FriedTeaHomeShopModel.callback = this.getChaoMaterialOver;
			FriedTeaHomeShopCtrl.model.request_getChaoMaterial();
		}

		private getChaoMaterialOver(seedObjArr:Array<any>):void
		{
			FriedTeaHomeShopCtrl.view.addTabGrids(seedObjArr);
		}

		/**
		 * 道具选项卡
		 */
		request_getShopScroll():void
		{
			FriedTeaHomeShopModel.callback = this.getShopScrollOver;
			FriedTeaHomeShopCtrl.model.request_getShopScroll();
		}

		private getShopScrollOver(toolObjArr:Array<any>):void
		{
			FriedTeaHomeShopCtrl.view.addTabGrids(toolObjArr);
		}

		/**
		 * 购买物品
		 */
		request_buySingleGoods()
		{
			FriedTeaHomeShopCtrl.model.request_buySingleGoods(FriedTeaHomeShopCtrl.view.curBuyObj);
		}

	}
}
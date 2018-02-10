namespace controllers.makeRoom.shop
{
	import Event = laya.events.Event;
	import makeTeaHomeShopModel = models.makeRoom.shop.MakeTeaHomeShopModel;

	/**
	 * 泡茶室商店相关控制器
	 */
	export class MakeTeaHomeShopCtrl
	{
		static model:makeTeaHomeShopModel;
		static view:views.makeRoom.shop.MakeTeaShopDialogView;

		/** 底部工具栏的高度 */
		private toolBarH: number = 30;

		private static _instance:MakeTeaHomeShopCtrl;

		constructor()
		{
			if(!MakeTeaHomeShopCtrl.model)
				MakeTeaHomeShopCtrl.model = makeTeaHomeShopModel.instance;
			if(!MakeTeaHomeShopCtrl.view)
				MakeTeaHomeShopCtrl.view = new views.makeRoom.shop.MakeTeaShopDialogView();

			MakeTeaHomeShopCtrl.view.seedTab.on(Event.CLICK,this,this.request_getChaoMaterial);
			MakeTeaHomeShopCtrl.view.toolTab.on(Event.CLICK,this,this.request_getShopScroll);
			MakeTeaHomeShopCtrl.view.rightContent.buyBtn.on(Event.CLICK,this,this.request_buySingleGoods);
		}

		static getInstance():MakeTeaHomeShopCtrl
		{
			if(!MakeTeaHomeShopCtrl._instance)
				MakeTeaHomeShopCtrl._instance = new MakeTeaHomeShopCtrl();
			return MakeTeaHomeShopCtrl._instance;
		}

		/**
		 * 点击工具栏商店图标显示商店面板
		 */
		showShopDialog(): void
		{
			UILayerManager.uiLayer.addChild(MakeTeaHomeShopCtrl.view);
			MakeTeaHomeShopCtrl.view.visible = true;
			MakeTeaHomeShopCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - MakeTeaHomeShopCtrl.view.width >> 1;
			MakeTeaHomeShopCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - MakeTeaHomeShopCtrl.view.height - this.toolBarH * 2;

			this.request_getChaoMaterial();
		}

		/**
		 * 泡茶原料选项卡
		 */
		request_getChaoMaterial():void
		{
			makeTeaHomeShopModel.callback = this.getChaoMaterialOver;
			MakeTeaHomeShopCtrl.model.request_getChaoMaterial();
		}

		private getChaoMaterialOver(seedObjArr:Array<any>):void
		{
			MakeTeaHomeShopCtrl.view.addTabGrids(seedObjArr);
		}

		/**
		 * 道具选项卡
		 */
		request_getShopScroll():void
		{
			makeTeaHomeShopModel.callback = this.getShopScrollOver;
			MakeTeaHomeShopCtrl.model.request_getShopScroll();
		}

		private getShopScrollOver(toolObjArr:Array<any>):void
		{
			MakeTeaHomeShopCtrl.view.addTabGrids(toolObjArr);
		}

		/**
		 * 购买物品
		 */
		request_buySingleGoods()
		{
			MakeTeaHomeShopCtrl.model.request_buySingleGoods(MakeTeaHomeShopCtrl.view.curBuyObj);
		}

	}
}
namespace controllers.teaRoom.shop
{
	import Event = laya.events.Event;
	import ShopModel = models.teaRoom.shop.ShopModel;
	// import ShopDialogView = views.teaRoom.shop.ShopDialogView;

	/**
	 * 商店相关的控制器
	 */
	export class ShopCtrl
	{
		static model:ShopModel;
		static view:views.teaRoom.shop.ShopDialogView;

		/** 底部工具栏的高度 */
		private toolBarH: number = 30;

		private static _instance:ShopCtrl;

		constructor()
		{
			if(!ShopCtrl.model)
				ShopCtrl.model = ShopModel.instance;
			if(!ShopCtrl.view)
				ShopCtrl.view = new views.teaRoom.shop.ShopDialogView();

			ShopCtrl.view.seedTab.on(Event.CLICK,this,this.request_getSeed);
			ShopCtrl.view.toolTab.on(Event.CLICK,this,this.request_getTool);
			ShopCtrl.view.decorateTab.on(Event.CLICK,this,this.request_getDecorate);
			// ShopCtrl.view.on(Event.CLICK,this,this.itemClkedFn);
			ShopCtrl.view.rightContent.buyBtn.on(Event.CLICK,this,this.request_buySingleGoods);
		}

		static getInstance():ShopCtrl
		{
			if(!ShopCtrl._instance)
				ShopCtrl._instance = new ShopCtrl();
			return ShopCtrl._instance;
		}

		/**
		 * 点击工具栏商店图标显示商店面板
		 */
		showShopDialog(): void
		{
			// UILayerManager.uiLayer.addChildAt(ShopCtrl.view,UILayerManager.uiLayer.numChildren-1);
			UILayerManager.uiLayer.addChild(ShopCtrl.view);
			ShopCtrl.view.visible = true;
			ShopCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - ShopCtrl.view.width >> 1;
			ShopCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - ShopCtrl.view.height - this.toolBarH * 2;

			this.request_getSeed();
		}

		/**
		 * 种子选项卡
		 */
		request_getSeed():void
		{
			ShopModel.callback = this.getSeedDataOver;
			ShopCtrl.model.getSeedData();
		}

		getSeedDataOver(seedObjArr:Array<Object>):void
		{
			ShopCtrl.view.addTabGrids(seedObjArr);

		}

		/**
		 * 道具选项卡
		 */
		request_getTool():void
		{
			ShopModel.callback = this.getToolOver;
			ShopCtrl.model.request_getShopProp();
		}

		getToolOver(toolObjArr:Array<Object>):void
		{
			ShopCtrl.view.addTabGrids(toolObjArr);
		}

		/**
		 * 装饰选项卡
		 */
		request_getDecorate():void
		{

		}

		/**
		 * 点击每项，请求右侧的内容信息
		 */
		itemClkedFn(event:Event):void
		{
			let curObj = event.target;
			if(curObj.name == "saleBtn" || curObj.name == "decorateBtn" || curObj.name == "seedTab" || curObj.name == "toolTab" || curObj.name == "decorateTab")
				return;

			ShopCtrl.view.updateRightContent(ShopCtrl.view.curItem);

/*		请求右侧信息（其他地方用）：
			let curItem:any = ShopCtrl.view.curItem;
			if(curItem)
			{
				let paraObj:Object = {"si":curItem["id"],"st":curItem["type"]};
				ShopModel.callback = this.getRightContentOverFn;
				ShopCtrl.model.request_getShopRightContentData(paraObj);
			}
*/
		}

		/**
		 * 更新右侧信息
		 */
		getRightContentOverFn():void
		{
			// ShopCtrl.view.updateRightContent(  );

		}

		/**
		 * 购买物品
		 */
		request_buySingleGoods()
		{
			// 参数格式：{id,type,buyNums})，如：{"si":11,"st":"teaseed","bct":2}
			ShopCtrl.model.request_buySingleGoods(ShopCtrl.view.curBuyObj);
		}

	}
}
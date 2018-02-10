namespace controllers.friedRoom.storage
{
	import FriedTeaStorageModel = models.friedRoom.storage.FriedTeaStorageModel;
	import Event = laya.events.Event;
	import TweenUtil = utils.TweenUtil;
	import GridItemUI = ui.gameUI.common.GridItemUI;

	/**
	 * 炒茶仓库控制器类
	 */
	export class FriedTeaStorageCtrl
	{
		static model:FriedTeaStorageModel;
		static view:views.friedRoom.storage.FriedTeaStorageView;

		private static instance: FriedTeaStorageCtrl;

		constructor()
		{
			if (!FriedTeaStorageCtrl.model)
				FriedTeaStorageCtrl.model = FriedTeaStorageModel.getInstance();
			if (!FriedTeaStorageCtrl.view)
				FriedTeaStorageCtrl.view = new views.friedRoom.storage.FriedTeaStorageView();

			FriedTeaStorageCtrl.view.seedTab.on(Event.CLICK,this,this.request_getMaterial );
			FriedTeaStorageCtrl.view.toolTab.on(Event.CLICK,this,this.request_getTool);
			FriedTeaStorageCtrl.view.fruitTab.on(Event.CLICK,this,this.request_getDepottea);

			FriedTeaStorageCtrl.view.on(Event.CLICK,this,this.itemClkedFn);
			FriedTeaStorageCtrl.view.saleBtn.on(Event.CLICK,this,this.saleFn);
		}

		static getInstance(): FriedTeaStorageCtrl
		{
			if (!FriedTeaStorageCtrl.instance)
				FriedTeaStorageCtrl.instance = new FriedTeaStorageCtrl();
			return FriedTeaStorageCtrl.instance;
		}

		/**
		 * 点击每项，请求右侧的内容信息
		 */
		itemClkedFn(event:Event):void
		{
			let flag:boolean = event.target instanceof ui.gameUI.common.GridItemUI;
			if(!flag)
				return;

			// 原料栏、道具栏、茶叶栏
			let curItem:any = FriedTeaStorageCtrl.view.curItem;
			if(curItem)
			{
				let paraObj:Object = {"si":curItem["id"],"st":curItem["type"]};
				FriedTeaStorageModel.callback = this.getRightContentOverFn;
				FriedTeaStorageCtrl.model.request_getDepotRightContentData(paraObj);
			}
		}

		/**
		 * 卖出操作
		 */
		saleFn(event:Event):void
		{
			let curItem:any = FriedTeaStorageCtrl.view.curItem;
			if(curItem)
			{
				let saleNums:number = parseInt(FriedTeaStorageCtrl.view.saleNumTxt.text);
				switch (curItem["type"])
				{
					case "material":
						if(curItem["seedNums"] >= saleNums)
							curItem["saleNums"] = saleNums;
						break;
					case "book":
					case "saute_tool":
						if(curItem["nums"] >= saleNums)
							curItem["saleNums"] = saleNums;
						break;
					case "leaf":
						if(curItem["fruitNums"] >= saleNums)
							curItem["saleNums"] = saleNums;
						break;
				}
				if(curItem["saleNums"] > 0)
				{
					FriedTeaStorageModel.callback = this.saleOverFn;
					FriedTeaStorageCtrl.model.request_sellSingle({"si":curItem["id"],"st":curItem["type"],"sct":curItem["saleNums"],"q":curItem["quality"]});
				}
			}
		}

		saleOverFn(takeData:any):void
		{
			if(!takeData)
				return;
			if(takeData["errMsg"])
			{
				TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
			}
			else
			{
				if(takeData["exp"] > 0)
					TweenUtil.tweenTo(views.common.CommonDisplay.expPrize(takeData["exp"]));
				if(takeData["money"] > 0)
					TweenUtil.tweenTo(views.common.CommonDisplay.moneyPrize(takeData["money"]));

				// 更新仓库状态
				if(FriedTeaStorageCtrl.view.curSelectedTabName == "seedTab")
				{
					FriedTeaStorageCtrl.instance.request_getMaterial ();
				}
				else if(FriedTeaStorageCtrl.view.curSelectedTabName == "toolTab")
				{
					FriedTeaStorageCtrl.instance.request_getTool();
				}
				else if(FriedTeaStorageCtrl.view.curSelectedTabName == "fruitTab")
				{
					FriedTeaStorageCtrl.instance.request_getDepottea();
				}
			}
		}

		/**
		 * 更新右侧信息（与 FriedTeaStorageView 中的 gridItem 点击事件重复，待整合）
		 */
		getRightContentOverFn():void
		{
			FriedTeaStorageCtrl.view.updateRightContent(FriedTeaStorageModel.curSelectedObjVO);
		}

		/**
		 * 点击工具栏仓库图标显示仓库面板
		 */
		showStorageDialog(): void
		{
			UILayerManager.uiLayer.addChild(FriedTeaStorageCtrl.view.bgUI);
			FriedTeaStorageCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriedTeaStorageCtrl.view.bgUI.width >> 1;
			FriedTeaStorageCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriedTeaStorageCtrl.view.bgUI.height >> 1;

			this.request_getMaterial ();
		}

		/**
		 * 获取种子
		 */
		request_getMaterial ():void
		{
			FriedTeaStorageModel.callback = this.getMaterialOverFn;
			FriedTeaStorageCtrl.model.request_getMaterial ();
		}

		private getMaterialOverFn(takeData?: any):void
		{
			FriedTeaStorageCtrl.view.addStorageGrids(FriedTeaStorageModel.getInstance().seedVOArr);
		}

		/**
		 * 获取道具
		 */
		request_getTool():void
		{
			FriedTeaStorageModel.callback = this.getScrollOverFn;
			FriedTeaStorageCtrl.model.request_getScroll();
		}

		private getScrollOverFn(takeData?: any):void
		{
			FriedTeaStorageCtrl.view.addStorageGrids(FriedTeaStorageModel.getInstance().toolVOArr);
		}

		/**
		 * 获取果实（茶叶）
		 */
		request_getDepottea():void
		{
			FriedTeaStorageModel.callback = this.getDepotteaOverFn;
			FriedTeaStorageCtrl.model.request_getDepottea();
		}

		private getDepotteaOverFn(takeData?: any):void
		{
			FriedTeaStorageCtrl.view.addStorageGrids(FriedTeaStorageModel.getInstance().seedVOArr);
		}

	}
}
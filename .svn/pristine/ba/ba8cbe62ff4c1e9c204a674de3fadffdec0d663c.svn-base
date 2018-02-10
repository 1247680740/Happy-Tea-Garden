namespace controllers.teaRoom.storage
{
	import StorageModel = models.teaRoom.storage.StorageModel;
	import Event = laya.events.Event;
	import TweenUtil = utils.TweenUtil;
	import GridItemUI = ui.gameUI.common.GridItemUI;

	/**
	 * 仓库控制器类
	 */
	export class StorageCtrl
	{
		static model:StorageModel;
		static view:views.teaRoom.storage.StorageDialogView;

		private static instance: StorageCtrl;

		constructor()
		{
			if (!StorageCtrl.model)
				StorageCtrl.model = StorageModel.getInstance();
			if (!StorageCtrl.view)
				StorageCtrl.view = new views.teaRoom.storage.StorageDialogView();

			StorageCtrl.view.seedTab.on(Event.CLICK,this,this.request_getSeed);
			StorageCtrl.view.toolTab.on(Event.CLICK,this,this.request_getTool);
			StorageCtrl.view.fruitTab.on(Event.CLICK,this,this.request_getFruit);
			StorageCtrl.view.decorateTab.on(Event.CLICK,this,this.request_getDecorate);
			StorageCtrl.view.on(Event.CLICK,this,this.itemClkedFn);
			StorageCtrl.view.saleBtn.on(Event.CLICK,this,this.saleFn);
		}

		static getInstance(): StorageCtrl
		{
			if (!StorageCtrl.instance)
				StorageCtrl.instance = new StorageCtrl();
			return StorageCtrl.instance;
		}

		/**
		 * 点击每项，请求右侧的内容信息
		 */
		itemClkedFn(event:Event):void
		{
			let flag:boolean = event.target instanceof ui.gameUI.common.GridItemUI;
			if(!flag)
				return;

			// 果实栏读取的是本地数据
			if(StorageCtrl.view.curSelectedTabName == "fruitTab")
				return;

			// 种子栏、道具栏
			let curItem:any = StorageCtrl.view.curItem;
			if(curItem)
			{
				let paraObj:Object = {"si":curItem["id"],"st":curItem["type"]};
				StorageModel.callback = this.getRightContentOverFn;
				StorageCtrl.model.request_getDepotRightContentData(paraObj);
			}
		}

		/**
		 * 卖出操作
		 */
		saleFn(event:Event):void
		{
			let curItem:any = StorageCtrl.view.curItem;
			if(curItem)
			{
				let saleNums:number = parseInt(StorageCtrl.view.saleNumTxt.text);
				// 种子
				if(curItem["type"].indexOf("seed") > 0)
				{
					if(curItem["seedNums"] >= saleNums)
						curItem["saleNums"] = saleNums;
				} // 果实
				else if(curItem["type"].indexOf("fruit") > 0)
				{
					if(curItem["fruitNums"] >= saleNums)
						curItem["saleNums"] = saleNums;
				} // 道具
				else if(curItem["type"] == "prop")
				{
					if(curItem["nums"] >= saleNums)
						curItem["saleNums"] = saleNums;
				}

				if(curItem["saleNums"] > 0)
				{
					StorageModel.callback = this.saleOverFn;
					StorageCtrl.model.request_sellSingle({"si":curItem["id"],"st":curItem["type"],"sct":curItem["saleNums"]});
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
				if(StorageCtrl.view.curSelectedTabName == "seedTab")
				{
					StorageCtrl.instance.request_getSeed();
				}
				else if(StorageCtrl.view.curSelectedTabName == "toolTab")
				{
					StorageCtrl.instance.request_getTool();
				}
				else if(StorageCtrl.view.curSelectedTabName == "fruitTab")
				{
					StorageCtrl.instance.request_getFruit();
				}
			}
		}

		/**
		 * 更新右侧信息
		 */
		getRightContentOverFn():void
		{
			StorageCtrl.view.updateRightContent(StorageModel.curSelectedObjVO);
		}

		/**
		 * 点击工具栏仓库图标显示仓库面板
		 */
		showStorageDialog(): void
		{
			UILayerManager.uiLayer.addChild(StorageCtrl.view.bgUI);
			StorageCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - StorageCtrl.view.bgUI.width >> 1;
			StorageCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - StorageCtrl.view.bgUI.height >> 1;

			this.request_getSeed();
		}

		/**
		 * 获取种子
		 */
		request_getSeed():void
		{
			StorageModel.callback = this.getSeedOverFn;
			StorageCtrl.model.request_getSeed();
		}

		private getSeedOverFn(takeData?: any):void
		{
			StorageCtrl.view.addStorageGrids(StorageModel.getInstance().seedVOArr);
		}

		/**
		 * 获取道具
		 */
		request_getTool():void
		{
			StorageModel.callback = this.getPropOverFn;
			StorageCtrl.model.request_getProp();
		}

		private getPropOverFn(takeData?: any):void
		{
			StorageCtrl.view.addStorageGrids(StorageModel.getInstance().toolVOArr);

		}

		/**
		 * 获取果实
		 */
		request_getFruit():void
		{
			StorageModel.callback = this.getFruitOverFn;
			StorageCtrl.model.request_getFruit();
		}

		private getFruitOverFn(takeData?: any):void
		{
			StorageCtrl.view.addStorageGrids(StorageModel.getInstance().seedVOArr);

		}

		request_getDecorate():void
		{
			StorageModel.callback = this.getDecorateOverFn;
			StorageCtrl.model.request_getDecorate();
		}

		private getDecorateOverFn(takeData?:any):void
		{
			StorageCtrl.view.addStorageGrids(takeData);
		}

	}
}
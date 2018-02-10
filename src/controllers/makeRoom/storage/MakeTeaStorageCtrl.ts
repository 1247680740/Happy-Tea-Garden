namespace controllers.makeRoom.storage
{
	import MakeTeaStorageModel = models.makeRoom.storage.MakeTeaStorageModel;
	import Event = laya.events.Event;
	import TweenUtil = utils.TweenUtil;

	/**
	 * 泡茶仓库控制器类
	 */
	export class MakeTeaStorageCtrl
	{
		static model:MakeTeaStorageModel;
		static view:views.makeRoom.storage.MakeTeaStorageView;

		private static instance: MakeTeaStorageCtrl;

		/** 底部工具栏的高度 */
		private toolBarH: number = 30;

		constructor()
		{
			if (!MakeTeaStorageCtrl.model)
				MakeTeaStorageCtrl.model = MakeTeaStorageModel.getInstance();
			if (!MakeTeaStorageCtrl.view)
				MakeTeaStorageCtrl.view = new views.makeRoom.storage.MakeTeaStorageView();

			MakeTeaStorageCtrl.view.seedTab.on(Event.CLICK,this,this.request_getMaterial );
			MakeTeaStorageCtrl.view.toolTab.on(Event.CLICK,this,this.request_getTool);
			MakeTeaStorageCtrl.view.on(Event.CLICK,this,this.itemClkedFn);
			MakeTeaStorageCtrl.view.saleBtn.on(Event.CLICK,this,this.saleFn);
		}

		static getInstance(): MakeTeaStorageCtrl
		{
			if (!MakeTeaStorageCtrl.instance)
				MakeTeaStorageCtrl.instance = new MakeTeaStorageCtrl();
			return MakeTeaStorageCtrl.instance;
		}

		/**
		 * 点击每项，请求右侧的内容信息
		 */
		itemClkedFn(event:Event):void
		{
			let flag:boolean = event.target instanceof ui.gameUI.common.GridItemUI;
			if(!flag)
				return;

			// 茶叶栏、道具栏
			let curItem:any = MakeTeaStorageCtrl.view.curItem;
			if(curItem)
			{
				let paraObj:Object = {"si":curItem["id"],"st":curItem["type"]};
				MakeTeaStorageModel.callback = this.getRightContentOverFn;
				MakeTeaStorageCtrl.model.request_getDepotRightContentData(paraObj);
			}
		}

		/**
		 * 卖出操作
		 */
		saleFn(event:Event):void
		{
			let curItem:any = MakeTeaStorageCtrl.view.curItem;
			if(curItem)
			{
				let saleNums:number = parseInt(MakeTeaStorageCtrl.view.saleNumTxt.text);
				switch (curItem["type"])
				{
					case "leaf":
						if(curItem["fruitNums"] >= saleNums)
							curItem["saleNums"] = saleNums;
						break;
					case "water":
						if(curItem["nums"] >= saleNums)
							curItem["saleNums"] = saleNums;
						break;

				}
				if(curItem["saleNums"] > 0)
				{
					MakeTeaStorageModel.callback = this.saleOverFn;
					MakeTeaStorageCtrl.model.request_sellSingle({"si":curItem["id"],"st":curItem["type"],"sct":curItem["saleNums"],"q":curItem["quality"]});
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
				if(MakeTeaStorageCtrl.view.curSelectedTabName == "seedTab")
				{
					MakeTeaStorageCtrl.instance.request_getMaterial ();
				}
				else if(MakeTeaStorageCtrl.view.curSelectedTabName == "toolTab")
				{
					MakeTeaStorageCtrl.instance.request_getTool();
				}
			}
		}

		/**
		 * 更新右侧信息（与 FriedTeaStorageView 中的 gridItem 点击事件重复，待整合）
		 */
		getRightContentOverFn():void
		{
			MakeTeaStorageCtrl.view.updateRightContent(MakeTeaStorageModel.curSelectedObjVO);
		}

		/**
		 * 点击工具栏仓库图标显示仓库面板
		 */
		showStorageDialog(): void
		{
			UILayerManager.uiLayer.addChild(MakeTeaStorageCtrl.view.bgUI);
			MakeTeaStorageCtrl.view.bgUI.visible = true;
			MakeTeaStorageCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - MakeTeaStorageCtrl.view.bgUI.width >> 1;
			MakeTeaStorageCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - MakeTeaStorageCtrl.view.bgUI.height >> 1;

			this.request_getMaterial ();
		}

		/**
		 * 获取茶叶
		 */
		request_getMaterial ():void
		{
			MakeTeaStorageModel.callback = this.getMaterialOverFn;
			MakeTeaStorageCtrl.model.request_getMaterial ();
		}

		private getMaterialOverFn(takeData?: any):void
		{
			MakeTeaStorageCtrl.view.addStorageGrids(MakeTeaStorageModel.getInstance().seedVOArr);
		}

		/**
		 * 获取仓库中水源道具
		 */
		request_getTool():void
		{
			MakeTeaStorageModel.callback = this.getScrollOverFn;
			MakeTeaStorageCtrl.model.request_getScroll();
		}

		private getScrollOverFn(takeData?: any):void
		{
			MakeTeaStorageCtrl.view.addStorageGrids(MakeTeaStorageModel.getInstance().toolVOArr);
		}

	}
}
namespace controllers.friedRoom.pot
{
	import UpGradePotModel = models.friedRoom.pot.UpGradePotModel;
	import Event = laya.events.Event;
	import BuyUpDataTipUI = ui.gameUI.tips.BuyUpDataTipUI;

	/**
	* 炒茶相关控制器
	*/
	export class UpGradePotCtrl
	{
		static model: UpGradePotModel;
		// 炒锅升级整体界面
		static upGradeview: views.friedRoom.pot.UpGradePotView;

		// 购买升级材料弹窗界面
		static dataView: BuyUpDataTipUI;

		private static instance: UpGradePotCtrl;

		// 当前点击的购买对象名称
		curBuyName: string;

		constructor()
		{
			if (!UpGradePotCtrl.model)
				UpGradePotCtrl.model = UpGradePotModel.getInstance();
			if (!UpGradePotCtrl.upGradeview)
				UpGradePotCtrl.upGradeview = new views.friedRoom.pot.UpGradePotView();
			UpGradePotCtrl.upGradeview.name = "upGradeview";
			UpGradePotCtrl.dataView = new ui.gameUI.tips.BuyUpDataTipUI();
			UpGradePotCtrl.dataView.cacheAs = "bitmap";
			// UpGradePotCtrl.upGradeview.upgrade.on(Event.CLICK,this,this.request_getUPDate);
			UpGradePotCtrl.upGradeview.bgUI.closeBtn.on(Event.CLICK, this, this.closeBtnFn);
			UpGradePotCtrl.upGradeview.metal.on(Event.CLICK, this, this.request_getUPDate);
			UpGradePotCtrl.upGradeview.wood.on(Event.CLICK, this, this.request_getUPDate);
			UpGradePotCtrl.upGradeview.water.on(Event.CLICK, this, this.request_getUPDate);
			UpGradePotCtrl.upGradeview.fire.on(Event.CLICK, this, this.request_getUPDate);
			UpGradePotCtrl.upGradeview.earth.on(Event.CLICK, this, this.request_getUPDate);
			UpGradePotCtrl.upGradeview.way.on(Event.CLICK, this, this.request_getUPDate);
		}

		static getInstance(): UpGradePotCtrl
		{
			if (!UpGradePotCtrl.instance)
				UpGradePotCtrl.instance = new UpGradePotCtrl();
			return UpGradePotCtrl.instance;
		}

		//显示炒锅升级弹窗
		showUpGradeDialog(): void
		{
			if (!UILayerManager.friedTeaLayer.getChildByName("upGradeview"))
			{
				UpGradePotCtrl.upGradeview.bgUI.name = "upGradeview";
				UILayerManager.friedTeaLayer.addChild(UpGradePotCtrl.upGradeview.bgUI);
			}
			UpGradePotCtrl.upGradeview.bgUI.visible = true;
			UpGradePotCtrl.upGradeview.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - UpGradePotCtrl.upGradeview.bgUI.width >> 1;
			UpGradePotCtrl.upGradeview.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - UpGradePotCtrl.upGradeview.bgUI.height >> 1;
			this.request_getUPDate();
		}
		closeBtnFn(): void
		{
			// 原写法
			// UpGradePotCtrl.upGradeview.removeSelf();
			// UpGradePotCtrl.upGradeview.destroy(false);
			// UpGradePotCtrl.upGradeview = null;

			UpGradePotCtrl.upGradeview.bgUI.visible = false;
		}

		/** 初始化请求炒锅数据并返回数据请求的操作 */
		request_getUPDate(): void
		{
			UpGradePotModel.callback = UpGradePotCtrl.instance.getUpDateOver;
			UpGradePotCtrl.model.request_getFarmPot();
		}

		getUpDateOver(): void
		{
			UpGradePotCtrl.upGradeview.fillUpData(UpGradePotModel.potArr);
		}
		/** 请求获取炒锅升级成功后的状态变化数据 */
		request_FinishData(id: number): void
		{
			UpGradePotModel.callback = UpGradePotCtrl.instance.getFinishData;
			UpGradePotCtrl.model.request_UpGrade(id);
		}

		getFinishData(takeData: Object): void
		{
			UpGradePotCtrl.upGradeview.finishUpGrade(takeData);	// UpGradePotModel.getInstance().potVOArr
		}
		/** 请求获取中部材料数量并加载 */
		request_needUpData(id: number, level: number): void
		{
			UpGradePotModel.callback = UpGradePotCtrl.instance.fillMidData;
			UpGradePotCtrl.model.request_UPDate(id, level);
		}
		fillMidData(takeData): void
		{
			UpGradePotCtrl.upGradeview.addUpDate(UpGradePotModel.getInstance().potVOArr, takeData);
		}
		willBuyDataOver(potsArr, curBuyName): void
		{
			TipLayerManager.tipLayer.showPotDataTip(potsArr, curBuyName);
		}

		/** 确认购买升级材料 */
		request_confirmBuy(potVO: models.base.PotVO): void
		{
			UpGradePotModel.callback = UpGradePotCtrl.instance.buyOver;
			UpGradePotCtrl.model.request_ConfirmBuy(potVO);
		}

		/**
		 * 材料购买后更新显示
		 */
		private buyOver(takeData: Object): void
		{
			UpGradePotCtrl.model.updatePotVOArr(takeData["toolId"]);

			if (UpGradePotCtrl.model.takeData)
			{
				let obj: Object = UpGradePotCtrl.model.takeData;
				if (!obj)
					return;
				if (obj["hi"] && obj["hl"])
				{
					UpGradePotCtrl.upGradeview.showData(UpGradePotCtrl.model.potVOArr, obj["hi"], obj["hl"]);
				}
			}
		}

		/** 取消购买，升级 */
		cancelBtnClkFn(): void
		{
			UpGradePotCtrl.upGradeview.removeChild(UpGradePotCtrl.dataView);
			UpGradePotCtrl.dataView = null;
		}

	}
}
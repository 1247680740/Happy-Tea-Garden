namespace controllers.friedRoom.pot
{
	import PotVO=models.friedRoom.pot.PotVO;
	import SceneLayerManager = managers.SceneLayerManager;
	import TipLayerManager = managers.TipLayerManager;
	import Event = laya.events.Event;
	import PotModel=models.friedRoom.pot.PotModel;
	/**
	 * 炒锅相关的控制类
	 */
	export class PotCtrl
	{
		static potModel: PotModel;
		static friedPotView: views.friedRoom.pot.FriedPotView;
		static friedTeaDialogView:views.friedRoom.pot.FriedTeaDialogView;
		/** 底部工具栏的高度 */
		private toolBarH: number = 30;
		private static instance:PotCtrl;
		/** 当前开启的锅位 */
		private curPotId:number;
		private curSelectName:string;

		static callback:Function;

		constructor()
		{
			PotCtrl.potModel = PotModel.getInstance();
			if(!PotCtrl.friedPotView)
				PotCtrl.friedPotView = new views.friedRoom.pot.FriedPotView();
		}
		static getInstance():PotCtrl
		{
			if(!PotCtrl.instance)
				PotCtrl.instance = new PotCtrl();
			return PotCtrl.instance;
		}

		/** 点击 “未激活” 图标，准备激活 */
		willAssartFun(id:number):void
		{
			this.curPotId = id;
			PotModel.callback = this.getAssartPotInfoOver;
			PotCtrl.potModel.request_getAssartPotInfo(this.curPotId);
		}

		/** 激活炒锅对话框 */
		getAssartPotInfoOver(takeData?:PotVO):void
		{
			if(takeData)
				console.info("== PotCtrl, takeData:"+takeData);
			let needMoney:number= takeData["t"];
			// 激活提示
			TipLayerManager.tipLayer.showEnableTip(needMoney);
		}

		/** 请求炒锅接口 */
		 request_getFarmPot(): void
		{
			PotModel.callback = PotCtrl.instance.getFarmPotOver;
			PotCtrl.potModel.request_getCauldron();
		}

		/** 填充炒锅 */
		private getFarmPotOver(): void
		{
			PotCtrl.friedPotView.fillPot(PotModel.potArr);


		}

		/** 激活炒锅 */
		request_actAssartPot():void
		{
			PotModel.callback = this.actAssartPotOver;
			PotCtrl.potModel.request_actAssartPot(this.curPotId);
		}

		/**
		 * 激活完成
		 */
		private actAssartPotOver(potId:number):void
		{
			// 更新炒锅状态
			PotCtrl.friedPotView.updatePotGrid(potId);
		}

		/**
		 * 更新炒锅的显示状态
		 */
		potLevelUpOver(takeData:Object):void
		{
			let potId:number = takeData["potId"];
			let curPotVO:models.friedRoom.pot.PotVO = PotModel.getPotVOByPotId(potId);
			if(!curPotVO)
				return;
		}

		/**
		 * 单个收获炒锅中的茶叶
		 */
		request_reapTea(potVO:PotVO){
			PotModel.callback = this.singleHarvestOver;
			PotCtrl.potModel.request_reapTeaInfo(potVO.id);
		}

		private singleHarvestOver(takeData:Object):void
		{
			if(!takeData)
				return;

			let potId:number = takeData["potId"];

			if(PotCtrl.callback)
				PotCtrl.callback(potId);
		}

		/**
		 * 清除炒锅中的茶叶
		 */
		request_brushPot(potVO:PotVO)
		{
			if(!potVO)
				return;
			if(potVO.status==1 || potVO.status==2)
			{
				PotModel.callback = this.brushPotOver;
				PotCtrl.potModel.request_brushPotInfo(potVO.id);
			}
		}

		/**
		 * 使用火把加火
		 */
		request_sauteUseTool(potId:number,toolId:number):void
		{
			PotModel.callback = this.useToolOver;
			PotCtrl.potModel.request_sauteUseTool(potId,toolId);
		}

		/**
		 * @param leftTime 使用火把后的剩余时间（秒）
		 */
		private useToolOver(takeData:Object):void
		{
			if(PotCtrl.callback)
				PotCtrl.callback(takeData);
		}

		private brushPotOver(takeData:Object):void
		{
			if(PotCtrl.callback)
				PotCtrl.callback(takeData);
		}
	}
}
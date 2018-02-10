namespace controllers.friedRoom.pot
{
	import PlayerInfoModel = models.player.PlayerInfoModel;
	import FriedTeaDialogModel = models.friedRoom.pot.FriedTeaDialogModel;
	import PotVO = models.friedRoom.pot.PotVO;
	import Event = laya.events.Event;

	/**
	* 炒茶相关控制器
	*/
	export class FriedTeaDialogCtrl
	{
		// 炒茶整体界面
		static model:models.friedRoom.pot.FriedTeaDialogModel;
		static potView:views.friedRoom.pot.PotGridView;
		static view:views.friedRoom.pot.FriedTeaDialogView;
		private static instance: FriedTeaDialogCtrl;
		/** 当前点击的的左侧某个茶叶位置 */
		private curTeaId:number;

		constructor()
		{
			if (!FriedTeaDialogCtrl.model)
				FriedTeaDialogCtrl.model = FriedTeaDialogModel.getInstance();
			if (!FriedTeaDialogCtrl.view)
				FriedTeaDialogCtrl.view = new views.friedRoom.pot.FriedTeaDialogView();

			FriedTeaDialogCtrl.view.tab1.on(Event.CLICK,this,this.request_getAllTea);
			FriedTeaDialogCtrl.view.tab2.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("green");
			});
			FriedTeaDialogCtrl.view.tab3.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("red");
			});
			FriedTeaDialogCtrl.view.tab4.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("uron");
			});
			FriedTeaDialogCtrl.view.tab5.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("white");
			});
			FriedTeaDialogCtrl.view.tab6.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("yellow");
			});
			FriedTeaDialogCtrl.view.tab7.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("black");
			});
			FriedTeaDialogCtrl.view.tab8.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("flower");
			});
			FriedTeaDialogCtrl.view.tab9.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.request_getClassify("ginseng");
			});
			FriedTeaDialogCtrl.view.btn_affirm.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.friedTeaFn();	// FriedTeaDialogCtrl.view.curBuyTeaArr	// hsx
			});
			FriedTeaDialogCtrl.view.btn_buy1.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.showBuyDataTip(FriedTeaDialogCtrl.view.curBuyTeaArr);	// FriedTeaDialogCtrl.view.curBuyTeaArr // hsx
			});
			FriedTeaDialogCtrl.view.btn_buy2.on(Event.CLICK,this,function():void{
				FriedTeaDialogCtrl.instance.showBuyDataTip(FriedTeaDialogCtrl.view.curBuyBookArr);
			});
		}

		static getInstance(): FriedTeaDialogCtrl
		{
			if (!FriedTeaDialogCtrl.instance)
				FriedTeaDialogCtrl.instance = new FriedTeaDialogCtrl();
			return FriedTeaDialogCtrl.instance;
		}

		/**
		 * 炒茶操作
		 */
		friedTeaFn():void
		{
			if(FriedTeaDialogCtrl.view.potLvlNotEnough.visible)
			{
				TipLayerManager.tipLayer.showDrawBgTip("炒锅等级不足，快去升级炒锅吧！");
				return;
			}
			let teaId:number = FriedTeaDialogCtrl.view.curPotVO.teaId;
			let potId:number = FriedTeaDialogCtrl.view.curPotVO.id;
			let potStatus:number = FriedTeaDialogCtrl.view.curPotVO.status;
			let teaNums:number = parseInt(FriedTeaDialogCtrl.view.teaNums.text);

			FriedTeaDialogCtrl.instance.startFriedTea(teaId,potId,teaNums,potStatus);
		}

		/**
		 * 开始炒茶
		 */
		startFriedTea(teaid:number,potid:number,teaNums:number,potStatus:number):void{
			FriedTeaDialogModel.callback=this.startFriedTeaFn;
			FriedTeaDialogCtrl.model.request_startFriedTea(teaid,potid,teaNums,potStatus);
		}

		startFriedTeaFn(vo:models.base.PotVO):void{
			FriedTeaDialogCtrl.view.startFriedTea(vo);
		}

		/**
		 * 点击炒锅显示炒茶界面
		 */
		showFriedTeaDialog(potVO:PotVO): void
		{
			// FriedTeaDialogCtrl.view.popup();
			UILayerManager.friedTeaLayer.addChild(FriedTeaDialogCtrl.view.bgUI);
			// FriedTeaDialogCtrl.view.visible = true;
			FriedTeaDialogCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriedTeaDialogCtrl.view.bgUI.width >> 1;
			FriedTeaDialogCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriedTeaDialogCtrl.view.bgUI.height >> 1;

			FriedTeaDialogCtrl.view.curPotVO = potVO;
			//获取全部茶叶种类
			this.request_getAllTea();
		}

		/**
		 * 获取全部茶叶
		 */
		request_getAllTea():void
		{
			FriedTeaDialogModel.callback = this.getTeaOverFn;
			FriedTeaDialogCtrl.model.request_getAllTea();
		}

		private getTeaOverFn():void
		{
			FriedTeaDialogCtrl.view.addStorageGrids(FriedTeaDialogModel.getInstance().allTeaVOArr);
		}

		/**
		 * 获取分类茶叶
		 */
		 request_getClassify(type:string):void{
			 FriedTeaDialogModel.callback = this.getTeaOverFn;
			 FriedTeaDialogCtrl.model.request_getClassify(type);
		 }

		/**
		 * 请求右侧茶叶详情信息
		 */
		itemClkedFn(seedVO:models.base.SeedVO):void
		{
			FriedTeaDialogModel.callback=this.getRrightContent;
			FriedTeaDialogCtrl.model.request_getDepotRightContentData(seedVO.id);
		}

		private getRrightContent(takeData:Object):void
		{
			FriedTeaDialogCtrl.view.updateRightContent(FriedTeaDialogModel.getInstance().teaShowVOArr,takeData["teaId"]);
		}

		/**
		 * 请求右侧炒茶所需配方
		 */
		itemClkedMaterial(teaId:number):void
		{
		   FriedTeaDialogModel.callback=this.getRightMaterContent;
		   FriedTeaDialogCtrl.model.request_getMaterRightContentData(teaId);

		}

		private getRightMaterContent(takeData:Object):void
		{
			FriedTeaDialogCtrl.view.curPotVO.teaId = takeData["teaId"];
			FriedTeaDialogCtrl.view.loadFriedTeaSecret(FriedTeaDialogModel.getInstance().teaShowVOArr);
		}

		/**
		 * 购买炒茶所需材料
		 *
		 * 数组依次包含： type price id name lockNums
		 */
		request_getFriedTeaData(curBuyArr:Array<any>):void   //type:string,id:number,num:number
		{
			FriedTeaDialogModel.callback = this.getRightMaterContent;
			FriedTeaDialogCtrl.model.request_buySingleGoods(curBuyArr[0],curBuyArr[2],curBuyArr[4]);
		}

		// 显示购买材料对话框
		private showBuyDataTip(toolArrVO:Array<any>)
		{
			console.log("改版后的数据："+JSON.stringify(toolArrVO));

			if(!toolArrVO || toolArrVO.length==0)
				return;

			let info: string;
			let canSubmit:boolean=true;
			// type price id name lockNums
			if (toolArrVO[0] == "teafruit")
			{
				info = "你确定要花费1钻石购买" + toolArrVO[4] + "份" + toolArrVO[3] + "吗？";
				if (PlayerInfoModel.playerInfo.diamond < 1)
				{
					canSubmit = false;
					info += "\n当前等级不足或金币、钻石不足，无法购买鲜叶！";
				}
			}
			else if (toolArrVO[0] == "book")
			{
				// type price id name lockNums
				info = "你确定要花费" + toolArrVO[1] + "金币购买一本" + toolArrVO[3] + "吗？";
				if (PlayerInfoModel.playerInfo.money < toolArrVO[1])
				{
					canSubmit = false;
					info += "\n当前金币、钻石不足，无法购买工艺书！";
				}
			}
			// }
			TipLayerManager.tipLayer.showYesNoTip(info,function():void{
				FriedTeaDialogCtrl.getInstance().request_getFriedTeaData(toolArrVO);
			},null,canSubmit);
		}
	}
}
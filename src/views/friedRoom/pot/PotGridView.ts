namespace views.friedRoom.pot
{
	import CropView = views.teaRoom.crop.CropView;
	import CropCtrl = controllers.teaRoom.crop.CropCtrl;
	import CropModel = models.teaRoom.crop.CropModel;
	import CropVO = models.base.CropVO;
	import BagCtrl = controllers.teaRoom.bag.BagCtrl;
	import Event = laya.events.Event;
	import GameConfig = configs.GameConfig;
	import GlowFilter = laya.filters.GlowFilter;
    import ColorFilter = laya.filters.ColorFilter;
    import PotCtrl=controllers.friedRoom.pot.PotCtrl;
	import PotVO=models.friedRoom.pot.PotVO;
	import FriedTeaDialogView=views.friedRoom.pot.FriedTeaDialogView;
	import FriedTeaDialogCtrl=controllers.friedRoom.pot.FriedTeaDialogCtrl;
	import FriedTeaDialogModel=models.friedRoom.pot.FriedTeaDialogModel;

	import MovieClip = laya.ani.swf.MovieClip;
	import Timer = laya.utils.Timer;
	import PotTimerUtil = utils.PotTimerUtil;
	import PotTipUI = ui.gameUI.pot.PotTipUI;
	import Component = laya.ui.Component;
	import Node = laya.display.Node;

	/**
	 * 单个炒锅视图
	 *
	 * 显示状态：
	 * 1、锅的底图（每种锅对应不同底图）
	 * 2、锅（不同类型、不同等级、强化等级相关状态）
	 *
	 * 炒锅等级  0：未开启 1: 生铁锅 2：铜炒锅，3:黄金锅，4：玄铁锅，5：寒铁锅 6：精钢锅  7：耀光锅
	 */
	export class PotGridView  extends ui.gameUI.pot.FriedTeaPotUI
	{
		private glowFilter: GlowFilter;
        private redColorFilter: ColorFilter;
		private greenColorFilter:ColorFilter;
		private yellowColorFilter:ColorFilter;
		private blueColorFilter:ColorFilter;

		/**
		 * 收茶时的素材url
		 */
		private teaLeafUrl:string = "gameUI/pot/teaLeaf.png";
		/**
		 * 炒锅素材url前缀
		 */
		private skinPrefixUrl:string = "gameUI/pot/";
		/**
		 * 不同等级锅的皮肤
		 */
		potSkinArr:string[]	= ["pot_1.png","pot_2.png","pot_3.png","pot_4.png","pot_5.png","pot_6.png"];

		/**
		 * 炒茶开始帧
		 */
		private startF:number;
		/**
		 * 炒茶结束帧
		 */
		private endF:number;
		/**
		 * 炒完停止帧
		 */
		private stopF:number;

		/**
		 * 炒茶倒计时
		 */
		static timer:PotTimerUtil;
		/**
		 * 提示面板
		 */
		static tip:PotTipUI;
		/**
		 * 对应数据
		 */
		potVO:PotVO;
		/**
		 * 炒锅动画
		 */
		// potMc:MovieClip;

		/**
		 * 是否为单个收获
		 */
		private isSingle:boolean;

		static instance:PotGridView;

		constructor()
		{
			super();

			//滤镜
			this.glowFilter = new GlowFilter("#FFE553", 10, 0, 0);
            this.redColorFilter = new ColorFilter([
                0.5, 0, 0, 0, 0,  // R
                0, 0, 0, 0, 0,  // G
                0, 0, 0, 0, 0,  // B
                0, 0, 0, 0.1, 0,  // A
            ]);
			this.greenColorFilter = new ColorFilter([
                0, 0, 0, 0, 0,  // R
                0, 200, 0, 0, 0,  // G
                0, 0, 0, 0, 0,  // B
                0, 0, 0, 0.1, 0,  // A
            ]);
			this.yellowColorFilter=new ColorFilter([
				235, 0, 0, 0, 0,  // R
                0, 200, 0, 0, 0,  // G
                0, 0, 0, 0, 0,  // B
                0, 0, 0, 0.1, 0,  // A
			]);
			this.blueColorFilter=new ColorFilter([
				0, 0, 0, 0, 0,  // R
                0, 0, 0, 0, 0,  // G
                0, 0, 235, 0, 0,  // B
                0, 0, 0, 0.1, 0,  // A
			]);

			PotGridView.instance = this;

			this.gossip.on(Event.MOUSE_OVER, this, this.potGridMouseOverFn);
			this.gossip.on(Event.MOUSE_OUT,this,this.potGridMouseOutFn);
			// this.lock.once(Event.CLICK,this,this.lockClkedFn);	// 用 this.on() 代替
			this.pot.on(Event.CLICK,this,this.potClkedFn);
			this.pot.on(Event.MOUSE_OVER,this,this.addTip);
			this.pot.on(Event.MOUSE_OUT,this,this.hideTip);
			this.on(Event.CLICK,this,this.viewClked);

			// PotGridView.instance.potMc = new Laya.MovieClip();
			// PotGridView.instance.potMc.name = PotGridView.instance.name+"Mc";
			// 点击特定炒锅开始炒茶后 -- hsx
			FriedTeaDialogView.callback = PotGridView.instance.setPotStatus;	// initPot

			if(!PotGridView.timer)
				PotGridView.timer = new PotTimerUtil();
			if(!PotGridView.tip)
			{
				PotGridView.tip = new PotTipUI();
				PotGridView.tip.graphics.clear();
				PotGridView.tip.graphics.drawRect(0,0,PotGridView.tip.width,PotGridView.tip.height,"#F9F6C2");
				PotGridView.tip.name = "tip";
			}
		}

		private viewClked(event:Event):void
		{
			if(!event.target)
				return;
			let curName:string = (event.target as Node).name;
			// 点击锁
			if(curName == this.lock.name)
			{
				let potVO:models.friedRoom.pot.PotVO = PotCtrl.friedPotView.potsArr[parseInt(this.name)-1];
				if(!potVO)
					return;

				if(potVO.id > PotCtrl.friedPotView.openedPotNums+1)
				{
					TipLayerManager.tipLayer.showDrawBgTip("请从上面按逆时针依次解锁炒锅！");
					return;
				}
				if(potVO.level==0)
				{
					PotCtrl.getInstance().willAssartFun(potVO.id);
				}
			} // 点击锅
			else if(curName == this.pot.name)
			{
				// 已用 potClkedFn() 代替

			}
		}

		/**
		 * 开锁后的状态
		 */
		unlockState(potLvl:number):void
		{
			this.lock.visible = false;
			this.pot.alpha = 1;
			// if(potLvl == 1)
			// {
				this.pot.skin = this.skinPrefixUrl+this.potSkinArr[potLvl-1];
			// }
		}

		potGridMouseOverFn(event: Event): void
        {
			event.target.filters=[this.glowFilter];
        }

        potGridMouseOutFn(event: Event): void
        {
			event.target.filters = [];
        }

		/**
		 * 初始化炒锅状态
		 */
		initPot(potVO:PotVO):void
		{
			this.name = potVO.id+"";
			this.setPotLvl(potVO);
			if(potVO.status != 0)
				this.setPotStatus(potVO);
		}

		/**
		 * 根据锅的等级设置其显示；
		 * 炒锅等级 => 0：未开启 1:生铁锅 2：铜炒锅 3:黄金锅 4：玄铁锅 5：寒铁锅 6：精钢锅 7：耀光锅
		 */
		private setPotLvl(potVO:PotVO):void
		{
			let potLvl:number = potVO.level;
			let potStatus:number = potVO.status;
			if(potLvl<0 || potLvl>this.potSkinArr.length-1)
				return;
			if(potLvl)
			{
				this.lock.visible = false;
				this.pot.alpha = 1;
				// if(potStatus==0)
				// {
					this.pot.skin = this.skinPrefixUrl+this.potSkinArr[potLvl-1];
				// }
			}
			else
			{
				this.lock.visible = true;
				this.pot.alpha = 0;
			}
		}

		/**
		 * 为炒锅添加提示信息
		 */
		addTip(event:Event):void
		{
			// 未开启
			if((this.pot.alpha==0)&&(!this.getChildByName(this.name+"Mc")))
				return;
			let potVO:models.friedRoom.pot.PotVO = PotCtrl.friedPotView.potsArr[parseInt(this.name)-1];
			if(!potVO)
				return;
			// console.log("== cur instance pot's name:"+PotGridView.instance.name+", this pot's name:"+this.name);

			PotGridView.tip.visible = true;
			PotGridView.tip.potName.text = potVO.nameArr[potVO.level-1];
			PotGridView.tip.potLvl.text = potVO.level+"级";
			PotGridView.tip.intensifyLvl.text = potVO.intensifyLvl?potVO.intensifyLvl+"级":"无";	    // 强化等级
			PotGridView.tip.outputTopNums.text = potVO.friedTeaMaxLvl?potVO.friedTeaMaxLvl+"级":"无"; // 炒茶上限
			PotGridView.tip.teaName.text = potVO.teaName?potVO.teaName:"无";
			PotGridView.tip.leftTime.text = potVO.leftTime+"分钟";
			PotGridView.tip.potPos.text = potVO.posArr[potVO.id-1];	// potVO.posId

			if(!TipLayerManager.tipLayer.getChildByName("tip"))
			{
				TipLayerManager.tipLayer.addChild(PotGridView.tip);
			}
			let curP:Laya.Point = this.localToGlobal(new Laya.Point(event.target.x,event.target.y));
			PotGridView.tip.pos(curP.x-PotGridView.tip.width/2,curP.y-PotGridView.tip.height/2);
		}

		hideTip():void
		{
			PotGridView.tip.visible = false;
		}

		/**
		 * 设置炒锅的（动画）状态
		 * 炒锅状态 => 0:未使用（闲着） 1:炒制中，2:炒制完毕
		 */
		// setPotStatus=(potVO:PotVO)=>
		private setPotStatus(potVO:PotVO):void
		{
			let statusId:number = potVO.status;
			if(!statusId && statusId!=0)
				return;

			if(PotCtrl.friedPotView.getPotGridById(potVO.id))
				PotGridView.instance = PotCtrl.friedPotView.getPotGridById(potVO.id);

			// 后加
			PotGridView.instance.pot.skin = PotGridView.instance.skinPrefixUrl+PotGridView.instance.potSkinArr[potVO.level-1];
			// 隐藏静态锅
			PotGridView.instance.pot.alpha = 0;			// 还可接收鼠标事件
			// PotGridView.instance.pot.visible = false;// 不再接收鼠标事件

			// if(!PotGridView.instance.getChildByName(PotGridView.instance.potMc.name))
			// {
			// 	PotGridView.instance.potMc.url = HttpConfig.serverResUrl+"saute/PotAnimation.swf";
			// 	PotGridView.instance.addChild(PotGridView.instance.potMc);
			// }

			// 引擎升级至 v1.7.9 后对应的修改 -- 2017-09-17 hsx
			let potMc:MovieClip = new MovieClip();
			// let potMc:MovieClip = Laya.loader.getRes(HttpConfig.serverResUrl+"saute/PotAnimation.swf") as MovieClip;
			potMc.name = PotGridView.instance.name+"Mc";
			// 图集方式加载（异常）
			// potMc.load(HttpConfig.serverResUrl+"saute/PotAnimation.swf",true,HttpConfig.serverResUrl + "saute/PotAnimation.json");
			// potMc.url = HttpConfig.serverResUrl+"saute/PotAnimation.swf";	// "res/atlas/test/PotAnimation.json";
			potMc.load(HttpConfig.serverResUrl+"saute/PotAnimation.swf");
			potMc.once(Event.LOADED,this,function():void{
				potMc.visible = false;	// 跳帧前隐藏
				potMc.gotoAndStop(0);
				// console.info("1 =======> potMc.name:"+potMc.name+", instance:"+PotGridView.instance.name+", this:"+this.name);

				// 设置当前对象
				let curObj:any;
				if(potMc.name == this.name+"Mc")
					curObj = this;
				else if(potMc.name == PotGridView.instance.name+"Mc")
					curObj = PotGridView.instance;
				// 炒
				if(statusId == 1)
				{
					curObj.startF = (potVO.level-1)*3;
					curObj.endF 	= (potVO.level-1)*3+1;
					// curObj.potMc.frameLoop(30,curObj,curObj.playOver,[curObj.potMc]);
					potMc.frameLoop(30,curObj,function():void{
						potMc.playTo(curObj.startF,curObj.endF);
						// potMc.playTo(curObj.startF,curObj.endF);
					});

					// 炒茶计时器
					PotGridView.timer.regTimer(potVO.friedTeaRemainTime);
					PotGridView.timer.addTimerCallback({"callback":curObj.updateTimer,"vo":potVO});
				} // 炒完
				else if(statusId == 2)
				{
					curObj.stopF  = (potVO.level-1)*3+2;
					potMc.gotoAndStop(curObj.stopF);
				}

				potMc.visible = true;
				potMc.pos(curObj.pot.x+10,curObj.pot.y+48);

				// 会有多个同名对象加入
				// if(!this.getChildByName(this.name+"Mc"))
					curObj.addChild(potMc);
				console.info("=== 炒锅id:"+potVO.id+", 剩余时间:"+potVO.leftTime);
			});
		}

		/**
		 * 炒茶倒计时更新
		 * @nowTime 当前剩余时间（秒）
		 */
		private updateTimer(potVO:PotVO,leftTime:number):void
		{
			if(leftTime < 0)
				leftTime = 0;
			potVO.friedTeaRemainTime = leftTime;
			PotGridView.tip.leftTime.text = potVO.leftTime+"分钟";

			// 炒茶结束
			if(potVO.leftTime <= 0)
			{
				// PotGridView.timer.removeTimerCallback({"callback":PotGridView.instance.updateTimer,"vo":potVO});

				potVO.status = 2;
				PotGridView.instance.setPotStatus(potVO);
				console.log("炒茶结束, this:"+this+", this.name:"+this.name+", PotGridView.instance.name:"+PotGridView.instance.name);
			}
		}

		/**
		 * 炒完复位
		 */
		harvestOver(potId:number):void
		{
			// console.log("========== harvestOver, instance:"+PotGridView.instance.name+", this:"+this.name);
			PotGridView.instance.setPotFree(potId);

			// 收茶动画
			let teaLeafImg:Laya.Image = new Laya.Image();
			teaLeafImg.name = "teaLeaf";
			teaLeafImg.skin = PotGridView.instance.teaLeafUrl;
			teaLeafImg.pos(20,-10);
			PotGridView.instance.addChild(teaLeafImg);
			Laya.Tween.to(teaLeafImg,{y:teaLeafImg.y-100,alpha:0},2000,Laya.Ease.bounceInOut,
						  Handler.create(PotGridView.instance,PotGridView.instance.tweenOverHandler,[potId]),200);
		}

		/**
		 * 使炒锅处于空闲状态
		 */
		private setPotFree(potId:number):void
		{
			PotGridView.instance = PotCtrl.friedPotView.getPotGridById(potId);
			// PotGridView.instance.removeChildByName(PotGridView.instance.name+"Mc");

			while(PotGridView.instance.getChildByName(PotGridView.instance.name+"Mc"))
			{
				PotGridView.instance.removeChildByName(PotGridView.instance.name+"Mc");
			}

			PotGridView.instance.pot.alpha = 1;
			PotCtrl.friedPotView.potsArr[potId-1].status = 0;
		}

		private tweenOverHandler(potId:number):void
		{
			PotGridView.instance.removeChildByName("teaLeaf");
			if(!this.isSingle)
			{
				let i:number;
				let potVO:PotVO;
				let len:number = PotCtrl.friedPotView.potsArr.length;
				for(i=0; i<len; i++)
				{
					potVO = PotCtrl.friedPotView.potsArr[i];
					if(potVO.status == 2)
					{
						// 为了使 this == PotGridView.instance
						if(PotCtrl.friedPotView.getPotGridById(potVO.id))
							PotGridView.instance = PotCtrl.friedPotView.getPotGridById(potVO.id);

						PotCtrl.callback = PotGridView.instance.singleHarvestOver;
						PotCtrl.getInstance().request_reapTea(potVO);
						break;
					}
				}
			}
		}

		private lockClkedFn(event:Event):void
		{
			let potVO:models.friedRoom.pot.PotVO = PotCtrl.friedPotView.potsArr[parseInt(this.name)-1];
			if(!potVO)
				return;

			if(potVO.id > PotCtrl.friedPotView.openedPotNums+1)
			{
				TipLayerManager.tipLayer.showDrawBgTip("请从上面按逆时针依次解锁炒锅！");
				return;
			}
			if(potVO.level==0)
			{
				PotCtrl.getInstance().willAssartFun(potVO.id);
			}
		}

		/**
		 * 炒锅被点击后
		 */
        potClkedFn(event:Event): void
        {
			let potVO:models.friedRoom.pot.PotVO = PotCtrl.friedPotView.potsArr[parseInt(this.name)-1];
			if(!potVO)
				return;

			if(PotCtrl.friedPotView.getPotGridById(potVO.id))
				PotGridView.instance = PotCtrl.friedPotView.getPotGridById(potVO.id);

			// 普通鼠标
			if(GameConfig.curOperateType == "hand1")
			{
				if(potVO.id > (PotCtrl.friedPotView.openedPotNums+1)){
					TipLayerManager.tipLayer.showDrawBgTip("请从上面按逆时针依次解锁炒锅！");
				}else if(potVO.level==0){
					PotCtrl.getInstance().willAssartFun(potVO.id);
				}
				else if(potVO.status==0){
					FriedTeaDialogCtrl.getInstance().showFriedTeaDialog(potVO);
				}else if(potVO.status==1){
					TipLayerManager.tipLayer.showDrawBgTip("茶叶还没有炒制完成！");
				}else if(potVO.status==2){
					TipLayerManager.tipLayer.showDrawBgTip("已经炒制成功，请收获！");
				}
			} // 火把加火
			else if(GameConfig.curOperateType == "fire")
			{
				if(potVO.status == 1)
				{
					let toolId:number = parseInt(views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.name);
					if(!toolId)
						return;
					PotCtrl.callback = PotGridView.instance.fireOver;
					PotCtrl.getInstance().request_sauteUseTool(potVO.id,toolId);
				}
			} // 刷锅
			else if(GameConfig.curOperateType == "brush")
			{
				PotCtrl.callback = PotGridView.instance.brushPotOver;
				TipLayerManager.tipLayer.showClearPot(potVO);
			} // 单个收获
			else if(GameConfig.curOperateType == "hand2")
			{
				this.isSingle = true;
				if(potVO.status==2)
				{
					PotCtrl.callback = PotGridView.instance.singleHarvestOver;
					PotCtrl.getInstance().request_reapTea(potVO);
				}
			} // 全部收获
			else if(GameConfig.curOperateType == "hand3")
			{
				this.isSingle = false;
				let len:number = PotCtrl.friedPotView.potsArr.length;
				let i:number;
				let _potVO:PotVO;
				for(i=0; i<len; i++){
					_potVO= PotCtrl.friedPotView.potsArr[i];
					if(_potVO.status == 2){
						PotCtrl.callback = PotGridView.instance.singleHarvestOver;
						PotCtrl.getInstance().request_reapTea(_potVO);
						break;
					}
				}
			}
        }

		brushPotOver(takeData:Object):void
		{
			PotGridView.instance.setPotFree(takeData["potId"]);
		}

		static cancelBtnClkFn(tipView:ui.gameUI.tips.ConfirmCancelTipUI):void
		{
			tipView.visible=false;
		}

		private singleHarvestOver(potId:number):void
		{
			PotGridView.instance.harvestOver(potId);
		}

		/**
		 * @param leftTime 使用火把后的剩余时间（秒），<= 0 时即为可收获
		 */
		private fireOver(takeData:Object):void
		{
			let leftTime:number = takeData["left"];
			let potId:number = takeData["potId"];
			if(leftTime <= 0)
			{
				let potVO:PotVO = PotCtrl.friedPotView.potsArr[potId-1];
				potVO.friedTeaRemainTime = 0;
				potVO.status = 2;
				if(potVO)
					PotGridView.instance.setPotStatus(potVO);
			}
		}

		/** 鼠标移入炒锅事件,提示炒锅信息 */
		potMouseOverFn(event:Event):void
		{

		}
    }
}

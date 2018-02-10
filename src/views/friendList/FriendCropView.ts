namespace views.friendList
{
	import View = laya.ui.View;
	import Image = laya.ui.Image;
	import HBox = laya.ui.HBox;
	import Sprite = laya.display.Sprite;
	import Event = laya.events.Event;
	import GameConfig = configs.GameConfig;
	import CropVO = models.base.CropVO;
	// import LandView = views.teaRoom.LandView;
    import FriendLandGridView = views.friendList.FriendLandGridView;
	import CropInfoTipUI = ui.gameUI.tips.CropInfoTipUI;
	import MovieClip = laya.ani.swf.MovieClip;
	import Handler = laya.utils.Handler;
	import LandCtrl = controllers.teaRoom.LandCtrl;

	/**
	 * 作物相关的视图
	 * 0、作物的显示（生长阶段对应的不同显示效果）
	 * 1、鼠标悬浮显示提示信息
	 * 2、虫、草
	 * 3、除虫、除草
	 * 4、施肥
	 * 5、收获（提示图标）
	 * 6、铲除
	 * 7、点击事件分类：
	 *
	 * 鼠标悬浮显示提示信息：
	 * 0、作物名字、季数
	 * 1、作物状态规则：害虫，干旱，杂草，累计小于3个，为“优秀”；累计小于6个，为“良好”，累计6个以及六个以上，为“濒临死亡”
	 * 2、成熟（产量） 或 生长阶段（时间）
	 * 3、进度条，成熟则不显示
	 *
	 * 点击事件分类：
	 * 1、点击正在生长的作物没有效果
	 *
	 * 放虫、种草：
	 * 1、虫草会在作物成熟时影响作物的产量
	 * 2、作物死亡/成熟后不能放虫、种草
	 * 3、每个作物最多可放虫、种草各3个，数量>3时，客户端直接提示不得超过3个！
	 *
	 * 除虫、除草:
	 * 1、除虫：   api: actPesticide 	{"li": 7}
	 * 2、除草：   api: actWipeGrass    {"li": 7}
	 *
	 * 施肥：
	 * 1、对成熟或枯萎状态的作物施肥，则弹出气泡：该阶段不能施肥
	 * 2、成功：化肥数量-1，作物相关变化
	 *
	 * 收获：
	 * 1、点击成熟的作物，作物的果实进入仓库，作物单季增加的经验直接加到经验条上。
	 * 2、多季：如果作物是多季作物，且现在不是最后一季，收获后作物进入下一季的叶子阶段（茶树则进入成长阶段）。
	 * 3、如果作物是单季作物或多季作物的最后一季，收获后作物进入枯萎阶段。
	 *
	 */
	export class FriendCropView extends View
	{
		/** 损益图标容器，如：虫、草 */
		// debuffSp:Sprite;

		/** 虫子容器 */
		wormHBox:HBox;
		/** 草容器 */
		grassHBox:HBox;
		/** 作物图标 */
		cropIcon:Image;
		/** 作物图标路径 */
		cropIconUrl:string;
		/** 收获图标 */
		harvestIcon:Image;

		wormUrl:string;
		wormMC:MovieClip;
		/** 虫子数，仅用于加载 */
		wormNums:number;
		/** 草数，仅用于加载 */
		grassNums:number;

		/** 地块上的作物信息提示框 */
     	static cropTip: CropInfoTipUI;

		/** 所对应的VO数据 */
		selfCropVO:CropVO;

		/** 所属地块 */
		curGrid:FriendLandGridView;

		/** 作物图标加载后 */
		static cropIconHandler;

		/** 加载完作物后的回调，更新作物状态 */
		updateCropState:Function;

		constructor()
		{
			super();
			this.wormHBox = new HBox();
			// this.wormHBox.space = 5;	// 间距
			this.grassHBox = new HBox();
			this.grassHBox.space = 5;
			this.cropIcon = new Image();
			// this.addChild(this.wormHBox);
			// this.addChild(this.grassHBox);
			this.addChild(this.cropIcon);
			this.harvestIcon = new Image();

			this.wormUrl = "res/gameAssets/swfs/worm.swf";
			this.wormMC = new MovieClip();

			this.wormHBox.rotation = 50;
			this.grassHBox.rotation = -30;

			FriendCropView.cropIconHandler = Handler.create(this, this.cropIconLoadedHandler);

			// 作物信息提示框
			FriendCropView.cropTip = new CropInfoTipUI();
			FriendCropView.cropTip.name = "friendCropTip";
			FriendCropView.cropTip.visible = false;
			if(!views.friendList.FriendLandView.instance.getChildByName("friendCropTip"))
				views.friendList.FriendLandView.instance.addChild(FriendCropView.cropTip);

			// 点击作物时的情况：除虫、除草、收获……
			this.on(Event.CLICK,this,this.cropViewClkedFn);
			this.on(Event.MOUSE_OVER,this,this.cropViewMouseOverFn);
			this.on(Event.MOUSE_OUT,this,this.cropViewMouseOutFn);
		}

		/** 作物的显示（含虫、草） */
		init(cropVO:CropVO):void
		{
			if(!cropVO)
				return;

			this.selfCropVO = cropVO;

			// 加载标识：若已加载，则不再加载其它
			let iconLoaded:boolean = false;

			// 地块
			this.curGrid = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
			if(!this.curGrid)
				return;
			// this.curGrid.cropView = this;

			// 已有作物
			if(this.curGrid.getChildByName(cropVO.id + ""))
				return;

			// 发现：cropVO.growthStatus 已不存在于 cropVO 中 -- 2017-06-21
			if(cropVO.growthStatus != undefined)
			{
				let cropIconName:string;
				// 死亡
				if(cropVO.growthStatus == -1)
				{
					cropIconName = "plant_1_5.png";
					console.log("作物枯萎！");
				} // 种子（有的作物有单独的种子状态，如 "plant_11_0.png"）
				else if(cropVO.growthStatus == 0)
				{
					cropIconName = "plant_1_0.png";
					console.log("种子阶段！");
				}
				else
				{   // try...catch 无效（有错误时仍会报错）！
					try
					{
						cropIconName = "plant_" + cropVO.id + "_"+ cropVO.growthStatus + ".png";
					}
					catch(error)
					{
						cropIconName = "plant_" + cropVO.id + "_"+ (cropVO.growthStatus + 1) + ".png";
					}
				}
				if(cropIconName)
				{
					iconLoaded = true;
					this.cropIconUrl = HttpConfig.serverResUrl + cropIconName;
					// this.cropIcon.cacheAs = "bitmap";
					// this.selfCropVO.iconUrl = this.cropIconUrl;	// 2017-09-16 hsx
					this.cropIcon.loadImage(this.cropIconUrl,0,0,0,0,FriendCropView.cropIconHandler);
				}
			}
			else
			{
				// 只有先种植后此值才有效，之前已种植好的直接从老系统中加载的，则需使用如上加载方式，最终要代替如上写法！
				if(iconLoaded == false)
				{
					if(cropVO.iconUrl)
					{
						this.cropIconUrl = cropVO.iconUrl;
						this.cropIcon.loadImage(this.cropIconUrl,0,0,0,0,FriendCropView.cropIconHandler);
					}
				}
			}
		}

		cropIconLoadedHandler():void
		{
			let texture:Laya.Texture = Laya.loader.getRes(this.cropIconUrl);
			if(texture)
			{
				this.cropIcon.width = texture.width;
				this.cropIcon.height = texture.height;

				this.updateWormOrGrassPos();

				// 添加作物至地块
				// this.curGrid.cropView = null;
				this.curGrid.cropView = this;
				// this.autoSize = true;

				if(this.updateCropState)
					this.updateCropState(this.selfCropVO);
			}
		}

		/**
		 * 更新虫或草的位置
		 */
		updateWormOrGrassPos():void
		{
			this.wormHBox.removeChildren();
			this.grassHBox.removeChildren();

			// 虫 （数量>3时，客户端直接提示不得超过3个）
			if(this.selfCropVO.worm > 0)
			{
				this.wormNums = this.selfCropVO.worm;
				this.loadWorm();
			}
			else
			{
				this.resetDisObj(this.wormHBox);
			}
			// 草
			if(this.selfCropVO.grass > 0)
			{
				this.grassNums = this.selfCropVO.grass;
				this.loadGrass();
			}
			else
			{
				this.resetDisObj(this.grassHBox);
			}
		}

		loadWorm():void
		{
			let _wormMc:MovieClip = new MovieClip();
			_wormMc.load(this.wormUrl);
			_wormMc.once(Event.COMPLETE,this,this.wormMCLoaded);
			this.wormHBox.addChild(_wormMc);
			_wormMc.y = - this.wormNums * 20;
			console.info("worm, x:"+_wormMc.x+", y:"+_wormMc.y+", w:"+_wormMc.width+", h:"+_wormMc.height);
			this.wormNums--;
		}

		wormMCLoaded(event:Event):void
		{
			if(this.wormNums>0)
			{
				this.loadWorm();
			}
			else
			{
				// this.wormHBox.x = this.cropIcon.x + 30;  // this.cropIcon.x - 10;
				// this.wormHBox.y = this.cropIcon.y+this.cropIcon.height + 10;
				this.wormHBox.autoSize = true;
			}
		}


		addWorm():void
		{
			let _wormMc:MovieClip = new MovieClip();
			_wormMc.load(this.wormUrl);
			_wormMc.on(Laya.Event.LOADED,this,function():void{
				this.wormHBox.addChild(_wormMc);
				_wormMc.pos(0,0);
				_wormMc.size(50,50);
			});
			this.wormNums++;

			// let _wormMc:MovieClip = new MovieClip();
			// _wormMc.load(this.wormUrl);
			// this.wormHBox.addChild(_wormMc);
			// _wormMc.y = - this.wormNums * 20;
			// _wormMc.size(80,80);
			// this.wormNums++;
			// this.wormHBox.autoSize = true;
		}

		loadGrass():void
		{
			let grass:Image = new Image();
			grass.skin = "gameUI/toolBar/grass.png";
			this.grassHBox.addChild(grass);
			this.grassNums--;

			this.grassLoaded();
		}

		grassLoaded(event?:Event):void
		{
			if(this.grassNums>0)
			{
				this.loadGrass();
			}
			else
			{
				// this.grassHBox.scale(0.5,0.5);
				// this.grassHBox.autoSize = true;
			}
		}

		resetDisObj(disObj:Sprite):void
		{
			if(!disObj)
				return;
			disObj.visible = false;
			disObj.removeChildren();
			disObj.removeSelf();
		}


		addGrass():void
		{
			let grass:Image = new Image();
			grass.loadImage("gameUI/toolBar/grass.png",0,0,50,50,Handler.create(this,function():void{
				this.grassHBox.addChild(grass);
			}));
			this.grassNums++;

			// let grass:Image = new Image();
			// grass.skin = "gameUI/toolBar/grass.png";
			// this.grassHBox.addChild(grass);
			// this.grassNums++;
			// this.grassHBox.autoSize = true;
		}

		/**
		 * 点击作物后
		 * 先判断操作类型：除虫、除草、收获、其它……
		 */
		cropViewClkedFn(event:Event):void
		{
			switch(GameConfig.curOperateType)
			{
				case "killWorm":

					break;
				case "removeGrass":

					break;
				case "water":

					break;
				case "worm":

					break;
				case "grass":

					break;
				case "harvestAll":

					break;
				default:	// 普通状态

					break;
			}
		}

		/**
		 * 若作物未死亡，则显示提示信息
		 */
		cropViewMouseOverFn(event?:Event):void
		{
			if(!this.selfCropVO)
				return;
			if(this.selfCropVO.isDeath)
				return;

			FriendCropView.cropTip = views.friendList.FriendLandView.instance.getChildByName("friendCropTip") as CropInfoTipUI;
			if(!FriendCropView.cropTip)
				return;

            FriendCropView.cropTip.visible = true;
			FriendCropView.cropTip.cropName.text = this.getCropNameById(this.selfCropVO)+"(第"+this.selfCropVO.season+"季)";
			FriendCropView.cropTip.state.text = "状态("+this.selfCropVO.statusTxt+")";
			if(this.selfCropVO.remnantOutput)
			{
				FriendCropView.cropTip.phase.text = this.selfCropVO.growthStateTxt+"(产："+this.selfCropVO.totalOutput+
											  "剩："+this.selfCropVO.remnantOutput+")";
			}
			else
			{
				if(this.selfCropVO.growthTime <= 120)
				{
					FriendCropView.cropTip.phase.text = this.selfCropVO.growthStateTxt+"("+this.selfCropVO.growthTimeTxt(true)+
												  (this.selfCropVO.nextLevelText?this.selfCropVO.nextLevelText:"")+")";
				}
				else
				{
					FriendCropView.cropTip.phase.text = this.selfCropVO.growthStateTxt+"("+this.selfCropVO.growthTimeTxt(false)+
												  (this.selfCropVO.nextLevelText?this.selfCropVO.nextLevelText:"")+")";
				}
			}
			if(this.selfCropVO.growthRate)
                FriendCropView.cropTip.progress.value = this.selfCropVO.growthRate;
			else
                FriendCropView.cropTip.progress.visible = false;

			let landGridView:FriendLandGridView = this.parent as FriendLandGridView;
			if(landGridView)
			{
				FriendCropView.cropTip.x = landGridView.x + landGridView.width/4;
				FriendCropView.cropTip.y = landGridView.y - landGridView.height;
				// console.log("====== cropTip, x:"+CropView.cropTip.x+", y:"+CropView.cropTip.y);
			}

			// 只有按正常流程种植后 作物名称 才会有值 ！！！
			console.log("==== cur crop's name: "+this.selfCropVO.name);
		}

		/**
		 * 获取特定作物对应的名字
		 */
		private getCropNameById(cropVO:CropVO):string
		{
			let seedsObjArr:Array<Object> = managers.ResourceManager.seedsObjArr;
			if(!seedsObjArr || seedsObjArr.length==0)
				return;
			let i:number;
			let len:number = seedsObjArr.length;

			let cropObj:Object;
			for(i=0; i<len; i++)
			{
				cropObj = seedsObjArr[i];
				if(cropVO.id == cropObj["id"])
				{
					return cropObj["name"];
				}
			}
			return null;
		}

		cropViewMouseOutFn(event?:Event):void
		{
			FriendCropView.cropTip.visible = false;
		}

		/**
		 * 成熟后添加收获图标
		 */
		addHarvestIcon():void
		{
			let iconUrl:string = "res/gameAssets/imgs/harvestIcon.png";
			if(!this.harvestIcon)
				this.harvestIcon = new Image();
			this.harvestIcon.skin = iconUrl;
			this.addChild(this.harvestIcon);
		}

		/**
		 * 移除收获星号图标
		 */
		removeHarvestIcon():void
		{
			if(!this.harvestIcon)
				return;
			this.harvestIcon.removeSelf();
			this.harvestIcon = null;
		}


	}
}
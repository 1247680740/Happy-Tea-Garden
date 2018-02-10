namespace controllers.teaRoom.crop
{
	import CropVO = models.base.CropVO;
	import CropModel = models.teaRoom.crop.CropModel;
	import TimerUtil = utils.TimerUtil;
	import TweenUtil = utils.TweenUtil;
	import Event = laya.events.Event;
	import Handler = laya.utils.Handler;
	import LandCtrl = controllers.teaRoom.LandCtrl;

	export class CropCtrl
	{
		static cropModel: CropModel;
		private static cropView:views.teaRoom.crop.CropView;
		private static friendCropView:views.friendList.FriendCropView;
		/** 所有作物视图（最多24个）的容器（不再用！） */
		cropViewArr:Array<views.teaRoom.crop.CropView>;
		friendCropViewArr:Array<views.friendList.FriendCropView>;
		/** 用于一键收获：包含 {"landId": , "seedId": } 形式的对象数组 */
		cropObjArr:Array<Object>;

		/** 与 callbackFn 对应来处理特定事件 */
		static callback:Function;

		/** 施肥 */
		static FERTILIZE:string = "fertilize";
		/** 单个收获标识 */
		static HARVEST_ONE:string = "harvestOne";
		/** 全部收获标识 */
		static HARVEST_ALL:string = "harvestAll";

		private static instance:CropCtrl;

		constructor()
		{
			CropCtrl.cropModel = CropModel.getInstance();

			this.cropViewArr = new Array<views.teaRoom.crop.CropView>();
			this.friendCropViewArr = new Array<views.friendList.FriendCropView>();
			if(!CropCtrl.cropView)
				CropCtrl.cropView = new views.teaRoom.crop.CropView();
			if(!CropCtrl.friendCropView)
				CropCtrl.friendCropView = new views.friendList.FriendCropView();
		}

		static getInstance():CropCtrl
		{
			if(!CropCtrl.instance)
				CropCtrl.instance = new CropCtrl();
			return CropCtrl.instance;
		}

		/**
		 * 供外部调用来设置相关操作命令（与 callback/callbackFn() 配合使用）
		 * @param : {"key":"harvestOne","value":landId}
		 * @example :
		 * CropCtrl.callback = CropCtrl.getInstance().callbackFn;
		 * CropCtrl.getInstance().setRunKey = {"key":"harvestOne","value":landId};
		 */
		set setRunKey(param:Object)
		{
			if(!param || !param["key"])	//  || !param["value"]
				return;
			if(CropCtrl.callback)
				CropCtrl.callback(param);	// 即：callbackFn()
		}

		callbackFn(param:Object):void
		{
			// 施肥
			if(param["key"] == CropCtrl.FERTILIZE)
			{
				CropCtrl.instance.request_actProp(param["value"]);
			} // 单个收获
			else if(param["key"] == CropCtrl.HARVEST_ONE)
			{
				console.log("收获地块："+param["value"]);
				let seedId:number = CropModel.getCropVOByLandId(param["value"]).id;
				if(seedId)
					CropCtrl.instance.request_actCollect(param["value"],seedId);
			} // 全部收获
			else if(param["key"] == CropCtrl.HARVEST_ALL)
			{
				CropCtrl.instance.request_actAllCollect();
			}
		}


		FriendCallbackFn(param:Object):void
		{
			if(param["key"] == CropCtrl.HARVEST_ALL)
			{
				CropCtrl.instance.request_actFriendAllCollect();
			}else{
				return;
			}
		}

		/**
		 * 回调的结果处理
		 * 1、异常：弹错误提示框
		 * 2、正常：经验动画、玩家信息重新渲染
		 * @param takeData: {"errMsg":xxx} or {"exp":xxx}
		 */
		resultHandler(takeData:Object):void
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
				{
					TweenUtil.tweenTo(views.common.CommonDisplay.expPrize(takeData["exp"]),takeData["curCoordinate"]);
				}
			}
		}

		/**
		 * 获取作物（游戏初始化时）
		 */
		request_getCrop():void
		{
			CropModel.callback = this.getCropOver;
			CropCtrl.cropModel.request_getCrop();
		}
		/** 获取好友作物 */
		request_getFriendCrop() :void
		{
			CropModel.callback = this.getFriendCropOver;
			CropCtrl.cropModel.request_getFriendCrop();
		}

		/**
		 * 种植作物
		 */
		request_doGrow(landId:number,seedId:number):void
		{
			CropModel.callback = this.doGrowOver;
			CropCtrl.cropModel.request_doGrow(landId,seedId);
		}

		doGrowOver(takeData:any):void
		{
			CropCtrl.instance.resultHandler(takeData);

			if(!takeData["errMsg"])
			{
				let landId:number = takeData["landId"];
				let seedId:number = takeData["seedId"];

				// 更新种子数量
				let resultObj:Object = controllers.teaRoom.bag.BagCtrl.bagModel.updateSeedNums(seedId);
				if(resultObj["isSuccess"])
				{
					if(resultObj["remain"] == 0)
					{
						// 复位鼠标默认状态
						views.layers.SceneUILayer.instance.resetCursorState();
					}
					else
					{
						TipLayerManager.tipLayer.showDrawBgTip("种植成功！");
					}
				}
				// 更新作物状态
				CropCtrl.instance.request_initCrop(landId,seedId);
			}
		}

		/**
		 * 种植成功、施肥、收获等作物状态发生变化后更新数据
		 */
		request_initCrop(landId:number, seedId:number):void
		{
			CropModel.callback = CropCtrl.instance.initCropOver;
			CropCtrl.cropModel.request_initCrop(landId,seedId);
		}

		request_initFriendCrop(landId:number, seedId:number):void
		{
			CropModel.callback = CropCtrl.instance.initFriendCropOver;
			CropCtrl.cropModel.request_initFriendCrop(landId,seedId);
		}

		getCropOver():void
		{
			let i:number;
			let nums:number = CropModel.cropVOArr.length;
			for(i=0; i<nums; i++)
			{
				let cropVO:CropVO = CropModel.cropVOArr[i];

				// 显示作物
				CropCtrl.instance.addCropToLandGrid(cropVO);
				// 更新状态
				// CropCtrl.instance.initCropOver(cropVO);
			}
			CropCtrl.instance.cropViewArr.sort(this.sortCropViewArrById);

			// ================== 请求狗的数据   ==================
			controllers.teaRoom.TeaGardenCtrl.getInstance().request_initDog();
		}

		getFriendCropOver():void
		{
			let i:number;
			let nums:number = CropModel.friendCropVOArr.length;
			for(i=0; i<nums; i++)
			{
				let cropVO:CropVO = CropModel.friendCropVOArr[i];

				// 显示作物
				CropCtrl.instance.addFriendCropToLandGrid(cropVO);
				// 更新状态
				// CropCtrl.instance.initCropOver(cropVO);
			}
			CropCtrl.instance.friendCropViewArr.sort(this.sortFriendCropViewArrById);

			// ================== 请求狗(好友)的数据   ==================
			controllers.teaRoom.TeaGardenCtrl.getInstance().request_initFriendDog();
		}

		/**
		 * 更新作物状态
		 */
		initCropOver(takeData:any):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(takeData["errMsg"])
				return;

			let cropVO:CropVO;
			let cropView:views.teaRoom.crop.CropView;
			let texture:Laya.Texture;

			// "initCrop" 接口：
			if(takeData.hasOwnProperty("seedId"))	// "landId"
			{
				cropVO = CropModel.getCropVOByLandId(takeData["landId"]);
				console.info("==> takeData, landId:"+takeData["landId"]);
			} // "getCrop" 接口
			else if(takeData instanceof CropVO)
			{
				cropVO = takeData as CropVO;
			}
			if(!cropVO)
				return;

			// 当前地块
			let landGrid:views.teaRoom.LandGridView = LandCtrl.landView.getLandGridById(cropVO.landId);
			if(!landGrid)
				return;

			cropView = landGrid.cropView;
			if(!cropView)
			{
				CropCtrl.instance.addCropToLandGrid(cropVO);
				console.error("====> 无对应作物视图 <==== ");
			}
			else
			{
				// 枯萎：移除收获星号图标、 隐藏作物信息提示
				if(cropVO.isDeath)
				{
					cropView.removeHarvestIcon();

					let cropInfoTip:ui.gameUI.tips.CropInfoTipUI = views.teaRoom.LandView.instance.getChildByName("cropTip") as ui.gameUI.tips.CropInfoTipUI;
					cropInfoTip && (cropInfoTip.visible = false);
				}

				// ================ 多季作物收获后还会有星标显示的处理（待确认是否有更好的方法）-- 2017-08-11 17:50 hsx ================
				if(cropVO.growthStatus >= 4)
					cropView.removeHarvestIcon();

				cropView.cropIconUrl = cropVO.iconUrl;
				// cropView.cropIcon.cacheAs = "bitmap";

				// 改变作物显示状态
				// 遗留的老作物是没有 iconUrl 的   // 2017-09-16 hsx
				if(cropVO.iconUrl)
				{
					cropView.cropIcon.loadImage(cropVO.iconUrl,0,0,0,0,Handler.create(this,function():void{
						texture = Laya.loader.getRes(cropVO.iconUrl);
						if(texture)
						{
							// cropView.cropIcon.reCache();
							// cropView.cropIcon.repaint();
							cropView.cropIcon.source = texture;	// 图片显示状态无法正常切换的解决方式！
							cropView.cropIcon.width = texture.width;	// 77
							cropView.cropIcon.height = texture.height;	// 21
							if(landGrid)
							{
								if(cropVO.levelText=="幼苗期" || cropVO.levelText=="发芽"){
									cropView.pos(50,5);
								}else if(cropVO.levelText=="生长" || cropVO.levelText=="成形" || cropVO.levelText=="初熟" || cropVO.levelText=="长叶"){
									cropView.pos(47,-14);
								}else if(cropVO.levelText=="茂盛" || cropVO.levelText=="成熟"){
									cropView.pos(35,-40);
								}else{
									cropView.pos(landGrid.width-cropView.width>>1,landGrid.height-cropView.height>>1);
								}
								// cropView.x = landGrid.width-cropView.width>>1;	 // 28;
								// cropView.y = landGrid.height-cropView.height>>1; // -20;
								cropView.updateWormOrGrassPos();
							}
						}
					}));
				}
			}

			// 一个地块上的作物对应一个特定计时器
			let timerUtil:TimerUtil;
			if(!cropVO.timerUtil)
			{
				timerUtil = new TimerUtil();
				cropVO.timerUtil = timerUtil;
			}
			else
				timerUtil = cropVO.timerUtil;

			// 死亡
			if(cropVO.isDeath)
			{
				// 死亡状态，死亡量+1

				// 移除计时器
				timerUtil.removeTimerCallback({"callback":CropCtrl.instance.timerFn,"cropVO":cropVO});
			}
			else
			{
				// 阶段成熟
				if(cropVO.remnantOutput > 0)
				{
					// 显示成熟状态图标
					if(cropView)
					{
						// console.log("成熟");
						cropView.addHarvestIcon();
					}

					// 移除计时器
					timerUtil.removeTimerCallback({"callback":CropCtrl.instance.timerFn,"cropVO":cropVO});
				}
				else
				{
					if(cropVO.growthTime <= 0)
					{
						console.info("倒计时 <= 0,需移除计时器...");
					}
					else
					{
						console.log("未成熟");
						// 注册倒计时器
						timerUtil.initCropPara = {"landId":cropVO.landId,"seedId":cropVO.id};
						timerUtil.regTimer(cropVO.growthTime);
						// 作物的状态更新计时器
						timerUtil.addTimerCallback({"callback":CropCtrl.instance.timerFn,"cropVO":cropVO});
					}
				}
			}

			// 一键收获后更新作物状态
			if(!CropCtrl.instance.cropObjArr || CropCtrl.instance.cropObjArr.length==0)
				return;
			Laya.timer.loop(500,CropCtrl.instance,CropCtrl.instance.callLaterFn);
		}

		initFriendCropOver(takeData:any):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(takeData["errMsg"])
				return;

			let cropVO:CropVO;
			let cropView:views.friendList.FriendCropView;
			let texture:Laya.Texture;

			// "initCrop" 接口：
			if(takeData.hasOwnProperty("seedId"))	// "landId"
			{
				cropVO = CropModel.getFriendCropVOByLandId(takeData["landId"]);
			} // "getCrop" 接口
			else if(takeData instanceof CropVO)
			{
				cropVO = takeData as CropVO;
			}
			if(!cropVO)
				return;

			// 当前地块
			let landGrid:views.friendList.FriendLandGridView = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
			if(!landGrid)
				return;

			cropView = landGrid.cropView;
			if(!cropView)
			{
				CropCtrl.instance.addFriendCropToLandGrid(cropVO);
				console.error("====> 无对应作物视图 <==== ");
			}
			else
			{
				// 枯萎：移除收获星号图标、 隐藏作物信息提示
				if(cropVO.isDeath)
				{
					cropView.removeHarvestIcon();

					let cropInfoTip:ui.gameUI.tips.CropInfoTipUI = views.friendList.FriendLandView.instance.getChildByName("friendCropTip") as ui.gameUI.tips.CropInfoTipUI;
					cropInfoTip && (cropInfoTip.visible = false);
				}

				// ================ 多季作物收获后还会有星标显示的处理（待确认是否有更好的方法）-- 2017-08-11 17:50 hsx ================
				if(cropVO.growthStatus >= 4)
					cropView.removeHarvestIcon();

				cropView.cropIconUrl = cropVO.iconUrl;
				// cropView.cropIcon.cacheAs = "bitmap";

				// 改变作物显示状态
				// 遗留的老作物是没有 iconUrl 的   // 2017-09-16 hsx
				if(cropVO.iconUrl)
				{
					cropView.cropIcon.loadImage(cropVO.iconUrl,0,0,0,0,Handler.create(this,function():void{
						texture = Laya.loader.getRes(cropVO.iconUrl);
						if(texture)
						{
							cropView.cropIcon.source = texture;	// 图片显示状态无法正常切换的解决方式！
							cropView.cropIcon.width = texture.width;	// 77
							cropView.cropIcon.height = texture.height;	// 21
							if(landGrid)
							{
								cropView.x = landGrid.width-cropView.width>>1;	 // 28;
								cropView.y = landGrid.height-cropView.height>>1; // -20;
								cropView.updateWormOrGrassPos();
							}
						}
					}));
				}
			}

			// 一个地块上的作物对应一个特定计时器
			let timerUtil:TimerUtil;
			if(!cropVO.timerUtil)
			{
				timerUtil = new TimerUtil();
				cropVO.timerUtil = timerUtil;
			}
			else
				timerUtil = cropVO.timerUtil;

			// 死亡
			if(cropVO.isDeath)
			{
				// 死亡状态，死亡量+1

				// 移除计时器
				timerUtil.removeTimerCallback({"callback":CropCtrl.instance.friendTimerFn,"cropVO":cropVO});
			}
			else
			{
				// 阶段成熟
				if(cropVO.remnantOutput > 0)
				{
					// 显示成熟状态图标
					if(cropView)
					{
						// console.log("成熟");
						cropView.addHarvestIcon();
					}

					// 移除计时器
					timerUtil.removeTimerCallback({"callback":CropCtrl.instance.friendTimerFn,"cropVO":cropVO});
				}
				else
				{
					if(cropVO.growthTime <= 0)
					{
						console.info("倒计时 <= 0,需移除计时器...");

					}
					else
					{
						console.log("未成熟");
						// 注册倒计时器
						timerUtil.initCropPara = {"landId":cropVO.landId,"seedId":cropVO.id};
						timerUtil.regTimer(cropVO.growthTime);
						// 作物的状态更新计时器
						timerUtil.addTimerCallback({"callback":CropCtrl.instance.friendTimerFn,"cropVO":cropVO});
					}
				}
			}

			// 一键收获后更新作物状态
			if(!CropCtrl.instance.cropObjArr || CropCtrl.instance.cropObjArr.length==0)
				return;
			Laya.timer.loop(500,CropCtrl.instance,CropCtrl.instance.friendCallLaterFn);
		}


		/**
		 * 加入时间延迟，以一定时间间隔来收获多个作物
		 */
		private callLaterFn():void
		{
			console.log("timer is running...");

			let obj:Object;
			if(CropCtrl.instance.cropObjArr.length>0)
			{
				obj = CropCtrl.instance.cropObjArr.splice(0,1)[0];
				CropCtrl.instance.resultHandler(obj);
				CropCtrl.instance.request_initCrop(obj["landId"],obj["seedId"]);
			}
			else
			{
				Laya.timer.clear(this,CropCtrl.instance.callLaterFn);
			}
		}


		private friendCallLaterFn():void
		{
			let obj:Object;
			if(CropCtrl.instance.cropObjArr.length>0)
			{
				obj = CropCtrl.instance.cropObjArr.splice(0,1)[0];
				CropCtrl.instance.resultHandler(obj);
				CropCtrl.instance.request_initFriendCrop(obj["landId"],obj["seedId"]);
			}
			else
			{
				Laya.timer.clear(this,CropCtrl.instance.friendCallLaterFn);
			}
		}

		/**
		 * 倒计时更新作物状态
		 * @nowTime 当前剩余时间（秒）
		 */
		timerFn(cropVO:CropVO,nowTime:number):void
		{
			if(!cropVO)
				return;
			let curGrid: views.teaRoom.LandGridView = LandCtrl.landView.getLandGridById(cropVO.landId);
			if(!curGrid)
				return;
			let cropView:views.teaRoom.crop.CropView = curGrid.cropView;
			if(!cropView)
				return;
			let cropTip:ui.gameUI.tips.CropInfoTipUI = views.teaRoom.crop.CropView.cropTip;	// cropView.cropTip;
			if(!cropTip)
				return;

			cropVO.growthTime = nowTime;
			cropTip.cropName.text = cropVO.name+"(第"+cropVO.season+"季)";
			cropTip.state.text = "状态("+cropVO.statusTxt+")";
			if(cropVO.remnantOutput)
			{
				cropTip.phase.text = cropVO.growthStateTxt+"(产："+cropVO.totalOutput+"剩："+cropVO.remnantOutput+")";
			}
			else
			{
				if(cropVO.growthTime <= 120)
					cropTip.phase.text = cropVO.growthStateTxt+"("+cropVO.growthTimeTxt(true)+(cropVO.nextLevelText?cropVO.nextLevelText:"")+")";
				else
					cropTip.phase.text = cropVO.growthStateTxt+"("+cropVO.growthTimeTxt(false)+(cropVO.nextLevelText?cropVO.nextLevelText:"")+")";
				// cropTip.phase.text = cropVO.levelText+"("+cropVO.growthTime+cropVO.nextLevelText+")";
			}
			if(cropVO.growthRate)
				cropTip.progress.value = cropVO.growthRate;
			else
				cropTip.progress.visible = false;
			// console.log("作物状态计时器更新成功！！！");
		}

		friendTimerFn(cropVO:CropVO,nowTime:number):void
		{
			if(!cropVO)
				return;
			let curGrid: views.friendList.FriendLandGridView = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
			if(!curGrid)
				return;
			let cropView:views.friendList.FriendCropView = curGrid.cropView;
			if(!cropView)
				return;
			let cropTip:ui.gameUI.tips.CropInfoTipUI = views.friendList.FriendCropView.cropTip;	// cropView.cropTip;
			if(!cropTip)
				return;

			cropVO.growthTime = nowTime;
			cropTip.cropName.text = cropVO.name+"(第"+cropVO.season+"季)";
			cropTip.state.text = "状态("+cropVO.statusTxt+")";
			if(cropVO.remnantOutput)
			{
				cropTip.phase.text = cropVO.growthStateTxt+"(产："+cropVO.totalOutput+"剩："+cropVO.remnantOutput+")";
			}
			else
			{
				if(cropVO.growthTime <= 120)
					cropTip.phase.text = cropVO.growthStateTxt+"("+cropVO.growthTimeTxt(true)+(cropVO.nextLevelText?cropVO.nextLevelText:"")+")";
				else
					cropTip.phase.text = cropVO.growthStateTxt+"("+cropVO.growthTimeTxt(false)+(cropVO.nextLevelText?cropVO.nextLevelText:"")+")";
				// cropTip.phase.text = cropVO.levelText+"("+cropVO.growthTime+cropVO.nextLevelText+")";
			}
			if(cropVO.growthRate)
				cropTip.progress.value = cropVO.growthRate;
			else
				cropTip.progress.visible = false;
			// console.log("作物状态计时器更新成功！！！");
		}

		/**
		 * 施肥
		 * @param paramObj: {"li":,"si":,"ti":}
		 */
		request_actProp(paramObj:Object):void
		{
			CropModel.callback = this.fertilizeOverFn;
			CropModel.getInstance().request_actProp(paramObj);
		}

		private fertilizeOverFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);

			if(takeData["landId"] && takeData["seedId"])
			{
				TipLayerManager.tipLayer.showDrawBgTip("施肥成功！");
				CropCtrl.instance.request_initCrop(takeData["landId"],takeData["seedId"]);
			}
		}

		/**
		 * 除虫
		 * @param isFarmer 是否为茶农工作
		 * @param curCoordinate 茶农的坐标
		 */
		request_actPesticide(cropVO:CropVO,isFarmer:boolean=false,curCoordinate?:Laya.Point):void
		{
			CropModel.callback = this.removeOneWormFn;
			CropModel.getInstance().request_actPesticide(cropVO,isFarmer,curCoordinate);
		}

		request_actFriendPesticide(cropVO:CropVO):void
		{
			CropModel.callback = this.removeFriendOneWormFn;
			CropModel.getInstance().request_actFriendPesticide(cropVO);
		}

		private removeOneWormFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);

			if(!takeData["errMsg"])
			{
				// 移除一个虫子
				CropCtrl.instance.removeOneWormFromCropView(takeData["landId"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}

		private removeFriendOneWormFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);

			if(!takeData["errMsg"])
			{
				// 移除一个虫子
				CropCtrl.instance.removeFriendOneWormFromCropView(takeData["landId"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}

		/**
		 * 除草
		 * @param isFarmer 是否为茶农工作
		 * @param curCoordinate 茶农的坐标
		 */
		request_actWipeGrass(cropVO:CropVO,isFarmer:boolean=false,curCoordinate?:Laya.Point):void
		{
			CropModel.callback = this.removeOneGrassFn;
			CropModel.getInstance().request_actWipeGrass(cropVO,isFarmer,curCoordinate);
		}

		request_actFriendWipeGrass(cropVO:CropVO):void
		{
			CropModel.callback = this.removeFriendOneGrassFn;
			CropModel.getInstance().request_actFriendWipeGrass(cropVO);
		}

		private removeOneGrassFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(!takeData["errMsg"])
			{
				CropCtrl.instance.removeOneGrassFromCropView(takeData["landId"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}

		private removeFriendOneGrassFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(!takeData["errMsg"])
			{
				CropCtrl.instance.removeFriendOneGrassFromCropView(takeData["landId"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}

		/**
		 * 浇水
		 * @param isFarmer 是否为茶农工作
		 * @param curCoordinate 茶农的坐标
		 */
		request_actWater(cropVO:CropVO,isFarmer:boolean=false,curCoordinate?:Laya.Point):void
		{
			CropModel.callback = this.waterOverFn;
			CropModel.getInstance().request_actWater(cropVO,isFarmer,curCoordinate);
		}

		request_actFriendWater(cropVO:CropVO):void
		{
			CropModel.callback = this.waterFriendOverFn;
			CropModel.getInstance().request_actFriendWater(cropVO);
		}

		private waterOverFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(!takeData["errMsg"])
			{
				// 地块解除干旱
				CropCtrl.instance.removeDryStateFromCropView(takeData["landId"],takeData["newStatus"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}

		private waterFriendOverFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(!takeData["errMsg"])
			{
				// 地块解除干旱
				CropCtrl.instance.removeFriendDryStateFromCropView(takeData["landId"],takeData["newStatus"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}


		/**
		 * 放草
		 */
		request_putGrass(cropVO:CropVO):void{
			CropModel.callback = this.putOneGrassFn;
			CropModel.getInstance().request_putGrass(cropVO);
		}

		private putOneGrassFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(!takeData["errMsg"])
			{
				CropCtrl.instance.addOneGrassToCropView(takeData["landId"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}


		/**
		 * 放虫
		 */
		request_putWorm (cropVO:CropVO):void
		{
			CropModel.callback = this.putOneWormFn;
			CropModel.getInstance().request_putWorm(cropVO);
		}

		private putOneWormFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);
			if(!takeData["errMsg"])
			{
				CropCtrl.instance.addOneWormToCropView(takeData["land"]);
			}
			CropCtrl.callback && CropCtrl.callback();
		}

		/**
		 * 收获单个作物
		 */
		request_actCollect(landId:number,seedId:number):void
		{
			CropModel.callback = this.harvestCropOverFn;
			CropModel.getInstance().request_actCollect(landId,seedId);
		}

		harvestCropOverFn(takeData:any):void
		{
			CropCtrl.instance.resultHandler(takeData);

			if(!takeData["errMsg"])
			{
				CropCtrl.instance.request_initCrop(takeData["landId"],takeData["seedId"]);
			}
		}

		/** 一键收获 */
		 request_actAllCollect():void
		 {
			 CropModel.callback = CropCtrl.instance.harvestAllCropOver;
			 CropModel.getInstance().request_actAllCollect();
		 }

		/** 偷茶 */
		 request_actFriendAllCollect():void
		 {
			CropModel.callback = CropCtrl.instance.harvestFriendAllCropOver;
			CropModel.getInstance().request_actFriendAllCollect();
		 }

		 private harvestAllCropOver(takeData:Object):void
		 {
			if(takeData["errMsg"])
			{
				TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
			}
			else
			{
				// 包含 {"landId": , "seedId": } 样式对象的数组
				CropCtrl.instance.cropObjArr = takeData["cropObjArr"];
				let obj:Object;
				// 注意：多个连续请求会有问题！
				// while(this.cropObjArr.length>0)
				// {
					obj = CropCtrl.instance.cropObjArr.splice(0,1)[0];
					CropCtrl.instance.resultHandler(obj);
					CropCtrl.instance.request_initCrop(obj["landId"],obj["seedId"]);
				// }
			}
		 }

		 private harvestFriendAllCropOver(takeData:Object):void
		 {
			if(takeData["errMsg"])
			{
				TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
			}
			else
			{
				TipLayerManager.tipLayer.showDrawBgTip("摘完了，摘完了，快走吧！");
				// 包含 {"landId": , "seedId": } 样式对象的数组
				CropCtrl.instance.cropObjArr = takeData["friendCropObjArr"];
				let obj:Object;
				// 注意：多个连续请求会有问题！
				// while(this.cropObjArr.length>0)
				// {
					obj = CropCtrl.instance.cropObjArr.splice(0,1)[0];
					CropCtrl.instance.resultHandler(obj);
					CropCtrl.instance.request_initFriendCrop(obj["landId"],obj["seedId"]);
				// }
			}
		 }

		/**
		 * 铲除作物
		 */
		request_deleteCrop(landId:number,seedId:number):void
		{
			CropModel.callback = this.deleteCropOverFn;
			CropModel.getInstance().request_deleteCrop(landId,seedId);
		}

		deleteCropOverFn(takeData:Object):void
		{
			CropCtrl.instance.resultHandler(takeData);

			if(!takeData["errMsg"])
			{
				// 移除作物
				LandCtrl.getInstance().removeCropViewByLandId(takeData["landId"]);
			}
		}

		/**
		 * 添加作物至某地块
		 */
		addCropToLandGrid(cropVO:CropVO):void
		{
			if(!cropVO)
				return;

			let cropView:views.teaRoom.crop.CropView = new views.teaRoom.crop.CropView();
			cropView.name = cropVO.id + "";	 // 以 种子id 为作物命名！
			cropView.updateCropState = CropCtrl.instance.initCropOver;	// 更新状态回调
			cropView.init(cropVO);

			// this.cropViewArr.push(cropView);
		}

		/**
		 * 添加作物至某地块
		 */
		addFriendCropToLandGrid(cropVO:CropVO):void
		{
			if(!cropVO)
				return;

			let cropView:views.friendList.FriendCropView = new views.friendList.FriendCropView();
			cropView.name = cropVO.id + "";	 // 以 种子id 为作物命名！
			cropView.updateCropState = CropCtrl.instance.initFriendCropOver;	// 更新状态回调
			cropView.init(cropVO);

			this.friendCropViewArr.push(cropView);
		}

		/**
		 * 从作物中移除一个虫子
		 */
		removeOneWormFromCropView(landId:number):void
		{
			let landGrid:views.teaRoom.LandGridView = LandCtrl.landView.getLandGridById(landId);
			if(!landGrid || !landGrid.cropView)
				return;
			if(landGrid.cropView.wormHBox.numChildren>0)
				landGrid.cropView.wormHBox.removeChildAt(0);
		}

		removeFriendOneWormFromCropView(landId:number):void
		{
			let landGrid:views.friendList.FriendLandGridView = LandCtrl.friendLandView.getLandGridById(landId);
			if(!landGrid || !landGrid.cropView)
				return;
			if(landGrid.cropView.wormHBox.numChildren>0)
				landGrid.cropView.wormHBox.removeChildAt(0);
		}

		/**
		 * 从作物中移除一颗草
		 */
		removeOneGrassFromCropView(landId:number):void
		{
			let landGrid:views.teaRoom.LandGridView = LandCtrl.landView.getLandGridById(landId);
			if(!landGrid || !landGrid.cropView)
				return;
			if(landGrid.cropView.grassHBox.numChildren>0)
				landGrid.cropView.grassHBox.removeChildAt(0);
		}

		removeFriendOneGrassFromCropView(landId:number):void
		{
			let landGrid:views.friendList.FriendLandGridView = LandCtrl.friendLandView.getLandGridById(landId);
			if(!landGrid || !landGrid.cropView)
				return;
			if(landGrid.cropView.grassHBox.numChildren>0)
				landGrid.cropView.grassHBox.removeChildAt(0);
		}

		/**
		 * 添加一棵草至作物中
		 */
		addOneGrassToCropView(landId:number):void
		{
			let landGrid:views.friendList.FriendLandGridView = LandCtrl.friendLandView.getLandGridById(landId);
			if(!landGrid || !landGrid.cropView)
				return;
			landGrid.cropView.addGrass();
			// CropCtrl.friendCropView.addGrass();
			// landGrid.cropView.grassHBox
		}

		/**
		 * 添加一条虫至作物中
		 */
		addOneWormToCropView(cropVO:CropVO):void  //landId:number
		{
			let landGrid:views.friendList.FriendLandGridView = LandCtrl.friendLandView.getLandGridById(cropVO.landId);
			if(!landGrid || !landGrid.cropView)
				return;
			// if(landGrid.cropView.grassHBox.numChildren<=0)
			// 	landGrid.cropView.grassHBox.removeChildAt(0);
			CropCtrl.friendCropView.addWorm();
		}


		/**
		 * 地块解除干旱状态
		 */
		removeDryStateFromCropView(landId:number,newStatus:number):void
		{
			let curLandVO:models.teaRoom.LandVO = models.teaRoom.LandModel.getLandVOByLandId(landId);
			if(!curLandVO)
				return;
			curLandVO.status = newStatus;
			LandCtrl.landView.updateLandGridState(landId,curLandVO);
		}

		/**
		 * 好友地块解除干旱状态
		 */
		removeFriendDryStateFromCropView(landId:number,newStatus:number):void
		{
			let curLandVO:models.teaRoom.LandVO = models.teaRoom.LandModel.getFriendLandVOByLandId(landId);
			if(!curLandVO)
				return;
			curLandVO.status = newStatus;
			LandCtrl.friendLandView.updateLandGridState(landId,curLandVO);
		}

		/**
		 * 根据作物id排序
		 */
		sortCropViewArrById(view1:views.teaRoom.crop.CropView,view2:views.teaRoom.crop.CropView):number
		{
			let id1:number = parseInt(view1.name);
			let id2:number = parseInt(view2.name);
			if(id1 > id2)
				return 1;
			else if(id1 < id2)
				return -1;
			else
				return 0;
		}

		/**
		 * 根据作物id排序(好友)
		 */
		sortFriendCropViewArrById(view1:views.friendList.FriendCropView,view2:views.friendList.FriendCropView):number
		{
			let id1:number = parseInt(view1.name);
			let id2:number = parseInt(view2.name);
			if(id1 > id2)
				return 1;
			else if(id1 < id2)
				return -1;
			else
				return 0;
		}

	}
}
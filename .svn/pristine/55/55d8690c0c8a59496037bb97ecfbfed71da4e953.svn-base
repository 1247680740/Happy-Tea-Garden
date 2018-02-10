namespace views.teaRoom
{
	import CropView = views.teaRoom.crop.CropView;
	import CropCtrl = controllers.teaRoom.crop.CropCtrl;
	import LandCtrl = controllers.teaRoom.LandCtrl;
	import CropModel = models.teaRoom.crop.CropModel;
	import CropVO = models.base.CropVO;
	import LandVO = models.teaRoom.LandVO;
	import BagCtrl = controllers.teaRoom.bag.BagCtrl;
	import Event = laya.events.Event;
	import GameConfig = configs.GameConfig;
	import GlowFilter = laya.filters.GlowFilter;
    import ColorFilter = laya.filters.ColorFilter;

	/**
	 * 土地格子视图
	 */
	export class LandGridView extends ui.gameUI.land.LandGridUI
	{
		/** 地块上的作物 */
		private _cropView:CropView;

		private glowFilter: GlowFilter;
        private colorFilter: ColorFilter;

		constructor()
		{
			super();
			this.cacheAs = "bitmap";	// 可能对 DraCall/Canvas 影响较大
			this.glowFilter = new GlowFilter("#FFE553", 10, 0, 0);
            this.colorFilter = new ColorFilter([
                0.5, 0.5, 0.56, 0, 0,  // R
                0, 0, 0, 0, 0,  // G
                0, 0, 0, 0, 0,  // B
                0, 0, 0, 1, 0,  // A
            ]);

			this.toolTip = "tip info"; 	// or  Handler().

			this.resetShowState();

			this.on(Event.MOUSE_OVER, this, this.landGridMouseOverFn);
			this.on(Event.MOUSE_OUT, this, this.landGridMouseOutFn);
			this.on(Event.CLICK, this, this.gridClkedFn);
		}

		/** 状态复位：所有状态均隐藏 */
		resetShowState():void
		{
			this.commonLand.visible = false;
			this.blackLand.visible = false;
			this.redLand.visible = false;
			this.dryCommonLand.visible = false;
			this.dryBlackLand.visible = false;
			this.dryRedLand.visible = false;
			this.disableLand.visible = false;
			this.disableTip.visible = false;
		}

		landGridMouseOverFn(event: Event): void
        {
			this.filters = [this.glowFilter];	// ,this.colorFilter
			// 作物信息提示
			if(!this.cropView)
				return;
			this.cropView.cropViewMouseOverFn();
        }

        landGridMouseOutFn(event: Event): void
        {
			this.filters = [];

			if(!this.cropView)
				return;
			this.cropView.cropViewMouseOutFn();
        }

		 /**
		  * 地块被点击后
		  */
        gridClkedFn(event:Event): void
        {
			let curLandId:number = parseInt(this.name);

			// 未开垦
            if(this.disableLand.visible)
			{
				if(GameConfig.curOperateType == "landUpgrade")
					TipLayerManager.tipLayer.showDrawBgTip("未开垦的土地无法升级哦！");
				else if(this.disableTip.visible)
					LandCtrl.landView.event(LandView.WILL_ASSART_EVENT,parseInt(this.name));	// this.name==landId
			}
            else
            {
                // 已有作物
                if (models.teaRoom.crop.CropModel.isHasCropInLandGrid(curLandId))
                {
					let cropVO:CropVO = CropModel.getCropVOByLandId(curLandId);

					// 普通鼠标
					if(GameConfig.curOperateType == "commonMouse")
					{

					} // 种植状态则取消
					else if(GameConfig.curOperateType == "plant")
					{
						TipLayerManager.tipLayer.showDrawBgTip("该地块已有作物！");
					} // 施肥
					else if(GameConfig.curOperateType == "fertilize")
					{
						if(!cropVO)
							return;
						// 对成熟或枯萎状态的作物施肥，则弹出气泡：该阶段不能施肥
						if(cropVO.remnantOutput > 0 || cropVO.isDeath)
						{
							TipLayerManager.tipLayer.showDrawBgTip("该阶段不能施肥！");
						}
						else
						{
							let paramObj:Object = {};
							paramObj["landId"] = curLandId;
							paramObj["seedId"] = cropVO.id;
							paramObj["toolId"] = parseInt(views.teaRoom.toolBar.DownToolBarView.curShowCursor.name);

							CropCtrl.callback = CropCtrl.getInstance().callbackFn;
							CropCtrl.getInstance().setRunKey = {"key":CropCtrl.FERTILIZE,"value":paramObj};
						}
					} // 除虫
					else if(GameConfig.curOperateType == "killWorm")
					{
						if(!cropVO)
							return;
						CropCtrl.getInstance().request_actPesticide(cropVO);

					} // 除草
					else if(GameConfig.curOperateType == "removeGrass")
					{
						if(!cropVO)
							return;
						CropCtrl.getInstance().request_actWipeGrass(cropVO);
					} // 浇水
					else if(GameConfig.curOperateType == "water")
					{
						if(!cropVO)
							return;
						CropCtrl.getInstance().request_actWater(cropVO);
					}  // 单个收获
					else if(GameConfig.curOperateType == "harvestOne")
					{
						// 请求接口
						CropCtrl.callback = CropCtrl.getInstance().callbackFn;
						CropCtrl.getInstance().setRunKey = {"key":CropCtrl.HARVEST_ONE,"value":curLandId};

					} // 全部收获
					else if(GameConfig.curOperateType == "harvestAll")
					{
						CropCtrl.callback = CropCtrl.getInstance().callbackFn;
						CropCtrl.getInstance().setRunKey = {"key":CropCtrl.HARVEST_ALL};

					} // 铲除作物
					else if(GameConfig.curOperateType == "removeCrop")
					{
						if(!cropVO)
							return;
						if(cropVO.isDeath)
						{
							CropCtrl.getInstance().request_deleteCrop(curLandId,cropVO.id);
						}
						else
						{
							let info:string = "该土地上的作物还没收获，是否要铲除掉？";
							TipLayerManager.tipLayer.showYesNoTip(info,function():void{
								CropCtrl.getInstance().request_deleteCrop(curLandId,cropVO.id);
							});
						}
					}
					else if(GameConfig.curOperateType == "landUpgrade")
					{
						TipLayerManager.tipLayer.showDrawBgTip("有作物的土地不能升级哦！");
					}
                }
                else
                {
                    // 开始种植
					if(GameConfig.curOperateType == "plant")
					{
						let landVO:LandVO = models.teaRoom.LandModel.getLandVOByLandId(curLandId);
						if(landVO && landVO.status != 0)
							LandCtrl.landView.event(LandView.GROWTH_EVENT, curLandId);
					}
					else if(GameConfig.curOperateType == "fertilize")
					{
						TipLayerManager.tipLayer.showDrawBgTip("该地块没有作物！");

					} // 土地升级
					else if(GameConfig.curOperateType == "landUpgrade")
					{
						LandCtrl.getInstance().request_getLandLevelUpInfo(curLandId);
					}
                }
            }
        }

		/**
		 * 为地块添加作物
		 */
		set cropView(cropView:CropView)
		{
			this._cropView = cropView;
			if(this._cropView)
			{
				if(!this.getChildByName(this._cropView.name))
				{
					this.addChild(this._cropView);
				}
				this._cropView.autoSize = true;
				// this._cropView.pos(this.width-this._cropView.width>>1,-35);	// 2017-06-26 hsx
				this._cropView.pos(this.width-this._cropView.width>>1, -this._cropView.height>>1);
				// 2017-06-26 hsx
				this.cropView.grassHBox.scale(0.5,0.5);
				// 问题：wormHBox、grassHBox 的宽、高均为 0 ！
				this.addChild(this.cropView.wormHBox);
				this.addChild(this.cropView.grassHBox);
				this.cropView.wormHBox.autoSize = true;
				this.cropView.grassHBox.autoSize = true;

				this.cropView.wormHBox.pos(20,this.height>>1);
				this.cropView.grassHBox.pos(this.cropView.wormHBox.x+35,this.cropView.wormHBox.y+20);
			}
		}

		get cropView():CropView
		{
			return this._cropView;
		}


	}
}
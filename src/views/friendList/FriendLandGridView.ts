namespace views.friendList
{
	import FriendCropView = views.friendList.FriendCropView;
	import CropCtrl = controllers.teaRoom.crop.CropCtrl;
	import LandCtrl = controllers.teaRoom.LandCtrl;
	import CropModel = models.teaRoom.crop.CropModel;
	import CropVO = models.base.CropVO;
	import LandVO = models.teaRoom.LandVO;
	import Event = laya.events.Event;
	import GameConfig = configs.GameConfig;
	import GlowFilter = laya.filters.GlowFilter;
    import ColorFilter = laya.filters.ColorFilter;

	/**
	 * 好友土地格子视图
	 */
	export class FriendLandGridView extends ui.gameUI.land.LandGridUI
	{
		/** 地块上的作物 */
		private _friendCropView:FriendCropView;

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
			this.on(Event.CLICK, this, this.friendGridClkedFn);
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
			if(!this._friendCropView)
				return;
			this._friendCropView.cropViewMouseOverFn();
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
        friendGridClkedFn(event:Event): void
        {
			let curLandId:number = parseInt(this.name);


			// 未开垦
            if(this.disableLand.visible)
			{
				if(GameConfig.curOperateType == "landUpgrade")
					TipLayerManager.tipLayer.showDrawBgTip("这块土地啥都没有哦！");
			}
            else
            {
                // 已有作物
                if (models.teaRoom.crop.CropModel.isHasFriendCropInLandGrid(curLandId))
                {
					let cropVO:CropVO = CropModel.getFriendCropVOByLandId(curLandId);

					// 普通鼠标
					if(GameConfig.curOperateType == "commonMouse")
					{

					} // 除虫
					else if(GameConfig.curOperateType == "killWorm")
					{
						if(!cropVO)
							return;
						CropCtrl.getInstance().request_actFriendPesticide(cropVO);

					} // 除草
					else if(GameConfig.curOperateType == "removeGrass")
					{
						if(!cropVO)
							return;
						CropCtrl.getInstance().request_actFriendWipeGrass(cropVO);
					} // 浇水
					else if(GameConfig.curOperateType == "water")
					{
						if(!cropVO)
							return;
						CropCtrl.getInstance().request_actFriendWater(cropVO);
					}  //放草
					else if(GameConfig.curOperateType == "grass"){
						if(!cropVO)
							return;

						if(cropVO.remnantOutput > 0){
							TipLayerManager.tipLayer.showDrawBgTip("这个阶段不能放杂草！");
						}else{
							CropCtrl.getInstance().request_putGrass(cropVO);
						}
					} //放虫
					else if(GameConfig.curOperateType == "worm"){
						if(!cropVO)
							return;
						if(cropVO.remnantOutput > 0){
							TipLayerManager.tipLayer.showDrawBgTip("这个阶段不能放虫子！");
						}else{
							CropCtrl.getInstance().request_putWorm(cropVO);
						}
					}  // 全部收获
					else if(GameConfig.curOperateType == "harvestAll")
					{
						CropCtrl.callback = CropCtrl.getInstance().FriendCallbackFn;
						CropCtrl.getInstance().setRunKey = {"key":CropCtrl.HARVEST_ALL};

					}
                }else{
					TipLayerManager.tipLayer.showDrawBgTip("这块土地啥都没种,不能操作哦！");
				}
            }
        }

		/**
		 * 为地块添加作物
		 */
		set cropView(cropView:FriendCropView)
		{
			this._friendCropView = cropView;
			if(this._friendCropView)
			{
				if(!this.getChildByName(this._friendCropView.name))
				{
					this.addChild(this._friendCropView);
				}
				this._friendCropView.autoSize = true;
				// this._cropView.pos(this.width-this._cropView.width>>1,-35);	// 2017-06-26 hsx
				this._friendCropView.pos(this.width-this._friendCropView.width>>1, -this._friendCropView.height>>1);
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

		get cropView():FriendCropView
		{
			return this._friendCropView;
		}


	}
}
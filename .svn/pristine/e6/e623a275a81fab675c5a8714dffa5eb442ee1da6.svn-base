namespace views.teaRoom.bag
{
	import Event = laya.events.Event;
	import Handler = laya.utils.Handler;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import TabItemUI = ui.gameUI.common.TabItemUI;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;

	/**
	 * 背包弹出面板
	 */
	export class BagDialogView extends BaseBorderUI
	{
		/** 类型前缀 */
		typePrefix:string = "gameUI/common/resTypeIcon/";
		/** 类型后缀 */
		typeSuffix:string = ".png";

		/** 当前选中的 Tab 选项卡的名称 */
		curSelectedTabName:string;

		/**
		 * 种子选项卡
		 */
		seedTab:TabItemUI;
		/**
		 * 工具选项卡
		 */
		toolTab:TabItemUI;
		/**
		 * 单元格容器
		 */
		gridContainer:Laya.Panel;

		constructor()
		{
			super();
			this.cacheAs = "bitmap";
			this.dragArea = `0,0,${this.width},60`;
			this.bgImg.size(647,268);
			this.size(647,268);

			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (647-600)/600;
			let hRate:number = 268/400;
			this.closeBtn.x += this.closeBtn.x*wRate;
			this.closeBtn.y -= this.closeBtn.y*hRate;

			// 缩放Dialog的尺寸
			// Dialog.manager.popupEffect=null;
			// Dialog.manager.closeEffect=null;
			// this.scale(1.1,0.7);

			this.titleImg.skin = "gameUI/common/icon/bagName.png";
			this.titleImg.x = this.width-this.titleImg.width>>1;
			this.titleImg.y -= 8;

			this.seedTab = new TabItemUI();
			this.seedTab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
			this.seedTab.pos(13,70);
			this.addChild(this.seedTab);
			this.toolTab = new TabItemUI();
			this.toolTab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
			this.toolTab.pos(13,150);
			this.addChild(this.toolTab);

			this.gridContainer = new Laya.Panel();
			this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
			this.gridContainer.pos(110,70);
			this.gridContainer.size(512,172);
			this.addChild(this.gridContainer);

			// this.show();

			//增加点击区
			// 法一
			// let g:Laya.Graphics = new Laya.Graphics();
			// g.drawRect(-10,-10,this.closeBtn.width+20,this.closeBtn.height+20,"#000000");
			// let hitA:Laya.HitArea = new Laya.HitArea();
			// hitA.hit = g;
			// this.closeBtn.hitArea = hitA;
			// 法二
			let rect:Laya.Rectangle = new Laya.Rectangle(-10,-10,this.closeBtn.width+20,this.closeBtn.height+20);
			this.closeBtn.hitArea = rect;
			this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
			// this.closeHandler = Handler.create(this,this.myCloseHandler,["close"]);
			this.seedTabFn();
			// 点击种子选项卡
			this.seedTab.on(Event.CLICK,this,this.seedTabFn);
			// 点击工具选项卡
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);
		}

		seedTabFn():void
		{
			this.seedTab.selectBg.visible = true;
			this.seedTab.unSelectBg.visible = false;
			this.toolTab.selectBg.visible = false;
			this.toolTab.unSelectBg.visible = true;
			this.curSelectedTabName = "seedTab";

			this.addBagGrid([ ]);
		}


		/** 填充背包格子（种子、道具） */
		addBagGrid(voArr:Array<any>):void	// seedVOArr:Array<SeedVO>
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);

			if(!voArr || !voArr.length)
				return;

			let len:number = voArr.length;
			let i:number;
			// 种子
			if(this.curSelectedTabName == "seedTab")
			{
				let seedVO:SeedVO;
				for(i=0; i<len; i++)
				{
					// 尝试 MovieClip 同步统一加载（没异步加载方便！）
					let gridItem:ui.gameUI.common.BagGridItemUI = new ui.gameUI.common.BagGridItemUI();
					seedVO = voArr[i];
					gridItem.name = seedVO.id + "";
					gridItem.lvl.text = seedVO.lvl + "";
					gridItem.nums.text = seedVO.seedNums + "";
					let _type:string;
					if(seedVO.type == "teaseed")
						_type = "tea";
					else if(seedVO.type == "flowerseed")
						_type = "flower"
					else if(seedVO.type == "othersseed")
						_type = "food";
					if(_type)
						gridItem.typeIcon.skin = this.typePrefix + _type + this.typeSuffix;
					// gridItem.imgContainer.addChild(mc);
					gridItem.imgContainer.skin = seedVO.icon;
					this.gridContainer.addChild(gridItem);
					console.log("type:"+seedVO.type);

					// 每行最多放 6 个
					if(i>=6)
					{
						gridItem.x = parseInt((i-6) % 6 + "") * (gridItem.width + 15);
						gridItem.y = (parseInt((i-6) / 6 + "")  + 1) * (gridItem.height + 15);
					}
					else
					{
						gridItem.x = i * (gridItem.width + 15);
					}
					gridItem.on(Event.CLICK,this,this.gridItemClkedFn);
				}
			} // 道具
			else if(this.curSelectedTabName == "toolTab")
			{
				let toolVO:ToolVO;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.BagGridItemUI = new ui.gameUI.common.BagGridItemUI();
					toolVO = voArr[i];
					gridItem.name = toolVO.id + "";
					gridItem.lvl.text = toolVO.lvl + "";
					gridItem.nums.text = toolVO.nums + "";
					gridItem.typeIcon.skin = this.typePrefix + toolVO["type"] + this.typeSuffix;
					// gridItem.imgContainer.addChild(mc);
					gridItem.imgContainer.skin = toolVO.icon;
					this.gridContainer.addChild(gridItem);
					// this.gridContainer.space = 15;
					gridItem.x = i * (gridItem.width + 15);
					gridItem.on(Event.CLICK,this,this.gridItemClkedFn);
				}
			}
		}

		toolTabFn():void
		{
			this.toolTab.selectBg.visible = true;
			this.toolTab.unSelectBg.visible = false;
			this.seedTab.selectBg.visible = false;
			this.seedTab.unSelectBg.visible = true;

			this.curSelectedTabName = "toolTab";
		}


		/**
		 * 注意：调用 laya 的关闭操作再打开不显示
		 */
		myCloseHandler(name:string):void
		{
			if(name === Dialog.CLOSE)
			{
				console.log("BagDialogView has closed...");
				// this.visible = false;
				this.removeSelf();
			}
		}

		/** 点击种子或化肥后 */
		gridItemClkedFn(event:Event):void
		{
			console.log("cur name:"+ event.target.name);
			let curGrid:ui.gameUI.common.BagGridItemUI = event.target as ui.gameUI.common.BagGridItemUI;
			if(!curGrid)
				return;

			// 种子 => 种植
			if(this.curSelectedTabName == "seedTab")
			{
				configs.GameConfig.curOperateType = "plant";

			} // 道具 => 化肥 （不只化肥，待完善！！！）
			else if(this.curSelectedTabName == "toolTab")
			{
				 configs.GameConfig.curOperateType = "fertilize";

			}

			curGrid.imgContainer.name = curGrid.name;
			views.teaRoom.toolBar.DownToolBarView.instance.setShowTypeAndState(configs.GameConfig.curOperateType,curGrid.imgContainer);

			this.removeSelf();
		}

		closeBtnFn():void
		{
			// this.close("close");
			// this.closeHandler
			this.removeSelf();
			// this.destroy();	// 不销毁,否则后续报错
			// 默认选中第一个选项卡
			this.seedTabFn();
		}
	}
}
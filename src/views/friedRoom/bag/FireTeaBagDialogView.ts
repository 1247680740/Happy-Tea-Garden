namespace views.friedRoom.bag
{
	import Event = laya.events.Event;
	import Handler = laya.utils.Handler;
	import ToolVO = models.base.ToolVO;
	import TabItemUI = ui.gameUI.common.TabItemUI;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;

	/**
	 * 炒锅背包弹出面板
	 */
	export class FireTeaBagDialogView extends BaseBorderUI
	{
		/** 当前选中的 Tab 选项卡的名称 */
		curSelectedTabName:string;

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
			this.dragArea = `0,0,${this.width},60`;
			this.cacheAs = "bitmap";

			this.bgImg.size(647,268);
			this.size(647,268);
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (647-600)/600;
			let hRate:number = 268/400;
			this.closeBtn.x += this.closeBtn.x*wRate;
			this.closeBtn.y -= this.closeBtn.y*hRate;

			this.titleImg.skin = "gameUI/common/icon/bagName.png";
			this.titleImg.x = this.width-this.titleImg.width>>1;
			this.titleImg.y -= 8;

			this.toolTab = new TabItemUI();
			this.toolTab.tabName.skin = "gameUI/common/icon/toolTab.png";
			this.toolTab.pos(22,70);
			this.addChild(this.toolTab);

			this.gridContainer = new Laya.Panel();
			this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
			this.gridContainer.pos(117,70);
			this.gridContainer.size(505,172);
			this.addChild(this.gridContainer);

			this.toolTabFn();
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);
			let rect:Laya.Rectangle = new Laya.Rectangle(-10,-10,this.closeBtn.width+20,this.closeBtn.height+20);
			this.closeBtn.hitArea = rect;
			this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
		}

		/**
		 * 填充背包格子（道具）
		 */
		addBagGrid(voArr:Array<ToolVO>):void
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);

			if(!voArr)
				return;

			if(voArr.length > 0)
			{
				let len:number = voArr.length;
				let i:number;
				if(this.curSelectedTabName == "toolTab")
				{
					let toolVO:ToolVO;
					for(i=0; i<len; i++)
					{
						let gridItem:ui.gameUI.common.BagGridItemUI = new ui.gameUI.common.BagGridItemUI();
						toolVO = voArr[i];
						gridItem.name = toolVO.id + "";
						gridItem.lvl.text = toolVO.lvl + "级";
						gridItem.nums.text = toolVO.nums + "";
						gridItem.imgContainer.skin = toolVO.icon;
						this.gridContainer.addChild(gridItem);
						gridItem.x = i * (gridItem.width + 15);
						gridItem.on(Event.CLICK,this,this.gridItemClkedFn);
					}
				}
			}
			else
			{
				let l:laya.ui.Label = new laya.ui.Label();
				l.text = "空无一物，赶快去商店买些道具吧！";
				l.fontSize = 15;
				l.color = "#0000FF";
				l.underline = true;
				l.pos(this.gridContainer.width-l.width>>1,this.gridContainer.height-l.height>>1);
				l.once(Event.CLICK,this,this.gotoShop);
				this.gridContainer.addChild(l);
			}
		}

		/**
		 * 跳转至商店
		 */
		private gotoShop():void
		{
			this.closeBtnFn();
		 	controllers.friedRoom.shop.FriedTeaHomeShopCtrl.getInstance().showShopDialog();
		}

		toolTabFn():void
		{
			this.toolTab.selectBg.visible = true;
			this.toolTab.unSelectBg.visible = false;
			this.curSelectedTabName = "toolTab";
		}

		/**
		 * 点击火把后
		 */
		gridItemClkedFn(event:Event):void
		{
			console.log("cur name:"+ event.target.name);
			let curGrid:ui.gameUI.common.BagGridItemUI = event.target as ui.gameUI.common.BagGridItemUI;
			if(!curGrid)
				return;

			 if(this.curSelectedTabName == "toolTab")
			{
				 // ==================== 为炒锅加火时需用到此处 -- hsx ====================
				 configs.GameConfig.curOperateType = "fire";
			}

			curGrid.imgContainer.name = curGrid.name;
			views.friedRoom.toolBar.FireTeaHome_DownToolBarView.instance.setShowTypeAndState2(configs.GameConfig.curOperateType,curGrid.imgContainer);

			this.removeSelf();
		}

		closeBtnFn():void
		{
			this.removeSelf();
		}
	}
}
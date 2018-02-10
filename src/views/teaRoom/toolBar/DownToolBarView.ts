namespace views.teaRoom.toolBar
{
	import Event = laya.events.Event;
	import Timer = laya.utils.Timer;
	import GameConfig = configs.GameConfig;
	import DownToolBarUI = ui.gameUI.toolBar.DownToolBarUI;
	import Image = laya.ui.Image;
	import BagCtrl = controllers.teaRoom.bag.BagCtrl;

	/**
	 * 下部工具条视图
	 */
	export class DownToolBarView extends DownToolBarUI
	{
		/** 道具工具箱 */
		toolBoxView:views.teaRoom.toolBar.DownToolBoxView;
		/** 当前显示的光标 */
		static curShowCursor:Image;

		static commonMouse:Laya.Button;
		private static _instance:DownToolBarView;

		constructor()
		{
			super();
			DownToolBarView.commonMouse = this.commonMouse;
			DownToolBarView.curShowCursor = new Image();
			// DownToolBarView.curShowCursor.name = "sceneCursor";

			// 鼠标可穿透，增加点击的精确性
			this.mouseThrough = true;
			this.on(Event.CLICK,this,this.toolBarClkedFn);
		}

		static get instance():DownToolBarView
		{
			if(!DownToolBarView._instance)
				DownToolBarView._instance = new DownToolBarView();
			return DownToolBarView._instance;
		}

		/**
		 * 点击工具条上的各个功能按钮
		 */
		toolBarClkedFn(event:Event):void
		{
			let curName:string = event.target.name;

			if(this.toolBoxView)
				this.toolBoxView.visible = false;

			// 普通手型光标
			if(curName =="commonMouse")
			{
				this.setShowTypeAndState("commonMouse",this.commonMouse);

			} // 土地升级
			else if(curName =="landUpgrade")
			{
				this.setShowTypeAndState("landUpgrade", this.landUpgrade);

			} // 铁锹（翻地/铲除枯萎作物）
			else if(curName =="spade")
			{
				this.setShowTypeAndState("removeCrop", this.spade);

			} // 背包
			else if(curName === "bag")
			{
				configs.GameConfig.curOperateType = "bag";
				this.setShowTypeAndState("commonMouse",this.commonMouse);
				BagCtrl.getInstance().showBagDialog();

			} // 工具箱
			else if(curName === "toolBox")
			{
				this.setShowTypeAndState("commonMouse",this.commonMouse);
				if(!this.toolBoxView)
				this.toolBoxView = new views.teaRoom.toolBar.DownToolBoxView();
				// this.toolBoxView.size(200,60);
				// this.toolBoxView.width=200;
				// this.toolBoxView._width=200;
				this.toolBoxView.grass.visible=false;
				this.toolBoxView.worm.visible=false;
				this.toolBoxView.grass.mouseEnabled=false;
				this.toolBoxView.worm.mouseEnabled=false;
				this.toolBoxView.visible = true;
				this.toolBoxView.name = "toolBoxView";
				UILayerManager.teaGardenUI.addChild(this.toolBoxView);
				this.toolBoxView.x = this.toolBox.x - 5;
				this.toolBoxView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - this.toolBoxView.height - 80;
			} // 单个收获
			else if(curName === "harvestOne")
			{
				this.setShowTypeAndState("harvestOne", this.harvestOne);

			} // 全部收获
			else if(curName =="harvestAll")
			{
				this.setShowTypeAndState("harvestAll", this.harvestAll);

			}
		}

		/**
		 * 设置当前光标的类型和状态
		 * @param type 操作类型
		 * @param btnOrImg 图标对象，如 Button/Image
		 */
		setShowTypeAndState(type:string,btnOrImg:any):void
		{
			configs.GameConfig.curOperateType = type;
			DownToolBarView.curShowCursor.skin = btnOrImg.skin;
			DownToolBarView.curShowCursor.name = btnOrImg.name;
			DownToolBarView.curShowCursor.x = btnOrImg.x;
			DownToolBarView.curShowCursor.y = btnOrImg.y - 50;

			if(btnOrImg.name == "commonMouse")
			{
				DownToolBarView.curShowCursor.pivotX = 5;
				DownToolBarView.curShowCursor.pivotY = 5;
			}
			else
			{
				DownToolBarView.curShowCursor.pivotX = 5;
				DownToolBarView.curShowCursor.pivotY = DownToolBarView.curShowCursor.height/2+10;
			}
		}
	}
}
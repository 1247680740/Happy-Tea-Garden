namespace views.friendList
{
	import Event = laya.events.Event;
	import Timer = laya.utils.Timer;
	import GameConfig = configs.GameConfig;
	import FriendList_DownToolBarUI = ui.gameUI.toolBar.FriendList_DownToolBarUI;
	import Image = laya.ui.Image;
	import BagCtrl = controllers.teaRoom.bag.BagCtrl;
	import SceneLayer = views.layers.SceneLayer;
	/**
	 * 下部工具条视图
	 */
	export class FriendList_DownToolBarView extends FriendList_DownToolBarUI
	{
		/** 道具工具箱 */
		toolBoxView:views.friendList.FriendList_DownToolBoxView;

		/** 当前显示的光标 */
		static curShowCursor:Image;

		private static _instance:FriendList_DownToolBarView;

		constructor()
		{
			super();

			FriendList_DownToolBarView.curShowCursor = new Image();

			// 鼠标可穿透，增加点击的精确性
			this.mouseThrough = true;
			this.on(Event.CLICK,this,this.toolBarClkedFn);
		}

		static get instance():FriendList_DownToolBarView
		{
			if(!FriendList_DownToolBarView._instance)
                FriendList_DownToolBarView._instance = new FriendList_DownToolBarView();
			return FriendList_DownToolBarView._instance;
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

			} // 我的家园
			else if(curName =="myHome")
			{
                UILayerManager.uiLayer.loadTeaRoom();

			} // 工具箱
			else if(curName === "toolBox")
			{
				if(!this.toolBoxView)
				this.toolBoxView = new views.friendList.FriendList_DownToolBoxView();
				this.toolBoxView.visible = true;
				this.toolBoxView.name = "toolBoxView";
				UILayerManager.friendUILayer.addChild(this.toolBoxView);
				this.toolBoxView.x = this.toolBox.x+160;
				this.toolBoxView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - this.toolBoxView.height - 50;
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
			FriendList_DownToolBarView.curShowCursor.skin = btnOrImg.skin;
			FriendList_DownToolBarView.curShowCursor.name = btnOrImg.name;
			FriendList_DownToolBarView.curShowCursor.x = btnOrImg.x;
			FriendList_DownToolBarView.curShowCursor.y = btnOrImg.y - 50;

			if(btnOrImg.name == "commonMouse")
			{
				FriendList_DownToolBarView.curShowCursor.pivotX = 5;
				FriendList_DownToolBarView.curShowCursor.pivotY = 5;
			}
			else
			{
				FriendList_DownToolBarView.curShowCursor.pivotX = 5;
				FriendList_DownToolBarView.curShowCursor.pivotY = FriendList_DownToolBarView.curShowCursor.height/2+10;
			}
		}
	}
}
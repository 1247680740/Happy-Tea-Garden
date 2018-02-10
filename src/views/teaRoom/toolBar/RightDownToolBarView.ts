namespace views.teaRoom.toolBar
{
	import Event = laya.events.Event;
	import RightDownToolBarUI = ui.gameUI.toolBar.RightDownToolBarUI;
	import DownToolBarView = views.teaRoom.toolBar.DownToolBarView;
	/**
	 * 右下部工具条：仓库、商店……
	 */
	export class RightDownToolBarView extends RightDownToolBarUI
	{

		constructor()
		{
			super();
			this.mouseThrough = true;
			this.on(Event.CLICK,this,this.btnClkedFn);
		}

		btnClkedFn(event:Event):void
		{
			let btnName:string = event.target.name;
			if(btnName == "storage")
			{
				controllers.teaRoom.storage.StorageCtrl.getInstance().showStorageDialog();
				this.setShowTypeAndState("commonMouse",DownToolBarView.commonMouse);
			}
			else if(btnName == "shop")
			{
				controllers.teaRoom.shop.ShopCtrl.getInstance().showShopDialog();
				this.setShowTypeAndState("commonMouse",DownToolBarView.commonMouse);
			}
			else if(btnName == "teaWiki")
			{
				controllers.teaWiki.TeaWikiCtrl.getInstance().showFireTeaWiki();
				this.setShowTypeAndState("commonMouse",DownToolBarView.commonMouse);
			}
			else if(btnName == "exam")
			{
				controllers.exam.ExamDialogCtrl.getInstance().showExamDialog();
				this.setShowTypeAndState("commonMouse",DownToolBarView.commonMouse);
			}
			else if(btnName == "friendBtn")
			{
				controllers.friendList.FriendListCtrl.getInstance().showFriendList();
				this.setShowTypeAndState("commonMouse",DownToolBarView.commonMouse);
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
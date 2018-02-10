namespace views.friedRoom.toolBar
{
	import Event = laya.events.Event;
	import FriedRightDownToolBarUI = ui.gameUI.toolBar.FireTeaHome_RightDownToolBarUI;
	import FriedTeaHomeShopCtrl = controllers.friedRoom.shop.FriedTeaHomeShopCtrl;
	import FriedTeaStorageCtrl = controllers.friedRoom.storage.FriedTeaStorageCtrl;
	import ExamDialogCtrl = controllers.exam.ExamDialogCtrl;
	import TeaWikiCtrl = controllers.teaWiki.TeaWikiCtrl;
	import FireTeaHome_DownToolBarView = views.friedRoom.toolBar.FireTeaHome_DownToolBarView;

	/**
	 * 炒茶室右下部工具条：仓库、商店……
	 */
	export class FriedRightDownToolBarView extends FriedRightDownToolBarUI
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
				FriedTeaStorageCtrl.getInstance().showStorageDialog();
				this.setShowTypeAndState2("hand1",FireTeaHome_DownToolBarView.commonMouse);
			}
			else if(btnName == "shop")
			{
				FriedTeaHomeShopCtrl.getInstance().showShopDialog();
				this.setShowTypeAndState2("hand1",FireTeaHome_DownToolBarView.commonMouse);
			}else if(btnName == "teaWiki")
			{
				TeaWikiCtrl.getInstance().showFireTeaWiki();
				this.setShowTypeAndState2("hand1",FireTeaHome_DownToolBarView.commonMouse);
			}else if(btnName == "exam")
			{
				ExamDialogCtrl.getInstance().showExamDialog();
				this.setShowTypeAndState2("hand1",FireTeaHome_DownToolBarView.commonMouse);
			}

		}


		/**
		 * 设置当前光标的类型和状态
		 * @param type 操作类型
		 * @param btnOrImg 图标对象，如 Button/Image
		 */
		setShowTypeAndState2(type:string,btnOrImg:any):void
		{
			configs.GameConfig.curOperateType = type;
			FireTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
			FireTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
			FireTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
			FireTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;

			if(btnOrImg.name == "hand1")
			{
				FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
				FireTeaHome_DownToolBarView.curCursor.pivotY = 5;
			}
			else
			{
				FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
				FireTeaHome_DownToolBarView.curCursor.pivotY = FireTeaHome_DownToolBarView.curCursor.height/2+10;
			}
		}
	}
}
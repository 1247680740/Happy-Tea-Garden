namespace views.makeRoom.toolBar
{
	import Event = laya.events.Event;
	import MakeTeaRightDownToolBarUI = ui.gameUI.toolBar.MakeTeaHome_RightDownToolBarUI;
	import FriedTeaHomeShopCtrl = controllers.friedRoom.shop.FriedTeaHomeShopCtrl;
	import MakeTeaHomeShopCtrl = controllers.makeRoom.shop.MakeTeaHomeShopCtrl;
	import FriedTeaStorageCtrl = controllers.friedRoom.storage.FriedTeaStorageCtrl;
    import MakeTeaStorageCtrl =controllers.makeRoom.storage.MakeTeaStorageCtrl;
	import ExamDialogCtrl = controllers.exam.ExamDialogCtrl;
	import TeaWikiCtrl = controllers.teaWiki.TeaWikiCtrl;
	import MakeTeaHome_DownToolBarView = views.makeRoom.toolBar.MakeTeaHome_DownToolBarView;
	/**
	 * 泡茶室右下部工具条：仓库、商店……
	 */
	export class MakeTeaRightDownToolBarView extends MakeTeaRightDownToolBarUI
	{
		constructor()
		{
			super();

			this.on(Event.CLICK,this,this.btnClkedFn);
		}

		btnClkedFn(event:Event):void
		{
			let btnName:string = event.target.name;
			if(btnName == "storage")
			{
				MakeTeaStorageCtrl.getInstance().showStorageDialog();
				// this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
			}
			else if(btnName == "shop")
			{
				MakeTeaHomeShopCtrl.getInstance().showShopDialog();
				// this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
			}else if(btnName == "teaWiki")
			{
				TeaWikiCtrl.getInstance().showFireTeaWiki();
				// this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
			}else if(btnName == "exam")
			{
				ExamDialogCtrl.getInstance().showExamDialog();
				// this.setShowTypeAndState2("hand1",MakeTeaHome_DownToolBarView.commonMouse);
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
			MakeTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
			MakeTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
			MakeTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
			MakeTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;

			console.info("当前选中 id："+btnOrImg.name+", skin:"+btnOrImg.skin);
		}
	}
}
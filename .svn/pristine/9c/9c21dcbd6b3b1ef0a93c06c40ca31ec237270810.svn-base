namespace views.layers
{
    import BaseView = views.base.BaseView;
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import LeftTopToolBarUI = ui.gameUI.toolBar.LeftTopToolBarUI;
    import PlayerInfoView = views.player.PlayerInfoView;
    import FriendInfoView = views.player.FriendInfoView;
    import GameConfig = configs.GameConfig;
    import Button = laya.ui.Button;

    /**
     * 好友UI层（进入好友主页面UI层）
     */
    export class FriendUILayer extends BaseView
    {
        /** 好友信息面板 */
        friendInfoView: FriendInfoView;
        /** 底部工具栏 */
        downToolBarView: views.friendList.FriendList_DownToolBarView;
        /** 右下角工具栏 */
        rightDownToolBarView: views.teaRoom.toolBar.RightDownToolBarView;

        private static _instance:FriendUILayer;

        constructor()
        {
            super();

            this.friendInfoView = controllers.player.PlayerInfoCtrl.friendInfoView;
            this.friendInfoView.x=this.friendInfoView.width+15;
            this.friendInfoView.y=0;
            this.friendInfoView.visible=true;
            this.addChild(this.friendInfoView);


            this.downToolBarView = views.friendList.FriendList_DownToolBarView.instance;
            this.downToolBarView.x = GameConfig.GAME_WINDOW_WIDTH - this.downToolBarView.width>> 1;
            this.downToolBarView.y = 570;
            this.addChild(this.downToolBarView);


            this.rightDownToolBarView = new views.teaRoom.toolBar.RightDownToolBarView();
			this.rightDownToolBarView.name="rightDownToolBarView";
            this.rightDownToolBarView.x = this.downToolBarView.x + this.downToolBarView.width + 30;
            this.rightDownToolBarView.y = 575;
            this.rightDownToolBarView.storage.visible=false;
            this.rightDownToolBarView.shop.visible=false;
            this.rightDownToolBarView.teaWiki.visible=false;
            this.rightDownToolBarView.exam.visible=false;
            this.rightDownToolBarView.storage.mouseEnabled=false;
            this.rightDownToolBarView.shop.mouseEnabled=false;
            this.rightDownToolBarView.teaWiki.mouseEnabled=false;
            this.rightDownToolBarView.exam.mouseEnabled=false;
            this.addChild(this.rightDownToolBarView);

            this.resetCursorState();
            Laya.timer.loop(100,this,this.updateCursorPosFn);
        }

        static get instance():FriendUILayer
		{
			if(!FriendUILayer._instance)
                FriendUILayer._instance = new FriendUILayer();
			return FriendUILayer._instance;
        }

        init(event?: Event): void
        {
            super.init();

        }

        /**
         * 复位光标状态（普通鼠标类型）
         */
        resetCursorState():void
        {
			if(TipLayerManager.tipLayer)
			{
				if(!TipLayerManager.tipLayer.getChildByName("friendSceneCursor"))
					TipLayerManager.tipLayer.addChild(views.friendList.FriendList_DownToolBarView.curShowCursor);
			}
            this.downToolBarView.setShowTypeAndState("commonMouse",this.downToolBarView.commonMouse);
        }
        /**
		 * 更新光标位置
		 */
		private updateCursorPosFn()
		{
			views.friendList.FriendList_DownToolBarView.curShowCursor.x = Laya.stage.mouseX;
			views.friendList.FriendList_DownToolBarView.curShowCursor.y = Laya.stage.mouseY;
		}

    }
}

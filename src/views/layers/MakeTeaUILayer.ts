namespace views.layers
{
    import BaseView = views.base.BaseView;
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import PlayerInfoView = views.player.PlayerInfoView;
    import PlayerInfoCtrl = controllers.player.PlayerInfoCtrl;
    import GameConfig = configs.GameConfig;

    /**
     * 泡茶室UI层
     */
    export class MakeTeaUILayer extends BaseView
    {
        /** 玩家信息面板 */
        // playerInfoView: PlayerInfoView;
        /** 底部工具栏 */
        downToolBarView: views.makeRoom.toolBar.MakeTeaHome_DownToolBarView;
        /** 右下角工具栏 */

         /** 右下角工具栏 */
         rightDownToolBarView: views.makeRoom.toolBar.MakeTeaRightDownToolBarView;
         constructor()
         {
             super();

            //  this.playerInfoView = PlayerInfoCtrl.playerInfoView;
            //  this.playerInfoView.x=5;
            //  this.playerInfoView.y=0;
            //  this.playerInfoView.visible=true;
            //  this.addChild(this.playerInfoView);

             this.downToolBarView = views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.instance;
             this.downToolBarView.x = (GameConfig.GAME_WINDOW_WIDTH - this.downToolBarView.width >> 1) >> 1;
             this.downToolBarView.x = this.downToolBarView.width*2+this.downToolBarView.width>>1;
             this.downToolBarView.y = 500;
             this.addChild(this.downToolBarView);

             this.rightDownToolBarView = new views.makeRoom.toolBar.MakeTeaRightDownToolBarView();
             this.rightDownToolBarView.x = this.downToolBarView.x + this.downToolBarView.width + 40;
             this.rightDownToolBarView.y = 520;
             this.addChild(this.rightDownToolBarView);

             // 光标设置
             // this.resetCursorState();
             Laya.timer.loop(100,this,this.updateCursorPosFn);
         }

        /**
         * 复位光标状态（普通鼠标类型）
         */
        resetCursorState():void
        {
            if(TipLayerManager.tipLayer)
			{
				if(!TipLayerManager.tipLayer.getChildByName("makeTeaCursor"))
					TipLayerManager.tipLayer.addChild(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor);
			}

            this.downToolBarView.setShowTypeAndState2("hand1",this.downToolBarView.hand1);
            console.log("鼠标复位成功");
        }

        /**
		 * 更新光标位置
		 */
		private updateCursorPosFn()
		{
			views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.x = Laya.stage.mouseX - 5;  // -20
			views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.y = Laya.stage.mouseY - 18;  // -20  //原 '- 10' --- hsx 2017-09-13
		}

        init(event?: Event): void
        {
            super.init();

        }


    }
}


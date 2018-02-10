namespace views.layers
{
    import BaseView = views.base.BaseView;
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import LeftTopToolBarUI = ui.gameUI.toolBar.LeftTopToolBarUI;
    import LeftToolBarUI = ui.gameUI.toolBar.LeftToolBarUI;
    import PlayerInfoView = views.player.PlayerInfoView;
    import FriendInfoView = views.player.FriendInfoView;
    import PlayerInfoCtrl = controllers.player.PlayerInfoCtrl;
    import GameConfig = configs.GameConfig;
    import Button = laya.ui.Button;
    import PlayerInfoModel = models.player.PlayerInfoModel;

    /**
     * UI层（存放各个场景中的通用UI，也用于切换场景）
     */
    export class UILayer extends BaseView
    {
        /**
         * 玩家信息面板
         */
        playerInfoView: PlayerInfoView;

         /**
          * 左上角工具栏
          */
        leftTopToolBarView:LeftTopToolBarUI;
        /**
         * 左侧工具栏
         */
        leftToolBar:LeftToolBarUI;

        constructor()
        {
            super();

            this.pos(50, 10);

            this.playerInfoView = PlayerInfoCtrl.playerInfoView;
            this.addChild(this.playerInfoView);

            this.leftTopToolBarView = new LeftTopToolBarUI();
            this.leftTopToolBarView.x = 10;
            this.leftTopToolBarView.y = this.playerInfoView.height+5;
            this.addChild(this.leftTopToolBarView);

            this.leftTopToolBarView.teaRoom.texture = Laya.loader.getRes("gameUI/toolBar/tea_graden.png");

            this.leftToolBar = new LeftToolBarUI();
            this.leftToolBar.x = 0;
            this.leftToolBar.y = this.leftTopToolBarView.y+this.leftTopToolBarView.height+60;
            this.addChild(this.leftToolBar);

            this.on(Event.CLICK,this,this.toolBarClkedFn);
        }

        init(event?: Event): void
        {
            super.init();

        }

        /**
		 * 切换场景
		 */
		toolBarClkedFn(event:Event):void
		{
			let curName:string = event.target.name;

			// 茶园
			if(curName =="teaRoom")
			{
				this.loadTeaRoom();
			} // 炒茶室
			else if(curName =="friedTea")
			{
				this.loadFriedTea();
			} // 泡茶室
			else if(curName =="makeTea")
			{
                this.loadMakeTea();
			} // 排行榜
            else if(curName == "ranklist")
            {
                controllers.ranklist.RankListCtrl.instance.request_getGradeRank({"page":1,"num":6});
                this.addChildCenter(controllers.ranklist.RankListCtrl.view,"ranklist");
            } // 活动
            else if(curName == "activity")
            {
                this.loadActivityTip();
            } // 使用说明
            else if(curName == "useExplain")
            {
                this.loadUseExplain();
            }
		}

        /**
         * 茶园
         */
		loadTeaRoom():void
		{
            PlayerInfoModel.friendInfo.userId=null;
            SceneLayerManager.instance.initTeaGardenScene();
            UILayerManager.getInstance().initTeaGardenUI();

			if(TipLayerManager.tipLayer)
                TipLayerManager.tipLayer.showMainSceneCursor();
		}

        /**
         * 炒茶室
         */
		loadFriedTea():void
		{
            PlayerInfoModel.friendInfo.userId=null;
			SceneLayerManager.instance.friedTeaScene();
			UILayerManager.getInstance().showFriedTeaUI();

            if(TipLayerManager.tipLayer)
                TipLayerManager.tipLayer.showFriedTeaCursor();
		}

        /**
         * 泡茶室
         */
        loadMakeTea():void
        {
            PlayerInfoModel.friendInfo.userId=null;
            SceneLayerManager.instance.makeTeaScene();
            UILayerManager.getInstance().showMakeTeaUI();

            if(TipLayerManager.tipLayer)
                TipLayerManager.tipLayer.showMakeTeaCursor();
        }

        /**
         * 好友茶园
         */
        loadFriendTea():void
        {
            SceneLayerManager.instance.friendGardenScene();

            /** 加载好友茶园工具栏，好友信息等 */
			UILayerManager.getInstance().initFriendUILayer()
			// Laya.stage.addChild(UILayerManager.friendUILayer);  // TEST
			if(TipLayerManager.tipLayer)
				TipLayerManager.tipLayer.showFriendSceneCursor();
        }


        /**
         * 活动面板
         */
        loadActivityTip():void
        {
            controllers.activity.ActivityTipCtrl.instance.getActivityData();
            this.addChildCenter(controllers.activity.ActivityTipCtrl.view,"activity");
        }

        /**
         * 使用说明
         */
        loadUseExplain():void
        {
            let useExplainView:ui.gameUI.common.BaseBorderUI = new ui.gameUI.common.BaseBorderUI();
            useExplainView.name = "useExplain";
            useExplainView.titleImg.skin = "gameUI/common/icon/useExplainName.png";
            useExplainView.titleImg.x = useExplainView.width-useExplainView.titleImg.width>>1;
            let contentImg:Laya.Image = new Laya.Image();
            contentImg.skin = "gameUI/common/imgs/useExplain.png";
            contentImg.pos(40,100);
            useExplainView.addChild(contentImg);
            useExplainView.closeBtn.once(Event.CLICK,this,this.closeUseExplain);
            useExplainView.closeBtn.scale(1.3,1.3);
            this.addChildCenter(useExplainView,"useExplain");
        }
        private closeUseExplain(event:Event):void
        {
            event.target.parent.removeSelf();
        }

        /**
         * 将子对象居中添加至 UILayer
         */
        addChildCenter(child:Sprite,childName:string):void
        {
            if(!this.getChildByName(childName))
                this.addChild(child);
            child.x = configs.GameConfig.GAME_WINDOW_WIDTH - child.width >> 1;
            child.y = configs.GameConfig.GAME_WINDOW_HEIGHT - child.height >> 1;
        }

    }
}

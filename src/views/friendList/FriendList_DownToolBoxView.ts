namespace views.friendList
{
	import DownToolBoxUI = ui.gameUI.toolBar.DownToolBoxUI;
	import Image = laya.ui.Image;
	import Sprite = laya.display.Sprite;
	import Event = laya.events.Event;
	import GameConfig = configs.GameConfig;

	/**
	 * 下部工具条上的工具箱视图：存放 除虫、除草、浇水、草、虫 道具图标
	 */
	export class FriendList_DownToolBoxView extends DownToolBoxUI
	{
		curIcon:Image;

		constructor()
		{
			super();
			this.cacheAs = "bitmap";
			this.curIcon = new Image();
			this.addChild(this.curIcon);
			this.width = 340;

			this.drawBg();
			this.on(Event.CLICK,this,this.onClkedFn);
		}

		drawBg():void
		{
			this.graphics.clear();
			this.graphics.drawRect(0,0,this.width,this.height,"#FFFFFF");
		}

		onClkedFn(event:Event):void
		{
			console.log("当前选择的工具名称为:"+event.target.name);
			switch(event.target.name)
			{
				case "killWorm": // 除虫
					// this.curIcon.graphics.clear();	// Image 的清除，可尝试先清理再切换 skin
					FriendList_DownToolBarView.instance.setShowTypeAndState("killWorm",this.killWorm);

					break;
				case "removeGrass":// 除草
                    FriendList_DownToolBarView.instance.setShowTypeAndState("removeGrass",this.removeGrass);

					break;
				case "water":	 // 浇水
                    FriendList_DownToolBarView.instance.setShowTypeAndState("water",this.water);

					break;
				case "grass":	 // 种草
                    FriendList_DownToolBarView.instance.setShowTypeAndState("grass",this.grass);

					break;
				case "worm":	 // 放虫
                    FriendList_DownToolBarView.instance.setShowTypeAndState("worm",this.worm);

					break;
			}

			this.visible = false;
		}

	}
}
namespace views.activity
{
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Panel = laya.ui.Panel;

	/**
	 * 活动面板弹出框
	 */
	export class ActivityTipView extends BaseBorderUI
	{
		contentSpr:Panel;

		constructor()
		{
			super();
			this.cacheAs = "bitmap";
			this.dragArea = `0,0,${this.width},60`;
			this.titleImg.skin = "gameUI/common/icon/activityName.png";
			this.titleImg.x = this.width-this.titleImg.width>>1;

			this.contentSpr = new Panel();
			this.contentSpr.pos(27,90);
			this.contentSpr.size(540,280);
			this.contentSpr.vScrollBarSkin = "comp/vscroll.png";
			this.addChild(this.contentSpr);

			this.closeBtn.on(Event.CLICK,this,this.closeWin);
			this.closeBtn.scale(1.3,1.3);
		}

		/**
		 * 加载活动数据，即分别将其下的Url对应的图片显示至界面
		 */
		initUI(activityArr:Object[]):void
		{
			if(!activityArr || activityArr.length==0)
				return;

			let activityNum:number = activityArr.length;
			let i:number;
			let obj:Object;
			for(i=0; i<activityNum; i++)
			{
				obj = activityArr[i];
				let img:Image = new Image();
				img.name = obj["name"];
				img.skin = HttpConfig.serverResUrl + obj["url"];
				img.autoSize = true;
				img.size(520,280);
				// if(img.width>this.contentSpr.width || img.height>this.contentSpr.height)
				// 	img.size(this.contentSpr.width,this.contentSpr.height);
				img.y = i*245;
				this.contentSpr.addChild(img);
			}
		}

		private closeWin(event:Event):void
		{
			// this.close();
			this.removeSelf();
		}

	}
}
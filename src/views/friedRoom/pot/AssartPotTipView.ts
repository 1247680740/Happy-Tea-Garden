namespace views.friedRoom.pot
{
	import Event = laya.events.Event;

	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import AssartPotTipUI = ui.gameUI.tips.AssartPotTipUI;

	/**
	 * 激活炒锅的提示面板
	 */
	export class AssartPotTipView extends AssartPotTipUI
	{
		/**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;

		/** 激活炒锅事件 */
		static ASSART_POT_EVENT:string = "assart_pot_event";

		private static _instance:AssartPotTipView;

		constructor()
		{
			super();
			this.cacheAs = "bitmap";

			////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(440,345);
			this.bgUI.size(440,345);
			this.bgUI.addChild(this);
			this.y = 3;

			// this.bgUI.titleImg.skin = "gameUI/common/icon/xxxName.png";
			// this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			// this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (600-440)/600;
			let hRate:number = (400-345)/400;
			this.bgUI.closeBtn.x -= this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y -= this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.5,1.5);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.cancelBtnClkFn);
			////////// <=

			this.open_btn.on(Event.CLICK,this,this.okBtnClkFn);
			// this.close_btn.on(Event.CLICK,this,this.cancelBtnClkFn);
		}

		static get instance():AssartPotTipView
		{
			if(!AssartPotTipView._instance)
				AssartPotTipView._instance = new AssartPotTipView();
			return AssartPotTipView._instance;
		}

		okBtnClkFn():void
		{
			this.event(AssartPotTipView.ASSART_POT_EVENT);
			// this.close();
			this.cancelBtnClkFn();
		}

		cancelBtnClkFn():void
		{
			// this.close();
			// this.destroy(false);
			this.bgUI.removeSelf();
		}
	}
}
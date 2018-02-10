namespace views.common
{
	import Event = laya.events.Event;
	import ConfirmCancelTipUI = ui.gameUI.tips.ConfirmCancelTipUI;
	/**
	 * 带有确定、取消按钮的提示框
	 */
	export class ConfirmCancelTipView extends ConfirmCancelTipUI
	{
		/** 点击确定后的回调 */
		callback:Function;
		/**
		 * 所携带的数据
		 */
		takeData:any;

		private static _instance:ConfirmCancelTipView;

		constructor(takeData?:any)
		{
			super();

			this.takeData = takeData;

			this.confirmBtn.on(Event.CLICK,this,this.confirmBtnFn);
			this.cancelBtn.on(Event.CLICK,this,this.cancelBtnFn);
			this.closeBtn.on(Event.CLICK,this,this.cancelBtnFn);
		}

/*		static get instance():ConfirmCancelTipView
		{
			if(!ConfirmCancelTipView._instance)
				ConfirmCancelTipView._instance = new ConfirmCancelTipView();
			return ConfirmCancelTipView._instance;
		}
*/

		/**
		 * 执行确认后的操作
		 */
		confirmBtnFn(event:Event):void
		{
			if(this.callback)
			{
				if(this.takeData)
					this.callback(this.takeData);
				else
					this.callback();
			}
			this.cancelBtnFn(null);
		}

		cancelBtnFn(event:Event):void
		{
			// this.removeSelf();
			this.visible = false;
		}
	}
}
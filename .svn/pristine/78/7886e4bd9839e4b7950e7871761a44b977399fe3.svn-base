namespace views.common
{
	import Sprite = laya.display.Sprite;
	import Text = laya.display.Text;
	import Tween = laya.utils.Tween;
	import Ease = laya.utils.Ease;
	import Handler = laya.utils.Handler;

	/**
	 * 自绘带有边框的信息提示框
	 *
	 * 说明：
	 * 1、带有双色显示边框；
	 * 2、根据内容的多少自动设置显示高度
	 *
	 * 示例：
	 * var tip:views.common.DrawBgTip = views.common.DrawBgTip.instance;
     * tip.showTip("带有双色显示边框,根据内容的多少自动设置显示高度!");
	 *
	 */
	export class DrawBgTip extends Sprite
	{
		private topColor:string = "#D9D6B0";
		private bottomColor:string = "#B08860";

		/** 总宽度 */
		private fixedW:number = 320;
		/** 文本宽度 */
		private textW:number = 300;
		/** 上层边框到下层边框的间距、文本到文本边框的间距 */
		private border:number = 10;

		private painter:Sprite;
		private text:Text;

		private static _instance:DrawBgTip;

		static handler: Handler;

		constructor()
		{
			super();

			this.painter = new Sprite();
			this.text = new Text();
			this.painter.addChild(this.text);
			this.addChild(this.painter);

			DrawBgTip.handler = Handler.create(this, this.tweenOverHandler, null, false);
		}

		static get instance():DrawBgTip
		{
			if(!DrawBgTip._instance)
				DrawBgTip._instance = new DrawBgTip();
			return DrawBgTip._instance;
		}

		/**
		 * 带有双层背景的信息提示框，根据内容量自动改变高度
		 */
		showTip(content:string,color:string="#000000"):void
		{
			if(!content || !content.length)
				return;

			this.text.wordWrap = false;
			// this.text.width = this.fixedW - 2 * this.border;
			this.text.text = content;

			// 2017-09-15 hsx
			// this.text.textWidth = this.text.width - 2 * this.border;
			// this.text.textHeight = this.text.height - 2 * this.border;
			this.text.autoSize = true;

			this.text.bgColor = this.topColor;
			this.text.align = "center";	// "left"
			this.text.valign = "middle";
			this.text.color = color;
			this.text.leading = 5;
			this.text.padding = [5,5,0,5];

			this.drawBg();

			this.alpha = 1;
			Tween.to(this, { alpha: 0 }, 500, Ease.sineOut, DrawBgTip.handler,1000);
		}

		/**
		 * 根据文本尺寸设置背景
		 */
		private drawBg():void
		{
			this.painter.width = this.text.width + 2*this.border;
			this.painter.height = this.text.height + 2*this.border;
			this.text.pos(this.painter.width-this.text.width>>1,this.painter.height-this.text.height>>1);

			this.painter.graphics.clear();
			this.painter.graphics.drawRect(0,0,this.painter.width,this.painter.height,this.bottomColor);
		}

		tweenOverHandler():void
		{
			this.visible = false;
		}
	}
}
namespace views.common
{
	import MovieClip = laya.ani.swf.MovieClip;
	import Sprite = laya.display.Sprite;
	import Text = laya.display.Text;

	/**
	 * 一般通用显示类：包含 金币奖励、经验奖励、除虫、除草、
	 * @author hsx
	 */
	export class CommonDisplay
	{
		/**
		 * 经验图标
		 */
		static expUrl:string = "res/gameAssets/swfs/prize/exp/image/1.png";
		/**
		 * 金币图标
		 */
		static moneyUrl:string = "res/gameAssets/swfs/prize/money/image/1.png";
		/**
		 * 镰刀图标
		 */
		static removeGrass:string = "res/gameAssets/imgs/removeGrass.png";
		/**
		 * 瓢虫图标
		 */
		static killWorm:string = "res/gameAssets/imgs/killWorm.png";

		static getRemoveGrassImg():Laya.Image
		{
			let icon:Laya.Image = new Laya.Image();
			icon.skin = CommonDisplay.removeGrass;
			icon.pos(780,250);

			return icon;
		}

		static getKillWormImg():Laya.Image
		{
			let icon:Laya.Image = new Laya.Image();
			icon.skin = CommonDisplay.killWorm;
			icon.pos(780,250);

			return icon;
		}


		 /**
         * 经验奖励
         */
        static expPrize(num:number):Sprite
        {
			let prizeSpr:Sprite = this.getPrizeSpr("exp",num);
			return prizeSpr;
        }

		/**
		 * 金币奖励
		 */
		 static moneyPrize(num:number):Sprite
		 {
			 let prizeSpr:Sprite = this.getPrizeSpr("money",num);
			return prizeSpr;
		 }

		 private static getPrizeSpr(type:string,num:number):Sprite
		 {
			let url: string;
			if(type == "exp")
				url = CommonDisplay.expUrl;
			else if(type == "money")
				url = CommonDisplay.moneyUrl;

			let prizeIcon:Laya.Image = new Laya.Image();
			prizeIcon.skin = url;
			prizeIcon.size(30,30);

			let prizeSpr:Sprite = new Sprite();
            let text:Text = new Text();
			text.fontSize = 20;
			text.color = "#FFFFFF";
			text.bold = true;
            text.text = "+" + num;
            prizeSpr.addChild(prizeIcon);
            prizeSpr.addChild(text);
			text.pos(30,5);
			return prizeSpr;
		 }

	}
}
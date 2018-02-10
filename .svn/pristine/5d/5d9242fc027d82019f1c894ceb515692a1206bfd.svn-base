namespace utils
{
	import Tween = laya.utils.Tween;
	import Ease = laya.utils.Ease;
	import Handler = laya.utils.Handler;
	import Sprite = laya.display.Sprite;
	import Image = laya.ui.Image;
	import Point = laya.maths.Point;

	/**
	 * 缓动动画相关工具
	 */
	export class TweenUtil
	{

		constructor()
		{

		}

		/** 缓动某个显示对象（如金币、经验、钻石等）至某状态 */
		static tweenTo(disObj:Sprite,moveTo?:Point):void
		{
			Laya.stage.addChild(disObj);
			disObj.name = "tweenObj";
			if(moveTo)
			{
				disObj.x = moveTo.x;
				disObj.y = moveTo.y;
			}
			else
			{
				disObj.x = Laya.stage.mouseX;
				disObj.y = Laya.stage.mouseY;
			}
			Tween.to(disObj,{x:100,y:20},2000,Ease.bounceInOut,Handler.create(this,this.tweenOverHandler),200);
		}

		/** 缓动瓢虫、镰刀至特定的坐标点 */
		static tweenToLandGrid(disObj:Image,moveTo:Point):void
		{
			Laya.stage.addChild(disObj);
			disObj.name = "tweenObj";
			Tween.to(disObj,{x:moveTo.x,y:moveTo.y},2000,Ease.bounceInOut,Handler.create(this,this.tweenOverHandler),200);
		}

		private static tweenOverHandler():void
		{
			Laya.stage.removeChildByName("tweenObj");

		}
	}
}
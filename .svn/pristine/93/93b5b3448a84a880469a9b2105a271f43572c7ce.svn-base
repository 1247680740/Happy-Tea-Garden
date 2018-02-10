namespace utils
{
	import Timer = laya.utils.Timer;
	import Event = laya.events.Event;

	/**
	 * 炒茶倒计时工具
	 */
	export class PotTimerUtil
	{
		/** 生长时间 */
		growthTime:number;
		/** 倒计时器 */
		timer:Timer;

		/** 每秒钟（1000ms） */
		PER_SECOND:number = 1000;
		/** 每分钟（60000ms） */
		PER_MINUTE:number = 60000;

		/**
		 * 还剩xx秒后开始以秒为间隔更新
		 */
		startUpdateSec:number = 3;

		timerCallbackArr:Array<Object>;

		/** "initCrop" 接口携带的 {landId, seedId} 参数*/
		// initCropPara:Object;

		/**
		 * 当炒茶剩余时间为0时回调
		 */
		static callback:Function;

		constructor()
		{
			this.timerCallbackArr = new Array<Object>();

		}

		/**
		 * 根据生长时间设置倒计时
		 */
		regTimer(growthTime:number):void
		{
			this.growthTime = growthTime;	// 后加
			console.log("== PotTimerUtil, regTimer, growthTime:"+this.growthTime);

			//触发器每分钟执行一次
			var delay:number = this.PER_MINUTE;

			//当剩余时间少于xx秒后，计时器变成秒数倒计时
			if(this.growthTime <= this.startUpdateSec)
			{
				delay = this.PER_SECOND;
			}

			//注册计时器
			if(this.timer == null)
			{
				this.timer = new Timer();
				// this.timer.delta = delay;
			}
			this.timer.loop(delay,this,this.onTimerComplete,[delay]);

		}

		/**
		 * 增加一个计时器外部函数调用
		 */
		addTimerCallback(obj:Object):void
		{
			// {"callback":CropCtrl.instance.timerFn,"vo":PotVO}
			if(obj["callback"] != null)
			{
				let isHas:boolean = false;
				let i:number = 0;
				let len:number = this.timerCallbackArr.length;
				let curObj:Object;
				for(i = 0; i < len; i++)
				{
					curObj = this.timerCallbackArr[i];
					if(obj["vo"]["id"] === curObj["vo"]["id"])
					{
						isHas = true;
						return;
					}
				}
				if(isHas == false)
					this.timerCallbackArr.push(obj);
			}
		}

		/**
		 * 移出一个计时器外部函数调用
		 * @param obj: {"callback":CropCtrl.instance.timerFn,"vo":PotVO}
		 */
		removeTimerCallback(obj:Object):void
		{
			if(!obj["callback"])
				return;

			let len:number = this.timerCallbackArr.length;
			let i:number;
			for(i=0; i<len; i++)
			{
				if(this.timerCallbackArr[i]["callback"] === obj["callback"])
				{
					this.timerCallbackArr[i] = null;
					this.timerCallbackArr.splice(i,1);
					break;
				}
			}
		}

		/**
		 * 每个时间间隔所调用的方法
		 */
		private onTimerComplete(delay:number):void
		{
			if(delay == this.PER_SECOND)
			{
				this.growthTime--;
			}
			else if(delay == this.PER_MINUTE)
			{
				this.growthTime -= 60;
			}
			console.log("== PotTimerUtil, growthTime:"+this.growthTime);

			//外部注册的回调函数
			this.callBindTimerFn();

			//当时间满足升级条件，则升级到下个阶段
			if(this.growthTime <= 0)
			{
				this.timer.clear(this,this.onTimerComplete);

				if(PotTimerUtil.callback)
					PotTimerUtil.callback();

				// if(this.initCropPara["landId"] && this.initCropPara["seedId"])
				// {
				// 	models.teaRoom.crop.CropModel.getInstance().request_initCrop(this.initCropPara["landId"],this.initCropPara["seedId"]);
				// }
			}
			else if(this.growthTime <= this.startUpdateSec)
			{
				this.regTimer(this.growthTime);
			}
		}

		/**
		 * 调用外部绑定的函数
		 * @example timerUtil.addTimerCallback({"callback":CropCtrl.instance.timerFn,"vo":PotVO});
		 */
		private callBindTimerFn():void
		{
			let obj:Object;
			let tempFn:Function;
			for(obj of this.timerCallbackArr)
			{
				// tempFun.call(null,[this]);
				tempFn = obj["callback"];
				tempFn(obj["vo"],this.growthTime);
				// tempFn.call(obj["vo"]);
			}
		}

	}
}
namespace utils
{
	/**
	 * 一般工具类
	 * @author hsx
	 */
	export class CommonUtil
	{

		/**
		 * 根据秒数换算成各个时间计量,格式：x天x时x分
		 * @param sec 秒数
		 * @return string x天x时x分
		 */
		static parseSecToDayHourMin(sec:number,isShowSecond:boolean=false):string
		{
			if(sec <= 0)
				return "0";

			var day:number    = 0;
			var hour:number   = 0;
			var minute:number = 0;
			var second:number = 0;

			let timeStr:string = "";

			if(sec >= 86400)
			{
				day = parseInt(sec/86400+"");
				timeStr += (day+"天");
			}

			if(sec%86400 >= 3600)
			{
				hour = parseInt(sec%86400/3600+"");
				timeStr += (hour+"时");
			}

			if(sec%3600 >= 60)
			{
				minute = parseInt(sec%3600/60+"");
				timeStr += (minute+"分");
			}

			second = sec % 60;
			if(second)
			{
				if(isShowSecond)
					timeStr+=(second+"秒");
			}

			return timeStr;
		}
	}
}
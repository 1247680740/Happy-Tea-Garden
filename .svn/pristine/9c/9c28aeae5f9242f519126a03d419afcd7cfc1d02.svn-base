namespace models.base
{
	import Timer = laya.utils.Timer;
	import TimerUtil = utils.TimerUtil;

	/** 作物数据 */
	export class CropVO
	{
		static CLEAR_DEBUFF:string  = 'clear_debuff';

		/** 作物编号 */
		id:number;

		/** 土地编号,起始值从1开始 */
		landId:number;

		//作物的名字
		name:string;

		/**
		 * 如下两种说法待确定：
		 * 1、截止目前总生长时间(秒)
		 * 2、当前阶段生长时间，即距下一阶段所需时间（秒）
		 */
		totalGrowthTime:number;

		/** 距离下个生长阶段的时间(秒),即当前阶段的剩余时间 */
		growthTime:number;

		/** 作物状态（质量） 0:优秀，1:良好，2:濒临死亡 */
		status:number = 0;
		/** 生长状态（阶段）：-1死亡，0（种子）, 1（幼苗期）, 2（生长）, 3茂盛 ？？？ */
		growthStatus:number;

		/** 当前的季数 */
		season:number;

		/** 剩余产量（>0 表示成熟，即减去被偷的量）*/
		remnantOutput:number;

		/** 总产量 */
		totalOutput:number;

		/** 是否可偷取 */
		isSteal:boolean = false;

		/** 是否死亡 */
		isDeath:boolean = false;

		/** 生长阶段的名称 */
		levelText:string;

		/** 下个生长阶段名称 */
		nextLevelText:string;

		/** 图标路径 */
		iconUrl:string;

		/** 不好的状态： worm虫子，grass杂草，dry干旱 （未用） */
		debuff:Object = {};
		/** 害虫数量，默认0 */
		worm:number;
		/** 杂草数量，默认0 */
		grass:number;
		/** 是否干旱：0正常，1干旱 */
		dry:number;

		/** 作物说话 */
		talkArray:Array<any> = [];

		/** 作物升级计时器对象 */
		timer:Timer;

		timerUtil:TimerUtil;

		/** 计时器回调函数 */
		timerCallbackArray:Array<Function> = [];


		/**
		 *
		 * 原 CropModel 的构造函数中的写法
		 * @param uniqueId 	作物编号
		 * @param landId 	作物种植的土地编号
		 * @param deBuff 	作物的不好状态
		 * @param initData 	初始化数据
		 */
		constructor()
		{

		}

		/**
		 * 是否有不良状态存在
		 */
		get isHasDebuff():boolean
		{
			if(this.worm)
				return true;
			if(this.grass)
				return true;
			if(this.dry)
				return true;
			return false;
		}

		/** 状态（质量） */
		get statusTxt():string
		{
			let statusTxt:string;
			if(this.status == 0)
				statusTxt = "优秀";
			else if(this.status == 1)
				statusTxt = "良好";
			else if(this.status == 1)
				statusTxt = "濒临死亡";
			return statusTxt;
		}

		/** 生长状态（阶段） */
		get growthStateTxt():string
		{
			let stateTxt:string;
			switch(this.growthStatus)
			{
				case -1:
					stateTxt = "死亡";
					break;
				case 0:
					stateTxt = "种子";
					break;
				case 1:
					stateTxt = "幼苗期";
					break;
				case 2:
					stateTxt = "生长";
					break;
				case 3:
					stateTxt = "茂盛";
					break;
			}
			return stateTxt;
		}

		/**
		 * 作物的生长率
		 */
		get growthRate():number
		{
			let rate:number;
			if(this.totalGrowthTime > 0)
			{
				rate = (this.totalGrowthTime - this.growthTime) / this.totalGrowthTime;
			}
			else
			{
				rate = 0;
				// throw Error("The crop's totalGrowthTime is 0");
			}
			return rate;
		}

		/**
		 * 根据秒数换算成各个时间计量,包括天，小时，分钟，秒
		 * @param sec:uint 秒数
		 */
		growthTimeTxt(isShowSecond:boolean=false):string
		{
			return utils.CommonUtil.parseSecToDayHourMin(this.growthTime,isShowSecond);
		}


	}
}
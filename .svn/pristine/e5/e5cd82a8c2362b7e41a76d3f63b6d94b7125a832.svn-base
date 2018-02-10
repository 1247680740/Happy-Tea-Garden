namespace models.friedRoom.pot
{
	/**
	 * 注意：models.base.PotVO 中也被复制了一份 PotVO
	 */
	export class PotVO
	{

		static CURRENT_LIGHT_POT:string = "current_light_pot";
		static CURRENT_LOW_POT:string   = "current_low_pot";

		/**
		 * 炒锅名称
		 */
		name:string;
		nameArr:string[] = ["生铁锅","铜锅","黄金锅","玄铁锅","寒铁锅","精钢锅","耀光锅"];
		/**
		 * 炒锅的位置(0开始)
		 */
		posId:number;
		posArr:string[] = ["金位","木位","水位","火位","土位","道位"];
		/**
		 * 强化等级
		 */
		intensifyLvl:number;

		/** 炒锅编号 */
		private _id:number;

		/** 炒锅的状态,0:未使用（闲着）,1:炒制中，2:炒制完毕*/
		private _status:number;

		/** 炒锅等级, 0：未开启 1: 生铁锅 2：铜锅，3:黄金锅，4：玄铁锅，5：寒铁锅 6：精钢锅  7：耀光锅 */
		private _level:number;

		/** 升级需要多少钱 */
        private _needMoney:number;

        /** 升级缺少多少钱 */
        private _lockMoney:number;

        /** 需要的材料ID */
        private _toolId:number;

        /** 需要的材料数量 */
        private _toolNums:number;

        /** 缺少的材料数量 */
        private _lockToolNums:number;

		/** 炒锅资源串 */
		private _landRes:string;


		/**
		 * 正在炒的茶编号
		 */
		teaId:number;
		/**
		 * 正在炒的茶名
		 */
		teaName:string;
		/**
		 * 炒茶需要时间（秒）
		 */
		friedTeaTime:number;
		/**
		 * 炒茶剩余时间（秒）
		 */
		friedTeaRemainTime:number;
		/**
		 * 炒茶数量，默认1份
		 */
		friedTeaNums:number = 1;
		/**
		 * 最大炒茶等级上限
		 */
		friedTeaMaxLvl:number;
		/**
		 * 最多炒茶份数
		 */
		friedTeaMaxNums:number;


		/**
		 * 构造函数
		 * @param uniqueId 编号
		 * @param status 状态
		 * @param level 等级
		 * @param needMoney 升级所需金钱
		 * @param lockMoney 升级缺少金钱
		 * @param toolId 升级所需材料ID
		 * @param toolNums 升级所需材料数量
		 * @param lockToolNums 升级缺少材料数量
		 */
		constructor(uniqueId:number,level:number = 0,status:number = 0,needMoney:number=0,lockMoney:number=0,toolId:number=0,toolNums:number=0,lockToolNums:number=0) //lockToolNums:number=0
		{
			this._id = uniqueId;
			this._level = level;
			this._status = status;
			this._needMoney=needMoney;
			this._lockMoney=lockMoney;
			this._toolId=toolId;
			this._toolNums=toolNums;
			this._lockToolNums=lockToolNums;

		}

		get id():number
		{
			return this._id;
		}

		/** 炒锅等级, 0：未开启 1: 生铁锅 2：铜炒锅，3:黄金锅，4：玄铁锅，5：寒铁锅 6：精钢锅  7：耀光锅 */
		get level():number
		{
			return this._level;
		}

		set level(lvl:number)
		{
			this._level = lvl;
		}

		/** 炒锅的状态,0:未使用（闲着）,1:炒制中，2:炒制完毕*/
		get status():number
		{
			return this._status;
		}

		set status(s:number)
		{
			this._status = s;
		}

		/** 升级所需的钱数 */
		get needMoney():number
		{
			return this._needMoney;
		}

		set needMoney(m:number)
		{
			this._needMoney = m;
		}

		/** 升级所缺的钱数 */
		get lockMoney():number
		{
			return this._lockMoney;
		}

		set lockMoney(m:number)
		{
			this._lockMoney = m;
		}

		/** 升级所需材料ID */
		get toolId():number
		{
			return this.toolId;
		}

		get toolNums():number
		{
			return this.toolNums;
		}

		/** 升级缺少的材料数 */
		get lockToolNums():number
		{
			return this.lockToolNums;
		}

		/**
		 * 炒茶剩余时间（分钟）
		 */
		get leftTime():number
		{
			if(!this.friedTeaRemainTime)
				this.friedTeaRemainTime = 0;
			let m:number = Math.floor(this.friedTeaRemainTime / 60);
			let s:number = this.friedTeaRemainTime % 60;
			if(s>0)
				m = m + 1;
			console.log("== PotVO, m:"+m+", s:"+this.friedTeaRemainTime);
			return m;
		}
	}
}
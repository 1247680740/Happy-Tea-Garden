namespace models.teaRoom
{
	export class LandVO
	{

		static CURRENT_LIGHT_LAND:string = "current_light_land";
		static CURRENT_LOW_LAND:string   = "current_low_land";

		//土地编号
		private _id:number;

		/** 土地的状态,0:未开垦,1:正常,2:干旱 */
		private _status:number;

		/** 土地等级, 0：普通土地（黄土地），1：红土地， 2：黑土地*/
		private _level:number;

		/** 土地资源串 */
		private _landRes:string;

		/**
		 * 构造函数
		 * @param uniqueId 编号
		 * @param status 状态
		 * @param level 等级
		 */
		constructor(uniqueId:number,status:number = 0,level:number = 0)
		{
			this._id = uniqueId;
			this._level    = level;
			this._status    = status;

		}

		get id():number
		{
			return this._id;
		}

		/** 土地等级, 0：普通土地，1：红土地， 2：黑土地，3：金土地（后加，素材待加入！）*/
		get level():number
		{
			return this._level;
		}

		set level(lvl:number)
		{
			this._level = lvl;
		}

		/** 土地的状态,0:未开垦,1:正常,2:干旱*/
		get status():number
		{
			return this._status;
		}

		set status(s:number)
		{
			this._status = s;
		}
	}
}
/**
* 存放基本数据，如：炒锅相关类数据等
*/
namespace models.base
{
	/**
	 * 炒锅相关类数据
	 */
	export class PotVO
	{
		/** 炒锅ID */
		potId:number;
		potName:string;
		potLvl:number;
		potIcon:string;

		/**  炒茶数量*/
		friedteanum:number;
		/**  可炒茶叶等级上限*/
		topLevel:number;
        /** 升级需要多少钱 */
        needMoney:number;
        /** 升级缺少多少钱 */
        lockMoney:string;
        /** 需要的材料ID */
        toolId:number;
        /** 需要的材料数量 */
        toolNums:string;
        /** 缺少的材料数量 */
        lockToolNums:string;
		/** 是否升级/强化成功 1:成功; 2：不成功*/
		literStatus:number;
		/** 强化等级 */
		strengthLv1:number;
		/** 类型 */
		type:string;
		constructor()
		{

		}
	}
}
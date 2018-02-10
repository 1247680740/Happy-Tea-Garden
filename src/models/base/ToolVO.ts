namespace models.base
{
	/**
	 * 道具数据
	 */
	export class ToolVO
	{
		id:number;
		name:string;
		lvl:number;
		nums:number;
		/**
		 * 卖出价格（金币或钻石）
		 */
		price:number;
		icon:string;
		type:string;
		des:string;
		/** 化肥：缩短的生长时间（小时） */
		helpTime:number;

		/** 要卖出数量 */
		saleNums:number;

		constructor()
		{

		}
	}
}
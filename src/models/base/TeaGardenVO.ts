namespace models.base
{
	/**
	 * 茶园中茶农、狗等相关数据VO
	 * @author hsx
	 */
	export class TeaGardenVO
	{

		/**
		 * 茶农资源URL
		 */
		farmerUrl:string;

		farmerName:string;
		/**
		 * 茶农剩余工作时间
		 */
		restTimeOfWork:number;

		/**
		 * 有效时间
		 */
		get validTime():string
		{
			return utils.CommonUtil.parseSecToDayHourMin(this.restTimeOfWork);
		}


	}
}
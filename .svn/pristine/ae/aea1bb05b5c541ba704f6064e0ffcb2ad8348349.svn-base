namespace models.friedRoom.bag
{
	// import ToolVO = models.base.ToolVO;

	/**
	 * 炒锅背包相关数据
	 */
	export class FireTeaBagModel
	{
		/**
		 * 所有道具（此处指火把）
		 */
		toolVOArr:Array<models.base.ToolVO>;

		private static instance:FireTeaBagModel;

		static callback:Function;

		constructor()
		{
			this.toolVOArr = new Array<models.base.ToolVO>();
		}

		static getInstance():FireTeaBagModel
		{
			if(!FireTeaBagModel.instance)
				FireTeaBagModel.instance = new FireTeaBagModel();
			return FireTeaBagModel.instance;
		}

		/**
		 * 请求背包道具数据
		 */
		request_getBag():void
		{
			HttpServiceProxy.request("getBag",null,this.getBagOverFn);
		}

		private getBagOverFn(receiveData:any, takeData?:any):void
		{
			if(!receiveData)
				return;

			FireTeaBagModel.instance.toolVOArr.splice(0,FireTeaBagModel.instance.toolVOArr.length);

			let dataObj:Object = receiveData["_d"];

			let key:string;
			let toolVO:models.base.ToolVO;
			for(key in dataObj)
			{
				toolVO = new models.base.ToolVO();
				toolVO.id = parseInt(key);
				toolVO.nums = dataObj[key];
				toolVO.lvl = 0;
				toolVO.icon = HttpConfig.serverResUrl+"shop/"+"fire_"+key+".png";
				FireTeaBagModel.instance.toolVOArr.push(toolVO);
			}

			if(FireTeaBagModel.callback)
				FireTeaBagModel.callback();

		}

	}
}
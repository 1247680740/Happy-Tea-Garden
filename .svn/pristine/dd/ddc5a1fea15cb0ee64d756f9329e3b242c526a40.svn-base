namespace models.activity
{
	/**
	 * 活动相关数据模型
	 */
	export class ActivityModel
	{

		static callback:Function;


		constructor()
		{

		}

		/**
		 * 根据配置文件中的配置加载对应的信息，如活动图片对应的url
		 */
		loadActivityData():void
		{
			// let activityUrl:string = HttpConfig.serverResUrl+"activity.json";
			if(!ResourceManager.activityObjArr)
				return;
			if(ActivityModel.callback)
				ActivityModel.callback(ResourceManager.activityObjArr);
		}

	}
}
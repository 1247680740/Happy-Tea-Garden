namespace controllers.activity
{
	import ActivityModel = models.activity.ActivityModel;

	/**
	 * 活动控制器
	 */
	export class ActivityTipCtrl
	{
		static model:ActivityModel;
		static view:views.activity.ActivityTipView;

		private static _instance:ActivityTipCtrl;

		constructor()
		{
			if(!ActivityTipCtrl.model)
				ActivityTipCtrl.model = new ActivityModel();
			if(!ActivityTipCtrl.view)
				ActivityTipCtrl.view = new views.activity.ActivityTipView();
		}

		static get instance():ActivityTipCtrl
		{
			if(!ActivityTipCtrl._instance)
				ActivityTipCtrl._instance = new ActivityTipCtrl();
			return ActivityTipCtrl._instance;
		}

		/**
		 * 获取活动数据
		 */
		getActivityData():void
		{
			ActivityModel.callback = this.getDataOver;
			ActivityTipCtrl.model.loadActivityData();
		}

		private getDataOver(data:Object[]):void
		{
			ActivityTipCtrl.view.initUI(data);
		}
	}
}
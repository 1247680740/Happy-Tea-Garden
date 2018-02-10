namespace controllers.ranklist
{
	import RankListMode = models.ranklist.RankListMode;
	// import RankListView = views.ranklist.RankListView;

	/**
	 * 排行榜的控制器
	 * @author hsx
	 */
	export class RankListCtrl
	{
		static mode:RankListMode;
		static view:views.ranklist.RankListView;

		private static _instance:RankListCtrl;

		constructor()
		{
			if(!RankListCtrl.mode)
				RankListCtrl.mode = new RankListMode();
			if(!RankListCtrl.view)
				RankListCtrl.view = new views.ranklist.RankListView();
		}

		static get instance():RankListCtrl
		{
			if(!RankListCtrl._instance)
				RankListCtrl._instance = new RankListCtrl();

			return RankListCtrl._instance;
		}


		request_getGradeRank(para:Object):void
		{
			RankListMode.callback = this.getGradeRankOver;
			RankListCtrl.mode.request_getGradeRank(para);
		}

		private getGradeRankOver(dataObj:Object):void
		{
			RankListCtrl.view.initUI(dataObj);
		}

	}
}
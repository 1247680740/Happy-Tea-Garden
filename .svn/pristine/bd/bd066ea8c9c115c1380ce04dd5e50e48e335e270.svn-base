namespace controllers.exam
{
	import Event = laya.events.Event;
    import ExamDialogView=views.exam.ExamDialogView;
    import ExamDialogModel=models.exam.ExamDialogModel;

	/**
	 * 考试相关的控制器
	 */
	export class ExamDialogCtrl
	{
		private static _instance:ExamDialogCtrl;
        private static examDialogView:views.exam.ExamDialogView;
        private static examDialogModel:models.exam.ExamDialogModel;
		constructor()
		{
			if(!ExamDialogCtrl.examDialogModel)
				ExamDialogCtrl.examDialogModel = models.exam.ExamDialogModel.instance;
			if(!ExamDialogCtrl.examDialogView)
				ExamDialogCtrl.examDialogView = new views.exam.ExamDialogView();
		}

		static getInstance():ExamDialogCtrl
		{
			if(!ExamDialogCtrl._instance)
				ExamDialogCtrl._instance = new ExamDialogCtrl();
			    return ExamDialogCtrl._instance;
		}

		/**
		 * 显示考试面板
		 */
		showExamDialog(): void
		{
			UILayerManager.uiLayer.addChild(ExamDialogCtrl.examDialogView.bgUI);
			ExamDialogCtrl.examDialogView.bgUI.visible = true;
			ExamDialogCtrl.examDialogView.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - ExamDialogCtrl.examDialogView.bgUI.width >> 1;
			ExamDialogCtrl.examDialogView.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - ExamDialogCtrl.examDialogView.bgUI.height >> 1;
			// 获取用户考试等级信息
            this.request_getUserInfo();
		}

		/** 获取用户等级考试信息 */
        request_getUserInfo():void{
              let uid:number=parseInt(IdentityConfig.uid);
              models.exam.ExamDialogModel.callback=this.setUserInfo;
              ExamDialogCtrl.examDialogModel.request_getUserInfo(uid);
        }

        setUserInfo(takeData?:any):void{
            ExamDialogCtrl.examDialogView.setUserExamInfo(takeData);
        }

		request_startExam(lvl:string):void{
			models.exam.ExamDialogModel.callback=this.showExamTip;
			ExamDialogCtrl.examDialogModel.request_getStartExam(lvl);
		}

		showExamTip(receiveData?:any,takeData?:any):void{
			ExamDialogCtrl.examDialogView.setExamTip(receiveData,takeData);
		}

	}
}
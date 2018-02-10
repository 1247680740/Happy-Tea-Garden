namespace controllers.exam
{
	import Event = laya.events.Event;
	/**
	 * 试题相关的控制器
	 */
	export class QuestionDialogCtrl
	{
		static examLvl:string;
		static _instance:QuestionDialogCtrl;
        static questionDialogView:views.exam.QuestionDialogView;
        static questionDialogModel:models.exam.QuestionDialogModel;
		constructor()
		{
			if(!QuestionDialogCtrl.questionDialogModel)
				QuestionDialogCtrl.questionDialogModel = models.exam.QuestionDialogModel.instance;

			QuestionDialogCtrl.questionDialogView = new views.exam.QuestionDialogView();
		}

		static getInstance():QuestionDialogCtrl
		{
			if(!QuestionDialogCtrl._instance)
				QuestionDialogCtrl._instance = new QuestionDialogCtrl();
			    return QuestionDialogCtrl._instance;
		}

		/**
		 * 点击确定考试显示考题面板
		 */
		showQuestionView(examLvl:string): void
		{
			QuestionDialogCtrl.examLvl=examLvl;
			UILayerManager.uiLayer.addChild(QuestionDialogCtrl.questionDialogView.bgUI);
			QuestionDialogCtrl.questionDialogView.affirmBtn.visible=true;
			QuestionDialogCtrl.questionDialogView.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - QuestionDialogCtrl.questionDialogView.bgUI.width >> 1;
			QuestionDialogCtrl.questionDialogView.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - QuestionDialogCtrl.questionDialogView.bgUI.height >> 1;
			// 获取用户考试试题信息
            this.request_getQuestionList(examLvl);
		}

		/** 结束考试 */
		request_finishExam():void{
			models.exam.QuestionDialogModel.callback=this.examOver;
			QuestionDialogCtrl.questionDialogModel.requset_getScore();
		}

		examOver(takeData?:any):void{
			QuestionDialogCtrl.questionDialogView.showFinishExam(models.exam.QuestionDialogModel.overExamInfoVOArr);
		}

		/** 提交验证答案 */
		request_getResult(itemId:number,grade:number,answer:string):void{
			models.exam.QuestionDialogModel.callback=this.getAnswer;
			QuestionDialogCtrl.questionDialogModel.request_getRightAnswer(itemId,grade,answer);
		}

		getAnswer(takeData?:any):void{
			QuestionDialogCtrl.questionDialogView.resetItem(takeData);
		}

		/** 获取问题列表 */
		request_getQuestionList(examLvl:string):void{
			models.exam.QuestionDialogModel.callback=this.setQuestion;
			QuestionDialogCtrl.questionDialogModel.request_getQuestionList(examLvl);
		}

		setQuestion(takeData?:any):void{
			QuestionDialogCtrl.questionDialogView.initQuestion(takeData);
		}

	}
}
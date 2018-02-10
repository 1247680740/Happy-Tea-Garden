namespace models.exam
{
	import ToolVO = models.base.ToolVO;
    // import QuestionDialogCtrl = controllers.exam.QuestionDialogCtrl;
    import examInfoVO=models.exam.ExamInfoVO;

	/**
	 * 考试数据模型
	 */
	export class QuestionDialogModel
	{

		private static _instance:QuestionDialogModel;

		/** 服务器返回的数据 */
		receiveData: any;
		/** 请求前自带的数据 */
		takeData: any;
		/** 问题回调数组 */
		static questionInfoVOArr:Array<examInfoVO>;
		/** 结束考试数组 */
		static overExamInfoVOArr:Array<examInfoVO>;
		/** 响应数据处理完毕回调 */
		static callback:Function;
		/**当前试题面板 */
		static QuestionDialogView:views.exam.QuestionDialogView;
		constructor()
		{
			QuestionDialogModel.questionInfoVOArr=new Array<examInfoVO>();
			QuestionDialogModel.overExamInfoVOArr=new Array<examInfoVO>();
		}

		static get instance():QuestionDialogModel
		{
			if(!QuestionDialogModel._instance)
				QuestionDialogModel._instance = new QuestionDialogModel();
			return QuestionDialogModel._instance;
		}

		request_getQuestionList(examLvl:string):void{
			HttpServiceProxy.request("initExaminationData",{"id":examLvl},this.getQuestionList,{"examLvl":examLvl});
		}

		/** 获取正确答案并验证 */
		request_getRightAnswer(itemId:number,grade:number,answer:string):void{
			HttpServiceProxy.request("submitAnswerData",{"id":itemId,"grade":grade,"answer":answer},this.getRightAnswer);
		}

		/** 结束考试获取成绩 */
		requset_getScore():void{
			HttpServiceProxy.request("teaExamOver",null,this.getExamOver);
		}

		/** 获取试题列表 */
		 getQuestionList(receiveData?:any,takeData?:any):void{
			if(receiveData){
				this.receiveData=receiveData;
			}
			if(takeData){
				this.takeData=takeData;
			}
			if(receiveData["_c"]==-1){
				let cmsg:string=receiveData["_cmsg"]
				controllers.exam.QuestionDialogCtrl.questionDialogView.removeSelf();
				console.log(cmsg);
			}else{
				let examInfoVO:models.exam.ExamInfoVO;
				let key:string;
				let itemObjArr:Array<Object>= receiveData["_d"];
				let len:number=itemObjArr.length;
				let i:number;
				let itemObj:Object;
				QuestionDialogModel.questionInfoVOArr.splice(0, QuestionDialogModel.questionInfoVOArr.length);//QuestionDialogModel.instance.
				for(i=0;i<len;i++){
					itemObj=itemObjArr[i];
					examInfoVO = new models.exam.ExamInfoVO();
					examInfoVO.value=itemObj["value"];
					examInfoVO.label=itemObj["label"];
					QuestionDialogModel.questionInfoVOArr.push(examInfoVO);
				}
				examInfoVO =new models.exam.ExamInfoVO();
				let questionObj:Object=receiveData["question"];
				examInfoVO.index=questionObj["index"];
				examInfoVO.itemId=questionObj["id"];
				examInfoVO.brief=questionObj["brief"];
				examInfoVO.examLvl=takeData["examLvl"];
				QuestionDialogModel.questionInfoVOArr.push(examInfoVO);
				QuestionDialogModel.instance.handleCallback(QuestionDialogModel.questionInfoVOArr);  //QuestionDialogModel.instance.questionInfoVOArr
			}
		}

		/** 获取答案 */
		getRightAnswer(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			let answerObj:Object=receiveData["_d"];
			QuestionDialogModel.instance.handleCallback(answerObj);
		}

		/** 结束考试，获取成绩 */
		getExamOver(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			let overExamObj:Object;
			let finishExamObj:Object;
			let overExamVO:models.exam.ExamInfoVO;
			let key:string;
			let bolt:string;
			let i:number;
			let overExamArr:Array<any>=receiveData["_cmd"];
			let len:number=overExamArr.length;
			if(len<1){
				overExamVO=new models.exam.ExamInfoVO();
				overExamVO.examLvl=receiveData["grade"];  //用户考试等级
				QuestionDialogModel.overExamInfoVOArr.push(overExamVO);
			}else{		//考试结束后分享界面所需数据（暂时不做）
				// for(i=0;i<len;i++){
				// 	overExamObj=overExamArr[i];
				// 	for (key in overExamObj) {
				// 		if (overExamObj.hasOwnProperty("name")) {
				// 			finishExamObj=overExamObj["param"];
				// 			for (bolt in finishExamObj) {
				// 				overExamVO=new models.exam.ExamInfoVO();
				// 				overExamVO.examLvl=receiveData["grade"];  //用户考试等级
				// 				overExamVO.fixedBrief=finishExamObj["fixedbrief"]; //结束考试提示
				// 				overExamVO.brief=finishExamObj["brief"]  //标题
				// 				overExamVO.context=finishExamObj["context"]; //	考试结果
				// 				overExamVO.title=finishExamObj["title"]; //结果标题
				// 				overExamVO.websiteurl=finishExamObj["websiteurl"];  //网站地址
				// 				overExamVO.imgurl=finishExamObj["imgurl"]; // 图片资源地址
				// 				QuestionDialogModel.overExamInfoVOArr.push(overExamVO);
				// 			}
				// 		}
				// 	}
				// }
			}
			QuestionDialogModel.instance.handleCallback(QuestionDialogModel.overExamInfoVOArr);
		}
		handleCallback(takeData?:any):void
		{
			if(QuestionDialogModel.callback)
			{
				if(takeData)
					QuestionDialogModel.callback(takeData);
				else
					QuestionDialogModel.callback();
			}
		}
	}
}
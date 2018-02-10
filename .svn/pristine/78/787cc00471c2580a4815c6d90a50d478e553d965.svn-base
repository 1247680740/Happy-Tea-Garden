namespace models.exam
{
	import ToolVO = models.base.ToolVO;
    import ExamDialogCtrl = controllers.exam.ExamDialogCtrl;
    import examInfoVO=models.exam.ExamInfoVO;

	/**
	 * 考试数据模型
	 */
	export class ExamDialogModel
	{

		private static _instance:ExamDialogModel;

		/** 服务器返回的数据 */
		receiveData: any;
		/** 请求前自带的数据 */
		takeData: any;
        playerInfoVOArr:Array<examInfoVO>;
		examInfoVOArr:Array<any>;
		/** 响应数据处理完毕回调 */
		static callback:Function;
		/**当前炒茶面板 */
		static ExamDialogView:views.exam.ExamDialogView;
		constructor()
		{
            this.playerInfoVOArr=new Array<examInfoVO>();
			this.examInfoVOArr=new Array<any>();
		}

		static get instance():ExamDialogModel
		{
			if(!ExamDialogModel._instance)
				ExamDialogModel._instance = new ExamDialogModel();
			return ExamDialogModel._instance;
		}

        request_getUserInfo(uid:number):void{
            HttpServiceProxy.request("initExam",{"userid":uid},this.getUserInfo);
        }

		request_getStartExam(examLvl:string):void{
			HttpServiceProxy.request("startExam",{"id":examLvl},this.getExamInfo,{"examLvl":examLvl});
		}

        getUserInfo(receiveData?:any):void{
            if (receiveData)
				this.receiveData=receiveData;
            let userInfoArr:Array<Object>= receiveData["_d"];
			let userObjArrLen:number=userInfoArr.length;
			let i:number;
			let userVO: examInfoVO;
			let userObj: Object;
            ExamDialogModel.instance.playerInfoVOArr.splice(0, ExamDialogModel.instance.playerInfoVOArr.length);
            if(userObjArrLen<=0)
            {
                ExamDialogModel.instance.handleCallback(ExamDialogModel.instance.playerInfoVOArr);
            }else{
                for(i=0; i<userObjArrLen; i++)
                {
                    userObj = userInfoArr[i];
                    userVO = new models.exam.ExamInfoVO();
					if(userObj.hasOwnProperty("score")){
                    	userVO.examLvl=userObj["id"];
                    	userVO.examScore=userObj["score"];
                    	userVO.examAllow=userObj["allow"];
                    	userVO.examPay=userObj["pay"];
                    	ExamDialogModel.instance.playerInfoVOArr.push(userVO);
					}else{
						userVO.examLvl=userObj["id"];
						userVO.examScore="0";
						userVO.examAllow=userObj["allow"];
                    	userVO.examPay=userObj["pay"];
						ExamDialogModel.instance.playerInfoVOArr.push(userVO);
					}
                }
                ExamDialogModel.instance.handleCallback(ExamDialogModel.instance.playerInfoVOArr);
            }
        }

		getExamInfo(receiveData?:any,takeData?:any):void{
			if (receiveData)
				this.receiveData=receiveData;
			if (takeData)
				this.takeData=takeData;
			let id:string=this.takeData["examLvl"];
			ExamDialogModel.instance.examInfoVOArr.push(id);
			if(ExamDialogModel.callback)
			{
				if(receiveData||takeData)
					ExamDialogModel.callback(this.receiveData,this.takeData);
				else
					ExamDialogModel.callback();
			}
		}

		handleCallback(takeData?:any):void
		{
			if(ExamDialogModel.callback)
			{
				if(takeData)
					ExamDialogModel.callback(takeData);
				else
					ExamDialogModel.callback();
			}
		}
	}
}
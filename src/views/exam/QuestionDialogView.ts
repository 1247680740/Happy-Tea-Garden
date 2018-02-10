namespace views.exam
{
	import Event = laya.events.Event;
    import ExamInfoVO=models.exam.ExamInfoVO;
	import QuestionDialogModel=models.exam.QuestionDialogModel;
	import QuestionDialogCtrl=controllers.exam.QuestionDialogCtrl;
	import ExamDialogCtrl=controllers.exam.ExamDialogCtrl;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import TestTopicsUI = ui.gameUI.exam.TestTopicsUI;

	/**
	 * 试题弹出面板
	 */
	export class QuestionDialogView extends TestTopicsUI
	{
		/**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;

		// 图片路径
        imgPath:string="gameUI/exam/";
        //图片后缀名
        imgSuffix:string=".png";
		// 答案的角标
		static itemId:number;
		// 得分
		static score:number=0;
		//取消考试提示框
		tipView:ui.gameUI.tips.ConfirmCancelTipUI;
		// 当前选中的标签名称
        curSelectTabName:string;
		/**
		 * RadioGroup 选择改变处理器
		 */
		private handler = Handler.create(this, this.selectChange);

		constructor()
		{
			super();
			this.cacheAs = "bitmap";
			this.dragArea = `0,0,${this.width},60`;

			 ////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(540,388);
			this.bgUI.size(540,388);
			this.bgUI.addChild(this);
			this.y = 5;

			this.bgUI.titleImg.skin = "gameUI/common/icon/examName.png";
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (540-600)/600;
			let hRate:number = (388-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y -= this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.3,1.3);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.showCancleBtn);
			////////// <=

			this.tipView=new ui.gameUI.tips.ConfirmCancelTipUI;
			// this.closeBtn.on(Event.CLICK,this,this.showCancleBtn);
			this.affirmBtn.on(Event.CLICK,this,this.nextTest);
			this.creatRadioGroup();
		}

		timerOut():void{
			let time:number=parseInt(this.timeRemain.text);
			time--;
			this.timeRemain.text=time+"";
			if(time==0){
				Laya.timer.clearAll(this);
				this.result.skin=this.imgPath+"error_btn"+this.imgSuffix;
				QuestionDialogView.score+=0;
				this.score.text=QuestionDialogView.score+"分";
				this.timerOnce(2000,this,this.nextTest);
			}
		}


		initQuestion(takeData?:any):void{
			if(!takeData){
				return;
			}
			let questionInfoVOArr:Array<models.exam.ExamInfoVO>=new Array<models.exam.ExamInfoVO>();
			questionInfoVOArr=takeData;
			let i:number;
			let len:number=questionInfoVOArr.length;
			let questionInfoVO:models.exam.ExamInfoVO;
			let rg:Laya.RadioGroup=this.creatRadioGroup();
			this.option1.text=questionInfoVOArr[0].label;
			this.option2.text=questionInfoVOArr[1].label;
			this.option3.text=questionInfoVOArr[2].label;
			this.option4.text=questionInfoVOArr[3].label;
			this.title.text=questionInfoVOArr[questionInfoVOArr.length-1].brief;
			this.testIndex.text=questionInfoVOArr[questionInfoVOArr.length-1].index+"";
			this.score.text=QuestionDialogView.score+"分";
			this.timeRemain.text=30+"";
			this.result.skin="";
			this.timeRemain.timerLoop(1000,this,this.timerOut);

		}

		/** 点击确认之后的操作 */
		nextTest():void{
			// 点击确认后提交验证答案
			this.result.skin="";
			let userExam:number=parseInt(QuestionDialogCtrl.examLvl); //茶艺师考试的等级
			let testVOArr:Array<models.exam.ExamInfoVO>=QuestionDialogModel.questionInfoVOArr;
			let itemId:number=parseInt(testVOArr[testVOArr.length-1].itemId); //题目Id
			let option:string; //答案
			if(QuestionDialogView.itemId==null){
				option=" ";
				controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId,userExam,option);
			}else if(QuestionDialogView.itemId==0){
				option="A";
				controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId,userExam,option);
			}else if(QuestionDialogView.itemId==1){
				option="B";
				controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId,userExam,option);
			}else if(QuestionDialogView.itemId==2){
				option="C";
				controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId,userExam,option);
			}else if(QuestionDialogView.itemId==3){
				option="D";
				controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId,userExam,option);
			}
			// 提交答案2秒之后会进行请求下一题
			this.timerOnce(2000,this,this.QuestionList);
		}

		/** 点击确定后几秒后请求问题 */
		QuestionList():void{
			controllers.exam.QuestionDialogCtrl.getInstance().request_getQuestionList(QuestionDialogCtrl.examLvl);
		}

		/** 验证答案后更改状态 */
		resetItem(takeData?:any):void{
			if(!takeData)
				return
			let answerObj:Object=takeData;
			let answer:number=answerObj["isright"];
			let newScore:number;
			if(answer==1){
				this.result.skin=this.imgPath+"correct_btn"+this.imgSuffix;
				QuestionDialogView.score+=10;
			}else{
				this.result.skin=this.imgPath+"error_btn"+this.imgSuffix;
				QuestionDialogView.score+=0;
			}
			this.score.text=QuestionDialogView.score+"分";
			// 若10题考完，则请求结果
			if(parseInt(this.testIndex.text)==10)
			{
				// TipLayerManager.tipLayer.showCommonTip("考试结束");
				QuestionDialogView.score=0;
				Laya.timer.clearAll(this);
				this.bgUI.removeSelf();
				// 结束考试操作
				QuestionDialogCtrl.getInstance().request_finishExam();

				// 显示考试首界面
				// ExamDialogCtrl.getInstance().showExamDialog();	// hsx
			}
		}

		/** 创建一个RadioGroup选项组 */
		creatRadioGroup():Laya.RadioGroup{
			let rg:Laya.RadioGroup=new Laya.RadioGroup();
			rg.skin=this.imgPath+"radio"+this.imgSuffix;
			rg.space=16;
			rg.direction="v";
			rg.labels="A:,B:,C:,D:";
			rg.labelColors="#734D0E,#734D0E,#734D0E,#734D0E";
			rg.labelSize=15;
			rg.labelBold=false;
			rg.selectHandler = this.handler;
			this.addChild(rg);
			rg.pos(125,170);
			// rg.x=125;
			// rg.y=170;
			rg.initItems();
			return rg;
		}
		/** 选项发生改变后的变化 */
		selectChange(index:number):void{
			QuestionDialogView.itemId=index;
		}

		showCancleBtn():void{
			this.tipView.contentTxt.text="若退出本次考试,您的成绩将以当前成绩为准,无法继续本次考试。您是否确定退出？";
            this.tipView.x = configs.GameConfig.GAME_WINDOW_WIDTH>>1 - this.tipView.width>>1;
            this.tipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT>>1- this.tipView.width>>1;
			this.tipView.visible=true;
			this.addChild(this.tipView);
			this.tipView.confirmBtn.on(Event.CLICK,this,function():void{
				QuestionDialogView.score=0;
				this.tipView.removeSelf();
				this.bgImg.removeSelf();
				Laya.timer.clearAll(this);
				// 结束考试操作
				QuestionDialogCtrl.getInstance().request_finishExam();
				// 显示考试首界面
				ExamDialogCtrl.getInstance().showExamDialog();
            });
            this.tipView.closeBtn.on(Event.CLICK,this,this.cancleBtnFn);
            this.tipView.cancelBtn.on(Event.CLICK,this,this.cancleBtnFn);
		}

		/**
		 * 考试结束提示信息
		 */
		 showFinishExam(overExamVOArr:Array<models.exam.ExamInfoVO>):void{
			let i:number;
			let examLvl:string
			let len:number=overExamVOArr.length;
			let examInVO:models.exam.ExamInfoVO;
			let tipInfo:string;
			let info1:string = "你已完成";
			let info2:string = "牌茶艺师等级考试,成绩为：";
			let info3:string = ",再见！";
			if(len<=1)
			{
				for(i=0;i<len;i++){
					examInVO=overExamVOArr[i];
					examLvl=examInVO.examLvl;
					if(examLvl=="1"){
						tipInfo = info1+"铜"+info2+this.score.text+info3;
					}else if(examLvl=="2"){
						tipInfo = info1+"银"+info2+this.score.text+info3;
					}else if(examLvl=="3"){
						tipInfo = info1+"金"+info2+this.score.text+info3;
					}else if(examLvl=="4"){
						tipInfo = info1+"白金"+info2+this.score.text+info3;
					}
					TipLayerManager.tipLayer.showDrawBgTip(tipInfo);
				}
			}
			/** 考试分数如果高于之前的记录则会弹出一个分享页面 */
			else
			{
				// for(i=0;i<len;i++){
				// 	examInVO=overExamVOArr[i];

				// }
			}
		 }

		cancleBtnFn():void{
            this.tipView.visible=false;
        }
	}
}
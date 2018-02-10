var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var exam;
    (function (exam) {
        var Event = laya.events.Event;
        var QuestionDialogModel = models.exam.QuestionDialogModel;
        var QuestionDialogCtrl = controllers.exam.QuestionDialogCtrl;
        var ExamDialogCtrl = controllers.exam.ExamDialogCtrl;
        var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
        var TestTopicsUI = ui.gameUI.exam.TestTopicsUI;
        /**
         * 试题弹出面板
         */
        var QuestionDialogView = /** @class */ (function (_super) {
            __extends(QuestionDialogView, _super);
            function QuestionDialogView() {
                var _this = _super.call(this) || this;
                // 图片路径
                _this.imgPath = "gameUI/exam/";
                //图片后缀名
                _this.imgSuffix = ".png";
                /**
                 * RadioGroup 选择改变处理器
                 */
                _this.handler = Handler.create(_this, _this.selectChange);
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                ////////// =>
                _this.bgUI = new BaseBorderUI();
                _this.bgUI.bgImg.size(540, 388);
                _this.bgUI.size(540, 388);
                _this.bgUI.addChild(_this);
                _this.y = 5;
                _this.bgUI.titleImg.skin = "gameUI/common/icon/examName.png";
                _this.bgUI.titleImg.x = _this.width - _this.bgUI.titleImg.width >> 1;
                _this.bgUI.titleImg.y += 3;
                _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                // 根据缩放率来动态调整标题、关闭按钮
                var wRate = (540 - 600) / 600;
                var hRate = (388 - 400) / 400;
                _this.bgUI.closeBtn.x += _this.bgUI.closeBtn.x * wRate;
                _this.bgUI.closeBtn.y -= _this.bgUI.closeBtn.y * hRate;
                _this.bgUI.closeBtn.scale(1.3, 1.3);
                _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.showCancleBtn);
                ////////// <=
                _this.tipView = new ui.gameUI.tips.ConfirmCancelTipUI;
                // this.closeBtn.on(Event.CLICK,this,this.showCancleBtn);
                _this.affirmBtn.on(Event.CLICK, _this, _this.nextTest);
                _this.creatRadioGroup();
                return _this;
            }
            QuestionDialogView.prototype.timerOut = function () {
                var time = parseInt(this.timeRemain.text);
                time--;
                this.timeRemain.text = time + "";
                if (time == 0) {
                    Laya.timer.clearAll(this);
                    this.result.skin = this.imgPath + "error_btn" + this.imgSuffix;
                    QuestionDialogView.score += 0;
                    this.score.text = QuestionDialogView.score + "分";
                    this.timerOnce(2000, this, this.nextTest);
                }
            };
            QuestionDialogView.prototype.initQuestion = function (takeData) {
                if (!takeData) {
                    return;
                }
                var questionInfoVOArr = new Array();
                questionInfoVOArr = takeData;
                var i;
                var len = questionInfoVOArr.length;
                var questionInfoVO;
                var rg = this.creatRadioGroup();
                this.option1.text = questionInfoVOArr[0].label;
                this.option2.text = questionInfoVOArr[1].label;
                this.option3.text = questionInfoVOArr[2].label;
                this.option4.text = questionInfoVOArr[3].label;
                this.title.text = questionInfoVOArr[questionInfoVOArr.length - 1].brief;
                this.testIndex.text = questionInfoVOArr[questionInfoVOArr.length - 1].index + "";
                this.score.text = QuestionDialogView.score + "分";
                this.timeRemain.text = 30 + "";
                this.result.skin = "";
                this.timeRemain.timerLoop(1000, this, this.timerOut);
            };
            /** 点击确认之后的操作 */
            QuestionDialogView.prototype.nextTest = function () {
                // 点击确认后提交验证答案
                this.result.skin = "";
                var userExam = parseInt(QuestionDialogCtrl.examLvl); //茶艺师考试的等级
                var testVOArr = QuestionDialogModel.questionInfoVOArr;
                var itemId = parseInt(testVOArr[testVOArr.length - 1].itemId); //题目Id
                var option; //答案
                if (QuestionDialogView.itemId == null) {
                    option = " ";
                    controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId, userExam, option);
                }
                else if (QuestionDialogView.itemId == 0) {
                    option = "A";
                    controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId, userExam, option);
                }
                else if (QuestionDialogView.itemId == 1) {
                    option = "B";
                    controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId, userExam, option);
                }
                else if (QuestionDialogView.itemId == 2) {
                    option = "C";
                    controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId, userExam, option);
                }
                else if (QuestionDialogView.itemId == 3) {
                    option = "D";
                    controllers.exam.QuestionDialogCtrl.getInstance().request_getResult(itemId, userExam, option);
                }
                // 提交答案2秒之后会进行请求下一题
                this.timerOnce(2000, this, this.QuestionList);
            };
            /** 点击确定后几秒后请求问题 */
            QuestionDialogView.prototype.QuestionList = function () {
                controllers.exam.QuestionDialogCtrl.getInstance().request_getQuestionList(QuestionDialogCtrl.examLvl);
            };
            /** 验证答案后更改状态 */
            QuestionDialogView.prototype.resetItem = function (takeData) {
                if (!takeData)
                    return;
                var answerObj = takeData;
                var answer = answerObj["isright"];
                var newScore;
                if (answer == 1) {
                    this.result.skin = this.imgPath + "correct_btn" + this.imgSuffix;
                    QuestionDialogView.score += 10;
                }
                else {
                    this.result.skin = this.imgPath + "error_btn" + this.imgSuffix;
                    QuestionDialogView.score += 0;
                }
                this.score.text = QuestionDialogView.score + "分";
                // 若10题考完，则请求结果
                if (parseInt(this.testIndex.text) == 10) {
                    // TipLayerManager.tipLayer.showCommonTip("考试结束");
                    QuestionDialogView.score = 0;
                    Laya.timer.clearAll(this);
                    this.bgUI.removeSelf();
                    // 结束考试操作
                    QuestionDialogCtrl.getInstance().request_finishExam();
                    // 显示考试首界面
                    // ExamDialogCtrl.getInstance().showExamDialog();	// hsx
                }
            };
            /** 创建一个RadioGroup选项组 */
            QuestionDialogView.prototype.creatRadioGroup = function () {
                var rg = new Laya.RadioGroup();
                rg.skin = this.imgPath + "radio" + this.imgSuffix;
                rg.space = 16;
                rg.direction = "v";
                rg.labels = "A:,B:,C:,D:";
                rg.labelColors = "#734D0E,#734D0E,#734D0E,#734D0E";
                rg.labelSize = 15;
                rg.labelBold = false;
                rg.selectHandler = this.handler;
                this.addChild(rg);
                rg.pos(125, 170);
                // rg.x=125;
                // rg.y=170;
                rg.initItems();
                return rg;
            };
            /** 选项发生改变后的变化 */
            QuestionDialogView.prototype.selectChange = function (index) {
                QuestionDialogView.itemId = index;
            };
            QuestionDialogView.prototype.showCancleBtn = function () {
                this.tipView.contentTxt.text = "若退出本次考试,您的成绩将以当前成绩为准,无法继续本次考试。您是否确定退出？";
                this.tipView.x = configs.GameConfig.GAME_WINDOW_WIDTH >> 1 - this.tipView.width >> 1;
                this.tipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT >> 1 - this.tipView.width >> 1;
                this.tipView.visible = true;
                this.addChild(this.tipView);
                this.tipView.confirmBtn.on(Event.CLICK, this, function () {
                    QuestionDialogView.score = 0;
                    this.tipView.removeSelf();
                    this.bgImg.removeSelf();
                    Laya.timer.clearAll(this);
                    // 结束考试操作
                    QuestionDialogCtrl.getInstance().request_finishExam();
                    // 显示考试首界面
                    ExamDialogCtrl.getInstance().showExamDialog();
                });
                this.tipView.closeBtn.on(Event.CLICK, this, this.cancleBtnFn);
                this.tipView.cancelBtn.on(Event.CLICK, this, this.cancleBtnFn);
            };
            /**
             * 考试结束提示信息
             */
            QuestionDialogView.prototype.showFinishExam = function (overExamVOArr) {
                var i;
                var examLvl;
                var len = overExamVOArr.length;
                var examInVO;
                var tipInfo;
                var info1 = "你已完成";
                var info2 = "牌茶艺师等级考试,成绩为：";
                var info3 = ",再见！";
                if (len <= 1) {
                    for (i = 0; i < len; i++) {
                        examInVO = overExamVOArr[i];
                        examLvl = examInVO.examLvl;
                        if (examLvl == "1") {
                            tipInfo = info1 + "铜" + info2 + this.score.text + info3;
                        }
                        else if (examLvl == "2") {
                            tipInfo = info1 + "银" + info2 + this.score.text + info3;
                        }
                        else if (examLvl == "3") {
                            tipInfo = info1 + "金" + info2 + this.score.text + info3;
                        }
                        else if (examLvl == "4") {
                            tipInfo = info1 + "白金" + info2 + this.score.text + info3;
                        }
                        TipLayerManager.tipLayer.showDrawBgTip(tipInfo);
                    }
                }
                else {
                    // for(i=0;i<len;i++){
                    // 	examInVO=overExamVOArr[i];
                    // }
                }
            };
            QuestionDialogView.prototype.cancleBtnFn = function () {
                this.tipView.visible = false;
            };
            // 得分
            QuestionDialogView.score = 0;
            return QuestionDialogView;
        }(TestTopicsUI));
        exam.QuestionDialogView = QuestionDialogView;
    })(exam = views.exam || (views.exam = {}));
})(views || (views = {}));
//# sourceMappingURL=QuestionDialogView.js.map
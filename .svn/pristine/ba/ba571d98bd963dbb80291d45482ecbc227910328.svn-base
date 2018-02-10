var controllers;
(function (controllers) {
    var exam;
    (function (exam) {
        /**
         * 试题相关的控制器
         */
        var QuestionDialogCtrl = /** @class */ (function () {
            function QuestionDialogCtrl() {
                if (!QuestionDialogCtrl.questionDialogModel)
                    QuestionDialogCtrl.questionDialogModel = models.exam.QuestionDialogModel.instance;
                QuestionDialogCtrl.questionDialogView = new views.exam.QuestionDialogView();
            }
            QuestionDialogCtrl.getInstance = function () {
                if (!QuestionDialogCtrl._instance)
                    QuestionDialogCtrl._instance = new QuestionDialogCtrl();
                return QuestionDialogCtrl._instance;
            };
            /**
             * 点击确定考试显示考题面板
             */
            QuestionDialogCtrl.prototype.showQuestionView = function (examLvl) {
                QuestionDialogCtrl.examLvl = examLvl;
                UILayerManager.uiLayer.addChild(QuestionDialogCtrl.questionDialogView.bgUI);
                QuestionDialogCtrl.questionDialogView.affirmBtn.visible = true;
                QuestionDialogCtrl.questionDialogView.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - QuestionDialogCtrl.questionDialogView.bgUI.width >> 1;
                QuestionDialogCtrl.questionDialogView.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - QuestionDialogCtrl.questionDialogView.bgUI.height >> 1;
                // 获取用户考试试题信息
                this.request_getQuestionList(examLvl);
            };
            /** 结束考试 */
            QuestionDialogCtrl.prototype.request_finishExam = function () {
                models.exam.QuestionDialogModel.callback = this.examOver;
                QuestionDialogCtrl.questionDialogModel.requset_getScore();
            };
            QuestionDialogCtrl.prototype.examOver = function (takeData) {
                QuestionDialogCtrl.questionDialogView.showFinishExam(models.exam.QuestionDialogModel.overExamInfoVOArr);
            };
            /** 提交验证答案 */
            QuestionDialogCtrl.prototype.request_getResult = function (itemId, grade, answer) {
                models.exam.QuestionDialogModel.callback = this.getAnswer;
                QuestionDialogCtrl.questionDialogModel.request_getRightAnswer(itemId, grade, answer);
            };
            QuestionDialogCtrl.prototype.getAnswer = function (takeData) {
                QuestionDialogCtrl.questionDialogView.resetItem(takeData);
            };
            /** 获取问题列表 */
            QuestionDialogCtrl.prototype.request_getQuestionList = function (examLvl) {
                models.exam.QuestionDialogModel.callback = this.setQuestion;
                QuestionDialogCtrl.questionDialogModel.request_getQuestionList(examLvl);
            };
            QuestionDialogCtrl.prototype.setQuestion = function (takeData) {
                QuestionDialogCtrl.questionDialogView.initQuestion(takeData);
            };
            return QuestionDialogCtrl;
        }());
        exam.QuestionDialogCtrl = QuestionDialogCtrl;
    })(exam = controllers.exam || (controllers.exam = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=QuestionDialogCtrl.js.map
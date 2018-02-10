var controllers;
(function (controllers) {
    var exam;
    (function (exam) {
        /**
         * 考试相关的控制器
         */
        var ExamDialogCtrl = /** @class */ (function () {
            function ExamDialogCtrl() {
                if (!ExamDialogCtrl.examDialogModel)
                    ExamDialogCtrl.examDialogModel = models.exam.ExamDialogModel.instance;
                if (!ExamDialogCtrl.examDialogView)
                    ExamDialogCtrl.examDialogView = new views.exam.ExamDialogView();
            }
            ExamDialogCtrl.getInstance = function () {
                if (!ExamDialogCtrl._instance)
                    ExamDialogCtrl._instance = new ExamDialogCtrl();
                return ExamDialogCtrl._instance;
            };
            /**
             * 显示考试面板
             */
            ExamDialogCtrl.prototype.showExamDialog = function () {
                UILayerManager.uiLayer.addChild(ExamDialogCtrl.examDialogView.bgUI);
                ExamDialogCtrl.examDialogView.bgUI.visible = true;
                ExamDialogCtrl.examDialogView.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - ExamDialogCtrl.examDialogView.bgUI.width >> 1;
                ExamDialogCtrl.examDialogView.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - ExamDialogCtrl.examDialogView.bgUI.height >> 1;
                // 获取用户考试等级信息
                this.request_getUserInfo();
            };
            /** 获取用户等级考试信息 */
            ExamDialogCtrl.prototype.request_getUserInfo = function () {
                var uid = parseInt(IdentityConfig.uid);
                models.exam.ExamDialogModel.callback = this.setUserInfo;
                ExamDialogCtrl.examDialogModel.request_getUserInfo(uid);
            };
            ExamDialogCtrl.prototype.setUserInfo = function (takeData) {
                ExamDialogCtrl.examDialogView.setUserExamInfo(takeData);
            };
            ExamDialogCtrl.prototype.request_startExam = function (lvl) {
                models.exam.ExamDialogModel.callback = this.showExamTip;
                ExamDialogCtrl.examDialogModel.request_getStartExam(lvl);
            };
            ExamDialogCtrl.prototype.showExamTip = function (receiveData, takeData) {
                ExamDialogCtrl.examDialogView.setExamTip(receiveData, takeData);
            };
            return ExamDialogCtrl;
        }());
        exam.ExamDialogCtrl = ExamDialogCtrl;
    })(exam = controllers.exam || (controllers.exam = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=ExamDialogCtrl.js.map
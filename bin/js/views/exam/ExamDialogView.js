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
        var ExamDialogUI = ui.gameUI.exam.ExamDialogUI;
        var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
        var questionDialogCtrl = controllers.exam.QuestionDialogCtrl;
        var examDialogCtrl = controllers.exam.ExamDialogCtrl;
        var examDialogModel = models.exam.ExamDialogModel;
        /**
         * 考试弹出面板
         */
        var ExamDialogView = /** @class */ (function (_super) {
            __extends(ExamDialogView, _super);
            function ExamDialogView() {
                var _this = _super.call(this) || this;
                // 图片路径
                _this.imgPath = "gameUI/exam/";
                //图片后缀名
                _this.imgSuffix = ".png";
                // 声明模糊滤镜
                _this.blurFilter = new Laya.BlurFilter();
                // 底部工具栏的高度
                _this.toolBarH = 30;
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                ////////// =>
                _this.bgUI = new BaseBorderUI();
                _this.bgUI.bgImg.size(540, 388);
                _this.bgUI.size(540, 388);
                _this.bgUI.addChild(_this);
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
                _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.closeView);
                ////////// <=
                _this.blurFilter.strength = 2;
                _this.examTipUI = new ui.gameUI.tips.ExamTipUI();
                _this.tipView = new ui.gameUI.tips.ConfirmCancelTipUI;
                // this.closeBtn.on(Event.CLICK,this,this.closeView);
                for (var i = 1; i < 5; i++) {
                    _this.getChildByName("gradeImg" + i).skin = _this.imgPath + "noPass_btn" + _this.imgSuffix;
                    _this.getChildByName("examBtn" + i).skin = _this.imgPath + "font_btn" + _this.imgSuffix;
                    _this.getChildByName("imgIcon" + i).on(Event.MOUSE_OVER, _this, _this.showTip);
                    _this.getChildByName("imgIcon" + i).on(Event.MOUSE_OUT, _this, _this.initTip);
                    _this.getChildByName("examBtn" + i).on(Event.CLICK, _this, _this.startExam);
                }
                return _this;
            }
            /** 点击开始考试 */
            ExamDialogView.prototype.startExam = function (event) {
                var name = event.target.name;
                var lvl = name.substring(name.length - 1);
                examDialogCtrl.getInstance().request_startExam(lvl);
            };
            ExamDialogView.prototype.showTip = function (event) {
                var name = event.target.name;
                this.curSelectTabName = name;
                this.curSelectTabId = parseInt(name.substring(name.length - 1));
                // examDialogCtrl.getInstance().request_getTipInfo();
                this.showExamInfo(examDialogModel.instance.playerInfoVOArr);
            };
            ExamDialogView.prototype.initTip = function () {
                this.examTipUI.visible = false;
            };
            ExamDialogView.prototype.showExamInfo = function (playInfoVOArr) {
                if (!playInfoVOArr) {
                    return;
                }
                var i;
                var len = playInfoVOArr.length;
                var userInfoVO = new models.exam.ExamInfoVO();
                if (this.curSelectTabName == ("imgIcon" + this.curSelectTabId)) {
                    var levelIcon = this.getChildByName("imgIcon" + this.curSelectTabId);
                    if (this.curSelectTabId == 1) {
                        this.examTipUI.examName.text = "茶艺师铜牌资格考试";
                        this.examTipUI.examQualify1.text = "角色等级达到11级";
                        this.examTipUI.examQualify2.text = "";
                        this.examTipUI.passQualify.text = "考试分数达到60分";
                        this.examTipUI.award.text = "激活11~25级商城道具";
                    }
                    else if (this.curSelectTabId == 2) {
                        this.examTipUI.examName.text = "茶艺师银牌资格考试";
                        this.examTipUI.examQualify1.text = "角色等级达到26级";
                        this.examTipUI.examQualify2.text = "已通过铜牌茶艺师考试";
                        this.examTipUI.passQualify.text = "考试分数达到60分";
                        this.examTipUI.award.text = "激活26~40级商城道具";
                    }
                    else if (this.curSelectTabId == 3) {
                        this.examTipUI.examName.text = "茶艺师金牌资格考试";
                        this.examTipUI.examQualify1.text = "角色等级达到41级";
                        this.examTipUI.examQualify2.text = "已通过银牌茶艺师考试";
                        this.examTipUI.passQualify.text = "考试分数达到60分";
                        this.examTipUI.award.text = "激活41~60级商城道具";
                    }
                    else if (this.curSelectTabId == 4) {
                        this.examTipUI.examName.text = "茶艺师白金资格考试";
                        this.examTipUI.examQualify1.text = "角色等级达到61级";
                        this.examTipUI.examQualify2.text = "已通过金牌茶艺师考试";
                        this.examTipUI.passQualify.text = "考试分数达到60分";
                        this.examTipUI.award.text = "激活61~80级商城道具";
                    }
                    if (len < this.curSelectTabId) {
                        this.examTipUI.examScore.text = "0分";
                    }
                    else {
                        userInfoVO = playInfoVOArr[this.curSelectTabId - 1];
                        this.examTipUI.examScore.text = userInfoVO.examScore + "分";
                    }
                    this.examTipUI.visible = true;
                    this.examTipUI.graphics.clear();
                    this.examTipUI.graphics.drawRect(0, 0, this.examTipUI.width, this.examTipUI.height, "#ffffe1");
                    this.addChild(this.examTipUI);
                    this.examTipUI.x = levelIcon.x + levelIcon.width + 5;
                    this.examTipUI.y = levelIcon.y - 5;
                }
            };
            /** 判断得分显示相应分数图片 */
            ExamDialogView.prototype.setUserExamInfo = function (playInfoVOArr) {
                var i;
                var len = playInfoVOArr.length;
                var userInfoVO = new models.exam.ExamInfoVO();
                var playerLvl = models.player.PlayerInfoModel.playerInfo.level;
                for (i = 0; i < len; i++) {
                    userInfoVO = playInfoVOArr[i];
                    var index = i + 1;
                    if (userInfoVO.examScore == "100") {
                        this.getChildByName("gradeImg" + index).skin = this.imgPath + "perfect_btn" + this.imgSuffix;
                        this.getChildByName("examBtn" + index).skin = "";
                    }
                    else {
                        if (userInfoVO.examScore == "90") {
                            this.getChildByName("gradeImg" + index).skin = this.imgPath + "ninety" + this.imgSuffix;
                        }
                        else if (userInfoVO.examScore == "80") {
                            this.getChildByName("gradeImg" + index).skin = this.imgPath + "eighty" + this.imgSuffix;
                        }
                        else if (userInfoVO.examScore == "70") {
                            this.getChildByName("gradeImg" + index).skin = this.imgPath + "seventy" + this.imgSuffix;
                        }
                        else if (userInfoVO.examScore == "60") {
                            this.getChildByName("gradeImg" + index).skin = this.imgPath + "sixty" + this.imgSuffix;
                        }
                        else if (parseInt(userInfoVO.examScore) < 60) {
                            this.getChildByName("gradeImg" + index).skin = this.imgPath + "noPass_btn" + this.imgSuffix;
                        }
                        this.getChildByName("examBtn" + index).skin = this.imgPath + "testfont_btn" + this.imgSuffix;
                    }
                }
                if (len == 0) {
                    if (playerLvl > 10) {
                        this.getChildByName("examBtn1").filters = [];
                        this.getChildByName("examBtn1").mouseEnabled = true;
                        for (i = 2; i < 5; i++) {
                            this.getChildByName("examBtn" + i).disabled = true;
                        }
                    }
                    else {
                        for (i = 1; i < 5; i++) {
                            this.getChildByName("examBtn" + i).disabled = true;
                        }
                    }
                }
                else if (len == 4) {
                    for (i = 1; i < 5; i++) {
                        this.getChildByName("examBtn" + i).filters = [];
                        this.getChildByName("examBtn" + i).mouseEnabled = true;
                    }
                }
                else {
                    for (i = 4; i > len; i--) {
                        this.getChildByName("examBtn" + i).disabled = true;
                    }
                    if (parseInt(playInfoVOArr[len - 1].examScore) >= 60) {
                        var index = len + 1;
                        switch (len) {
                            case 1:
                                if (playerLvl > 25) {
                                    this.getChildByName("examBtn" + index).filters = [];
                                    this.getChildByName("examBtn" + index).mouseEnabled = true;
                                }
                                else {
                                    this.getChildByName("examBtn" + index).disabled = true;
                                }
                                break;
                            case 2:
                                if (playerLvl > 40) {
                                    this.getChildByName("examBtn" + index).filters = [];
                                    this.getChildByName("examBtn" + index).mouseEnabled = true;
                                }
                                else {
                                    this.getChildByName("examBtn" + index).disabled = true;
                                }
                                break;
                            case 3:
                                if (playerLvl > 60) {
                                    this.getChildByName("examBtn" + index).filters = [];
                                    this.getChildByName("examBtn" + index).mouseEnabled = true;
                                }
                                else {
                                    this.getChildByName("examBtn" + index).disabled = true;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            };
            /** 显示考试提示框 */
            ExamDialogView.prototype.setExamTip = function (receiveData, takeData) {
                var examLvl = takeData["examLvl"]; //茶艺师等级“Id”
                this.tipView.contentTxt.text = "参加本次考试需要支付" + Math.abs(receiveData["_y"]) + "钻石，你确定参加吗";
                this.tipView.x = configs.GameConfig.GAME_WINDOW_WIDTH >> 1 - this.tipView.width / 2;
                this.tipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT >> 1 - this.tipView.width / 2;
                this.addChild(this.tipView);
                this.tipView.visible = true;
                this.tipView.confirmBtn.on(Event.CLICK, this, function () {
                    this.curSelectTabName = "confirmBtn";
                    this.getChildByName("examBtn" + examLvl).skin = this.imgPath + "testfont_btn" + this.imgSuffix;
                    models.player.PlayerInfoModel.playerInfo.diamond += receiveData["_y"];
                    // 更新玩家信息
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    this.cancleBtnFn(this.curSelectTabName);
                    // 请求考题,显示考题页面
                    UILayerManager.uiLayer.removeChild(this);
                    questionDialogCtrl.getInstance().showQuestionView(examLvl);
                });
                this.tipView.closeBtn.on(Event.CLICK, this, this.cancleBtnFn);
                this.tipView.cancelBtn.on(Event.CLICK, this, this.cancleBtnFn);
            };
            ExamDialogView.prototype.cancleBtnFn = function (curSelectTabName) {
                this.tipView.visible = false;
                if (curSelectTabName == "confirmBtn") {
                    this.bgUI.removeSelf();
                }
            };
            ExamDialogView.prototype.closeView = function () {
                this.bgUI.removeSelf();
            };
            return ExamDialogView;
        }(ExamDialogUI));
        exam.ExamDialogView = ExamDialogView;
    })(exam = views.exam || (views.exam = {}));
})(views || (views = {}));
//# sourceMappingURL=ExamDialogView.js.map
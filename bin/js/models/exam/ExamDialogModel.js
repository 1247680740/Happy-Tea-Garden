var models;
(function (models) {
    var exam;
    (function (exam) {
        /**
         * 考试数据模型
         */
        var ExamDialogModel = /** @class */ (function () {
            function ExamDialogModel() {
                this.playerInfoVOArr = new Array();
                this.examInfoVOArr = new Array();
            }
            Object.defineProperty(ExamDialogModel, "instance", {
                get: function () {
                    if (!ExamDialogModel._instance)
                        ExamDialogModel._instance = new ExamDialogModel();
                    return ExamDialogModel._instance;
                },
                enumerable: true,
                configurable: true
            });
            ExamDialogModel.prototype.request_getUserInfo = function (uid) {
                HttpServiceProxy.request("initExam", { "userid": uid }, this.getUserInfo);
            };
            ExamDialogModel.prototype.request_getStartExam = function (examLvl) {
                HttpServiceProxy.request("startExam", { "id": examLvl }, this.getExamInfo, { "examLvl": examLvl });
            };
            ExamDialogModel.prototype.getUserInfo = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var userInfoArr = receiveData["_d"];
                var userObjArrLen = userInfoArr.length;
                var i;
                var userVO;
                var userObj;
                ExamDialogModel.instance.playerInfoVOArr.splice(0, ExamDialogModel.instance.playerInfoVOArr.length);
                if (userObjArrLen <= 0) {
                    ExamDialogModel.instance.handleCallback(ExamDialogModel.instance.playerInfoVOArr);
                }
                else {
                    for (i = 0; i < userObjArrLen; i++) {
                        userObj = userInfoArr[i];
                        userVO = new models.exam.ExamInfoVO();
                        if (userObj.hasOwnProperty("score")) {
                            userVO.examLvl = userObj["id"];
                            userVO.examScore = userObj["score"];
                            userVO.examAllow = userObj["allow"];
                            userVO.examPay = userObj["pay"];
                            ExamDialogModel.instance.playerInfoVOArr.push(userVO);
                        }
                        else {
                            userVO.examLvl = userObj["id"];
                            userVO.examScore = "0";
                            userVO.examAllow = userObj["allow"];
                            userVO.examPay = userObj["pay"];
                            ExamDialogModel.instance.playerInfoVOArr.push(userVO);
                        }
                    }
                    ExamDialogModel.instance.handleCallback(ExamDialogModel.instance.playerInfoVOArr);
                }
            };
            ExamDialogModel.prototype.getExamInfo = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                var id = this.takeData["examLvl"];
                ExamDialogModel.instance.examInfoVOArr.push(id);
                if (ExamDialogModel.callback) {
                    if (receiveData || takeData)
                        ExamDialogModel.callback(this.receiveData, this.takeData);
                    else
                        ExamDialogModel.callback();
                }
            };
            ExamDialogModel.prototype.handleCallback = function (takeData) {
                if (ExamDialogModel.callback) {
                    if (takeData)
                        ExamDialogModel.callback(takeData);
                    else
                        ExamDialogModel.callback();
                }
            };
            return ExamDialogModel;
        }());
        exam.ExamDialogModel = ExamDialogModel;
    })(exam = models.exam || (models.exam = {}));
})(models || (models = {}));
//# sourceMappingURL=ExamDialogModel.js.map
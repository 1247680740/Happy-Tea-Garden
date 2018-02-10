var models;
(function (models) {
    var exam;
    (function (exam) {
        /**
         * 考试数据模型
         */
        var QuestionDialogModel = /** @class */ (function () {
            function QuestionDialogModel() {
                QuestionDialogModel.questionInfoVOArr = new Array();
                QuestionDialogModel.overExamInfoVOArr = new Array();
            }
            Object.defineProperty(QuestionDialogModel, "instance", {
                get: function () {
                    if (!QuestionDialogModel._instance)
                        QuestionDialogModel._instance = new QuestionDialogModel();
                    return QuestionDialogModel._instance;
                },
                enumerable: true,
                configurable: true
            });
            QuestionDialogModel.prototype.request_getQuestionList = function (examLvl) {
                HttpServiceProxy.request("initExaminationData", { "id": examLvl }, this.getQuestionList, { "examLvl": examLvl });
            };
            /** 获取正确答案并验证 */
            QuestionDialogModel.prototype.request_getRightAnswer = function (itemId, grade, answer) {
                HttpServiceProxy.request("submitAnswerData", { "id": itemId, "grade": grade, "answer": answer }, this.getRightAnswer);
            };
            /** 结束考试获取成绩 */
            QuestionDialogModel.prototype.requset_getScore = function () {
                HttpServiceProxy.request("teaExamOver", null, this.getExamOver);
            };
            /** 获取试题列表 */
            QuestionDialogModel.prototype.getQuestionList = function (receiveData, takeData) {
                if (receiveData) {
                    this.receiveData = receiveData;
                }
                if (takeData) {
                    this.takeData = takeData;
                }
                if (receiveData["_c"] == -1) {
                    var cmsg = receiveData["_cmsg"];
                    controllers.exam.QuestionDialogCtrl.questionDialogView.removeSelf();
                    console.log(cmsg);
                }
                else {
                    var examInfoVO_1;
                    var key = void 0;
                    var itemObjArr = receiveData["_d"];
                    var len = itemObjArr.length;
                    var i = void 0;
                    var itemObj = void 0;
                    QuestionDialogModel.questionInfoVOArr.splice(0, QuestionDialogModel.questionInfoVOArr.length); //QuestionDialogModel.instance.
                    for (i = 0; i < len; i++) {
                        itemObj = itemObjArr[i];
                        examInfoVO_1 = new models.exam.ExamInfoVO();
                        examInfoVO_1.value = itemObj["value"];
                        examInfoVO_1.label = itemObj["label"];
                        QuestionDialogModel.questionInfoVOArr.push(examInfoVO_1);
                    }
                    examInfoVO_1 = new models.exam.ExamInfoVO();
                    var questionObj = receiveData["question"];
                    examInfoVO_1.index = questionObj["index"];
                    examInfoVO_1.itemId = questionObj["id"];
                    examInfoVO_1.brief = questionObj["brief"];
                    examInfoVO_1.examLvl = takeData["examLvl"];
                    QuestionDialogModel.questionInfoVOArr.push(examInfoVO_1);
                    QuestionDialogModel.instance.handleCallback(QuestionDialogModel.questionInfoVOArr); //QuestionDialogModel.instance.questionInfoVOArr
                }
            };
            /** 获取答案 */
            QuestionDialogModel.prototype.getRightAnswer = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var answerObj = receiveData["_d"];
                QuestionDialogModel.instance.handleCallback(answerObj);
            };
            /** 结束考试，获取成绩 */
            QuestionDialogModel.prototype.getExamOver = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var overExamObj;
                var finishExamObj;
                var overExamVO;
                var key;
                var bolt;
                var i;
                var overExamArr = receiveData["_cmd"];
                var len = overExamArr.length;
                if (len < 1) {
                    overExamVO = new models.exam.ExamInfoVO();
                    overExamVO.examLvl = receiveData["grade"]; //用户考试等级
                    QuestionDialogModel.overExamInfoVOArr.push(overExamVO);
                }
                else {
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
            };
            QuestionDialogModel.prototype.handleCallback = function (takeData) {
                if (QuestionDialogModel.callback) {
                    if (takeData)
                        QuestionDialogModel.callback(takeData);
                    else
                        QuestionDialogModel.callback();
                }
            };
            return QuestionDialogModel;
        }());
        exam.QuestionDialogModel = QuestionDialogModel;
    })(exam = models.exam || (models.exam = {}));
})(models || (models = {}));
//# sourceMappingURL=QuestionDialogModel.js.map
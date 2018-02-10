var models;
(function (models) {
    var ranklist;
    (function (ranklist) {
        /**
         * 排行榜数据模型
         * @author hsx
         */
        var RankListMode = /** @class */ (function () {
            function RankListMode() {
                RankListMode.instance = this;
            }
            /**
             * 等级排行
             * @param para {当前页，每页条数}
             */
            RankListMode.prototype.request_getGradeRank = function (para) {
                HttpServiceProxy.request("getGradeRank", { "page": para["page"], "num": para["num"] }, this.getGradeRankOver);
            };
            RankListMode.prototype.getGradeRankOver = function (receiveData, takeData) {
                if (!receiveData)
                    return;
                if (receiveData["_cmsg"]) {
                }
                else {
                    // ["玩家排行","玩家头像","玩家名字","玩家等级","玩家经验"]
                    var allData = receiveData["_d"];
                    var oneData = void 0;
                    var key = void 0;
                    // 玩家的数据
                    var dataArr = new Array();
                    for (key in allData) {
                        oneData = allData[key];
                        if (!oneData)
                            continue;
                        var objArr = [];
                        objArr.push((parseInt(key) + 1) + "");
                        objArr.push(oneData["h"]);
                        objArr.push(oneData["n"]);
                        objArr.push(oneData["l"]);
                        objArr.push(oneData["exp"]);
                        dataArr.push(objArr);
                    }
                    // 自己的数据
                    var selfObj = {};
                    selfObj["rank"] = receiveData["_myranking"];
                    selfObj["exp"] = receiveData["_myexp"];
                    var dataObj = { "page": receiveData["_pagecount"], "data": dataArr, "selfData": selfObj };
                    RankListMode.instance.handleCallback(dataObj);
                }
            };
            RankListMode.prototype.handleCallback = function (takeData) {
                if (RankListMode.callback) {
                    if (takeData)
                        RankListMode.callback(takeData);
                    else
                        RankListMode.callback();
                }
            };
            return RankListMode;
        }());
        ranklist.RankListMode = RankListMode;
    })(ranklist = models.ranklist || (models.ranklist = {}));
})(models || (models = {}));
//# sourceMappingURL=RankListMode.js.map
var models;
(function (models) {
    var teaWiki;
    (function (teaWiki) {
        var TeaWikiModel = /** @class */ (function () {
            function TeaWikiModel() {
                this.teaWikiVOArr = new Array();
                this.teaVOArr = new Array();
            }
            TeaWikiModel.getInstance = function () {
                if (!TeaWikiModel.instance)
                    TeaWikiModel.instance = new TeaWikiModel();
                return TeaWikiModel.instance;
            };
            /**
             * 右侧列表数据请求
             */
            TeaWikiModel.prototype.request_getDataByLeft = function (name) {
                HttpServiceProxy.request("getDataByLeft", { "label": name }, this.getDataByLeftOverFn, { "label": name });
            };
            /**
             * 首次进入加载详情页
             */
            TeaWikiModel.prototype.request_getFirstInfo = function (teaWikiInfoVO) {
                HttpServiceProxy.request("getDataByRight", { "id": 0, "label": teaWikiInfoVO.label }, this.getDataByRightOverFn, { "label": teaWikiInfoVO.label });
            };
            /**
             * 点击右侧触发的事件
             */
            TeaWikiModel.prototype.request_getTouchInfo = function (id, teaWikiInfoVO) {
                HttpServiceProxy.request("getDataByRight", { "id": id, "label": teaWikiInfoVO.label }, this.getDataByRightOverFn, { "label": teaWikiInfoVO.label });
            };
            /** 点击翻页的请求 */
            TeaWikiModel.prototype.request_getPageData = function (teaVOArr, des) {
                if (des == "pre") {
                    HttpServiceProxy.request("getPageData", { "id": teaVOArr[0].pre, "label": teaVOArr[0].label, "direction": des }, this.getDataByRightOverFn, { "label": teaVOArr[0].label });
                }
                else {
                    HttpServiceProxy.request("getPageData", { "id": teaVOArr[0].next, "label": teaVOArr[0].label, "direction": des }, this.getDataByRightOverFn, { "label": teaVOArr[0].label });
                }
            };
            /**
             *  获取右侧列表信息
             */
            TeaWikiModel.prototype.getDataByLeftOverFn = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                var teasObj = receiveData["_d"];
                var teaObj;
                var teaWikiVO;
                var key;
                TeaWikiModel.instance.teaWikiVOArr.splice(0, TeaWikiModel.instance.teaWikiVOArr.length);
                for (key in teasObj) {
                    teaObj = teasObj[key];
                    teaWikiVO = new models.teaWiki.TeaWikiInfoVO();
                    teaWikiVO.id = teaObj["id"];
                    teaWikiVO.name = teaObj["title"];
                    teaWikiVO.label = takeData["label"];
                    TeaWikiModel.instance.teaWikiVOArr.push(teaWikiVO);
                }
                TeaWikiModel.instance.handleCallback(TeaWikiModel.instance.teaWikiVOArr);
            };
            /**
             * 1:获取详细信息
             * 2:翻页获取数据
             */
            TeaWikiModel.prototype.getDataByRightOverFn = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                TeaWikiModel.instance.teaVOArr.splice(0, TeaWikiModel.instance.teaVOArr.length);
                var teasObj = receiveData["page"];
                var teaWikiInfoVO;
                teaWikiInfoVO = new models.teaWiki.TeaWikiInfoVO();
                teaWikiInfoVO.id = teasObj["id"];
                teaWikiInfoVO.label = takeData["label"];
                teaWikiInfoVO.pre = teasObj["pre"];
                teaWikiInfoVO.next = teasObj["next"];
                teaWikiInfoVO.icon = teasObj["resource"];
                TeaWikiModel.instance.teaVOArr.push(teaWikiInfoVO);
                console.log(JSON.stringify(TeaWikiModel.instance.teaVOArr));
                TeaWikiModel.instance.handleCallback(TeaWikiModel.instance.teaVOArr);
            };
            TeaWikiModel.prototype.handleCallback = function (takeData) {
                if (TeaWikiModel.callback) {
                    if (takeData)
                        TeaWikiModel.callback(takeData);
                    else
                        TeaWikiModel.callback();
                }
            };
            return TeaWikiModel;
        }());
        teaWiki.TeaWikiModel = TeaWikiModel;
    })(teaWiki = models.teaWiki || (models.teaWiki = {}));
})(models || (models = {}));
//# sourceMappingURL=TeaWikiModel.js.map
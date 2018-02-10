var controllers;
(function (controllers) {
    var ranklist;
    (function (ranklist) {
        var RankListMode = models.ranklist.RankListMode;
        // import RankListView = views.ranklist.RankListView;
        /**
         * 排行榜的控制器
         * @author hsx
         */
        var RankListCtrl = /** @class */ (function () {
            function RankListCtrl() {
                if (!RankListCtrl.mode)
                    RankListCtrl.mode = new RankListMode();
                if (!RankListCtrl.view)
                    RankListCtrl.view = new views.ranklist.RankListView();
            }
            Object.defineProperty(RankListCtrl, "instance", {
                get: function () {
                    if (!RankListCtrl._instance)
                        RankListCtrl._instance = new RankListCtrl();
                    return RankListCtrl._instance;
                },
                enumerable: true,
                configurable: true
            });
            RankListCtrl.prototype.request_getGradeRank = function (para) {
                RankListMode.callback = this.getGradeRankOver;
                RankListCtrl.mode.request_getGradeRank(para);
            };
            RankListCtrl.prototype.getGradeRankOver = function (dataObj) {
                RankListCtrl.view.initUI(dataObj);
            };
            return RankListCtrl;
        }());
        ranklist.RankListCtrl = RankListCtrl;
    })(ranklist = controllers.ranklist || (controllers.ranklist = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=RankListCtrl.js.map
var models;
(function (models) {
    var activity;
    (function (activity) {
        /**
         * 活动相关数据模型
         */
        var ActivityModel = /** @class */ (function () {
            function ActivityModel() {
            }
            /**
             * 根据配置文件中的配置加载对应的信息，如活动图片对应的url
             */
            ActivityModel.prototype.loadActivityData = function () {
                // let activityUrl:string = HttpConfig.serverResUrl+"activity.json";
                if (!ResourceManager.activityObjArr)
                    return;
                if (ActivityModel.callback)
                    ActivityModel.callback(ResourceManager.activityObjArr);
            };
            return ActivityModel;
        }());
        activity.ActivityModel = ActivityModel;
    })(activity = models.activity || (models.activity = {}));
})(models || (models = {}));
//# sourceMappingURL=ActivityModel.js.map
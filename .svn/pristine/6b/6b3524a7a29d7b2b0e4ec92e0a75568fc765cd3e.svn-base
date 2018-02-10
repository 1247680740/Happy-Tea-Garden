var controllers;
(function (controllers) {
    var activity;
    (function (activity) {
        var ActivityModel = models.activity.ActivityModel;
        /**
         * 活动控制器
         */
        var ActivityTipCtrl = /** @class */ (function () {
            function ActivityTipCtrl() {
                if (!ActivityTipCtrl.model)
                    ActivityTipCtrl.model = new ActivityModel();
                if (!ActivityTipCtrl.view)
                    ActivityTipCtrl.view = new views.activity.ActivityTipView();
            }
            Object.defineProperty(ActivityTipCtrl, "instance", {
                get: function () {
                    if (!ActivityTipCtrl._instance)
                        ActivityTipCtrl._instance = new ActivityTipCtrl();
                    return ActivityTipCtrl._instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 获取活动数据
             */
            ActivityTipCtrl.prototype.getActivityData = function () {
                ActivityModel.callback = this.getDataOver;
                ActivityTipCtrl.model.loadActivityData();
            };
            ActivityTipCtrl.prototype.getDataOver = function (data) {
                ActivityTipCtrl.view.initUI(data);
            };
            return ActivityTipCtrl;
        }());
        activity.ActivityTipCtrl = ActivityTipCtrl;
    })(activity = controllers.activity || (controllers.activity = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=ActivityTipCtrl.js.map
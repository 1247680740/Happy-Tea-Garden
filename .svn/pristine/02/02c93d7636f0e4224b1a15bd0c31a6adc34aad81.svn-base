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
    var activity;
    (function (activity) {
        var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
        var Event = laya.events.Event;
        var Image = laya.ui.Image;
        var Panel = laya.ui.Panel;
        /**
         * 活动面板弹出框
         */
        var ActivityTipView = /** @class */ (function (_super) {
            __extends(ActivityTipView, _super);
            function ActivityTipView() {
                var _this = _super.call(this) || this;
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                _this.titleImg.skin = "gameUI/common/icon/activityName.png";
                _this.titleImg.x = _this.width - _this.titleImg.width >> 1;
                _this.contentSpr = new Panel();
                _this.contentSpr.pos(27, 90);
                _this.contentSpr.size(540, 280);
                _this.contentSpr.vScrollBarSkin = "comp/vscroll.png";
                _this.addChild(_this.contentSpr);
                _this.closeBtn.on(Event.CLICK, _this, _this.closeWin);
                _this.closeBtn.scale(1.3, 1.3);
                return _this;
            }
            /**
             * 加载活动数据，即分别将其下的Url对应的图片显示至界面
             */
            ActivityTipView.prototype.initUI = function (activityArr) {
                if (!activityArr || activityArr.length == 0)
                    return;
                var activityNum = activityArr.length;
                var i;
                var obj;
                for (i = 0; i < activityNum; i++) {
                    obj = activityArr[i];
                    var img = new Image();
                    img.name = obj["name"];
                    img.skin = HttpConfig.serverResUrl + obj["url"];
                    img.autoSize = true;
                    img.size(520, 280);
                    // if(img.width>this.contentSpr.width || img.height>this.contentSpr.height)
                    // 	img.size(this.contentSpr.width,this.contentSpr.height);
                    img.y = i * 245;
                    this.contentSpr.addChild(img);
                }
            };
            ActivityTipView.prototype.closeWin = function (event) {
                // this.close();
                this.removeSelf();
            };
            return ActivityTipView;
        }(BaseBorderUI));
        activity.ActivityTipView = ActivityTipView;
    })(activity = views.activity || (views.activity = {}));
})(views || (views = {}));
//# sourceMappingURL=ActivityTipView.js.map
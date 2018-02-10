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
    var base;
    (function (base) {
        var Sprite = laya.display.Sprite;
        var Event = laya.events.Event;
        /**
         * 视图基类，所有的视图需继承于其
         */
        var BaseView = /** @class */ (function (_super) {
            __extends(BaseView, _super);
            function BaseView() {
                var _this = _super.call(this) || this;
                // 注意：添加至父容器或向其内添加子对象，均会触发此事件！！！
                _this.on(Event.ADDED, _this, _this.init);
                _this.on(Event.REMOVED, _this, _this.dispose);
                return _this;
            }
            /**
             * 添加至显示列表时的初始化工作
             */
            BaseView.prototype.init = function (event) {
                // this.autoSize = true;
            };
            /**
             * 移除后的清理工作
             */
            BaseView.prototype.dispose = function (event) {
                console.log("dispose");
                this.off(Event.REMOVED, this, this.dispose);
                this.removeChildren(0, this.numChildren - 1);
                this.removeSelf();
            };
            return BaseView;
        }(Sprite));
        base.BaseView = BaseView;
    })(base = views.base || (views.base = {}));
})(views || (views = {}));
//# sourceMappingURL=BaseView.js.map
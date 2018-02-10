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
    var common;
    (function (common) {
        var Event = laya.events.Event;
        var ConfirmCancelTipUI = ui.gameUI.tips.ConfirmCancelTipUI;
        /**
         * 带有确定、取消按钮的提示框
         */
        var ConfirmCancelTipView = /** @class */ (function (_super) {
            __extends(ConfirmCancelTipView, _super);
            function ConfirmCancelTipView(takeData) {
                var _this = _super.call(this) || this;
                _this.takeData = takeData;
                _this.confirmBtn.on(Event.CLICK, _this, _this.confirmBtnFn);
                _this.cancelBtn.on(Event.CLICK, _this, _this.cancelBtnFn);
                _this.closeBtn.on(Event.CLICK, _this, _this.cancelBtnFn);
                return _this;
            }
            /*		static get instance():ConfirmCancelTipView
                    {
                        if(!ConfirmCancelTipView._instance)
                            ConfirmCancelTipView._instance = new ConfirmCancelTipView();
                        return ConfirmCancelTipView._instance;
                    }
            */
            /**
             * 执行确认后的操作
             */
            ConfirmCancelTipView.prototype.confirmBtnFn = function (event) {
                if (this.callback) {
                    if (this.takeData)
                        this.callback(this.takeData);
                    else
                        this.callback();
                }
                this.cancelBtnFn(null);
            };
            ConfirmCancelTipView.prototype.cancelBtnFn = function (event) {
                // this.removeSelf();
                this.visible = false;
            };
            return ConfirmCancelTipView;
        }(ConfirmCancelTipUI));
        common.ConfirmCancelTipView = ConfirmCancelTipView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=ConfirmCancelTipView.js.map
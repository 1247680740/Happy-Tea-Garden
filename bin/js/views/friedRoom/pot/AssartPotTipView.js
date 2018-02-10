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
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var Event = laya.events.Event;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var AssartPotTipUI = ui.gameUI.tips.AssartPotTipUI;
            /**
             * 激活炒锅的提示面板
             */
            var AssartPotTipView = /** @class */ (function (_super) {
                __extends(AssartPotTipView, _super);
                function AssartPotTipView() {
                    var _this = _super.call(this) || this;
                    _this.cacheAs = "bitmap";
                    ////////// =>
                    _this.bgUI = new BaseBorderUI();
                    _this.bgUI.bgImg.size(440, 345);
                    _this.bgUI.size(440, 345);
                    _this.bgUI.addChild(_this);
                    _this.y = 3;
                    // this.bgUI.titleImg.skin = "gameUI/common/icon/xxxName.png";
                    // this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
                    // this.bgUI.titleImg.y += 3;
                    _this.mouseThrough = true; // 解除closeBtn事件屏蔽
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (600 - 440) / 600;
                    var hRate = (400 - 345) / 400;
                    _this.bgUI.closeBtn.x -= _this.bgUI.closeBtn.x * wRate;
                    _this.bgUI.closeBtn.y -= _this.bgUI.closeBtn.y * hRate;
                    _this.bgUI.closeBtn.scale(1.5, 1.5);
                    _this.bgUI.closeBtn.on(Event.CLICK, _this, _this.cancelBtnClkFn);
                    ////////// <=
                    _this.open_btn.on(Event.CLICK, _this, _this.okBtnClkFn);
                    return _this;
                    // this.close_btn.on(Event.CLICK,this,this.cancelBtnClkFn);
                }
                Object.defineProperty(AssartPotTipView, "instance", {
                    get: function () {
                        if (!AssartPotTipView._instance)
                            AssartPotTipView._instance = new AssartPotTipView();
                        return AssartPotTipView._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                AssartPotTipView.prototype.okBtnClkFn = function () {
                    this.event(AssartPotTipView.ASSART_POT_EVENT);
                    // this.close();
                    this.cancelBtnClkFn();
                };
                AssartPotTipView.prototype.cancelBtnClkFn = function () {
                    // this.close();
                    // this.destroy(false);
                    this.bgUI.removeSelf();
                };
                /** 激活炒锅事件 */
                AssartPotTipView.ASSART_POT_EVENT = "assart_pot_event";
                return AssartPotTipView;
            }(AssartPotTipUI));
            pot.AssartPotTipView = AssartPotTipView;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=AssartPotTipView.js.map
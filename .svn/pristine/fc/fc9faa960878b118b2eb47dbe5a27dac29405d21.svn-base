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
        var Sprite = laya.display.Sprite;
        var Text = laya.display.Text;
        var Tween = laya.utils.Tween;
        var Ease = laya.utils.Ease;
        var Handler = laya.utils.Handler;
        /**
         * 自绘带有边框的信息提示框
         *
         * 说明：
         * 1、带有双色显示边框；
         * 2、根据内容的多少自动设置显示高度
         *
         * 示例：
         * var tip:views.common.DrawBgTip = views.common.DrawBgTip.instance;
         * tip.showTip("带有双色显示边框,根据内容的多少自动设置显示高度!");
         *
         */
        var DrawBgTip = /** @class */ (function (_super) {
            __extends(DrawBgTip, _super);
            function DrawBgTip() {
                var _this = _super.call(this) || this;
                _this.topColor = "#D9D6B0";
                _this.bottomColor = "#B08860";
                /** 总宽度 */
                _this.fixedW = 320;
                /** 文本宽度 */
                _this.textW = 300;
                /** 上层边框到下层边框的间距、文本到文本边框的间距 */
                _this.border = 10;
                _this.painter = new Sprite();
                _this.text = new Text();
                _this.painter.addChild(_this.text);
                _this.addChild(_this.painter);
                DrawBgTip.handler = Handler.create(_this, _this.tweenOverHandler, null, false);
                return _this;
            }
            Object.defineProperty(DrawBgTip, "instance", {
                get: function () {
                    if (!DrawBgTip._instance)
                        DrawBgTip._instance = new DrawBgTip();
                    return DrawBgTip._instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 带有双层背景的信息提示框，根据内容量自动改变高度
             */
            DrawBgTip.prototype.showTip = function (content, color) {
                if (color === void 0) { color = "#000000"; }
                if (!content || !content.length)
                    return;
                this.text.wordWrap = false;
                // this.text.width = this.fixedW - 2 * this.border;
                this.text.text = content;
                // 2017-09-15 hsx
                // this.text.textWidth = this.text.width - 2 * this.border;
                // this.text.textHeight = this.text.height - 2 * this.border;
                this.text.autoSize = true;
                this.text.bgColor = this.topColor;
                this.text.align = "center"; // "left"
                this.text.valign = "middle";
                this.text.color = color;
                this.text.leading = 5;
                this.text.padding = [5, 5, 0, 5];
                this.drawBg();
                this.alpha = 1;
                Tween.to(this, { alpha: 0 }, 500, Ease.sineOut, DrawBgTip.handler, 1000);
            };
            /**
             * 根据文本尺寸设置背景
             */
            DrawBgTip.prototype.drawBg = function () {
                this.painter.width = this.text.width + 2 * this.border;
                this.painter.height = this.text.height + 2 * this.border;
                this.text.pos(this.painter.width - this.text.width >> 1, this.painter.height - this.text.height >> 1);
                this.painter.graphics.clear();
                this.painter.graphics.drawRect(0, 0, this.painter.width, this.painter.height, this.bottomColor);
            };
            DrawBgTip.prototype.tweenOverHandler = function () {
                this.visible = false;
            };
            return DrawBgTip;
        }(Sprite));
        common.DrawBgTip = DrawBgTip;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=DrawBgTip.js.map
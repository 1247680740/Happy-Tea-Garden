var utils;
(function (utils) {
    var Tween = laya.utils.Tween;
    var Ease = laya.utils.Ease;
    var Handler = laya.utils.Handler;
    /**
     * 缓动动画相关工具
     */
    var TweenUtil = /** @class */ (function () {
        function TweenUtil() {
        }
        /** 缓动某个显示对象（如金币、经验、钻石等）至某状态 */
        TweenUtil.tweenTo = function (disObj, moveTo) {
            Laya.stage.addChild(disObj);
            disObj.name = "tweenObj";
            if (moveTo) {
                disObj.x = moveTo.x;
                disObj.y = moveTo.y;
            }
            else {
                disObj.x = Laya.stage.mouseX;
                disObj.y = Laya.stage.mouseY;
            }
            Tween.to(disObj, { x: 100, y: 20 }, 2000, Ease.bounceInOut, Handler.create(this, this.tweenOverHandler), 200);
        };
        /** 缓动瓢虫、镰刀至特定的坐标点 */
        TweenUtil.tweenToLandGrid = function (disObj, moveTo) {
            Laya.stage.addChild(disObj);
            disObj.name = "tweenObj";
            Tween.to(disObj, { x: moveTo.x, y: moveTo.y }, 2000, Ease.bounceInOut, Handler.create(this, this.tweenOverHandler), 200);
        };
        TweenUtil.tweenOverHandler = function () {
            Laya.stage.removeChildByName("tweenObj");
        };
        return TweenUtil;
    }());
    utils.TweenUtil = TweenUtil;
})(utils || (utils = {}));
//# sourceMappingURL=TweenUtil.js.map
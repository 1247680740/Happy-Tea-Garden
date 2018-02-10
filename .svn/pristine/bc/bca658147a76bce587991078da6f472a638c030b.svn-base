var utils;
(function (utils) {
    var Timer = laya.utils.Timer;
    /**
     * 炒茶倒计时工具
     */
    var PotTimerUtil = /** @class */ (function () {
        function PotTimerUtil() {
            /** 每秒钟（1000ms） */
            this.PER_SECOND = 1000;
            /** 每分钟（60000ms） */
            this.PER_MINUTE = 60000;
            /**
             * 还剩xx秒后开始以秒为间隔更新
             */
            this.startUpdateSec = 3;
            this.timerCallbackArr = new Array();
        }
        /**
         * 根据生长时间设置倒计时
         */
        PotTimerUtil.prototype.regTimer = function (growthTime) {
            this.growthTime = growthTime; // 后加
            console.log("== PotTimerUtil, regTimer, growthTime:" + this.growthTime);
            //触发器每分钟执行一次
            var delay = this.PER_MINUTE;
            //当剩余时间少于xx秒后，计时器变成秒数倒计时
            if (this.growthTime <= this.startUpdateSec) {
                delay = this.PER_SECOND;
            }
            //注册计时器
            if (this.timer == null) {
                this.timer = new Timer();
                // this.timer.delta = delay;
            }
            this.timer.loop(delay, this, this.onTimerComplete, [delay]);
        };
        /**
         * 增加一个计时器外部函数调用
         */
        PotTimerUtil.prototype.addTimerCallback = function (obj) {
            // {"callback":CropCtrl.instance.timerFn,"vo":PotVO}
            if (obj["callback"] != null) {
                var isHas = false;
                var i = 0;
                var len = this.timerCallbackArr.length;
                var curObj = void 0;
                for (i = 0; i < len; i++) {
                    curObj = this.timerCallbackArr[i];
                    if (obj["vo"]["id"] === curObj["vo"]["id"]) {
                        isHas = true;
                        return;
                    }
                }
                if (isHas == false)
                    this.timerCallbackArr.push(obj);
            }
        };
        /**
         * 移出一个计时器外部函数调用
         * @param obj: {"callback":CropCtrl.instance.timerFn,"vo":PotVO}
         */
        PotTimerUtil.prototype.removeTimerCallback = function (obj) {
            if (!obj["callback"])
                return;
            var len = this.timerCallbackArr.length;
            var i;
            for (i = 0; i < len; i++) {
                if (this.timerCallbackArr[i]["callback"] === obj["callback"]) {
                    this.timerCallbackArr[i] = null;
                    this.timerCallbackArr.splice(i, 1);
                    break;
                }
            }
        };
        /**
         * 每个时间间隔所调用的方法
         */
        PotTimerUtil.prototype.onTimerComplete = function (delay) {
            if (delay == this.PER_SECOND) {
                this.growthTime--;
            }
            else if (delay == this.PER_MINUTE) {
                this.growthTime -= 60;
            }
            console.log("== PotTimerUtil, growthTime:" + this.growthTime);
            //外部注册的回调函数
            this.callBindTimerFn();
            //当时间满足升级条件，则升级到下个阶段
            if (this.growthTime <= 0) {
                this.timer.clear(this, this.onTimerComplete);
                if (PotTimerUtil.callback)
                    PotTimerUtil.callback();
                // if(this.initCropPara["landId"] && this.initCropPara["seedId"])
                // {
                // 	models.teaRoom.crop.CropModel.getInstance().request_initCrop(this.initCropPara["landId"],this.initCropPara["seedId"]);
                // }
            }
            else if (this.growthTime <= this.startUpdateSec) {
                this.regTimer(this.growthTime);
            }
        };
        /**
         * 调用外部绑定的函数
         * @example timerUtil.addTimerCallback({"callback":CropCtrl.instance.timerFn,"vo":PotVO});
         */
        PotTimerUtil.prototype.callBindTimerFn = function () {
            var obj;
            var tempFn;
            for (var _i = 0, _a = this.timerCallbackArr; _i < _a.length; _i++) {
                obj = _a[_i];
                // tempFun.call(null,[this]);
                tempFn = obj["callback"];
                tempFn(obj["vo"], this.growthTime);
                // tempFn.call(obj["vo"]);
            }
        };
        return PotTimerUtil;
    }());
    utils.PotTimerUtil = PotTimerUtil;
})(utils || (utils = {}));
//# sourceMappingURL=PotTimerUtil.js.map
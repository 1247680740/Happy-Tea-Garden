var utils;
(function (utils) {
    var Timer = laya.utils.Timer;
    // import CropModel = models.teaRoom.crop.CropModel;
    /**
     * 计时器工具
     * 如：倒计时
     */
    var TimerUtil = /** @class */ (function () {
        function TimerUtil() {
            /** 每秒钟（1000ms） */
            this.PER_SECOND = 1000;
            /** 每分钟（60000ms） */
            this.PER_MINUTE = 60000;
            this.timerCallbackArr = new Array();
        }
        /**
         * 根据生长时间设置倒计时
         */
        TimerUtil.prototype.regTimer = function (growthTime) {
            this.growthTime = growthTime; // 后加
            //触发器每分钟执行一次
            var delay = this.PER_MINUTE;
            //当剩余时间少于120秒后，计时器变成秒数倒计时
            if (this.growthTime <= 120) {
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
        TimerUtil.prototype.addTimerCallback = function (obj) {
            // {"callback":CropCtrl.instance.timerFn,"cropVO":cropVO}
            // 同一个地块上的作物只能有一个计时器
            if (obj["callback"] != null) {
                var isHas = false;
                var i = 0;
                var len = this.timerCallbackArr.length;
                var curObj = void 0;
                for (i = 0; i < len; i++) {
                    curObj = this.timerCallbackArr[i];
                    if (obj["cropVO"]["landId"] === curObj["cropVO"]["landId"]) {
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
         * @param obj: {"callback":CropCtrl.instance.timerFn,"cropVO":cropVO}
         */
        TimerUtil.prototype.removeTimerCallback = function (obj) {
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
        TimerUtil.prototype.onTimerComplete = function (delay) {
            // else if(event.type == Event.START)
            // else if(event.type == Event.END)
            if (delay == this.PER_SECOND) {
                this.growthTime--;
            }
            else if (delay == this.PER_MINUTE) {
                this.growthTime -= 60;
            }
            //外部注册的回调函数
            this.callBindTimerFn();
            //当时间满足升级条件，则升级到下个阶段
            if (this.growthTime <= 0) {
                this.timer.clear(this, this.onTimerComplete);
                // this.timer.clearAll(this);	// 待确认可用性！
                console.log("== growthTime <= 0，需升级至下阶段！");
                if (this.initCropPara["landId"] && this.initCropPara["seedId"]) {
                    models.teaRoom.crop.CropModel.getInstance().request_initCrop(this.initCropPara["landId"], this.initCropPara["seedId"]);
                }
            }
            else if (this.growthTime <= 120) {
                this.regTimer(this.growthTime);
            }
        };
        /**
         * 调用外部绑定的函数
         */
        TimerUtil.prototype.callBindTimerFn = function () {
            var obj;
            var tempFn;
            for (var _i = 0, _a = this.timerCallbackArr; _i < _a.length; _i++) {
                obj = _a[_i];
                // tempFun.call(null,[this]);
                tempFn = obj["callback"];
                tempFn(obj["cropVO"], this.growthTime);
                // tempFn.call(obj["cropVO"]);
            }
        };
        return TimerUtil;
    }());
    utils.TimerUtil = TimerUtil;
})(utils || (utils = {}));
//# sourceMappingURL=TimerUtil.js.map
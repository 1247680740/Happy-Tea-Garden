var utils;
(function (utils) {
    /**
     * 一般工具类
     * @author hsx
     */
    var CommonUtil = /** @class */ (function () {
        function CommonUtil() {
        }
        /**
         * 根据秒数换算成各个时间计量,格式：x天x时x分
         * @param sec 秒数
         * @return string x天x时x分
         */
        CommonUtil.parseSecToDayHourMin = function (sec, isShowSecond) {
            if (isShowSecond === void 0) { isShowSecond = false; }
            if (sec <= 0)
                return "0";
            var day = 0;
            var hour = 0;
            var minute = 0;
            var second = 0;
            var timeStr = "";
            if (sec >= 86400) {
                day = parseInt(sec / 86400 + "");
                timeStr += (day + "天");
            }
            if (sec % 86400 >= 3600) {
                hour = parseInt(sec % 86400 / 3600 + "");
                timeStr += (hour + "时");
            }
            if (sec % 3600 >= 60) {
                minute = parseInt(sec % 3600 / 60 + "");
                timeStr += (minute + "分");
            }
            second = sec % 60;
            if (second) {
                if (isShowSecond)
                    timeStr += (second + "秒");
            }
            return timeStr;
        };
        return CommonUtil;
    }());
    utils.CommonUtil = CommonUtil;
})(utils || (utils = {}));
//# sourceMappingURL=CommonUtil.js.map
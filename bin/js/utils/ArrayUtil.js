var utils;
(function (utils) {
    /**
     * 数组操作相关工具
     */
    var ArrayUtil = /** @class */ (function () {
        function ArrayUtil() {
        }
        /**
         * 根据某属性排序某类型的数组
         * @ a：排序类型元素
         * @ b：排序类型元素
         * @ p：排序依据
         */
        ArrayUtil.sortArrByProperty = function (a, b, p) {
            if (a.hasOwnProperty(p) && b.hasOwnProperty(p)) {
                if (a.p > b.p)
                    return 1;
                else if (a.p < b.p)
                    return -1;
                else
                    return 0;
            }
        };
        return ArrayUtil;
    }());
    utils.ArrayUtil = ArrayUtil;
})(utils || (utils = {}));
//# sourceMappingURL=ArrayUtil.js.map
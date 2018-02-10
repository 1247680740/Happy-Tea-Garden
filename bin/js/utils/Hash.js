var utils;
(function (utils) {
    var Hash = /** @class */ (function () {
        function Hash() {
        }
        /**
         * 从数组中随机选取一项
         * @param paramArray
         * @return
         */
        Hash.selectItemFromArray = function (paramArray) {
            var nums = paramArray.length;
            var index = parseInt(Math.random() * nums + "");
            return paramArray[index];
        };
        /**
         * 随机变换数字
         * @param bitAmount 位数总计
         * @return
         */
        Hash.alterationNum = function (bitAmount) {
            var random = Math.random();
            if (random == 0) {
                Hash.alterationNum(bitAmount);
                return;
            }
            var minNum = '1';
            for (var i = 0; i < bitAmount; i++) {
                minNum += '0';
            }
            return random * parseInt(minNum);
        };
        /**
         * 生成校验密钥串
         * @param content 要加密的串数据
         */
        Hash.createPrivateKey = function (content, key) {
            if (key === void 0) { key = ''; }
            if (key === "") {
                key = "bobo";
            }
            var result = 0;
            var keyCode = 0;
            var i;
            for (i = 0; i < key.length; i++) {
                keyCode += key.charCodeAt(i);
            }
            for (i = 0; i < content.length; i++) {
                result += content.charCodeAt(i) ^ keyCode;
            }
            return result;
        };
        /**
         * 生成一个随机数字
         * @param 数字的位数
         * @return
         */
        Hash.createRandomNumber = function (digit) {
            return parseInt(Math.random() * Math.pow(10, parseInt(digit)) + "");
        };
        return Hash;
    }());
    utils.Hash = Hash;
})(utils || (utils = {}));
//# sourceMappingURL=Hash.js.map
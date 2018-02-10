var models;
(function (models) {
    var base;
    (function (base) {
        /** 作物数据 */
        var CropVO = /** @class */ (function () {
            /**
             *
             * 原 CropModel 的构造函数中的写法
             * @param uniqueId 	作物编号
             * @param landId 	作物种植的土地编号
             * @param deBuff 	作物的不好状态
             * @param initData 	初始化数据
             */
            function CropVO() {
                /** 作物状态（质量） 0:优秀，1:良好，2:濒临死亡 */
                this.status = 0;
                /** 是否可偷取 */
                this.isSteal = false;
                /** 是否死亡 */
                this.isDeath = false;
                /** 不好的状态： worm虫子，grass杂草，dry干旱 （未用） */
                this.debuff = {};
                /** 作物说话 */
                this.talkArray = [];
                /** 计时器回调函数 */
                this.timerCallbackArray = [];
            }
            Object.defineProperty(CropVO.prototype, "isHasDebuff", {
                /**
                 * 是否有不良状态存在
                 */
                get: function () {
                    if (this.worm)
                        return true;
                    if (this.grass)
                        return true;
                    if (this.dry)
                        return true;
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CropVO.prototype, "statusTxt", {
                /** 状态（质量） */
                get: function () {
                    var statusTxt;
                    if (this.status == 0)
                        statusTxt = "优秀";
                    else if (this.status == 1)
                        statusTxt = "良好";
                    else if (this.status == 1)
                        statusTxt = "濒临死亡";
                    return statusTxt;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CropVO.prototype, "growthStateTxt", {
                /** 生长状态（阶段） */
                get: function () {
                    var stateTxt;
                    switch (this.growthStatus) {
                        case -1:
                            stateTxt = "死亡";
                            break;
                        case 0:
                            stateTxt = "种子";
                            break;
                        case 1:
                            stateTxt = "幼苗期";
                            break;
                        case 2:
                            stateTxt = "生长";
                            break;
                        case 3:
                            stateTxt = "茂盛";
                            break;
                    }
                    return stateTxt;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CropVO.prototype, "growthRate", {
                /**
                 * 作物的生长率
                 */
                get: function () {
                    var rate;
                    if (this.totalGrowthTime > 0) {
                        rate = (this.totalGrowthTime - this.growthTime) / this.totalGrowthTime;
                    }
                    else {
                        rate = 0;
                        // throw Error("The crop's totalGrowthTime is 0");
                    }
                    return rate;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 根据秒数换算成各个时间计量,包括天，小时，分钟，秒
             * @param sec:uint 秒数
             */
            CropVO.prototype.growthTimeTxt = function (isShowSecond) {
                if (isShowSecond === void 0) { isShowSecond = false; }
                return utils.CommonUtil.parseSecToDayHourMin(this.growthTime, isShowSecond);
            };
            CropVO.CLEAR_DEBUFF = 'clear_debuff';
            return CropVO;
        }());
        base.CropVO = CropVO;
    })(base = models.base || (models.base = {}));
})(models || (models = {}));
//# sourceMappingURL=CropVO.js.map
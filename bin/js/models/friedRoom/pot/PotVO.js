var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            /**
             * 注意：models.base.PotVO 中也被复制了一份 PotVO
             */
            var PotVO = /** @class */ (function () {
                /**
                 * 构造函数
                 * @param uniqueId 编号
                 * @param status 状态
                 * @param level 等级
                 * @param needMoney 升级所需金钱
                 * @param lockMoney 升级缺少金钱
                 * @param toolId 升级所需材料ID
                 * @param toolNums 升级所需材料数量
                 * @param lockToolNums 升级缺少材料数量
                 */
                function PotVO(uniqueId, level, status, needMoney, lockMoney, toolId, toolNums, lockToolNums) {
                    if (level === void 0) { level = 0; }
                    if (status === void 0) { status = 0; }
                    if (needMoney === void 0) { needMoney = 0; }
                    if (lockMoney === void 0) { lockMoney = 0; }
                    if (toolId === void 0) { toolId = 0; }
                    if (toolNums === void 0) { toolNums = 0; }
                    if (lockToolNums === void 0) { lockToolNums = 0; }
                    this.nameArr = ["生铁锅", "铜锅", "黄金锅", "玄铁锅", "寒铁锅", "精钢锅", "耀光锅"];
                    this.posArr = ["金位", "木位", "水位", "火位", "土位", "道位"];
                    /**
                     * 炒茶数量，默认1份
                     */
                    this.friedTeaNums = 1;
                    this._id = uniqueId;
                    this._level = level;
                    this._status = status;
                    this._needMoney = needMoney;
                    this._lockMoney = lockMoney;
                    this._toolId = toolId;
                    this._toolNums = toolNums;
                    this._lockToolNums = lockToolNums;
                }
                Object.defineProperty(PotVO.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "level", {
                    /** 炒锅等级, 0：未开启 1: 生铁锅 2：铜炒锅，3:黄金锅，4：玄铁锅，5：寒铁锅 6：精钢锅  7：耀光锅 */
                    get: function () {
                        return this._level;
                    },
                    set: function (lvl) {
                        this._level = lvl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "status", {
                    /** 炒锅的状态,0:未使用（闲着）,1:炒制中，2:炒制完毕*/
                    get: function () {
                        return this._status;
                    },
                    set: function (s) {
                        this._status = s;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "needMoney", {
                    /** 升级所需的钱数 */
                    get: function () {
                        return this._needMoney;
                    },
                    set: function (m) {
                        this._needMoney = m;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "lockMoney", {
                    /** 升级所缺的钱数 */
                    get: function () {
                        return this._lockMoney;
                    },
                    set: function (m) {
                        this._lockMoney = m;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "toolId", {
                    /** 升级所需材料ID */
                    get: function () {
                        return this.toolId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "toolNums", {
                    get: function () {
                        return this.toolNums;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "lockToolNums", {
                    /** 升级缺少的材料数 */
                    get: function () {
                        return this.lockToolNums;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PotVO.prototype, "leftTime", {
                    /**
                     * 炒茶剩余时间（分钟）
                     */
                    get: function () {
                        if (!this.friedTeaRemainTime)
                            this.friedTeaRemainTime = 0;
                        var m = Math.floor(this.friedTeaRemainTime / 60);
                        var s = this.friedTeaRemainTime % 60;
                        if (s > 0)
                            m = m + 1;
                        console.log("== PotVO, m:" + m + ", s:" + this.friedTeaRemainTime);
                        return m;
                    },
                    enumerable: true,
                    configurable: true
                });
                PotVO.CURRENT_LIGHT_POT = "current_light_pot";
                PotVO.CURRENT_LOW_POT = "current_low_pot";
                return PotVO;
            }());
            pot.PotVO = PotVO;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=PotVO.js.map
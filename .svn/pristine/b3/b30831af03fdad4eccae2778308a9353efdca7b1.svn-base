var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        var LandVO = /** @class */ (function () {
            /**
             * 构造函数
             * @param uniqueId 编号
             * @param status 状态
             * @param level 等级
             */
            function LandVO(uniqueId, status, level) {
                if (status === void 0) { status = 0; }
                if (level === void 0) { level = 0; }
                this._id = uniqueId;
                this._level = level;
                this._status = status;
            }
            Object.defineProperty(LandVO.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LandVO.prototype, "level", {
                /** 土地等级, 0：普通土地，1：红土地， 2：黑土地，3：金土地（后加，素材待加入！）*/
                get: function () {
                    return this._level;
                },
                set: function (lvl) {
                    this._level = lvl;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LandVO.prototype, "status", {
                /** 土地的状态,0:未开垦,1:正常,2:干旱*/
                get: function () {
                    return this._status;
                },
                set: function (s) {
                    this._status = s;
                },
                enumerable: true,
                configurable: true
            });
            LandVO.CURRENT_LIGHT_LAND = "current_light_land";
            LandVO.CURRENT_LOW_LAND = "current_low_land";
            return LandVO;
        }());
        teaRoom.LandVO = LandVO;
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=LandVO.js.map
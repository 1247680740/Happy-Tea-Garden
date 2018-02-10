var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var bag;
        (function (bag) {
            // import ToolVO = models.base.ToolVO;
            /**
             * 炒锅背包相关数据
             */
            var FireTeaBagModel = /** @class */ (function () {
                function FireTeaBagModel() {
                    this.toolVOArr = new Array();
                }
                FireTeaBagModel.getInstance = function () {
                    if (!FireTeaBagModel.instance)
                        FireTeaBagModel.instance = new FireTeaBagModel();
                    return FireTeaBagModel.instance;
                };
                /**
                 * 请求背包道具数据
                 */
                FireTeaBagModel.prototype.request_getBag = function () {
                    HttpServiceProxy.request("getBag", null, this.getBagOverFn);
                };
                FireTeaBagModel.prototype.getBagOverFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    FireTeaBagModel.instance.toolVOArr.splice(0, FireTeaBagModel.instance.toolVOArr.length);
                    var dataObj = receiveData["_d"];
                    var key;
                    var toolVO;
                    for (key in dataObj) {
                        toolVO = new models.base.ToolVO();
                        toolVO.id = parseInt(key);
                        toolVO.nums = dataObj[key];
                        toolVO.lvl = 0;
                        toolVO.icon = HttpConfig.serverResUrl + "shop/" + "fire_" + key + ".png";
                        FireTeaBagModel.instance.toolVOArr.push(toolVO);
                    }
                    if (FireTeaBagModel.callback)
                        FireTeaBagModel.callback();
                };
                return FireTeaBagModel;
            }());
            bag.FireTeaBagModel = FireTeaBagModel;
        })(bag = friedRoom.bag || (friedRoom.bag = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=FireTeaBagModel.js.map
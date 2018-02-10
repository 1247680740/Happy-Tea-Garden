var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        var storage;
        (function (storage) {
            // import SeedVO = models.base.SeedVO;
            // import ToolVO = models.base.ToolVO;
            // import PlayerInfoModel = models.player.PlayerInfoModel;
            /**
             * 仓库相关数据模型
             */
            var StorageModel = /** @class */ (function () {
                function StorageModel() {
                    this.seedVOArr = new Array();
                    this.toolVOArr = new Array();
                }
                StorageModel.getInstance = function () {
                    if (!StorageModel.instance)
                        StorageModel.instance = new StorageModel();
                    return StorageModel.instance;
                };
                /**
                 * 获取种子数据
                 */
                StorageModel.prototype.request_getSeed = function () {
                    HttpServiceProxy.request("getSeed", null, this.getSeedOverFn);
                };
                /**
                 * 获取首个种子的描述信息（点击其它种子时数据的请求方式待看！）
                 */
                StorageModel.prototype.request_getDepotRightContentData = function (paraObj) {
                    if (paraObj) {
                        HttpServiceProxy.request("getDepotRightContentData", paraObj, this.getFirstSeedContentFn, paraObj);
                    }
                    else {
                        HttpServiceProxy.request("getDepotRightContentData", this.firstObj, this.getFirstSeedContentFn, this.firstObj);
                    }
                };
                /**
                 * 获取道具数据
                 */
                StorageModel.prototype.request_getProp = function () {
                    HttpServiceProxy.request("getProp", null, this.getToolOverFn);
                };
                /**
                 * 获取果实数据（仓库、商店的通用接口）
                 */
                StorageModel.prototype.request_getFruit = function () {
                    HttpServiceProxy.request("getFruit", null, this.getFruitOverFn);
                };
                StorageModel.prototype.request_getDecorate = function () {
                    HttpServiceProxy.request("getDecorate", null, this.getDecorateOverFn);
                };
                /**
                 * 卖出
                 * paraObj: {"si": id,"st": 类型,"sct": 卖出数量}
                 */
                StorageModel.prototype.request_sellSingle = function (paraObj) {
                    HttpServiceProxy.request("sellSingle", { "si": paraObj["si"], "st": paraObj["st"], "sct": paraObj["sct"] }, this.sellSingleOverFn);
                };
                StorageModel.prototype.sellSingleOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    StorageModel.receiveData = receiveData;
                    var takeData = {};
                    // 卖出失败
                    if (receiveData["_cmsg"] && receiveData["_cmsg"].length > 2) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        if (receiveData["_e"] > 0) {
                            takeData["exp"] = receiveData["_e"];
                        }
                        if (receiveData["_g"] > 0) {
                            takeData["money"] = receiveData["_g"];
                        }
                        controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    }
                    StorageModel.instance.handleCallback(takeData);
                };
                StorageModel.prototype.getFruitOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    // [[11,556],[17,603]...] // [作物id,数量]
                    var fruitsArr = receiveData["_d"];
                    var fruitLen = fruitsArr.length;
                    var fruitArr;
                    var seedVO;
                    var i, j;
                    StorageModel.instance.seedVOArr.splice(0, StorageModel.instance.seedVOArr.length);
                    for (i = 0; i < fruitLen; i++) {
                        // 没有返回等级数据，但仓库中有等级显示？！
                        fruitArr = fruitsArr[i];
                        seedVO = new models.base.SeedVO();
                        seedVO.id = fruitArr[0];
                        seedVO.fruitNums = fruitArr[1];
                        StorageModel.instance.seedVOArr.push(seedVO);
                    }
                    // 右侧信息不是请求的接口，是读的配置表！
                    /*			if(StorageModel.instance.seedVOArr.length > 0)
                                {
                                    StorageModel.instance.seedVOArr.sort(StorageModel.instance.sortFn);
                                    StorageModel.instance.firstObj = {"si":StorageModel.instance.seedVOArr[0]["id"],"st":StorageModel.instance.seedVOArr[0]["type"]};
                                    StorageModel.instance.request_getDepotRightContentData();
                                    // StorageModel.instance.handleCallback();
                                }
                    */
                    console.log("getFruitOver");
                    StorageModel.instance.handleCallback();
                };
                StorageModel.prototype.getSeedOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    // {0:{l:1,p:39,sc:"1",si:11,sn:"普通绿茶种子",simg:"http://... fruit_11.swf",ty:teaseed}, 1:{...} }
                    var seedsObj = receiveData["_d"];
                    if (!seedsObj)
                        return;
                    var seedObj;
                    var seedVO;
                    var key;
                    StorageModel.instance.seedVOArr.splice(0, StorageModel.instance.seedVOArr.length);
                    // for(seedObj of seedsObj)	// "of" is wrong
                    for (key in seedsObj) {
                        // console.log("object's key is: "+key);
                        seedObj = seedsObj[key];
                        // 排除 seedObj 上层对象中的属性
                        if (seedObj.hasOwnProperty("si")) {
                            seedVO = new models.base.SeedVO();
                            seedVO.id = seedObj["si"];
                            seedVO.name = seedObj["sn"];
                            seedVO.lvl = seedObj["l"];
                            seedVO.seedNums = parseInt(seedObj["sc"]);
                            seedVO.fruitSalePrice = seedObj["p"];
                            seedVO.icon = seedObj["simg"];
                            seedVO.type = seedObj["ty"];
                            StorageModel.instance.seedVOArr.push(seedVO);
                        }
                    }
                    if (StorageModel.instance.seedVOArr.length > 0) {
                        StorageModel.instance.seedVOArr.sort(StorageModel.instance.sortFn);
                        StorageModel.instance.firstObj = { "si": StorageModel.instance.seedVOArr[0]["id"], "st": StorageModel.instance.seedVOArr[0]["type"] };
                        StorageModel.instance.request_getDepotRightContentData();
                        // StorageModel.instance.handleCallback();
                    }
                };
                StorageModel.prototype.getDecorateOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    var allObjs = receiveData["_d"];
                    var obj;
                    var objsArr = new Array();
                    for (obj in allObjs) {
                        objsArr.push(allObjs[obj]);
                    }
                    StorageModel.instance.handleCallback(objsArr);
                };
                /**
                 * 按种子等级排序
                 */
                StorageModel.prototype.sortFn = function (a, b) {
                    if (a.lvl > b.lvl)
                        return 1;
                    else if (a.lvl < b.lvl)
                        return -1;
                    else
                        return 0;
                };
                /**
                 * 将首个种子的描述信息加入对应的作物数据中（在作为种子、道具等的统一处理入口……）
                 */
                StorageModel.prototype.getFirstSeedContentFn = function (receiveData, obj) {
                    if (!receiveData || !obj)
                        return;
                    var len;
                    var i;
                    // 种子	// 数字种子：numberseed
                    // if(obj["st"] == "teaseed")
                    if (obj["st"].indexOf("seed") > 0) {
                        len = StorageModel.instance.seedVOArr.length;
                        var seedVO = void 0;
                        for (i = 0; i < len; i++) {
                            seedVO = StorageModel.instance.seedVOArr[i];
                            if (seedVO.id == obj["si"]) {
                                seedVO.seedFruitDes = receiveData["d"];
                                StorageModel.curSelectedObjVO = seedVO;
                                // StorageModel.curSelectedObjVO = {"type":obj["st"],"vo":seedVO};
                                break;
                            }
                        }
                    } // 道具
                    else if (obj["st"] == "prop") {
                        len = StorageModel.instance.toolVOArr.length;
                        var toolVO = void 0;
                        for (i = 0; i < len; i++) {
                            toolVO = StorageModel.instance.toolVOArr[i];
                            if (toolVO.id == obj["si"]) {
                                toolVO.des = receiveData["d"];
                                StorageModel.curSelectedObjVO = toolVO;
                                break;
                            }
                        }
                    }
                    StorageModel.instance.handleCallback();
                };
                StorageModel.prototype.getToolOverFn = function (receiveData) {
                    // data: {0:{l:1,p:0,tc:"3",ti:1,timg:"http://.../shop/prop_1.swf",tn:"普通有机肥",ty:"prop"}}
                    if (!receiveData)
                        return;
                    var toolsObj = receiveData["_d"];
                    var toolObj;
                    var toolVO;
                    var key;
                    StorageModel.instance.toolVOArr.splice(0, StorageModel.instance.toolVOArr.length);
                    for (key in toolsObj) {
                        toolObj = toolsObj[key];
                        if (toolObj.hasOwnProperty("ti")) {
                            toolVO = new models.base.ToolVO();
                            toolVO.id = toolObj["ti"];
                            toolVO.name = toolObj["tn"];
                            toolVO.lvl = toolObj["l"];
                            toolVO.nums = parseInt(toolObj["tc"]);
                            toolVO.price = toolObj["p"];
                            toolVO.icon = toolObj["timg"];
                            toolVO.type = toolObj["ty"];
                            StorageModel.instance.toolVOArr.push(toolVO);
                        }
                    }
                    if (StorageModel.instance.toolVOArr.length > 0) {
                        StorageModel.instance.toolVOArr.sort(StorageModel.instance.sortFn2);
                        StorageModel.instance.firstObj = { "si": StorageModel.instance.toolVOArr[0]["id"], "st": StorageModel.instance.toolVOArr[0]["type"] };
                        StorageModel.instance.request_getDepotRightContentData();
                        // StorageModel.instance.handleCallback();
                    }
                    // StorageModel.instance.handleCallback();
                };
                /**
                 * 按道具等级排序
                 */
                StorageModel.prototype.sortFn2 = function (a, b) {
                    if (a.lvl > b.lvl)
                        return 1;
                    else if (a.lvl < b.lvl)
                        return -1;
                    else
                        return 0;
                };
                StorageModel.prototype.handleCallback = function (takeData) {
                    if (StorageModel.callback) {
                        if (takeData)
                            StorageModel.callback(takeData);
                        else
                            StorageModel.callback();
                    }
                };
                /** 当前选中的对象所对应的 VO 数据，格式：{"type", "vo" } */
                StorageModel.curSelectedObjVO = {};
                return StorageModel;
            }());
            storage.StorageModel = StorageModel;
        })(storage = teaRoom.storage || (teaRoom.storage = {}));
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=StorageModel.js.map
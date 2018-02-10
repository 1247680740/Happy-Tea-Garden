var managers;
(function (managers) {
    // import ResLoader = commons.resLoad.ResLoader;
    /**
     * ResLoader 的资源管理器
     * @example
     *   // IMAGE
     *   let imgTexture: laya.resource.Texture = ResLoader.getDataByFileName("testJPG.jpg");
     *   let s: Sprite = new Sprite();
     *   s.graphics.drawTexture(imgTexture);
     *   s.pos(0, Laya.stage.height / 5);
     *   Laya.stage.addChild(s);
     *
     *   // JSON
     *   let testJson: JSON = ResLoader.getDataByFileName("testSWF.json");
     *   console.log("== Json ele:" + testJson["frames"]["7.png"]["frame"]["h"]);
     */
    var ResourceManager = /** @class */ (function () {
        function ResourceManager(interCls) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("ResourceManager is singleton, not allow to use constructor!");
            // ResourceManager.seedsObjArr = new Array<Object>();
        }
        Object.defineProperty(ResourceManager, "instance", {
            get: function () {
                if (ResourceManager._instance === undefined)
                    ResourceManager._instance = new ResourceManager(new InternalClass());
                return ResourceManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        /** 主要用于加载服务器端静态数据 */
        ResourceManager.prototype.loadRes = function (fileUrlArr) {
            ResLoader.eventDispatcher.once(Laya.Event.COMPLETE, this, this.resLoaderComplete);
            ResLoader.eventDispatcher.once(Laya.Event.PROGRESS, this, this.loadProgress);
            ResLoader.loadRes(fileUrlArr);
        };
        ResourceManager.prototype.resLoaderComplete = function (msg) {
            // 种子
            var seedsJson = ResLoader.getDataByFileName("seeds.json"); // XMLDocument  // JSON
            ResourceManager.instance.parseSeedsJson(seedsJson);
            // 道具
            var toolsJson = ResLoader.getDataByFileName("tools.json");
            ResourceManager.instance.parseToolsJson(toolsJson);
            // 活动
            var activityJson = ResLoader.getDataByFileName("activity.json");
            ResourceManager.activityObjArr = activityJson["lists"];
            // 茶叶
            var tealeafJson = ResLoader.getDataByFileName("tealeaf.json");
            ResourceManager.tealeafObjArr = tealeafJson["tealeaf"]["list"]["item"];
            // 奖励
            var prizeJson = ResLoader.getDataByFileName("prize.json");
            ResourceManager.prizeObjArr = prizeJson["prize"]["list"]["item"];
            // others
            if (ResourceManager.callback)
                ResourceManager.callback(ResourceManager.seedsObjArr);
        };
        /**
         * 加载进度
         */
        ResourceManager.prototype.loadProgress = function (event) {
        };
        /**
         * 解析 seeds.json
         */
        ResourceManager.prototype.parseSeedsJson = function (jsonObj) {
            try {
                ResourceManager.seedsObjArr = jsonObj["seeds"]["item"];
            }
            catch (e) {
                console.log("seeds.json, " + e.message);
                return;
            }
            // if(ResourceManager.callback)
            //     ResourceManager.callback(ResourceManager.seedsObjArr);
        };
        /**
         * 解析 tools.json
         */
        ResourceManager.prototype.parseToolsJson = function (jsonObj) {
            try {
                // 类型项：jsonObj["tools"]["categories"]["item"]
                // 具体项：jsonObj["tools"]["list"]["item"]
                ResourceManager.toolsObjArr = jsonObj["tools"]["list"]["item"];
            }
            catch (e) {
                console.log("tools.json, " + e.message);
                return;
            }
        };
        // static resLoader:ResLoader;
        /** 存放解析后的 seeds.json 对应的数据 */
        ResourceManager.seedsObjArr = new Array();
        /** 存放解析后的 tools.json 对应的数据 */
        ResourceManager.toolsObjArr = new Array();
        /** 存放解析后的 activity.json 对应的数据 */
        ResourceManager.activityObjArr = new Array();
        /** 存放解析后的 tealeaf.json 对应的数据 */
        ResourceManager.tealeafObjArr = new Array();
        /** 存放解析后的 prize.json 对应的数据 */
        ResourceManager.prizeObjArr = new Array();
        ResourceManager._instance = undefined;
        return ResourceManager;
    }());
    managers.ResourceManager = ResourceManager;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(managers || (managers = {}));
//# sourceMappingURL=ResourceManager.js.map
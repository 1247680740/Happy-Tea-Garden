namespace managers
{
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
    export class ResourceManager
    {
        // static resLoader:ResLoader;

        /** 存放解析后的 seeds.json 对应的数据 */
        static seedsObjArr:Array<Object> = new Array<Object>();
        /** 存放解析后的 tools.json 对应的数据 */
        static toolsObjArr:Array<Object> = new Array<Object>();
        /** 存放解析后的 activity.json 对应的数据 */
        static activityObjArr:Array<Object> = new Array<Object>();
        /** 存放解析后的 tealeaf.json 对应的数据 */
        static tealeafObjArr:Array<Object> = new Array<Object>();
        /** 存放解析后的 prize.json 对应的数据 */
        static prizeObjArr:Array<Object> = new Array<Object>();

        static callback:Function;

        private static _instance: ResourceManager = undefined;

        constructor(interCls: InternalClass)
        {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("ResourceManager is singleton, not allow to use constructor!");

            // ResourceManager.seedsObjArr = new Array<Object>();
        }

        static get instance(): ResourceManager
        {
            if (ResourceManager._instance === undefined)
                ResourceManager._instance = new ResourceManager(new InternalClass());
            return ResourceManager._instance;
        }

        /** 主要用于加载服务器端静态数据 */
        loadRes(fileUrlArr:Array<string>): void
        {
            ResLoader.eventDispatcher.once(Laya.Event.COMPLETE, this, this.resLoaderComplete);
            ResLoader.eventDispatcher.once(Laya.Event.PROGRESS, this, this.loadProgress);
            ResLoader.loadRes(fileUrlArr);
        }

        private resLoaderComplete(msg: any): void
        {
            // 种子
            let seedsJson: any = ResLoader.getDataByFileName("seeds.json");   // XMLDocument  // JSON
            ResourceManager.instance.parseSeedsJson(seedsJson);

            // 道具
            let toolsJson:any = ResLoader.getDataByFileName("tools.json");
            ResourceManager.instance.parseToolsJson(toolsJson);

            // 活动
            let activityJson:any = ResLoader.getDataByFileName("activity.json");
            ResourceManager.activityObjArr = activityJson["lists"];

            // 茶叶
            let tealeafJson:any = ResLoader.getDataByFileName("tealeaf.json");
            ResourceManager.tealeafObjArr = tealeafJson["tealeaf"]["list"]["item"];

            // 奖励
            let prizeJson:any = ResLoader.getDataByFileName("prize.json");
            ResourceManager.prizeObjArr = prizeJson["prize"]["list"]["item"];

            // others

            if(ResourceManager.callback)
                ResourceManager.callback(ResourceManager.seedsObjArr);
        }

        /**
         * 加载进度
         */
        private loadProgress(event:Laya.Event):void
        {


        }

        /**
         * 解析 seeds.json
         */
        private parseSeedsJson(jsonObj:any):any
        {
            try
            {
                ResourceManager.seedsObjArr = jsonObj["seeds"]["item"];
            }
            catch(e)
            {
                console.log("seeds.json, "+e.message);
                return;
            }

            // if(ResourceManager.callback)
            //     ResourceManager.callback(ResourceManager.seedsObjArr);

        }

        /**
         * 解析 tools.json
         */
        private parseToolsJson(jsonObj:any):any
        {
             try
            {
                // 类型项：jsonObj["tools"]["categories"]["item"]
                // 具体项：jsonObj["tools"]["list"]["item"]
                ResourceManager.toolsObjArr = jsonObj["tools"]["list"]["item"];
            }
            catch(e)
            {
                console.log("tools.json, "+e.message);
                return;
            }

        }

    }

    class InternalClass
    {

    }
}
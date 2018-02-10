namespace commons.resLoad
{
    import EventDispatcher = laya.events.EventDispatcher;
    import Loader = laya.net.Loader;
    import LoaderManager = laya.net.LoaderManager;
    import Handler = laya.utils.Handler;
    import Event = laya.events.Event;
    import Texture = laya.resource.Texture;
    import Sprite = laya.display.Sprite;
    import BitmapFont = laya.display.BitmapFont;
    import Dictionary = laya.utils.Dictionary;

    /** 资源加载类
     * ================ 注意：声音、音效文件待加载、处理！！！ ================
     */
    export class ResLoader extends EventDispatcher
    {
        static eventDispatcher: EventDispatcher = new EventDispatcher();
        static FILE_LOADED_COMPLETE: string = "file_loaded_complete";
        static loaderManager: LoaderManager;

        static imageDic: Dictionary;
        static jsonDic: Dictionary;
        static textDic: Dictionary;
        static xmlDic: Dictionary;
        static atlasDic: Dictionary;
        static bufferDic: Dictionary;
        static fontDic: Dictionary;
        /** 用于清空数据 */
        static resDicArr: Array<Dictionary> = [];
        static resUrlArr: Array<any> = [];
        static resTypeArr: Array<any>;

        constructor()
        {
            super();
        }

        /**
         * 开始资源加载
         * @fileUrlArr [] 资源文件的路径数组
         */
        static loadRes(fileUrlArr: string[]): void
        {
            if (!fileUrlArr)
                return;
            if (!fileUrlArr.length)
                return;
            !this.imageDic && (this.imageDic = new Dictionary());
            !this.jsonDic && (this.jsonDic = new Dictionary());
            !this.textDic && (this.textDic = new Dictionary());
            !this.xmlDic && (this.xmlDic = new Dictionary());
            !this.atlasDic && (this.atlasDic = new Dictionary());
            !this.bufferDic && (this.bufferDic = new Dictionary());
            !this.fontDic && (this.fontDic = new Dictionary());
            !this.resDicArr && !this.resDicArr.length && (this.resDicArr = [this.imageDic, this.jsonDic, this.textDic, this.xmlDic, this.atlasDic, this.bufferDic, this.fontDic]);

            this.resUrlArr.length = 0;
            this.resUrlArr = this.resUrlArr.concat(fileUrlArr);
            this.handleResUrl();
            this.loaderManager = Laya.loader;
            this.loaderManager.retryNum = 0;
            this.loaderManager.on(Event.ERROR, this, this.loadErrorHandler);
            this.loaderManager.load(this.resUrlArr, Handler.create(this, this.resLoadedHandler), Handler.create(this, this.progressHandler, null, false));  // ,Loader.BUFFER
            // this.loaderManager.create(this.resUrlArr,Handler.create(this,this.resLoadedHandler),
            //                              Handler.create(this,this.progressHandler));     // ,null,false
        }

        static handleResUrl(): void
        {
            // this.resUrlArr = ["testGIF.gif","testJPG.jpg","testPNG.png","testSWF.swf","testXML.xml","testSWF.json"];
            // this.resTypeArr = [Loader.IMAGE,Loader.IMAGE,Loader.IMAGE,Loader.BUFFER,Loader.XML,Loader.JSON];
            let curUrl: string;
            let startIndex: number;
            let fileName: string;
            let resObj: Object;
            for (let i: number = 0; i < this.resUrlArr.length; i++)
            {
                curUrl = this.resUrlArr[i];
                startIndex = curUrl.lastIndexOf("/");   // res/testRes/test.txt  // 最好将 '\  \\' 两种路径写法都做处理
                if (startIndex == -1)
                    continue;
                fileName = curUrl.substring(startIndex + 1, curUrl.length);
                resObj = { "fileName": fileName, "url": this.resUrlArr[i], "type": this.getFileTypeByFileSuffix(fileName) };
                this.resUrlArr[i] = resObj;
                // console.log("===== ResLoader, fileName:"+fileName+", url:"+this.resUrlArr[i]);
            }
        }

        /**
         * 根据文件名的后缀获取对应的文件类型
         */
        static getFileTypeByFileSuffix(fileName: string): string
        {
            if (!fileName)
                return null;
            if (fileName.indexOf(".") !== -1)
            {
                let startIndex: number = fileName.indexOf(".");
                let fileType: string = fileName.substring(startIndex + 1, fileName.length).toLowerCase();
                let loadType: string;
                switch (fileType)
                {
                    case "gif":
                    case "jpg":
                    case "png":
                        fileType = Loader.IMAGE;
                        break;
                    case "json":
                        fileType = Loader.JSON;
                        break;
                    case "txt":
                        fileType = Loader.TEXT;
                        break;
                    case "xml":
                        fileType = Loader.XML;
                        break;
                    case "swf":    // ============ (.bin) 二进制 ? ============
                        fileType = Loader.BUFFER;
                        break;
                    case "font":
                        fileType = Loader.FONT;
                        break;
                    default:
                        console.log("该文件类型没有对应的加载类型！")
                        break;
                }
                return fileType;
            }
            return null;
        }

        static resLoadedHandler(para: any): void
        {    // Texture 待试
            // console.log("Loaded, 加载的资源池 loadedMap: "+Loader.loadedMap);
            para && console.log(`ResLoader,load complete,para:${para}`);

            let curRes: any;
            let imgSp: Sprite;
            for (let i: number = 0; i < this.resUrlArr.length; i++)
            {
                curRes = this.loaderManager.getRes(this.resUrlArr[i].url);

                switch (this.resUrlArr[i].type)
                {
                    case Loader.IMAGE:
                        curRes = curRes as Texture;
                        this.imageDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    case Loader.JSON:
                        curRes = curRes as JSON;
                        this.jsonDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    case Loader.TEXT:
                        curRes = curRes as Text;
                        this.textDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    case Loader.XML:
                        curRes = curRes as XMLDocument;
                        this.xmlDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    case Loader.ATLAS:  // ============== JSON or Texture ??? (图集:加载的是 .json 文件)==============
                        curRes = curRes as Texture;
                        this.atlasDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    case Loader.BUFFER:
                        curRes = curRes as ArrayBuffer;
                        this.bufferDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    case Loader.FONT:
                        curRes = curRes as BitmapFont;
                        this.fontDic.set(this.resUrlArr[i].fileName, curRes);
                        break;
                    default:
                        console.log("加载的为非一般类型的资源,类型为:" + this.resUrlArr[i].type + ", 名为：" + this.resUrlArr[i].fileName);
                        break;
                }
            }

            // console.log("this.resDicArr:"+this.resDicArr);
            ResLoader.eventDispatcher.event(Event.COMPLETE);
        }

        /**
         * 根据文件名返回已加载数据所对应的类类型
         * @fileName
         */
        static getDataByFileName(fileName: string): any
        {
            if (!fileName)
                return null;
            if (fileName.indexOf(".") !== -1)
            {
                let startIndex: number = fileName.indexOf(".");
                let fileType: string = fileName.substring(startIndex + 1, fileName.length).toLowerCase();
                let curData: any = null;
                switch (fileType)
                {
                    case "gif":
                    case "jpg":
                    case "png":
                        curData = this.imageDic.get(fileName) as Texture;
                        break;
                    case "json":
                        curData = this.jsonDic.get(fileName) as JSON;
                        break;
                    case "txt":
                        curData = this.textDic.get(fileName) as Text;
                        break;
                    case "xml":
                        curData = this.xmlDic.get(fileName) as XMLDocument;
                        break;
                    case "swf":
                        curData = this.bufferDic.get(fileName) as ArrayBuffer;
                        break;
                    case "font":
                        curData = this.fontDic.get(fileName) as BitmapFont;
                        break;
                    default:
                        console.log("其它类型文件！")
                        break;
                }
                return curData;
            }
            return null;
        }

        /**
         * 清空所有资源容器
         */
        static disposeAllDics(): void
        {
            let arrLen: number = this.resDicArr.length;
            let curDic: Dictionary = null;
            for (let i: number = 0; i < arrLen; i++)
            {
                curDic = this.resDicArr[i];
                if (!curDic)
                    continue;
                curDic.clear();
                curDic = null;
            }
        }

        /**
         * 清除某个资源容器
         */
        static disposeResDic(dic: Dictionary): void
        {
            if (!dic)
                return;
            if (dic.keys.length === 0)
                return;
            dic.clear();
            dic = null;
        }

        /**
         * 根据文件名获取对应的纹理数据
         */
        static getTextureByFileName(fileName: string): Texture
        {
            if (!fileName)
                return null;
            let curValue: any = this.imageDic.get(fileName);
            if (!curValue)
                return null;
            if (curValue instanceof Texture)
            {
                curValue = curValue as Texture;
                return curValue;
            }
            return null;
        }

        /**
         * 根据纹理数据获取相应的Sprite对象
         */
        static getSpriteByTexture(texture: Texture): Sprite
        {
            if (!texture)
                return null;
            let s: Sprite = new Sprite();
            s.graphics.drawTexture(texture, 0, 0);
            return s;
        }

        private static progressHandler(progress: number): void
        {
            // progress && console.log(`ResLoader,load progress:${progress * 100}% `); // ${progress*100}%
            let _progress: string = (progress * 100) + "%";
            ResLoader.eventDispatcher.event(Event.PROGRESS, _progress);
        }

        private static loadErrorHandler(err: String): void
        {
            console.log("ResLoader,load error: " + err);
            ResLoader.eventDispatcher.event(Event.ERROR, err);
        }

    }

}
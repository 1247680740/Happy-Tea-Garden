var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var commons;
(function (commons) {
    var resLoad;
    (function (resLoad) {
        var EventDispatcher = laya.events.EventDispatcher;
        var Loader = laya.net.Loader;
        var Handler = laya.utils.Handler;
        var Event = laya.events.Event;
        var Texture = laya.resource.Texture;
        var Sprite = laya.display.Sprite;
        var Dictionary = laya.utils.Dictionary;
        /** 资源加载类
         * ================ 注意：声音、音效文件待加载、处理！！！ ================
         */
        var ResLoader = /** @class */ (function (_super) {
            __extends(ResLoader, _super);
            function ResLoader() {
                return _super.call(this) || this;
            }
            /**
             * 开始资源加载
             * @fileUrlArr [] 资源文件的路径数组
             */
            ResLoader.loadRes = function (fileUrlArr) {
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
                this.loaderManager.load(this.resUrlArr, Handler.create(this, this.resLoadedHandler), Handler.create(this, this.progressHandler, null, false)); // ,Loader.BUFFER
                // this.loaderManager.create(this.resUrlArr,Handler.create(this,this.resLoadedHandler),
                //                              Handler.create(this,this.progressHandler));     // ,null,false
            };
            ResLoader.handleResUrl = function () {
                // this.resUrlArr = ["testGIF.gif","testJPG.jpg","testPNG.png","testSWF.swf","testXML.xml","testSWF.json"];
                // this.resTypeArr = [Loader.IMAGE,Loader.IMAGE,Loader.IMAGE,Loader.BUFFER,Loader.XML,Loader.JSON];
                var curUrl;
                var startIndex;
                var fileName;
                var resObj;
                for (var i = 0; i < this.resUrlArr.length; i++) {
                    curUrl = this.resUrlArr[i];
                    startIndex = curUrl.lastIndexOf("/"); // res/testRes/test.txt  // 最好将 '\  \\' 两种路径写法都做处理
                    if (startIndex == -1)
                        continue;
                    fileName = curUrl.substring(startIndex + 1, curUrl.length);
                    resObj = { "fileName": fileName, "url": this.resUrlArr[i], "type": this.getFileTypeByFileSuffix(fileName) };
                    this.resUrlArr[i] = resObj;
                    // console.log("===== ResLoader, fileName:"+fileName+", url:"+this.resUrlArr[i]);
                }
            };
            /**
             * 根据文件名的后缀获取对应的文件类型
             */
            ResLoader.getFileTypeByFileSuffix = function (fileName) {
                if (!fileName)
                    return null;
                if (fileName.indexOf(".") !== -1) {
                    var startIndex = fileName.indexOf(".");
                    var fileType = fileName.substring(startIndex + 1, fileName.length).toLowerCase();
                    var loadType = void 0;
                    switch (fileType) {
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
                        case "swf":// ============ (.bin) 二进制 ? ============
                            fileType = Loader.BUFFER;
                            break;
                        case "font":
                            fileType = Loader.FONT;
                            break;
                        default:
                            console.log("该文件类型没有对应的加载类型！");
                            break;
                    }
                    return fileType;
                }
                return null;
            };
            ResLoader.resLoadedHandler = function (para) {
                // console.log("Loaded, 加载的资源池 loadedMap: "+Loader.loadedMap);
                para && console.log("ResLoader,load complete,para:" + para);
                var curRes;
                var imgSp;
                for (var i = 0; i < this.resUrlArr.length; i++) {
                    curRes = this.loaderManager.getRes(this.resUrlArr[i].url);
                    switch (this.resUrlArr[i].type) {
                        case Loader.IMAGE:
                            curRes = curRes;
                            this.imageDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        case Loader.JSON:
                            curRes = curRes;
                            this.jsonDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        case Loader.TEXT:
                            curRes = curRes;
                            this.textDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        case Loader.XML:
                            curRes = curRes;
                            this.xmlDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        case Loader.ATLAS:// ============== JSON or Texture ??? (图集:加载的是 .json 文件)==============
                            curRes = curRes;
                            this.atlasDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        case Loader.BUFFER:
                            curRes = curRes;
                            this.bufferDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        case Loader.FONT:
                            curRes = curRes;
                            this.fontDic.set(this.resUrlArr[i].fileName, curRes);
                            break;
                        default:
                            console.log("加载的为非一般类型的资源,类型为:" + this.resUrlArr[i].type + ", 名为：" + this.resUrlArr[i].fileName);
                            break;
                    }
                }
                // console.log("this.resDicArr:"+this.resDicArr);
                ResLoader.eventDispatcher.event(Event.COMPLETE);
            };
            /**
             * 根据文件名返回已加载数据所对应的类类型
             * @fileName
             */
            ResLoader.getDataByFileName = function (fileName) {
                if (!fileName)
                    return null;
                if (fileName.indexOf(".") !== -1) {
                    var startIndex = fileName.indexOf(".");
                    var fileType = fileName.substring(startIndex + 1, fileName.length).toLowerCase();
                    var curData = null;
                    switch (fileType) {
                        case "gif":
                        case "jpg":
                        case "png":
                            curData = this.imageDic.get(fileName);
                            break;
                        case "json":
                            curData = this.jsonDic.get(fileName);
                            break;
                        case "txt":
                            curData = this.textDic.get(fileName);
                            break;
                        case "xml":
                            curData = this.xmlDic.get(fileName);
                            break;
                        case "swf":
                            curData = this.bufferDic.get(fileName);
                            break;
                        case "font":
                            curData = this.fontDic.get(fileName);
                            break;
                        default:
                            console.log("其它类型文件！");
                            break;
                    }
                    return curData;
                }
                return null;
            };
            /**
             * 清空所有资源容器
             */
            ResLoader.disposeAllDics = function () {
                var arrLen = this.resDicArr.length;
                var curDic = null;
                for (var i = 0; i < arrLen; i++) {
                    curDic = this.resDicArr[i];
                    if (!curDic)
                        continue;
                    curDic.clear();
                    curDic = null;
                }
            };
            /**
             * 清除某个资源容器
             */
            ResLoader.disposeResDic = function (dic) {
                if (!dic)
                    return;
                if (dic.keys.length === 0)
                    return;
                dic.clear();
                dic = null;
            };
            /**
             * 根据文件名获取对应的纹理数据
             */
            ResLoader.getTextureByFileName = function (fileName) {
                if (!fileName)
                    return null;
                var curValue = this.imageDic.get(fileName);
                if (!curValue)
                    return null;
                if (curValue instanceof Texture) {
                    curValue = curValue;
                    return curValue;
                }
                return null;
            };
            /**
             * 根据纹理数据获取相应的Sprite对象
             */
            ResLoader.getSpriteByTexture = function (texture) {
                if (!texture)
                    return null;
                var s = new Sprite();
                s.graphics.drawTexture(texture, 0, 0);
                return s;
            };
            ResLoader.progressHandler = function (progress) {
                // progress && console.log(`ResLoader,load progress:${progress * 100}% `); // ${progress*100}%
                var _progress = (progress * 100) + "%";
                ResLoader.eventDispatcher.event(Event.PROGRESS, _progress);
            };
            ResLoader.loadErrorHandler = function (err) {
                console.log("ResLoader,load error: " + err);
                ResLoader.eventDispatcher.event(Event.ERROR, err);
            };
            ResLoader.eventDispatcher = new EventDispatcher();
            ResLoader.FILE_LOADED_COMPLETE = "file_loaded_complete";
            /** 用于清空数据 */
            ResLoader.resDicArr = [];
            ResLoader.resUrlArr = [];
            return ResLoader;
        }(EventDispatcher));
        resLoad.ResLoader = ResLoader;
    })(resLoad = commons.resLoad || (commons.resLoad = {}));
})(commons || (commons = {}));
//# sourceMappingURL=ResLoader.js.map
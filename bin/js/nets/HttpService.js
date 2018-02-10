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
var nets;
(function (nets) {
    var EventDispatcher = laya.events.EventDispatcher;
    var HttpRequest = laya.net.HttpRequest;
    var Event = laya.events.Event;
    /**
     * 数据通信模块
     */
    var HttpService = /** @class */ (function (_super) {
        __extends(HttpService, _super);
        function HttpService() {
            var _this = _super.call(this) || this;
            _this.protocolType = "http://";
            _this.sendDataType = "post";
            _this.receiveDataType = "text"; //   "json";   //
            _this.reqHeader = ["Content-Type", "application/json"];
            return _this;
        }
        /**
         * 初始化通信组件
         */
        HttpService.prototype.init = function (host, port, path) {
            this.url = this.protocolType + host + path;
            this.http = new HttpRequest();
            this.http.on(Event.START, this, this.startHandler);
            this.http.on(Event.CLOSE, this, this.closeHandler);
            this.http.on(Event.ERROR, this, this.httpErrorHandler);
            this.http.on(Event.PROGRESS, this, this.httpProgrssHandler);
            this.http.on(Event.COMPLETE, this, this.httpCompleteHandler);
            // this.http.send(this.url,this.sendData,"post","json",this.reqHeader);
        };
        /**
         * ====================== 发送请求 ======================
         * 调用API接口并自定义回调函数获取结果,发送数据的格式为Object,{'数据名称':'数据值'}
         * @param sendData 要传递给API端的数据
         * @param selfData 带给回调函数的数据
         */
        HttpService.prototype.request = function (sendData, selfData) {
            if (!selfData)
                this.selfData = selfData;
            // GET： this.http.send(this.url+"?_m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1",null,"get","text");
            // POST：this.http.send(this.url, "_m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1","post","text");
            this.http.send(this.url, sendData, this.sendDataType, this.receiveDataType); // , this.reqHeader);     ,["Content-Type","application/json"]
            console.log("sendData: " + sendData); // JSON.stringify(sendData)
        };
        HttpService.prototype.startHandler = function (msg) {
            console.log("HttpService, start, msg:" + msg);
        };
        HttpService.prototype.closeHandler = function (msg) {
            console.error("HttpService, close, msg:" + msg);
        };
        HttpService.prototype.httpErrorHandler = function (errMsg) {
            console.error("HttpService, has error:" + errMsg);
        };
        HttpService.prototype.httpProgrssHandler = function (progrss) {
            var proMsg;
            if (progrss)
                proMsg = progrss * 100 + "%";
            console.log("HttpService, progress is:" + proMsg);
        };
        HttpService.prototype.httpCompleteHandler = function (data) {
            this.receiveData = this.http.data;
            // this.receiveData = '{"_c":"1","_cmsg":" ","_api":"getDecorate_4173","_d":{"0":{"di":4001,"dn":"农家茶园","hc":1,"realimg":"http://www.kaixinchayuan.com/static/d/n/bg_4001.jpg","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_bg_4001.jpg","p":0,"iu":0,"due":"到期日：无限期","ty":"background","attach":[]},"1":{"di":4002,"dn":"稻草房子","hc":1,"realimg":"http://www.kaixinchayuan.com/static/d/n/ph_4002.png","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_ph_4002.png","p":0,"ty":"person_house","iu":0,"due":"到期日：无限期","attach":[]},"2":{"di":4003,"dn":"稻草狗窝","hc":1,"realimg":"http://www.kaixinchayuan.com/static/d/n/dh_4003.png","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_dh_4003.png","p":0,"ty":"dog_house","iu":0,"due":"到期日：无限期","attach":[{"di":4004,"dn":"农家茶园狗盆","realimg":"http://www.kaixinchayuan.com/static/d/n/dp_4004.swf","ty":"dog_pot"}]},"3":{"di":7,"dn":"威尔士柯基","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_7.png","dimg":"http://www.kaixinchayuan.com/static/dog_7.png","p":10000,"ty":"dog","iu":0,"due":"到期日：无限期","attach":[]},"4":{"di":9,"dn":"中华田园犬","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_9.png","dimg":"http://www.kaixinchayuan.com/static/dog_9.png","p":22000,"ty":"dog","iu":0,"due":"到期日：无限期","attach":[]},"5":{"di":16,"dn":"茶杯犬","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_16.png","dimg":"http://www.kaixinchayuan.com/static/dog_16.png","p":10000,"ty":"dog","iu":0,"due":"到期日：无限期","attach":[]},"6":{"di":17,"dn":"雪纳瑞","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_17.png","dimg":"http://www.kaixinchayuan.com/static/dog_17.png","p":10000,"ty":"dog","iu":1,"due":"到期日：2017/08/23","attach":[]},"7":{"di":13,"dn":"张大姐","hc":1,"realimg":"http://www.kaixinchayuan.com/static/farmer_13.png","dimg":"http://www.kaixinchayuan.com/static/farmer_13.png","p":10000,"ty":"farmer","iu":1,"due":"到期日：无限期","attach":[]}},"using":[{"di":7001,"dn":"","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_bg_7001.jpg","ty":"background","p":1000},{"di":13,"dn":"茶农","dimg":"http://www.kaixinchayuan.com/static/farmer_13.png","ty":"farmer","p":10000},{"di":17,"dn":"护院狗","dimg":"http://www.kaixinchayuan.com/static/dog_17.png","ty":"dog","p":10000}],"_cmd":"","_g":"","_e":""}';
            console.info("HttpService, httpCompleteHandler, receive data:\n" + this.receiveData);
            if (typeof this.receiveData === "string") {
                try {
                    this.receiveData = JSON.parse(this.receiveData);
                }
                catch (error) {
                    console.error("HttpService, httpCompleteHandler, catch error: " + error);
                }
            }
            // 返回成功
            if (parseInt(this.receiveData["_c"] + "") === 1) {
                if (this.callback) {
                    if (this.selfData)
                        this.callback(this.receiveData, this.selfData);
                    else
                        this.callback(this.receiveData);
                }
            } // 未登录或已退出
            else {
                if (this.receiveData.hasOwnProperty("islogout") && this.receiveData["islogout"] === 1) {
                    console.error("未登录或已退出！");
                    return;
                }
                else {
                    console.error("HttpService, msg:" + this.receiveData["_cmsg"]);
                    // 异常的后续处理（返回异常数据）
                    if (this.callback) {
                        /*                      if(this.selfData)
                                                    this.callback({"errMsg":this.receiveData["_cmsg"]},this.selfData);
                                                else
                                                    this.callback({"errMsg":this.receiveData["_cmsg"]});
                        */
                        // {"_cmsg":"xxx","_c":-1,"_cmd":[],"_api":"xxx"}
                        if (this.selfData)
                            this.callback(this.receiveData, this.selfData);
                        else
                            this.callback(this.receiveData);
                    }
                }
            }
        };
        return HttpService;
    }(EventDispatcher));
    nets.HttpService = HttpService;
})(nets || (nets = {}));
//# sourceMappingURL=HttpService.js.map
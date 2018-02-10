namespace nets
{
    import EventDispatcher = laya.events.EventDispatcher;
    import HttpRequest = laya.net.HttpRequest;
    import URL = laya.net.URL;
    import Event = laya.events.Event;

    /**
     * 数据通信模块
     */
    export class HttpService extends EventDispatcher
    {
        http: HttpRequest;
        protocolType: string;
        /** 发送数据的方式，默认为 post */
        sendDataType: string;
        /** 请求地址 */
        url: string;
        /** 请求头 */
        reqHeader: Array<any>;
        /** 发送的数据（未用到） */
        sendData: Object;
        /** 接收的数据 */
        receiveData: Object;
        /** 接收数据的方式 */
        receiveDataType: string;
        /** 传给回调函数自身的参数 */
        selfData: any;

        callback: Function;

        constructor()
        {
            super();
            this.protocolType = "http://";
            this.sendDataType = "post";
            this.receiveDataType = "text";     //   "json";   //
            this.reqHeader = ["Content-Type","application/json"];

        }

        /**
         * 初始化通信组件
         */
        init(host: string, port: number, path: string): void
        {
            this.url = this.protocolType + host + path;

            this.http = new HttpRequest();
            this.http.on(Event.START,this,this.startHandler);
            this.http.on(Event.CLOSE,this,this.closeHandler);
            this.http.on(Event.ERROR, this, this.httpErrorHandler);
            this.http.on(Event.PROGRESS, this, this.httpProgrssHandler);
            this.http.on(Event.COMPLETE, this, this.httpCompleteHandler);
            // this.http.send(this.url,this.sendData,"post","json",this.reqHeader);

        }

        /**
         * ====================== 发送请求 ======================
		 * 调用API接口并自定义回调函数获取结果,发送数据的格式为Object,{'数据名称':'数据值'}
		 * @param sendData 要传递给API端的数据
		 * @param selfData 带给回调函数的数据
		 */
        request(sendData?: any, selfData?: any): void
        {
            if (!selfData)
                this.selfData = selfData;

            // GET： this.http.send(this.url+"?_m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1",null,"get","text");
            // POST：this.http.send(this.url, "_m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1","post","text");
            this.http.send(this.url, sendData, this.sendDataType, this.receiveDataType);  // , this.reqHeader);     ,["Content-Type","application/json"]

            console.log("sendData: "+sendData);  // JSON.stringify(sendData)
        }

        private startHandler(msg:any):void
        {
            console.log("HttpService, start, msg:"+msg);
        }

        private closeHandler(msg:any):void
        {
            console.error("HttpService, close, msg:"+msg);
        }

        private httpErrorHandler(errMsg: string): void
        {
            console.error("HttpService, has error:" + errMsg);
        }

        private httpProgrssHandler(progrss: number): void
        {
            let proMsg: string;
            if (progrss)
                proMsg = progrss * 100 + "%";
            console.log("HttpService, progress is:" + proMsg);
        }

        private httpCompleteHandler(data: any): void
        {
            this.receiveData = this.http.data;
            // this.receiveData = '{"_c":"1","_cmsg":" ","_api":"getDecorate_4173","_d":{"0":{"di":4001,"dn":"农家茶园","hc":1,"realimg":"http://www.kaixinchayuan.com/static/d/n/bg_4001.jpg","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_bg_4001.jpg","p":0,"iu":0,"due":"到期日：无限期","ty":"background","attach":[]},"1":{"di":4002,"dn":"稻草房子","hc":1,"realimg":"http://www.kaixinchayuan.com/static/d/n/ph_4002.png","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_ph_4002.png","p":0,"ty":"person_house","iu":0,"due":"到期日：无限期","attach":[]},"2":{"di":4003,"dn":"稻草狗窝","hc":1,"realimg":"http://www.kaixinchayuan.com/static/d/n/dh_4003.png","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_dh_4003.png","p":0,"ty":"dog_house","iu":0,"due":"到期日：无限期","attach":[{"di":4004,"dn":"农家茶园狗盆","realimg":"http://www.kaixinchayuan.com/static/d/n/dp_4004.swf","ty":"dog_pot"}]},"3":{"di":7,"dn":"威尔士柯基","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_7.png","dimg":"http://www.kaixinchayuan.com/static/dog_7.png","p":10000,"ty":"dog","iu":0,"due":"到期日：无限期","attach":[]},"4":{"di":9,"dn":"中华田园犬","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_9.png","dimg":"http://www.kaixinchayuan.com/static/dog_9.png","p":22000,"ty":"dog","iu":0,"due":"到期日：无限期","attach":[]},"5":{"di":16,"dn":"茶杯犬","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_16.png","dimg":"http://www.kaixinchayuan.com/static/dog_16.png","p":10000,"ty":"dog","iu":0,"due":"到期日：无限期","attach":[]},"6":{"di":17,"dn":"雪纳瑞","hc":1,"realimg":"http://www.kaixinchayuan.com/static/dog_17.png","dimg":"http://www.kaixinchayuan.com/static/dog_17.png","p":10000,"ty":"dog","iu":1,"due":"到期日：2017/08/23","attach":[]},"7":{"di":13,"dn":"张大姐","hc":1,"realimg":"http://www.kaixinchayuan.com/static/farmer_13.png","dimg":"http://www.kaixinchayuan.com/static/farmer_13.png","p":10000,"ty":"farmer","iu":1,"due":"到期日：无限期","attach":[]}},"using":[{"di":7001,"dn":"","dimg":"http://www.kaixinchayuan.com/static/d/n/thumb_bg_7001.jpg","ty":"background","p":1000},{"di":13,"dn":"茶农","dimg":"http://www.kaixinchayuan.com/static/farmer_13.png","ty":"farmer","p":10000},{"di":17,"dn":"护院狗","dimg":"http://www.kaixinchayuan.com/static/dog_17.png","ty":"dog","p":10000}],"_cmd":"","_g":"","_e":""}';

            console.info("HttpService, httpCompleteHandler, receive data:\n" + this.receiveData);

            if (typeof this.receiveData === "string")    // text
            {
                try
                {
                    this.receiveData = JSON.parse(this.receiveData);
                }
                catch (error)
                {
                    console.error("HttpService, httpCompleteHandler, catch error: "+error);
                }
            }

            // 返回成功
            if(parseInt(this.receiveData["_c"]+"") === 1)
            {
                if (this.callback)
                {
                    if (this.selfData)
                        this.callback(this.receiveData, this.selfData);
                    else
                        this.callback(this.receiveData);
                }
            }   // 未登录或已退出
            else
            {

                if (this.receiveData.hasOwnProperty("islogout") && this.receiveData["islogout"] === 1)
                {
                    console.error("未登录或已退出！");
                    return;
                }
                else
                {
                    console.error("HttpService, msg:"+this.receiveData["_cmsg"]);

                    // 异常的后续处理（返回异常数据）
                    if(this.callback)
                    {
/*                      if(this.selfData)
                            this.callback({"errMsg":this.receiveData["_cmsg"]},this.selfData);
                        else
                            this.callback({"errMsg":this.receiveData["_cmsg"]});
*/
                        // {"_cmsg":"xxx","_c":-1,"_cmd":[],"_api":"xxx"}
                        if(this.selfData)
                            this.callback(this.receiveData,this.selfData);
                        else
                            this.callback(this.receiveData);
                    }
                }
            }

        }

    }

}
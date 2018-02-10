namespace models.player
{
    import HttpServiceProxy = nets.HttpServiceProxy;

    export class PlayerInfoModel
    {
        /** VO 数据类 */
        static playerInfo: PlayerInfoVO;
        static friendInfo: FriendInfoVO;

        /** 服务器返回的数据 */
        static receiveData: any;
        /** 请求前自带的数据 */
        static takeData: any;

        private static _instance:PlayerInfoModel;

        static callback: Function;  // = PlayerInfoModel.callbackHandler;

        constructor()
        {
            PlayerInfoModel.playerInfo = new PlayerInfoVO();
            PlayerInfoModel.friendInfo = new FriendInfoVO();

        }

        static  get instance():PlayerInfoModel
        {
            if(!PlayerInfoModel._instance)
                PlayerInfoModel._instance = new PlayerInfoModel();
            return PlayerInfoModel._instance;
        }

        /**
         * 请求玩家信息数据
         */
        request_getUserInfo(): void
        {
            HttpServiceProxy.request("getUserInfo", { 'sf': IdentityConfig.uid }, this.getUserInfoOverFn, IdentityConfig.uid);
        }

        request_getFriendInfo(uid:string): void{
            HttpServiceProxy.request("getUserInfo", { 'sf': uid }, this.getFriendInfoOverFn,{"uid":uid});
        }

        /**
         * 注意(this)：此回调函数的作用域已不再是 PlayerInfoModel 类本身，可能是 [object Window]
         */
        private getUserInfoOverFn(receiveData?: any, takeData?: any): void
        {
            if (receiveData)
                PlayerInfoModel.receiveData = receiveData;
            if (takeData)
                PlayerInfoModel.takeData = takeData;

            PlayerInfoModel.playerInfo.exp = receiveData["e"];
            PlayerInfoModel.playerInfo.teaExam = receiveData["grade"];
            PlayerInfoModel.playerInfo.level = parseInt(receiveData["l"]);
            PlayerInfoModel.playerInfo.money = parseInt(receiveData["m"]);
            PlayerInfoModel.playerInfo.isSign = receiveData["sign"];   //是否签到
            PlayerInfoModel.playerInfo.nextLevelExp = receiveData["ue"];
            PlayerInfoModel.playerInfo.userName = receiveData["un"];
            PlayerInfoModel.playerInfo.diamond = parseInt(receiveData["yb"]);
            PlayerInfoModel.playerInfo.ico = receiveData["i"];
            // PlayerInfoModel.playerInfo.cmd = receiveData["_cmd"];   // 待执行的命令

            if(PlayerInfoModel.callback)
                PlayerInfoModel.callback();
        }


        /** 获取好友用户信息 */
        private getFriendInfoOverFn(receiveData?: any, takeData?: any): void
        {
            if (receiveData)
                PlayerInfoModel.receiveData = receiveData;
            if (takeData)
                PlayerInfoModel.takeData = takeData;

            PlayerInfoModel.friendInfo.exp = receiveData["e"];
            PlayerInfoModel.friendInfo.teaExam = receiveData["grade"];
            PlayerInfoModel.friendInfo.level = parseInt(receiveData["l"]);
            PlayerInfoModel.friendInfo.money = parseInt(receiveData["m"]);
            PlayerInfoModel.friendInfo.isSign = receiveData["sign"];   //是否签到
            PlayerInfoModel.friendInfo.nextLevelExp = receiveData["ue"];
            PlayerInfoModel.friendInfo.userName = receiveData["un"];
            PlayerInfoModel.friendInfo.diamond = parseInt(receiveData["yb"]);
            PlayerInfoModel.friendInfo.ico = receiveData["i"];
            PlayerInfoModel.friendInfo.userId=takeData["uid"]
            // PlayerInfoModel.playerInfo.cmd = receiveData["_cmd"];   // 待执行的命令

            if(PlayerInfoModel.callback)
                PlayerInfoModel.callback();
        }

        static dispose(): void
        {
            this.callback = null;
            this.receiveData = null;
            this.takeData = null;

        }

    }
}
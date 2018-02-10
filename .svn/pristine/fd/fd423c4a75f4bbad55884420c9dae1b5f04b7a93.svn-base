var configs;
(function (configs) {
    var HttpServiceProxy = nets.HttpServiceProxy;
    /**
     * 通信配置信息（主要用于与服务器端做对接，指明要调用服务器的哪个Controller下的哪个函数）
     */
    var HttpConfig = /** @class */ (function () {
        function HttpConfig() {
        }
        /**
         * 设置通信服务基本配置（默认已在其内设置，通过不用重设参数）及初始化通信服务
         */
        HttpConfig.init = function (protocol, host, port, path) {
            protocol && (this.protocol = protocol);
            host && (this.host = host);
            port && (this.port = port);
            path && (this.path = path);
            // 初始化通信服务
            HttpServiceProxy.getInstance();
        };
        /**
         * api信息是否存在
         * @return
         */
        HttpConfig.isset = function (apiName) {
            if (HttpConfig._apiObject[apiName] == null)
                return false;
            return true;
        };
        /**
         * 获取api信息
         * @param apiName:string api名字
         * @return Object
         */
        HttpConfig.getSendData = function (apiName) {
            return HttpConfig.isset(apiName) == false ? null : this._apiObject[apiName].sendData;
        };
        /** 服务器已连接成功（玩家登录成功） */
        HttpConfig.SERVER_CONNECTED = "server_connected";
        /** 返回的数据格式 */
        HttpConfig.RESULT_FORMAT = 'json';
        /**
         * api配置信息,callback:api执行后的系统回调函数,
         * sendData:向服务端发送的必要数据，其中 '_m' 表示服务端对应的 Controller，'_a' 表示其下的对应函数！
         */
        HttpConfig._apiObject = {
            'getUserInfo': { 'sendData': { '_m': 'user', '_a': 'info' } },
            'getSeed': { 'sendData': { '_m': 'repertory', '_a': 'getseed' } },
            'getProp': { 'sendData': { '_m': 'repertory', '_a': 'gettools' } },
            'doGrow': { 'sendData': { '_m': 'tstatus', '_a': 'grow' } },
            'getCrop': { 'sendData': { '_m': 'tstatus', '_a': 'getcrop' } },
            'getFarmDecoration': { 'sendData': { '_m': 'repertory', '_a': 'loaddecoration' } },
            'getFarmLand': { 'sendData': { '_m': 'tstatus', '_a': 'getland' } },
            'deleteCrop': { 'sendData': { '_m': 'tstatus', '_a': 'uproot' } },
            'initCrop': { 'sendData': { '_m': 'tstatus', '_a': 'getgrowstatus' } },
            'actWipeGrass': { 'sendData': { '_m': 'tstatus', '_a': 'weed' } },
            'actPesticide': { 'sendData': { '_m': 'tstatus', '_a': 'dopesticide' } },
            'actWater': { 'sendData': { '_m': 'tstatus', '_a': 'dowater' } },
            'initDog': { 'sendData': { '_m': 'dog', '_a': 'getdog' } },
            'actProp': { 'sendData': { '_m': 'tstatus', '_a': 'usetools' } },
            'getDog': { 'sendData': { '_m': 'dog', '_a': 'showdog' } },
            'getAssartLandInfo': { 'sendData': { '_m': 'tstatus', '_a': 'assartland' } },
            'getLandLevelUpInfo': { 'sendData': { '_m': 'tstatus', '_a': 'upgradeland' } },
            'actAssartLand': { 'sendData': { '_m': 'tstatus', '_a': 'doassart' } },
            'actLandLevelUp': { 'sendData': { '_m': 'tstatus', '_a': 'doupgrade' } },
            'actCollect': { 'sendData': { '_m': 'tstatus', '_a': 'harvest' } },
            'actAllCollect': { 'sendData': { '_m': 'tstatus', '_a': 'harvestall' } },
            'getMypals': { 'sendData': { '_m': 'user', '_a': 'getfriend' } },
            'getMypalsNums': { 'sendData': { '_m': 'user', '_a': 'getfriendnums' } },
            'getFruit': { 'sendData': { '_m': 'repertory', '_a': 'getstore' } },
            'sellSingle': { 'sendData': { '_m': 'repertory', '_a': 'sellsingle' }, 'callback': 'sellSingleGoodsCallback' },
            'getShopSeed': { 'sendData': { '_m': 'shop', '_a': 'getseed' } },
            'getShopProp': { 'sendData': { '_m': 'shop', '_a': 'gettools' } },
            'buySingleGoods': { 'sendData': { '_m': 'shop', '_a': 'buysingle' }, 'callback': 'buySingleGoodsCallback' },
            'getHappenMsg': { 'sendData': { '_m': 'message', '_a': 'gethappenmsg' } },
            'getIncomeMsg': { 'sendData': { '_m': 'message', '_a': 'getincomemsg' } },
            'getSystemMsg': { 'sendData': { '_m': 'message', '_a': 'getsystemmsg' } },
            'getNoticeMsg': { 'sendData': { '_m': 'message', '_a': 'getNotice' } },
            'clearMsg': { 'sendData': { '_m': 'message', '_a': 'delmsg' } },
            'actWorm': { 'sendData': { '_m': 'tstatus', '_a': 'putvermin' } },
            'actPutGrass': { 'sendData': { '_m': 'tstatus', '_a': 'putweed' } },
            'getShopDecorate': { 'sendData': { '_m': 'shop', '_a': 'getdecoration' } },
            'getDecorate': { 'sendData': { '_m': 'repertory', '_a': 'getdecoration' } },
            'renewDecorate': { 'sendData': { '_m': 'repertory', '_a': 'setdecoration' } },
            'initFarmer': { 'sendData': { '_m': 'farmer', '_a': 'getfarmer' } },
            'getFarmer': { 'sendData': { '_m': 'farmer', '_a': 'showfarmer' } },
            'getCauldron': { 'sendData': { '_m': 'saute', '_a': 'getholloware' } },
            'getTea': { 'sendData': { '_m': 'saute', '_a': 'gethstatus' } },
            'getFarmerCardInfo': { 'sendData': { '_m': 'shop', '_a': 'getfarmercard' } },
            'getShopTheme': { 'sendData': { '_m': 'shop', '_a': 'gettheme' } },
            'initDogPot': { 'sendData': { '_m': 'dog', '_a': 'getdogfood' } },
            'getScroll': { 'sendData': { '_m': 'repertory', '_a': 'getbooks' } },
            'getDepottea': { 'sendData': { '_m': 'repertory', '_a': 'getleaf' } },
            'getMaterial': { 'sendData': { '_m': 'repertory', '_a': 'getmaterial' } },
            'getShopScroll': { 'sendData': { '_m': 'shop', '_a': 'getbooks' } },
            'getTeaData': { 'sendData': { '_m': 'repertory', '_a': 'getmaterial' } },
            'getCauldronBuyInfo': { 'sendData': { '_m': 'holloware', '_a': 'getUnlockInfo' } },
            'actBuyCauldron': { 'sendData': { '_m': 'holloware', '_a': 'unlock' } },
            'getTeaTypeList': { 'sendData': { '_m': 'saute', '_a': 'gettealist' } },
            'getCauldronLevelUpInfo': { 'sendData': { '_m': 'saute', '_a': 'upgradeholloware' } },
            'initFryTeaer': { 'sendData': { '_m': 'saute', '_a': 'getmaster' } },
            'actLevelUpCauldron': { 'sendData': { '_m': 'saute', '_a': 'doupgrade' } },
            'getTeaInfoList': { 'sendData': { '_m': 'saute', '_a': 'getleaflist' } },
            'getFryTeaerData': { 'sendData': { '_m': 'saute', '_a': 'getmasterlist' } },
            'getFryTeaConditionData': { 'sendData': { '_m': 'saute', '_a': 'getteasecret' } },
            'brushTea': { 'sendData': { '_m': 'holloware', '_a': 'clean' } },
            'startUpProcess': { 'sendData': { '_m': 'holloware', '_a': 'work' } },
            'actChaoCollect': { 'sendData': { '_m': 'holloware', '_a': 'harvest' } },
            'getWater': { 'sendData': { '_m': 'shop', '_a': 'getwater' } },
            'getDepotWater': { 'sendData': { '_m': 'repertory', '_a': 'getwater' } },
            'getMakeTeaInfoList': { 'sendData': { '_m': 'maketea', '_a': 'gettealist' } },
            'getMakeTeaInfo': { 'sendData': { '_m': 'maketea', '_a': 'getteainfo' } },
            'getMaterialData': { 'sendData': { '_m': 'maketea', '_a': 'getteacondition' } },
            'getNeedWaterData': { 'sendData': { '_m': 'maketea', '_a': 'getwater' } },
            'getTeaSetData': { 'sendData': { '_m': 'maketea', '_a': 'getteapotlist' } },
            'getTeaQualityData': { 'sendData': { '_m': 'maketea', '_a': 'getteaquality' } },
            'getFryTeaOtherInfo': { 'sendData': { '_m': 'saute', '_a': 'getleafinfo' } },
            'startMakeTeaData': { 'sendData': { '_m': 'maketea', '_a': 'choosetea' } },
            'Paoinit': { 'sendData': { '_m': 'maketea', '_a': 'initpao' } },
            'stopFire': { 'sendData': { '_m': 'maketea', '_a': 'stopfire' } },
            'pourWater': { 'sendData': { '_m': 'maketea', '_a': 'pourwater' } },
            'startDunk': { 'sendData': { '_m': 'maketea', '_a': 'domaketea' } },
            'sellTea': { 'sendData': { '_m': 'maketea', '_a': 'selltea' }, 'callback': 'sellSingleGoodsCallback' },
            'getHelp': { 'sendData': { '_m': 'help', '_a': 'guide' } },
            'finishHelp': { 'sendData': { '_m': 'help', '_a': 'getgift' } },
            'getMission': { 'sendData': { '_m': 'help', '_a': 'getTask' } },
            'getDataByLeft': { 'sendData': { '_m': 'baike', '_a': 'getbookmark' } },
            'getDataByRight': { 'sendData': { '_m': 'baike', '_a': 'getcontent' } },
            'getPageData': { 'sendData': { '_m': 'baike', '_a': 'getcontent' } },
            'getShopRightContentData': { 'sendData': { '_m': 'shop', '_a': 'getextended' } },
            'getDepotRightContentData': { 'sendData': { '_m': 'repertory', '_a': 'getextended' } },
            'getBagSeed': { 'sendData': { '_m': 'repertory', '_a': 'getbagseed' } },
            'getBagProp': { 'sendData': { '_m': 'repertory', '_a': 'getbagtools' } },
            'farmerActWipeGrass': { 'sendData': { '_m': 'tstatus', '_a': 'farmerweed' } },
            'farmerActPesticide': { 'sendData': { '_m': 'tstatus', '_a': 'farmerdopesticide' } },
            'farmerActWater': { 'sendData': { '_m': 'tstatus', '_a': 'farmerdowater' } },
            'initDouPersonData': { 'sendData': { '_m': 'maketea', '_a': 'getfighterlist' } },
            'startDouTea': { 'sendData': { '_m': 'maketea', '_a': 'startfight' } },
            'initDouChipData': { 'sendData': { '_m': 'maketea', '_a': 'getteawater' } },
            'initDouReportData': { 'sendData': { '_m': 'maketea', '_a': 'getreport' } },
            'getRunHorseData': { 'sendData': { '_m': 'maketea', '_a': 'getrunreport' } },
            'getAward': { 'sendData': { '_m': 'lottery', '_a': 'getPrizeList' } },
            'startAward': { 'sendData': { '_m': 'lottery', '_a': 'acceptPrize' } },
            'initExam': { 'sendData': { '_m': '13', '_a': '1' } },
            'startExam': { 'sendData': { '_m': '13', '_a': '2' } },
            'initExaminationData': { 'sendData': { '_m': '13', '_a': '3' } },
            'submitAnswerData': { 'sendData': { '_m': 'exam', '_a': 'comparekey' } },
            'teaExamOver': { 'sendData': { '_m': 'exam', '_a': 'finishexam' } },
            'getActionData': { 'sendData': { '_m': 'prize', '_a': 'getfesta' } },
            'shareContent': { 'sendData': { '_m': 'share', '_a': 'sendweibo' } },
            'finishDogBite': { 'sendData': { '_m': 'tstatus', '_a': 'finishdogbite' } },
            'getChaoMaterial': { 'sendData': { '_m': 'shop', '_a': 'getfruit' } },
            'getPaoMaterial': { 'sendData': { '_m': 'shop', '_a': 'gettealeaf' } },
            'getUserLevel': { 'sendData': { '_m': 'user', '_a': 'getlevelexp' } },
            'getNumsFromManage': { 'sendData': { '_m': 'user', '_a': 'getfriendmanagenums' } },
            'getMyPalsFromManage': { 'sendData': { '_m': 'user', '_a': 'getfriendmanage' } },
            'deleteMypalsById': { 'sendData': { '_m': 'user', '_a': 'delfriend' } },
            'AskForMypalsData': { 'sendData': { '_m': 'user', '_a': 'applyfriendlist' } },
            'RecommendMypalsData': { 'sendData': { '_m': 'user', '_a': 'recommendfriendlist' } },
            'addAllRecommondMypals': { 'sendData': { '_m': 'user', '_a': 'addrecommendfriend' } },
            'operateAskForData': { 'sendData': { '_m': 'user', '_a': 'applyfriend' } },
            'addMypalsByName': { 'sendData': { '_m': 'user', '_a': 'addfriendlist' } },
            'addAllSeekMypals': { 'sendData': { '_m': 'user', '_a': 'addfriend' } },
            'getChoEveryTeaNumsData': { 'sendData': { '_m': 'saute', '_a': 'getsautableleaflist' } },
            'getPaoEveryTeaNumsData': { 'sendData': { '_m': 'maketea', '_a': 'getdrinkableleaflist' } },
            'getBuyDogFoodData': { 'sendData': { '_m': 'shop', '_a': 'getdogfood' } },
            'getInviteFriendAwardData': { 'sendData': { '_m': 'prize', '_a': 'setinvitefriend' } },
            'getMediaGiftData': { 'sendData': { '_m': 'prize', '_a': 'getcodegift' } },
            'getPalsTeaAreaData': { 'sendData': { '_m': 'message', '_a': 'getRollMsg' } },
            'getOnlineGiftData': { 'sendData': { '_m': 'user', '_a': 'applyOnlineGift' } },
            'getMoreMissionIco': { 'sendData': { '_m': 'mission', '_a': 'getMissionList' } },
            'getMissionDetailData': { 'sendData': { '_m': 'mission', '_a': 'getDesc' } },
            'getMissionIsGet': { 'sendData': { '_m': 'mission', '_a': 'receive' } },
            'getRankListData': { 'sendData': { '_m': 'rank', '_a': 'getMoneyRank' } },
            'getGradeRank': { 'sendData': { '_m': 'rank', '_a': 'getGradeRank' } },
            'wealthListAddPals': { 'sendData': { '_m': 'user', '_a': 'addFriendSimpled' } },
            'getInvitePalsData': { 'sendData': { '_m': 'share', '_a': 'getInviteShare' } },
            'getMultiRewardResource': { 'sendData': { '_m': 'prize', '_a': 'receivePackage' } },
            'getHollowareUpgradeInfo': { 'sendData': { '_m': 'holloware', '_a': 'getUpgradeInfo' } },
            'hollowareUpgrade': { 'sendData': { '_m': 'holloware', '_a': 'upgrade' } },
            'getHollowareStrengthenInfo': { 'sendData': { '_m': 'holloware', '_a': 'getStrengthenInfo' } },
            'hollowareStrengthen': { 'sendData': { '_m': 'holloware', '_a': 'strengthen' } },
            'hollowareDelete': { 'sendData': { '_m': 'holloware', '_a': 'delete' } },
            'exchangePoint': { 'sendData': { '_m': 'repertory', '_a': 'exchangePoint' } },
            'getUserSignInfo': { 'sendData': { '_m': 'sign', '_a': 'getInfo' } },
            'userSign': { 'sendData': { '_m': 'sign', '_a': 'sign' } },
            "getHighAwardInfo": { "sendData": { "_m": "additivesign", "_a": "getInfo" } },
            "joinAction": { "sendData": { "_m": "additivesign", "_a": "join" } },
            "getYellowNewPlay": { "sendData": { "_m": "12", "_a": "1" } },
            "getYellowDay": { "sendData": { "_m": "12", "_a": "2" } },
            "getSecondKillList": { "sendData": { "_m": "14", "_a": "1" } },
            "doKill": { "sendData": { "_m": "14", "_a": "2" } },
            "payBack": { "sendData": { "_m": "15", "_a": "1" } },
            "digMagicHole": { "sendData": { "_m": "800", "_a": "1-3" } },
            "magicHoleDayRank": { "sendData": { "_m": "800", "_a": "1-5" } },
            "canEnterMagicHole": { "sendData": { "_m": "800", "_a": "1-7" } },
            "getMyRankListData": { "sendData": { "_m": "1", "_a": "10" } },
            "getMagicHoleTool": { "sendData": { "_m": "800", "_a": "1-8" } },
            "getMyRank": { "sendData": { "_m": "1", "_a": "10" } },
            "getShare": { "sendData": { "_m": "2", "_a": "1" } },
            "getAccumulatePaymentActivityInfo": { "sendData": { "_m": "801", "_a": "2-1" } },
            "receiveAccumulatePaymentActivityGift": { "sendData": { "_m": "801", "_a": "2-2" } },
            "getFocusZoomInfo": { "sendData": { "_m": "1", "_a": "11" } },
            "receiveFocusZoomGift": { "sendData": { "_m": "12", "_a": "3" } },
            "getUserImmortals": { "sendData": { "_m": "16", "_a": "1" } },
            "getMissionGroups": { "sendData": { "_m": "803", "_a": "1-1" } },
            "getMissionGroupInfo": { "sendData": { "_m": "803", "_a": "1-2" } },
            "receiveMissionGift": { "sendData": { "_m": "803", "_a": "1-3" } },
            "getDefaultAddress": { "sendData": { "_m": "17", "_a": "1" } },
            "sendInviteFriendsNotify": { "sendData": { "_m": "18", "_a": "1" } },
            "getMyInviteUsers": { "sendData": { "_m": "804", "_a": "1-1" } },
            "receiveInvitePrize": { "sendData": { "_m": "804", "_a": "1-2" } },
            "setMusicStatus": { "sendData": { "_m": "1", "_a": "12" } },
            "getUserSigninInfo": { "sendData": { "_m": "805", "_a": "1-1" } },
            "signin": { "sendData": { "_m": "805", "_a": "1-2" } },
            "replenishSignin": { "sendData": { "_m": "805", "_a": "1-3" } },
            "getBag": { "sendData": { "_m": "saute", "_a": "getBag" } },
            // "getBag":{"sendData":{"_m":"19","_a":"1"}},//炒茶室获取道具
            "sauteUseTool": { "sendData": { "_m": "20", "_a": "8" } },
            "receiveBiggift": { "sendData": { "_m": "12", "_a": "4" } },
            "giveFriendGift": { "sendData": { "_m": "12", "_a": "5" } },
            "giveFriendGiftNotify": { "sendData": { "_m": "12", "_a": "6" } },
            "getUserGiveGifts": { "sendData": { "_m": "12", "_a": "7" } },
            "receiveGivedGifts": { "sendData": { "_m": "12", "_a": "8" } },
            "getCertificateStatus": { "sendData": { "_m": "806", "_a": "1-1" } },
            "startCertificateExam": { "sendData": { "_m": "806", "_a": "1-3" } },
            "getCertificateQuestion": { "sendData": { "_m": "806", "_a": "1-2" } },
            "answerCertificateQuestion": { "sendData": { "_m": "806", "_a": "1-4" } },
            "finishCertificateExam": { "sendData": { "_m": "806", "_a": "1-5" } },
            "commitCertificateInfo": { "sendData": { "_m": "806", "_a": "1-6" } },
            "getPubacctBalance": { "sendData": { "_m": "1", "_a": "13" } },
            "buyPacketedGoods": { "sendData": { "_m": "22", "_a": "1" } } //直接购买打包的商品
        };
        return HttpConfig;
    }());
    configs.HttpConfig = HttpConfig;
})(configs || (configs = {}));
//# sourceMappingURL=HttpConfig.js.map
var models;
(function (models) {
    var friendList;
    (function (friendList) {
        /**
         * 好友列表数据模型
         */
        var FriendListModel = /** @class */ (function () {
            function FriendListModel() {
                FriendListModel.userInfoVOArr = new Array();
                FriendListModel.manageUserVOArr = new Array();
                FriendListModel.searchPalVOArr = new Array();
                FriendListModel.applyPalsVOArr = new Array();
            }
            FriendListModel.getInstance = function () {
                if (!FriendListModel._instance)
                    FriendListModel._instance = new FriendListModel();
                return FriendListModel._instance;
            };
            /** 获取好友页数信息 */
            FriendListModel.prototype.request_getUserPage = function (srh) {
                HttpServiceProxy.request("getMypalsNums", { "srh": srh }, this.getPageInfo);
            };
            /** 获取好友列表 */
            FriendListModel.prototype.request_getUserInfo = function (pg, odb, sr) {
                HttpServiceProxy.request("getMypals", { "pg": pg, "odb": odb, "sr": sr }, this.getUserInfo);
            };
            /** 获取好友管理用户信息 */
            FriendListModel.prototype.requset_getManageUser = function (pg) {
                HttpServiceProxy.request("getMyPalsFromManage", { "pg": pg }, this.getManageUserInfo);
            };
            /** 搜索好友以供添加使用 */
            FriendListModel.prototype.requset_addPals = function (name, pg) {
                HttpServiceProxy.request("addMypalsByName", { "name": name, "pg": pg }, this.getNewPalInfo);
            };
            /** 删除好友 */
            FriendListModel.prototype.request_deleteFriend = function (userId) {
                HttpServiceProxy.request("deleteMypalsById", { "id": userId }, this.getDeleteInfo, { "userId": userId });
            };
            /** 获取好友申请列表 */
            FriendListModel.prototype.request_getApplyPals = function (pg) {
                HttpServiceProxy.request("AskForMypalsData", { "pg": pg }, this.getApplyList);
            };
            FriendListModel.prototype.getPageInfo = function (receiveData) {
                if (receiveData) {
                    this.receiveData = receiveData;
                }
                var pageObj = receiveData;
                FriendListModel.pageNums = pageObj["fc"];
                console.log("获取到的好友页数：" + FriendListModel.pageNums);
                FriendListModel.getInstance().handleCallback(FriendListModel.pageNums);
            };
            FriendListModel.prototype.getUserInfo = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var userArr = receiveData["_d"];
                FriendListModel.userInfoVOArr.splice(0, FriendListModel.userInfoVOArr.length);
                var userVO;
                var userObj;
                var i;
                var len = userArr.length;
                for (i = 0; i < len; i++) {
                    userVO = new models.friendList.FriendInfoVO();
                    userObj = userArr[i];
                    userVO.userId = userObj["_f"];
                    userVO.userName = userObj["fn"];
                    userVO.imgurl = userObj["i"];
                    userVO.status = userObj["s"];
                    userVO.ranking = userObj["rk"];
                    FriendListModel.userInfoVOArr.push(userVO);
                }
                FriendListModel.getInstance().handleCallback(FriendListModel.userInfoVOArr);
            };
            FriendListModel.prototype.getManageUserInfo = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                var manageUserArr = receiveData["_d"];
                FriendListModel.manageUserVOArr.splice(0, FriendListModel.manageUserVOArr.length);
                var manageUserVO;
                var manageUserObj;
                var i;
                var len = manageUserArr.length;
                if (len <= 0) {
                    FriendListModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
                }
                else {
                    for (i = 0; i < len; i++) {
                        manageUserVO = new models.friendList.FriendInfoVO();
                        manageUserObj = manageUserArr[i];
                        manageUserVO.userId = manageUserObj["_f"];
                        manageUserVO.userName = manageUserObj["fn"];
                        manageUserVO.imgurl = manageUserObj["i"];
                        manageUserVO.level = manageUserObj["level"];
                        FriendListModel.manageUserVOArr.push(manageUserVO);
                    }
                    FriendListModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
                }
            };
            FriendListModel.prototype.getNewPalInfo = function (receiveData) {
                if (!receiveData)
                    return;
                // 搜索结果失败
                if (parseInt(receiveData["_cmsg"].length) > 1) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                    return;
                }
                else {
                    var key = void 0;
                    var newPalObj = void 0;
                    var newPalVO = void 0;
                    FriendListModel.searchPalVOArr.splice(0, FriendListModel.searchPalVOArr.length);
                    var newPalObjs = receiveData["_d"];
                    for (key in newPalObjs) {
                        newPalObj = new Object();
                        newPalVO = new models.friendList.FriendInfoVO();
                        newPalObj = newPalObjs[key];
                        newPalVO.userId = newPalObj["_f"];
                        newPalVO.userName = newPalObj["name"];
                        newPalVO.imgurl = newPalObj["img"];
                        newPalVO.level = newPalObj["level"];
                        newPalVO.pageNums = receiveData["pg"];
                        FriendListModel.searchPalVOArr.push(newPalVO);
                    }
                    FriendListModel.getInstance().handleCallback(FriendListModel.searchPalVOArr);
                }
            };
            FriendListModel.prototype.getDeleteInfo = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                // 删除成功
                if (receiveData.hasOwnProperty("_cmsg")) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                    var i = void 0;
                    var j = void 0;
                    var listLen = FriendListModel.userInfoVOArr.length;
                    var manageLen = FriendListModel.manageUserVOArr.length;
                    var userVO = void 0;
                    var manageUserVO = void 0;
                    for (i = 0; i < listLen; i++) {
                        userVO = new models.friendList.FriendInfoVO();
                        userVO = FriendListModel.userInfoVOArr[i];
                        if (parseInt(userVO.userId) == parseInt(takeData["userId"])) {
                            FriendListModel.userInfoVOArr.splice(i, 1);
                            break;
                        }
                    }
                    for (j = 0; j < manageLen; j++) {
                        manageUserVO = new models.friendList.FriendInfoVO();
                        manageUserVO = FriendListModel.manageUserVOArr[j];
                        if (parseInt(manageUserVO.userId) == parseInt(takeData["userId"])) {
                            FriendListModel.manageUserVOArr.splice(j, 1);
                            break;
                        }
                    }
                    console.log("最终获得的管理层好友数据：" + JSON.stringify(FriendListModel.manageUserVOArr));
                    FriendListModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
                }
            };
            FriendListModel.prototype.getApplyList = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                FriendListModel.applyPalsVOArr.splice(0, FriendListModel.applyPalsVOArr.length);
                // 无申请
                if (parseInt(receiveData["_cmsg"].length) > 1) {
                    FriendListModel.getInstance().handleCallback(FriendListModel.applyPalsVOArr);
                }
                else {
                    var i = void 0;
                    var key = void 0;
                    var applyVO = void 0;
                    var applyObjs = receiveData["_d"];
                    for (key in applyObjs) {
                        applyVO = new models.friendList.FriendInfoVO();
                        var applyObj = applyObjs[key];
                        applyVO.userId = applyObj["_f"];
                        applyVO.userName = applyObj["name"];
                        applyVO.level = applyObj["level"];
                        applyVO.pageNums = receiveData["pg"];
                        FriendListModel.applyPalsVOArr.push(applyVO);
                    }
                    FriendListModel.getInstance().handleCallback(FriendListModel.applyPalsVOArr);
                }
            };
            FriendListModel.prototype.handleCallback = function (takeData) {
                if (FriendListModel.callback) {
                    if (takeData)
                        FriendListModel.callback(takeData);
                    else
                        FriendListModel.callback();
                }
            };
            return FriendListModel;
        }());
        friendList.FriendListModel = FriendListModel;
    })(friendList = models.friendList || (models.friendList = {}));
})(models || (models = {}));
//# sourceMappingURL=FriendListModel.js.map
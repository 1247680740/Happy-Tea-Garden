var models;
(function (models) {
    var friendList;
    (function (friendList) {
        var FriendListModel = models.friendList.FriendListModel;
        /**
         * 好友搜索添加数据模型
         */
        var AddFriendDialogModel = /** @class */ (function () {
            function AddFriendDialogModel() {
                AddFriendDialogModel.recommonPalVOArr = new Array();
            }
            AddFriendDialogModel.getInstance = function () {
                if (!AddFriendDialogModel._instance)
                    AddFriendDialogModel._instance = new AddFriendDialogModel();
                return AddFriendDialogModel._instance;
            };
            /** 搜索好友以供添加使用 */
            AddFriendDialogModel.prototype.requset_addPals = function (id) {
                HttpServiceProxy.request("wealthListAddPals", { "id": id }, this.getNewPalInfo, { userId: id });
            };
            /** 获取推荐好友名额 */
            AddFriendDialogModel.prototype.request_getReCommon = function () {
                HttpServiceProxy.request("RecommendMypalsData", null, this.getRecommonList);
            };
            /** 发送添加推荐好友申请 */
            AddFriendDialogModel.prototype.request_setApplyInfo = function (userId) {
                HttpServiceProxy.request("addAllRecommondMypals", { "id": userId }, this.getApplyInfo);
            };
            /** 同意好友申请请求 */
            AddFriendDialogModel.prototype.request_getAgreeApplyInfo = function (id, agree) {
                HttpServiceProxy.request("operateAskForData", { "id": id, "agree": agree }, this.getAgreeInfo, { "id": id });
            };
            AddFriendDialogModel.prototype.getNewPalInfo = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                // 添加成功
                if (receiveData.hasOwnProperty("_cmsg")) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                    var userId = takeData["userId"];
                    var strArr = new Array();
                    strArr = userId.split(",");
                    var i = void 0;
                    var j = void 0;
                    var strLen = strArr.length;
                    var searchLen = FriendListModel.searchPalVOArr.length;
                    var userVO = void 0;
                    for (i = 0; i < strLen; i++) {
                        for (j = 0; j < searchLen; j++) {
                            userVO = new models.friendList.FriendInfoVO();
                            userVO = FriendListModel.searchPalVOArr[j];
                            if (parseInt(userVO.userId) == parseInt(strArr[i])) {
                                FriendListModel.userInfoVOArr.push(userVO);
                                FriendListModel.manageUserVOArr.push(userVO);
                            }
                        }
                    }
                    console.log("最终获得的管理层好友数据：" + JSON.stringify(FriendListModel.manageUserVOArr));
                    AddFriendDialogModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
                }
            };
            AddFriendDialogModel.prototype.getRecommonList = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (parseInt(receiveData["_cmsg"].length) > 1) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                }
                else {
                    var key = void 0;
                    var palObj = void 0;
                    var palInfoVO = void 0;
                    var palsObj = receiveData["_d"];
                    for (key in palsObj) {
                        palObj = palsObj[key];
                        palInfoVO = new models.friendList.FriendInfoVO();
                        palInfoVO.userId = palObj["_f"];
                        palInfoVO.userName = palObj["name"];
                        palInfoVO.imgurl = palObj["img"];
                        palInfoVO.level = palObj["level"];
                        AddFriendDialogModel.recommonPalVOArr.push(palInfoVO);
                    }
                    AddFriendDialogModel.getInstance().handleCallback(AddFriendDialogModel.recommonPalVOArr);
                }
            };
            AddFriendDialogModel.prototype.getApplyInfo = function (receiveData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (receiveData.hasOwnProperty("_cmsg")) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                }
                else {
                    return;
                }
            };
            AddFriendDialogModel.prototype.getAgreeInfo = function (receiveData, takeData) {
                if (receiveData)
                    this.receiveData = receiveData;
                if (takeData)
                    this.takeData = takeData;
                if (receiveData.hasOwnProperty("_cmsg")) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                    var str = takeData["id"] + ",";
                    var strArr = str.split(",");
                    var i = void 0;
                    var j = void 0;
                    var strLen = strArr.length;
                    var applyListLen = FriendListModel.applyPalsVOArr.length;
                    var applyVO = void 0;
                    for (i = 0; i < strLen; i++) {
                        var nums = parseInt(strArr[i]);
                        applyVO = new models.friendList.FriendInfoVO();
                        for (j = 0; j < applyListLen; j++) {
                            applyVO = FriendListModel.applyPalsVOArr[j];
                            if (parseInt(applyVO.userId) == nums) {
                                FriendListModel.applyPalsVOArr.splice(j, 1);
                            }
                        }
                    }
                    AddFriendDialogModel.getInstance().handleCallback(FriendListModel.applyPalsVOArr);
                }
            };
            AddFriendDialogModel.prototype.handleCallback = function (takeData) {
                if (AddFriendDialogModel.callback) {
                    if (takeData)
                        AddFriendDialogModel.callback(takeData);
                    else
                        AddFriendDialogModel.callback();
                }
            };
            return AddFriendDialogModel;
        }());
        friendList.AddFriendDialogModel = AddFriendDialogModel;
    })(friendList = models.friendList || (models.friendList = {}));
})(models || (models = {}));
//# sourceMappingURL=AddFriendDialogModel.js.map
namespace models.friendList
{
	import friendInfoVo = models.friendList.FriendInfoVO;
    import AddFriendDialogCtrl = controllers.friendList.AddFriendDialogCtrl
    import FriendListModel = models.friendList.FriendListModel;
	/**
	 * 好友搜索添加数据模型
	 */
	export class AddFriendDialogModel
	{

		private static _instance:AddFriendDialogModel;

		/** 服务器返回的数据 */
		receiveData: any;
		/** 请求前自带的数据 */
		takeData: any;
        /** 响应数据处理完毕回调 */
		static callback:Function;
		static pageNums:number;
		/** 搜索好友数据集合 */
		static recommonPalVOArr:Array<friendInfoVo>;
		constructor()
		{
			AddFriendDialogModel.recommonPalVOArr = new Array<friendInfoVo>();
		}

		static getInstance():AddFriendDialogModel
		{
			if(!AddFriendDialogModel._instance)
            AddFriendDialogModel._instance = new AddFriendDialogModel();
			return AddFriendDialogModel._instance;
        }


		/** 搜索好友以供添加使用 */
		requset_addPals(id:string):void{
			HttpServiceProxy.request("wealthListAddPals",{"id":id},this.getNewPalInfo,{userId:id});
		}

		/** 获取推荐好友名额 */
		request_getReCommon():void{
			HttpServiceProxy.request("RecommendMypalsData",null,this.getRecommonList);
		}

		/** 发送添加推荐好友申请 */
		request_setApplyInfo(userId:string):void{
			HttpServiceProxy.request("addAllRecommondMypals",{"id":userId},this.getApplyInfo);
		}

		/** 同意好友申请请求 */
		request_getAgreeApplyInfo(id:string,agree:number):void{
			HttpServiceProxy.request("operateAskForData",{"id":id,"agree":agree},this.getAgreeInfo,{"id":id});
		}

		getNewPalInfo(receiveData?:any,takeData?:any):void{
			if(receiveData)
                this.receiveData=receiveData;
            if(takeData)
                this.takeData=takeData;
            // 添加成功
            if(receiveData.hasOwnProperty("_cmsg"))
            {
                TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                let userId:string = takeData["userId"];
                let strArr:Array<string>=new Array<string>();
                strArr = userId.split(",");
                let i:number;
                let j:number;
                let strLen:number=strArr.length;
                let searchLen:number=FriendListModel.searchPalVOArr.length;
                let userVO:models.friendList.FriendInfoVO;
                for (i=0;i<strLen;i++) {
                    for(j=0;j<searchLen;j++){
                        userVO=new models.friendList.FriendInfoVO();
                        userVO=FriendListModel.searchPalVOArr[j];
                        if(parseInt(userVO.userId)==parseInt(strArr[i])){
                            FriendListModel.userInfoVOArr.push(userVO);
                            FriendListModel.manageUserVOArr.push(userVO);
                        }
                    }
                }
                console.log("最终获得的管理层好友数据："+JSON.stringify(FriendListModel.manageUserVOArr));
                AddFriendDialogModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
            }
		}


		getRecommonList(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;

			if(parseInt(receiveData["_cmsg"].length)>1){
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
			}else{
				let key:string;
				let palObj:Object;
				let palInfoVO:models.friendList.FriendInfoVO;
				let palsObj:Object=receiveData["_d"];
				for (key in palsObj) {
					 palObj= palsObj[key];
					 palInfoVO=new models.friendList.FriendInfoVO();
					 palInfoVO.userId=palObj["_f"];
					 palInfoVO.userName=palObj["name"];
					 palInfoVO.imgurl=palObj["img"];
					 palInfoVO.level=palObj["level"];
					AddFriendDialogModel.recommonPalVOArr.push(palInfoVO);
				}
				AddFriendDialogModel.getInstance().handleCallback(AddFriendDialogModel.recommonPalVOArr);
			}
		}

		getApplyInfo(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			if(receiveData.hasOwnProperty("_cmsg")){
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
			}else{
				return;
			}
		}


		getAgreeInfo(receiveData?:any,takeData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;
			if(receiveData.hasOwnProperty("_cmsg")){
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
				let str:string=takeData["id"]+",";
				let strArr:Array<string> = str.split(",");
				let i:number;
				let j:number;
				let strLen:number=strArr.length;
				let applyListLen:number=FriendListModel.applyPalsVOArr.length;
				let applyVO:models.friendList.FriendInfoVO;
				for(i=0;i<strLen;i++){
					let nums:number=parseInt(strArr[i]);
					applyVO=new models.friendList.FriendInfoVO();
					for(j=0;j<applyListLen;j++){
						applyVO=FriendListModel.applyPalsVOArr[j];
						if(parseInt(applyVO.userId)==nums){
							FriendListModel.applyPalsVOArr.splice(j,1);
						}
					}
				}
				AddFriendDialogModel.getInstance().handleCallback(FriendListModel.applyPalsVOArr);
			}
		}


		handleCallback(takeData?:any):void
		{
			if(AddFriendDialogModel.callback)
			{
				if(takeData)
                    AddFriendDialogModel.callback(takeData);
				else
                    AddFriendDialogModel.callback();
			}
		}
	}
}
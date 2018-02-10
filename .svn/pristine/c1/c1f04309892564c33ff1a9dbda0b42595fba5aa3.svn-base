namespace models.friendList
{
	import friendInfoVo = models.friendList.FriendInfoVO;
    import FriendListCtrl = controllers.friendList.FriendListCtrl

	/**
	 * 好友列表数据模型
	 */
	export class FriendListModel
	{

		private static _instance:FriendListModel;

		/** 服务器返回的数据 */
		receiveData: any;
		/** 请求前自带的数据 */
		takeData: any;
        /** 响应数据处理完毕回调 */
		static callback:Function;
		static pageNums:number;
		/** 好友列表数据集合 */
		static userInfoVOArr:Array<friendInfoVo>;
		/** 好友管理数据集合 */
		static manageUserVOArr:Array<friendInfoVo>;
		/** 搜索好友数据集合 */
		static searchPalVOArr:Array<friendInfoVo>;
		/** 好友申请数据集合 */
		static applyPalsVOArr:Array<friendInfoVo>;
		constructor()
		{
			FriendListModel.userInfoVOArr = new Array<friendInfoVo>();
			FriendListModel.manageUserVOArr = new Array<friendInfoVo>();
			FriendListModel.searchPalVOArr = new Array<friendInfoVo>();
			FriendListModel.applyPalsVOArr = new Array<friendInfoVo>();
		}

		static getInstance():FriendListModel
		{
			if(!FriendListModel._instance)
				FriendListModel._instance = new FriendListModel();
			return FriendListModel._instance;
		}
        /** 获取好友页数信息 */
        request_getUserPage(srh:number):void{
            HttpServiceProxy.request("getMypalsNums",{"srh":srh},this.getPageInfo);
        }

		/** 获取好友列表 */
		request_getUserInfo(pg:number,odb:string,sr:number):void{
			HttpServiceProxy.request("getMypals",{"pg":pg,"odb":odb,"sr":sr},this.getUserInfo);
		}

		/** 获取好友管理用户信息 */
		requset_getManageUser(pg:number):void{
			HttpServiceProxy.request("getMyPalsFromManage",{"pg":pg},this.getManageUserInfo);
		}

		/** 搜索好友以供添加使用 */
		requset_addPals(name:string,pg:number):void{
			HttpServiceProxy.request("addMypalsByName",{"name":name,"pg":pg},this.getNewPalInfo);
		}

		/** 删除好友 */
		request_deleteFriend(userId:string):void{
			HttpServiceProxy.request("deleteMypalsById",{"id":userId},this.getDeleteInfo,{"userId":userId});
		}

		/** 获取好友申请列表 */
		request_getApplyPals(pg:number):void{
			HttpServiceProxy.request("AskForMypalsData",{"pg":pg},this.getApplyList);
		}
        getPageInfo(receiveData?:any):void{
            if(receiveData){
                this.receiveData=receiveData;
            }
			let pageObj:Object=receiveData;
			FriendListModel.pageNums=pageObj["fc"];
			console.log("获取到的好友页数："+FriendListModel.pageNums);
			FriendListModel.getInstance().handleCallback(FriendListModel.pageNums);

		}

		getUserInfo(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			let userArr:Array<Object>=receiveData["_d"];
			FriendListModel.userInfoVOArr.splice(0,FriendListModel.userInfoVOArr.length);
			let userVO:models.friendList.FriendInfoVO;
			let userObj:Object;
			let i:number;
			let len:number= userArr.length;
			for(i=0;i<len;i++){
				userVO=new models.friendList.FriendInfoVO();
				userObj=userArr[i];
				userVO.userId=userObj["_f"];
				userVO.userName=userObj["fn"];
				userVO.imgurl=userObj["i"];
				userVO.status=userObj["s"];
				userVO.ranking=userObj["rk"];
				FriendListModel.userInfoVOArr.push(userVO);
			}
			FriendListModel.getInstance().handleCallback(FriendListModel.userInfoVOArr);
		}

		getManageUserInfo(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			let manageUserArr:Array<Object>=receiveData["_d"];
			FriendListModel.manageUserVOArr.splice(0,FriendListModel.manageUserVOArr.length);
			let manageUserVO:models.friendList.FriendInfoVO;
			let manageUserObj:Object;
			let i:number;
			let len:number= manageUserArr.length;
			if(len<=0){
				FriendListModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
			}else{
				for(i=0;i<len;i++){
					manageUserVO=new models.friendList.FriendInfoVO();
					manageUserObj=manageUserArr[i];
					manageUserVO.userId=manageUserObj["_f"];
					manageUserVO.userName=manageUserObj["fn"];
					manageUserVO.imgurl=manageUserObj["i"];
					manageUserVO.level=manageUserObj["level"];
					FriendListModel.manageUserVOArr.push(manageUserVO);
				}
				FriendListModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
			}
		}

		getNewPalInfo(receiveData?:any):void{
			if(!receiveData)
				return;
			// 搜索结果失败
			if(parseInt(receiveData["_cmsg"].length)>1)
			{
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
				return;
			}
			else
			{
				let key:string;
				let newPalObj:Object;
				let newPalVO:models.friendList.FriendInfoVO;
				FriendListModel.searchPalVOArr.splice(0,FriendListModel.searchPalVOArr.length);
				let newPalObjs:Object=receiveData["_d"];
				for (key in newPalObjs) {
					newPalObj=new Object();
					newPalVO=new models.friendList.FriendInfoVO();
					newPalObj = newPalObjs[key];
					newPalVO.userId=newPalObj["_f"];
					newPalVO.userName=newPalObj["name"];
					newPalVO.imgurl=newPalObj["img"];
					newPalVO.level=newPalObj["level"];
					newPalVO.pageNums=receiveData["pg"];
					FriendListModel.searchPalVOArr.push(newPalVO);
				}
				FriendListModel.getInstance().handleCallback(FriendListModel.searchPalVOArr);
			}
		}

		getDeleteInfo(receiveData?:any,takeData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;
			// 删除成功
			if(receiveData.hasOwnProperty("_cmsg"))
			{
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
				let i:number;
				let j:number;
				let listLen:number=FriendListModel.userInfoVOArr.length;
				let manageLen:number=FriendListModel.manageUserVOArr.length;
				let userVO:models.friendList.FriendInfoVO;
				let manageUserVO:models.friendList.FriendInfoVO;
				for (i=0;i<listLen;i++) {
					userVO=new models.friendList.FriendInfoVO();
					userVO=FriendListModel.userInfoVOArr[i];
					if(parseInt(userVO.userId)==parseInt(takeData["userId"])){
						FriendListModel.userInfoVOArr.splice(i,1);
						break;
					}
				}
				for (j=0;j<manageLen;j++) {
					manageUserVO=new models.friendList.FriendInfoVO();
					manageUserVO=FriendListModel.manageUserVOArr[j];
					if(parseInt(manageUserVO.userId)==parseInt(takeData["userId"])){
						FriendListModel.manageUserVOArr.splice(j,1);
						break;
					}
				}
				console.log("最终获得的管理层好友数据："+JSON.stringify(FriendListModel.manageUserVOArr));
				FriendListModel.getInstance().handleCallback(FriendListModel.manageUserVOArr);
			}
		}

		getApplyList(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			FriendListModel.applyPalsVOArr.splice(0,FriendListModel.applyPalsVOArr.length);
			// 无申请
			if(parseInt(receiveData["_cmsg"].length)>1)
			{
				FriendListModel.getInstance().handleCallback(FriendListModel.applyPalsVOArr);
			}else{
				let i:number;
				let key:string;
				let applyVO:models.friendList.FriendInfoVO;
				let applyObjs:Object=receiveData["_d"];
				for (key in applyObjs) {
					applyVO=new models.friendList.FriendInfoVO();
					let applyObj:Object = applyObjs[key];
					applyVO.userId=applyObj["_f"];
					applyVO.userName=applyObj["name"];
					applyVO.level=applyObj["level"];
					applyVO.pageNums=receiveData["pg"];
					FriendListModel.applyPalsVOArr.push(applyVO);
				}
				FriendListModel.getInstance().handleCallback(FriendListModel.applyPalsVOArr);
			}

		}

		handleCallback(takeData?:any):void
		{
			if(FriendListModel.callback)
			{
				if(takeData)
					FriendListModel.callback(takeData);
				else
					FriendListModel.callback();
			}
		}
	}
}
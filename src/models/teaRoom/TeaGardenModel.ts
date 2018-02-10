namespace models.teaRoom
{
	// import PlayerInfoModel = models.player.PlayerInfoModel;

	/**
	 * 茶园场景数据模型
	 * @author hsx
	 */
	export class TeaGardenModel
	{
		private static _instance:TeaGardenModel;
		static userDecVOArr:Array<models.base.ToolVO>;
		static decorationVOArr:Array<models.base.ToolVO>;
		static teaGardenVO:models.base.TeaGardenVO;
		static friendTeaGardenVO:models.base.TeaGardenVO;
		receiveData:any;

		/** 响应数据处理完毕回调 */
		static callback:Function;

		constructor()
		{
			TeaGardenModel.teaGardenVO = new models.base.TeaGardenVO();
			TeaGardenModel.friendTeaGardenVO = new models.base.TeaGardenVO();
			TeaGardenModel.userDecVOArr = new Array<models.base.ToolVO>();
			TeaGardenModel.decorationVOArr = new Array<models.base.ToolVO>();
		}

		static get instance():TeaGardenModel
		{
			if(!TeaGardenModel._instance)
				TeaGardenModel._instance = new TeaGardenModel();
			return TeaGardenModel._instance;
		}

		/**
		 * 请求狗的数据 (get url about dog's id)
		 * 有 "getDog" 接口与之对应（get dog's id）
		 */
		request_initDog():void
		{
			HttpServiceProxy.request("initDog",null,this.initDogOver);
		}

		request_initFriendDog(userId:string):void
		{
			HttpServiceProxy.request("initDog",{"_f":userId},this.initFriendDogOver);
		}

		private initDogOver(receiveData:Object):void
		{
			if(!receiveData)
				return;

			let takeData:Object = new Object();
			takeData["swfUrl"] = receiveData["timg"];

			TeaGardenModel.instance.handleCallback(takeData);
		}

		private initFriendDogOver(receiveData:Object):void
		{
			if(!receiveData)
				return;

			let takeData:Object = new Object();
			takeData["swfUrl"] = receiveData["timg"];

			TeaGardenModel.instance.handleCallback(takeData);
		}

		/**
		 * 请求茶农数据 (get url about farmer's id)
		 * 有 "getFarmer" 接口与之对应（get farmer's id）
		 */
		request_initFarmer():void
		{
			HttpServiceProxy.request("initFarmer",null,this.initFarmerOver);
		}

		request_initFriendFarmer(userId:string):void
		{
			HttpServiceProxy.request("initFarmer",{"_f":userId},this.initFriendFarmerOver);
		}

		private initFarmerOver(receiveData:Object):void
		{
			if(!receiveData)
				return;
			// {"_c":"1","_cmsg":"","_api":"initFarmer_5699","tn":"张大姐","timg":"http://kaixins.app100712594.twsapp.com/static/farmer_13.swf",
			// "farmercard":72678,"_cmd":"","_g":"","_e":""}
			if(receiveData["_cmsg"].length == 0)
			{
				TeaGardenModel.teaGardenVO.restTimeOfWork = receiveData["farmercard"]?receiveData["farmercard"]:0;
				TeaGardenModel.teaGardenVO.farmerUrl = receiveData["timg"]?receiveData["timg"]:null;
				TeaGardenModel.instance.handleCallback(receiveData);
			}
		}

		private initFriendFarmerOver(receiveData:Object):void
		{
			if(!receiveData)
				return;
			// {"_c":"1","_cmsg":"","_api":"initFarmer_5699","tn":"张大姐","timg":"http://kaixins.app100712594.twsapp.com/static/farmer_13.swf",
			// "farmercard":72678,"_cmd":"","_g":"","_e":""}
			if(receiveData["_cmsg"].length == 0)
			{
				TeaGardenModel.friendTeaGardenVO.restTimeOfWork = receiveData["farmercard"]?receiveData["farmercard"]:0;
				TeaGardenModel.friendTeaGardenVO.farmerUrl = receiveData["timg"]?receiveData["timg"]:null;
				TeaGardenModel.instance.handleCallback(receiveData);
			}
		}

		/**
		 * 请求用户自己的茶园背景
		 */
		request_getUserGardenDec():void
		{
			HttpServiceProxy.request("getFarmDecoration",null,this.getUserGardenDec);
		}
		/**
		 * 请求好友茶园背景
		 */
		request_getFarmDecoration(userId:string):void
		{
			HttpServiceProxy.request("getFarmDecoration",{"_f":userId},this.getFarmDecorationOver);
		}

		getUserGardenDec(receiveData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;
			let decInfoArr:Object= receiveData["_d"];
			TeaGardenModel.userDecVOArr.length=0;
			let key:string;
			let decVO: models.base.ToolVO;
			let storageDecVO:models.base.ToolVO;
			let decObj: Object;
			let storageDecObj:Object;
			let decObjArr:Array<Object>;
			for (key in decInfoArr) {
				decVO = new models.base.ToolVO();
				decObj = decInfoArr[key];
				decVO.id = decObj["di"];
				decVO.name = decObj["dn"];
				decVO.icon = decObj["realimg"];
				decVO.des = decObj["ty"];
				TeaGardenModel.userDecVOArr.push(decVO);
				decObjArr=decObj["attach"];
				for(let j:number=0;j<decObjArr.length;j++){
					storageDecVO=new models.base.ToolVO();
					storageDecObj=decObjArr[j];
					storageDecVO.id = storageDecObj["di"];
					storageDecVO.name = storageDecObj["dn"];
					storageDecVO.icon = storageDecObj["realimg"];
					storageDecVO.des = storageDecObj["ty"];
					TeaGardenModel.userDecVOArr.push(storageDecVO);
				}
			}
			TeaGardenModel.instance.handleCallback(TeaGardenModel.userDecVOArr);
		}

	    getFarmDecorationOver(receiveData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;
			TeaGardenModel.decorationVOArr.length=0;
			let decInfoArr:Object= receiveData["_d"];
			let key:string;
			let decVO: models.base.ToolVO;
			let decObj: Object;
			for (key in decInfoArr) {
				decVO = new models.base.ToolVO();
				decObj = decInfoArr[key];
				decVO.id = decObj["di"];
				decVO.name = decObj["dn"];
				decVO.icon = decObj["realimg"];
				decVO.des = decObj["ty"];
				TeaGardenModel.decorationVOArr.push(decVO);
			}
			TeaGardenModel.instance.handleCallback(TeaGardenModel.decorationVOArr);
		}


		/**
		 * 根据服务器返回的结果做相应的后续处理
		 */
		private resultHandler(receiveData:Object, takeData:Object):void
		{
			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				let exp:number = receiveData["_e"]?receiveData["_e"]:0;
				if(exp)
				{
					takeData["exp"] = exp;
				}
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
			TeaGardenModel.instance.handleCallback(takeData);
		}


		handleCallback(takeData?:any):void
		{
			if(TeaGardenModel.callback)
			{
				if(takeData)
					TeaGardenModel.callback(takeData);
				else
					TeaGardenModel.callback();
			}
		}

	}
}
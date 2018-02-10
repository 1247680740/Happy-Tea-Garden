namespace models.teaRoom.shop
{
	import ToolVO = models.base.ToolVO;
	// import PlayerInfoModel = models.player.PlayerInfoModel;
	// import ResourceManager = managers.ResourceManager;

	/**
	 * 商店数据模型
	 */
	export class ShopModel
	{

		private static _instance:ShopModel;

		/** 服务器返回的数据 */
		static receiveData: any;
		/** 请求前自带的数据 */
		static takeData: any;

		/** 配置表对应的鲜叶数据 */
		seedObjArr:Array<Object>;
		/** 配置表对应的道具数据 */
		toolObjArr:Array<Object>;

		/** 右侧描述信息 */
		rightContentObj:Object;

		/** 响应数据处理完毕回调 */
		static callback:Function;

		constructor()
		{
			this.seedObjArr = managers.ResourceManager.seedsObjArr;
			this.toolObjArr = managers.ResourceManager.toolsObjArr;
		}

		static get instance():ShopModel
		{
			if(!ShopModel._instance)
				ShopModel._instance = new ShopModel();
			return ShopModel._instance;
		}

		/**
		 * 获取鲜叶数据
		 */
		getSeedData():void
		{
			this.handleCallback(this.seedObjArr);
/*
			desc:"绿茶是不经过发酵的茶，即将鲜叶经过摊晾后直接下到一二百度的热锅里炒制，以保持其绿色的特点。日照绿茶汤色黄绿明亮、栗香浓郁、回味甘醇、叶片厚、香气高、耐冲泡。"
            exp:"73"
            fruitShopPrice:"68"
            group:"tea"
            growCircle:"54900,82350,82350"
            harvest:"4"
            id:"105"
            level:"40"
            market:"1"
            name:"御青绿茶"
            output:"58"
            pn:"种子,幼苗期,生长,茂盛"
            price:"1972"
            rank:"110"
            res:"fruit_105.swf"
			saute:"1"
			season:"1"
			seasonName:"一季作物"
			shopDesc:"【御青】日照绿茶中国味道祥云版特级礼盒装220克，选用优质原料制成。"
			show:"1"
			thieve:"0"
			userFruitPrice:"34"
			yb:"0"
			ybp:"23"
*/

/*			界面显示：
			【种子】
			左侧：
			等级、名称、图标、买入价格、类型（茶、花、粮）
			右侧：
			名称、图标、作物类型（一季作物）、产量、售价、收入、收获经验、等级（等级不足）、成熟时间、再次成熟、描述
*/
/*			let len:number = seedObjArr.length;
			let i:number;
			let itemObj:Object;
			let seedVO:models.base.SeedVO;
			for(i=0; i<len; i++)
			{
				itemObj = seedObjArr[i];
				// market == 0,表示不可交易
				if(!itemObj["market"])
					continue;
				seedVO.id = parseInt(itemObj["id"]);
				seedVO.name = itemObj["name"];
				seedVO.seedNums = 0;
				// seedVO.icon = itemObj["res"];	// .swf，待处理！
				let iconUrl:string = itemObj["res"];
				iconUrl = iconUrl.substring(0,iconUrl.lastIndexOf("."))+".png";
				seedVO.icon = iconUrl;
				seedVO.seedBuyPrice = itemObj["price"];
				seedVO.seedDes = itemObj["shopDesc"];
				// seedVO. = itemObj["yb"];
				seedVO.lvl = itemObj["level"];
				seedVO.type = itemObj["group"]+"seed";

				this.seedVOArr.push(seedVO);
			}

			ShopModel.instance.handleCallback(this.seedVOArr);
*/
		}

		/**
		 * 道具项（返回已购买的道具id）
		 */
		request_getShopProp():void
		{
			HttpServiceProxy.request("getShopProp",null,this.getShopPropOver);
		}

		getShopPropOver(receiveData:any):void
		{
			if(!receiveData)
				return;

			let toolIdsArr:Array<number> = receiveData["_d"];
			if(!toolIdsArr || !ShopModel.instance.toolObjArr)
				return;

			// 整合配置表的原始数据与返回的道具id数组
			let i:number;
			let j:number;
			let curId:number;
			let curObj:Object;
			let idsLen:number = toolIdsArr.length;
			let objsLen:number = ShopModel.instance.toolObjArr.length;
			for(i=0; i<idsLen; i++)
			{
				curId = toolIdsArr[i];
				// console.log("== curId:"+curId);
				for(j=0; j<objsLen; j++)
				{
					curObj = ShopModel.instance.toolObjArr[j];
					if(curId == curObj["id"])
					{
						curObj["hasBuy"] = "true";
						break;
					}
					else
					{
						curObj["hasBuy"] = "false";
					}
				}
			}
			ShopModel.instance.handleCallback(ShopModel.instance.toolObjArr);
		}

		/**
		 * 装饰项
		 */
		request_getShopDecorate():void
		{

		}

		/**
		 * 购买物品
		 */
		request_buySingleGoods(obj:Object):void
		{
			HttpServiceProxy.request("buySingleGoods",obj,this.buySingleGoodsOver);
		}

		buySingleGoodsOver(receiveData:any):void
		{
			if(!receiveData)
				return;

			let spendObj:Object;
			if(receiveData["_g"])
				spendObj = {"type":"金币","nums":receiveData["_g"]};
			else if(receiveData["_y"])
				spendObj = {"type":"钻石","nums":receiveData["_y"]};
			if(spendObj)
				TipLayerManager.tipLayer.showDrawBgTip("购买成功，花费："+Math.abs(spendObj["nums"])+"个"+spendObj["type"]+"！");

			// 更新玩家信息
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);

			// 后续接口调用
			if(receiveData["_cmd"])
			{
				let cmdObjArr:Object[] = receiveData["_cmd"];
				if(cmdObjArr && cmdObjArr.length>0)
				{
					let i:number;
					let len:number = cmdObjArr.length;
					let obj:Object = {};
					for(i=0; i<len; i++)
					{
						obj = cmdObjArr[i];
						if(obj && obj["name"])
						{
							// 茶农工资 购买成功后，更新茶农工作时间
							if(obj["name"] == "initFarmer")
								controllers.teaRoom.TeaGardenCtrl.getInstance().request_initFarmer();
						}
					}
				}
			}
		}

		/**
		 * 获取右侧内容数据
		 */
		request_getShopRightContentData(obj:Object):void
		{
			// HttpServiceProxy.request("getShopRightContentData",{"si":，"st":},this.getShopRightContentDataFn);


		}

		getShopRightContentDataFn(receiveData:any,takeData:any):void
		{
			if(!receiveData)
				return;

			this.rightContentObj = {};
			this.rightContentObj["errMsg"] = receiveData["_cmsg"];
			this.rightContentObj["exp"] = receiveData["_e"];
			this.rightContentObj["gold"] = receiveData["_g"];

			this.rightContentObj["d"] = receiveData["d"];
			this.rightContentObj["ext"] = receiveData["ext"];


		}

		handleCallback(takeData?:any):void
		{
			if(ShopModel.callback)
			{
				if(takeData)
					ShopModel.callback(takeData);
				else
					ShopModel.callback();
			}
		}
	}
}
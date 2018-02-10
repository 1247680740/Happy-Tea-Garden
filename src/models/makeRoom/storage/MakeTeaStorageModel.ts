namespace models.makeRoom.storage
{
	/**
	 * 泡茶室仓库相关数据模型
	 */
	export class MakeTeaStorageModel
	{
		/** 种子数据 */
		seedVOArr: Array<models.base.SeedVO>;
		/** 工具数据 */
		toolVOArr: Array<models.base.ToolVO>;

		/** 首个种子的参数数据（获取首个种子的描述信息） */
		firstObj: Object;

		/** 当前选中的对象所对应的 VO 数据，格式：{"type", "vo" } */
		static curSelectedObjVO: any = {};

		static receiveData: any;

		static callback: Function;

		private static instance: MakeTeaStorageModel;

		constructor()
		{
			this.seedVOArr = new Array<models.base.SeedVO>();
			this.toolVOArr = new Array<models.base.ToolVO>();

		}

		static getInstance(): MakeTeaStorageModel
		{
			if (!MakeTeaStorageModel.instance)
				MakeTeaStorageModel.instance = new MakeTeaStorageModel();
			return MakeTeaStorageModel.instance;
		}

		/**
		 * 获取茶叶数据
		 */
		request_getMaterial(): void
		{
			HttpServiceProxy.request("getDepottea",null,this.getMaterialOverFn);
		}

		/**
		 * 获取首个茶叶的描述信息
		 */
		request_getDepotRightContentData(paraObj?: Object): void
		{
			if (paraObj)
			{
				HttpServiceProxy.request("getDepotRightContentData", paraObj, this.getFirstSeedContentFn, paraObj);
			}
			else
			{
				HttpServiceProxy.request("getDepotRightContentData", this.firstObj, this.getFirstSeedContentFn, this.firstObj);
			}
		}

		/**
		 * 获取仓库水源数据
		 */
		request_getScroll(): void
		{
			HttpServiceProxy.request("getDepotWater", null, this.getScrollOverFn);
		}

		/**
		 * 卖出
		 * paraObj: {"si": id,"st": 类型,"sct": 卖出数量}
		 */
		request_sellSingle(paraObj: Object): void
		{
			HttpServiceProxy.request("sellSingle", { "si": paraObj["si"], "st": paraObj["st"], "sct": paraObj["sct"],"q":paraObj["q"]}, this.sellSingleOverFn);
		}

		private sellSingleOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;
			MakeTeaStorageModel.receiveData = receiveData;

			let takeData: Object = {};
			// 卖出失败
			if (receiveData["_cmsg"] && (receiveData["_cmsg"] as string).length > 2)
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{	// 经验、金币
				if (receiveData["_e"] > 0)
				{
					takeData["exp"] = receiveData["_e"];
				}
				if (receiveData["_g"] > 0)
				{
					takeData["money"] = receiveData["_g"];
				}
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
			MakeTeaStorageModel.instance.handleCallback(takeData);
		}

		private getMaterialOverFn(receiveData?:any): void
		{
            if(!receiveData)
				return;
			let teaObjArr:Array<Object> = receiveData["_d"];
			let len: number = teaObjArr.length;
			let teaObj:Object;
			let seedVO: models.base.SeedVO;
			let i: number, j: number;
			MakeTeaStorageModel.instance.seedVOArr.splice(0, MakeTeaStorageModel.instance.seedVOArr.length);
			for (i = 0; i < len; i++)
			{
				teaObj = teaObjArr[i];
				seedVO = new models.base.SeedVO();
				seedVO.id = teaObj["li"];
				seedVO.name = teaObj["ln"];
				seedVO.icon = teaObj["limg"];
				seedVO.lvl = teaObj["l"];
				seedVO.quality = teaObj["q"];  // 茶叶品质
				seedVO.qualityName = teaObj["qn"]; // 茶叶品质名称
				seedVO.fruitNums = teaObj["lc"];
				seedVO.fruitSalePrice = teaObj["lp"];
				seedVO.type = teaObj["ty"];
				MakeTeaStorageModel.instance.seedVOArr.push(seedVO);
			}
			if (MakeTeaStorageModel.instance.seedVOArr.length > 0)
			{
				MakeTeaStorageModel.instance.firstObj = { "si": MakeTeaStorageModel.instance.seedVOArr[0]["id"], "st": MakeTeaStorageModel.instance.seedVOArr[0]["type"] };
				MakeTeaStorageModel.instance.request_getDepotRightContentData();
			}
		}

		/**
		 * 按种子等级排序
		 */
		sortFn(a: models.base.SeedVO, b: models.base.SeedVO): number
		{
			if (a.lvl > b.lvl)
				return 1;
			else if (a.lvl < b.lvl)
				return -1;
			else
				return 0;
		}

		/**
		 * 将首个茶叶的描述信息加入对应的作物数据中（在作为种子、道具等的统一处理入口……）
		 */
		private getFirstSeedContentFn(receiveData: any, obj: Object): void
		{
			if (!receiveData || !obj)
				return;

			let len: number;
			let i: number;
			let seedVO: models.base.SeedVO;

			switch (obj["st"])
			{

				case "leaf":
					len = MakeTeaStorageModel.instance.seedVOArr.length;
					for (i = 0; i < len; i++)
					{
						seedVO = MakeTeaStorageModel.instance.seedVOArr[i];
						if (seedVO.id == obj["si"])
						{
							seedVO.seedFruitDes = receiveData["d"];
							MakeTeaStorageModel.curSelectedObjVO = seedVO;
							break;
						}
					}
					break;
				case "water":
					len = MakeTeaStorageModel.instance.toolVOArr.length;
					let toolVO: models.base.ToolVO;
					for (i = 0; i < len; i++)
					{
						toolVO = MakeTeaStorageModel.instance.toolVOArr[i];
						if (toolVO.id == obj["si"])
						{
							toolVO.des = receiveData["d"];
							MakeTeaStorageModel.curSelectedObjVO = toolVO;
							break;
						}
					}
					break;
			}
			MakeTeaStorageModel.instance.handleCallback();
		}

		private getScrollOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;

			let toolObjArr: Object[] = receiveData["_d"];
			let toolObj: Object;
			let toolVO: models.base.ToolVO;
			let key: string;
			let i:number;
			let len:number = toolObjArr.length;
			MakeTeaStorageModel.instance.toolVOArr.splice(0, MakeTeaStorageModel.instance.toolVOArr.length);
			for (i=0; i<len; i++)
			{
				toolObj = toolObjArr[i];
				if (toolObj.hasOwnProperty("ti"))
				{
					toolVO = new models.base.ToolVO();
					toolVO.id = toolObj["ti"];
					toolVO.price = toolObj["p"];
					toolVO.nums = parseInt(toolObj["tc"]);
					// console.log("道具类型："+toolVO.type);  // saute_tool / book
					MakeTeaStorageModel.instance.toolVOArr.push(toolVO);
				}
			}

			if (MakeTeaStorageModel.instance.toolVOArr.length > 0)
			{
				// FriedTeaStorageModel.instance.toolVOArr.sort(FriedTeaStorageModel.instance.sortFn2);
				MakeTeaStorageModel.instance.firstObj = { "si": MakeTeaStorageModel.instance.toolVOArr[0]["id"], "st": MakeTeaStorageModel.instance.toolVOArr[0]["type"] };
				MakeTeaStorageModel.instance.request_getDepotRightContentData();
			}
		}

		/**
		 * 按道具等级排序
		 */
		sortFn2(a: models.base.ToolVO, b: models.base.ToolVO): number
		{
			if (a.lvl > b.lvl)
				return 1;
			else if (a.lvl < b.lvl)
				return -1;
			else
				return 0;
		}

		handleCallback(takeData?: any): void
		{
			if (MakeTeaStorageModel.callback)
			{
				if (takeData)
					MakeTeaStorageModel.callback(takeData);
				else
					MakeTeaStorageModel.callback();
			}
		}

	}
}
namespace models.makeRoom
{
	import PotVO = models.friedRoom.pot.PotVO;
	import SeedVO=models.base.SeedVO;

	/**
	 * 炒茶相关数据
	 */
	export class MakeTeaDialogModel
	{
		/** 全部茶叶数据 */
		static allTeaVOArr: Array<models.base.SeedVO>;
		/** 茶叶详情数据集 */
		static teaShowVOArr:Array<models.base.SeedVO>;
		/** 泡茶材料数据集 */
		static dataShowVOArr:Array<Object>;
		/** 泡茶所需水源的数据 */
		static waterVOArr:Array<models.base.SeedVO>;
		/** 泡茶所需茶具数据 */
		static teaSetVOArr:Array<models.base.SeedVO>;
		/** 烧水时产生的数据 */
		static friedWaterVOArr:Array<models.base.SeedVO>;
		/** 当前泡茶组合得分 */
		static curScore:number;
		/** 数据类 */
		static seeVO:SeedVO;

		receiveData: any;
		takeData:any;
		static callback: Function;

		private static instance: MakeTeaDialogModel;

		constructor()
		{
			MakeTeaDialogModel.allTeaVOArr = new Array<models.base.SeedVO>();
			MakeTeaDialogModel.teaShowVOArr=new Array<models.base.SeedVO>();
			MakeTeaDialogModel.dataShowVOArr=new Array<Object>();
			MakeTeaDialogModel.waterVOArr=new Array<models.base.SeedVO>();
			MakeTeaDialogModel.teaSetVOArr=new Array<models.base.SeedVO>();
			MakeTeaDialogModel.friedWaterVOArr=new Array<models.base.SeedVO>();
			MakeTeaDialogModel.seeVO=new models.base.SeedVO();
		}

		static getInstance(): MakeTeaDialogModel
		{
			if (!MakeTeaDialogModel.instance)
				MakeTeaDialogModel.instance = new MakeTeaDialogModel();
			return MakeTeaDialogModel.instance;
		}

		/**
		 * 获取分类茶叶数据
		 */
		request_getClassify(type:string):void{
		    HttpServiceProxy.request("getMakeTeaInfoList",{"tt":type}, this.getClassFyOverFn);
		}
		/**
		 * 获取茶叶描述信息
		 */
		request_getDepotRightContentData(teaId:number): void
		{
			HttpServiceProxy.request("getMakeTeaInfo",{"si":teaId}, this.getFirstTeaContentFn);
		}
		/** 获取泡茶所需茶叶材料信息 */
		request_getMaterRightContentData(teaId:number):void{
			HttpServiceProxy.request("getMaterialData",{"li":teaId},this.getFirstTeamaterContent);  //teaId
		}
		/** 获取泡茶所需要的水源信息 */
		request_getWater():void{
			HttpServiceProxy.request("getNeedWaterData",null,this.getNeedWater);
		}
		/** 获取泡茶所需要的茶具信息 */
		request_getTeaSet():void{
			HttpServiceProxy.request("getTeaSetData",null,this.getTeaSetData);
		}
		/** 获取当前泡茶组合得分 */
		request_getScore(teaId:number,waterId:number,teaSetId:number):void{
			HttpServiceProxy.request("getTeaQualityData",{"li":teaId,"wi":waterId,"pi":teaSetId},this.getScore);
		}
		/** 购买玄天符 */
		request_getXTF(st:string,si:number,bct:number):void{
			HttpServiceProxy.request("buySingleGoods",{"st":st,"si":si,"bct":bct},this.getXTFPrice);
		}
		/** 购买单一水源 */
		request_getBuyWater(st:string,si:number,bct:number):void{
			HttpServiceProxy.request("buySingleGoods",{"st":st,"si":si,"bct":bct},this.getBuyWater,{"si":si,"bct":bct});
		}
		/** 购买单一茶叶 */
		request_buyleaf(st:string,si:number,bct:number,nums:number):void{
			HttpServiceProxy.request("buySingleGoods",{"st":st,"si":si,"bct":bct},this.getBuyLeaf,{"nums":nums});
		}
		/** 开始烧水 */
		request_friedWater(teaId:number,teaLvl:string,waterId:number,teaSetId:number,makeTeaNums:number,useToolFn:number):void{
			HttpServiceProxy.request("startMakeTeaData",{"li":teaId,"tq":teaLvl,"wi":waterId,"pi":teaSetId,"lic":makeTeaNums,"ut":useToolFn},this.getFriedWaterData);
		}

		private getClassFyOverFn(receiveData?: any): void
		{
			if (receiveData)
				this.receiveData=receiveData;

			let teasObj:Object= receiveData["_d"];
            let key:string;
            let teaObj:Object;
			let teaVO: models.base.SeedVO;
			MakeTeaDialogModel.allTeaVOArr.splice(0, MakeTeaDialogModel.allTeaVOArr.length);
			for (key in teasObj) {
                teaObj = teasObj[key];
                teaVO = new models.base.SeedVO();
				teaVO.id = teaObj["li"];		// 茶叶Id
				teaVO.Teaname = teaObj["ln"];	// 茶叶名称
                MakeTeaDialogModel.allTeaVOArr.push(teaVO);
            }
            MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.allTeaVOArr);
		}
		/**
		 * 茶叶的详情信息
		 */
		private getFirstTeaContentFn(receiveData?: any): void
		{
			if (receiveData)
				this.receiveData=receiveData;
			let teaShowObj:Object= receiveData["_d"];
			MakeTeaDialogModel.teaShowVOArr.splice(0, MakeTeaDialogModel.teaShowVOArr.length);
			let teaShowVO: models.base.SeedVO= new models.base.SeedVO();
			teaShowVO.id = teaShowObj["li"];		// 茶叶Id
			teaShowVO.Teaname = teaShowObj["ln"];	// 茶叶名称
			teaShowVO.teaIcon=teaShowObj["limg"];   //茶叶图片
			teaShowVO.teaSet=teaShowObj["rmdpi"];   //茶具
			teaShowVO.water=teaShowObj["rmdti"];    //泡茶用水
			teaShowVO.remtemp=teaShowObj["remtemp"]; //水温
			teaShowVO.optimal=teaShowObj["quality"]; //最优组合

			MakeTeaDialogModel.teaShowVOArr.push(teaShowVO);
			MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.teaShowVOArr);
		}

		/**泡茶条件中的茶叶数据 */
		private getFirstTeamaterContent(receiveData?: any): void
		{
			if(receiveData){
				this.receiveData=receiveData;
			}
			let seedsObj: Object = receiveData["_d"];
			let seedObj: Object;
			MakeTeaDialogModel.dataShowVOArr.splice(0, MakeTeaDialogModel.dataShowVOArr.length);
			if(seedsObj["tf"].length==0){
				MakeTeaDialogModel.dataShowVOArr.push();
			}
			else{
				seedObj=seedsObj["tf"];
				MakeTeaDialogModel.dataShowVOArr.push(seedObj);
			}
			console.log("泡茶所需茶叶的数据"+JSON.stringify(MakeTeaDialogModel.dataShowVOArr));
			MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.dataShowVOArr);
		}

		/** 泡茶条件中的水源数据 */
		private getNeedWater(receiveData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;

			let waterArr:Array<Object>=receiveData["_d"];
			MakeTeaDialogModel.waterVOArr.splice(0, MakeTeaDialogModel.waterVOArr.length);
			let waterVO:models.base.SeedVO;
			let waterObj:Object;
			let i:number;
			let len:number= waterArr.length;
			for(i=0;i<len;i++){
				waterVO=new models.base.SeedVO();
				waterObj=waterArr[i];
				waterVO.waterId=waterObj["li"];   //水源ID
				waterVO.waterNums=waterObj["c"];  //仓库里水的数量
				waterVO.waterLockNums=waterObj["sc"]; //是否缺少（标识）
				MakeTeaDialogModel.waterVOArr.push(waterVO);
			}
			waterVO=new models.base.SeedVO();
			waterVO.symbolNums=receiveData["xtf"];  //玄天符的数量
			MakeTeaDialogModel.waterVOArr.push(waterVO);
			console.log("水源的数据"+JSON.stringify(MakeTeaDialogModel.waterVOArr));
			MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.waterVOArr);
		}

		/** 泡茶条件中的茶具数据 */
		private getTeaSetData(receiveData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData

			let teaSetArr:Array<any>=this.receiveData["_d"];
			MakeTeaDialogModel.teaSetVOArr.splice(0, MakeTeaDialogModel.teaSetVOArr.length);
			let i:number;
			let len:number=teaSetArr.length;
			let teaSetVO:models.base.SeedVO;
			for(i=0;i<len;i++){
				teaSetVO=new models.base.SeedVO();
				teaSetVO.teaSetId=teaSetArr[i];
				MakeTeaDialogModel.teaSetVOArr.push(teaSetVO);
			}
			MakeTeaDialogModel.instance.handleCallback();
		}

		/** 当前泡茶组合得分数据 */
		getScore(receiveData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;

			let scoreObj:Object=receiveData["_d"];
			MakeTeaDialogModel.curScore=scoreObj["quality"];
			MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.curScore);
		}


		/**  购买玄天符*/
		getXTFPrice(receiveData?:any):void
		{
			if(receiveData){
				this.receiveData=receiveData;
			}
			TipLayerManager.tipLayer.showDrawBgTip("购买成功！ 花费："+receiveData["_y"]+"个钻石！");
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			MakeTeaDialogModel.waterVOArr[3].symbolNums+=1;
			MakeTeaDialogModel.instance.handleCallback();
		}

		getBuyWater(receiveData?:any,takeData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;
			let i:number;
			let len:number=MakeTeaDialogModel.waterVOArr.length-1;
			TipLayerManager.tipLayer.showDrawBgTip("购买成功！ 花费："+receiveData["_g"]+"个金币");
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			for(i=0;i<len;i++){
				if(takeData["si"]==MakeTeaDialogModel.waterVOArr[i].waterId){
					MakeTeaDialogModel.waterVOArr[i].waterNums+=takeData["bct"];
				}
			}
			MakeTeaDialogModel.instance.handleCallback();
		}

		getBuyLeaf(receiveData?:any,takeData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;
			let i:number;
			let leafObj:Object;
			TipLayerManager.tipLayer.showDrawBgTip("购买成功！ 花费："+receiveData["_y"]+"个钻石");
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			let len:number=MakeTeaDialogModel.dataShowVOArr.length;
			if(len>0){
				for(i=0;i<len;i++){
					leafObj=MakeTeaDialogModel.dataShowVOArr[i];
					if (leafObj.hasOwnProperty("1")) {
						leafObj["1"]+=takeData["nums"];
					}else{
						leafObj["1"]=takeData["nums"];
					}
				}
			}else{
				leafObj={"1":takeData["nums"]};
				MakeTeaDialogModel.dataShowVOArr.unshift(leafObj);
			}
			MakeTeaDialogModel.instance.handleCallback();
		}

		getFriedWaterData(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			let takeData: Object = {};
			MakeTeaDialogModel.friedWaterVOArr.splice(0,MakeTeaDialogModel.friedWaterVOArr.length);
			let i:number;
			let friedWaterVO:models.base.SeedVO=new models.base.SeedVO();
			// 正在烧水
			if (receiveData["_cmsg"] && (receiveData["_cmsg"] as string).length > 2)
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}else{
				let friedWaterObj:Object=receiveData["_cmd"];
				let infoObj:Object=friedWaterObj["param"];
				friedWaterVO.name=friedWaterObj["name"]; //接口类型
				friedWaterVO.teaSet=infoObj["potType"]; //茶具类型（名称）
				friedWaterVO.makeTeaNum=infoObj["nums"]; //泡茶数量
				friedWaterVO.temperature=infoObj["temperature"]; //泡茶室的起始温度
				let temArr:Array<number>=infoObj["fitTemperature"]; //泡茶需要的温度
				friedWaterVO.tempBottom=temArr[0]; //泡茶的最低温度
				friedWaterVO.tempTop=temArr[1];  //泡茶的最高温度
				MakeTeaDialogModel.friedWaterVOArr.push(friedWaterVO);
			}
			console.log("烧水数据："+JSON.stringify(MakeTeaDialogModel.friedWaterVOArr));
			MakeTeaDialogModel.instance.handleCallback(MakeTeaDialogModel.friedWaterVOArr);

		}

		handleCallback(takeData?:any):void
		{
			if (MakeTeaDialogModel.callback)
			{
				if (takeData)
					MakeTeaDialogModel.callback(takeData);
				else
					MakeTeaDialogModel.callback();
			}
		}

	}
}

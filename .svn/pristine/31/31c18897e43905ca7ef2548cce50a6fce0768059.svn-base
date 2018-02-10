
namespace models.teaWiki
{
	/**
	 * 茶百科相关数据模型
	 */
	 import toolVO = models.base.ToolVO;

	export class TeaWikiModel
	{

		teaWikiVOArr:Array<models.teaWiki.TeaWikiInfoVO>;
		teaVOArr:Array<models.teaWiki.TeaWikiInfoVO>;
		receiveData: any;
		takeData:any;
		static callback: Function;

		private static instance: TeaWikiModel;

		constructor()
		{
			this.teaWikiVOArr=new Array<models.teaWiki.TeaWikiInfoVO>();
			this.teaVOArr=new Array<models.teaWiki.TeaWikiInfoVO>();
		}
		static getInstance(): TeaWikiModel
		{
			if (!TeaWikiModel.instance)
				TeaWikiModel.instance = new TeaWikiModel();
			return TeaWikiModel.instance;
		}

		/**
		 * 右侧列表数据请求
		 */
		request_getDataByLeft(name:string): void
		{
			HttpServiceProxy.request("getDataByLeft", {"label":name}, this.getDataByLeftOverFn,{"label":name});
		}

		/**
		 * 首次进入加载详情页
		 */
		request_getFirstInfo(teaWikiInfoVO:models.teaWiki.TeaWikiInfoVO):void
		{
			HttpServiceProxy.request("getDataByRight",{"id":0,"label":teaWikiInfoVO.label},this.getDataByRightOverFn,{"label":teaWikiInfoVO.label});
		}

		/**
		 * 点击右侧触发的事件
		 */

		request_getTouchInfo(id:number,teaWikiInfoVO:models.teaWiki.TeaWikiInfoVO):void{
			HttpServiceProxy.request("getDataByRight",{"id":id,"label":teaWikiInfoVO.label},this.getDataByRightOverFn,{"label":teaWikiInfoVO.label});
		}

		/** 点击翻页的请求 */
		request_getPageData(teaVOArr:Array<models.teaWiki.TeaWikiInfoVO>,des:string):void
		{
			if(des=="pre"){
				HttpServiceProxy.request("getPageData",{"id":teaVOArr[0].pre,"label":teaVOArr[0].label,"direction":des},this.getDataByRightOverFn,{"label":teaVOArr[0].label});
			}else{
				HttpServiceProxy.request("getPageData",{"id":teaVOArr[0].next,"label":teaVOArr[0].label,"direction":des},this.getDataByRightOverFn,{"label":teaVOArr[0].label});
			}
		}


		/**
		 *  获取右侧列表信息
		 */
		private getDataByLeftOverFn(receiveData?:any,takeData?:any): void
		{
			if (receiveData)
				this.receiveData=receiveData;

			if (takeData)
				this.takeData=takeData;
			let teasObj: Object = receiveData["_d"];
			let teaObj: Object;
			let teaWikiVO: models.teaWiki.TeaWikiInfoVO;
			let key: string;
			TeaWikiModel.instance.teaWikiVOArr.splice(0, TeaWikiModel.instance.teaWikiVOArr.length);

			for (key in teasObj)
			{
				teaObj = teasObj[key];
				teaWikiVO = new models.teaWiki.TeaWikiInfoVO();
				teaWikiVO.id = teaObj["id"];
				teaWikiVO.name = teaObj["title"];
				teaWikiVO.label =takeData["label"];
				TeaWikiModel.instance.teaWikiVOArr.push(teaWikiVO)
			}
			TeaWikiModel.instance.handleCallback(TeaWikiModel.instance.teaWikiVOArr);
		}


		/**
		 * 1:获取详细信息
		 * 2:翻页获取数据
		 */
		private getDataByRightOverFn(receiveData?: any,takeData?:any): void
		{

			if(receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;
			TeaWikiModel.instance.teaVOArr.splice(0, TeaWikiModel.instance.teaVOArr.length);
			let teasObj: Object = receiveData["page"];
			let teaWikiInfoVO: models.teaWiki.TeaWikiInfoVO;
			teaWikiInfoVO = new models.teaWiki.TeaWikiInfoVO();
			teaWikiInfoVO.id = teasObj["id"];
			teaWikiInfoVO.label=takeData["label"];
			teaWikiInfoVO.pre = teasObj["pre"];
			teaWikiInfoVO.next = teasObj["next"];
			teaWikiInfoVO.icon = teasObj["resource"];
			TeaWikiModel.instance.teaVOArr.push(teaWikiInfoVO);
			console.log(JSON.stringify(TeaWikiModel.instance.teaVOArr));
			TeaWikiModel.instance.handleCallback(TeaWikiModel.instance.teaVOArr);
		}

		handleCallback(takeData?:any):void
		{
			if(TeaWikiModel.callback)
			{
				if(takeData)
					TeaWikiModel.callback(takeData);
				else
					TeaWikiModel.callback();
			}
		}

	}
}
namespace models.ranklist
{
	/**
	 * 排行榜数据模型
	 * @author hsx
	 */
	export class RankListMode
	{

		static callback:Function;

		static instance:RankListMode;

		constructor()
		{
			RankListMode.instance = this;

		}

		/**
		 * 等级排行
		 * @param para {当前页，每页条数}
		 */
		request_getGradeRank(para:Object):void
		{
			HttpServiceProxy.request("getGradeRank",{"page":para["page"],"num":para["num"]},this.getGradeRankOver);
		}

		private getGradeRankOver(receiveData:Object,takeData?:Object):void
		{
			if(!receiveData)
				return;

			if(receiveData["_cmsg"])
			{

			}
			else
			{
				// ["玩家排行","玩家头像","玩家名字","玩家等级","玩家经验"]
				let allData:Object = receiveData["_d"];
				let oneData:Object;
				let key:string;
				// 玩家的数据
				let dataArr:Array<Array<string>> = new Array<Array<string>>();
				for(key in allData)
				{
					oneData = allData[key];
					if(!oneData)
						continue;
					let objArr:string[] = [];
					objArr.push((parseInt(key)+1)+"");
					objArr.push(oneData["h"]);
					objArr.push(oneData["n"]);
					objArr.push(oneData["l"]);
					objArr.push(oneData["exp"]);
					dataArr.push(objArr);
				}
				// 自己的数据
				let selfObj:Object = {};
				selfObj["rank"] = receiveData["_myranking"];
				selfObj["exp"] = receiveData["_myexp"];
				let dataObj:Object = {"page":receiveData["_pagecount"],"data":dataArr,"selfData":selfObj}
				RankListMode.instance.handleCallback(dataObj);
			}

		}

		private handleCallback(takeData:Object): void
		{
			if (RankListMode.callback)
			{
				if (takeData)
					RankListMode.callback(takeData);
				else
					RankListMode.callback();
			}
		}

	}
}